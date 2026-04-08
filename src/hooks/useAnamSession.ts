'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { ProspectContext, DemoPersonaConfig } from '@/lib/demo-utils';

export type SessionStatus = 'idle' | 'connecting' | 'connected' | 'ended' | 'error';

export interface Message {
  id: string;
  role: 'user' | 'persona' | 'system';
  content: string;
  timestamp: number;
}

export interface SessionStartConfig {
  prospect: ProspectContext;
  persona: DemoPersonaConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnamClientType = any;

/**
 * Custom hook managing the Anam.ai avatar session lifecycle.
 *
 * Pipeline:
 *   Client mic -> Anam built-in STT -> LLM (server-side) -> anamClient.talk()
 *
 * Communicates with:
 *   POST /api/demo/session  - get session token (Agent B)
 *   POST /api/demo/chat     - stream LLM responses (chat route)
 *   POST /api/demo/events   - fire analytics events (Agent C)
 *   GET  /api/demo/qualification - poll qualification result (Agent C)
 */
export function useAnamSession() {
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState(0);

  const anamClientRef = useRef<AnamClientType>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const configRef = useRef<SessionStartConfig | null>(null);
  const isSpeakingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const conversationRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const msgCounter = useRef(0);
  function nextId() {
    msgCounter.current++;
    return `msg-${Date.now()}-${msgCounter.current}`;
  }

  const appendMessage = useCallback(
    (role: 'user' | 'persona' | 'system', content: string, id?: string): string => {
      const msgId = id || nextId();
      setMessages((prev) => {
        const existing = prev.findIndex((m) => m.id === msgId);
        if (existing >= 0) {
          const next = [...prev];
          next[existing] = { ...next[existing], content };
          return next;
        }
        return [...prev, { id: msgId, role, content, timestamp: Date.now() }];
      });
      return msgId;
    },
    [],
  );

  // -- Fire analytics events to the events endpoint ----------------------
  const fireEvent = useCallback(
    async (eventType: string, payload: Record<string, unknown> = {}) => {
      if (!sessionId) return;
      const prospect = configRef.current?.prospect;
      try {
        const res = await fetch('/api/demo/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            eventType,
            payload,
            prospect: prospect
              ? {
                  name: prospect.name || '',
                  email: prospect.email || '',
                  company: prospect.company || '',
                  role: prospect.role || '',
                  firmType: prospect.firmType || '',
                }
              : { name: '', email: '', company: '', role: '' },
            timestamp: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          const errorBody = await res.text();
          console.error(`[useAnamSession] Event ${eventType} failed (${res.status}):`, errorBody);
        }
      } catch (err) {
        console.error(`[useAnamSession] Event ${eventType} fetch error:`, err);
      }
    },
    [sessionId],
  );

  // -- Mic level monitoring for visual indicator -------------------------
  const startMicMonitor = useCallback((stream: MediaStream) => {
    try {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setMicLevel(Math.min(1, avg / 128));
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // AudioContext not available -- skip level monitoring
    }
  }, []);

  // -- Chat: handle user speech, stream Claude response, avatar speaks ---
  const handleUserSpeech = useCallback(
    async (transcript: string) => {
      if (!transcript.trim()) return;
      const anamClient = anamClientRef.current;
      if (!anamClient) return;

      // Interrupt avatar if currently speaking
      if (isSpeakingRef.current) {
        try {
          anamClient.interruptPersona();
        } catch {
          /* ignore */
        }
        isSpeakingRef.current = false;
      }

      // Cancel any in-flight chat request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      // Add user message
      appendMessage('user', transcript);
      conversationRef.current.push({ role: 'user', content: transcript });

      // Fire message event
      fireEvent('message', { speaker: 'user', text: transcript });

      try {
        const chatRes = await fetch('/api/demo/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            messages: conversationRef.current,
            prospect: configRef.current?.prospect,
            persona: configRef.current?.persona,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!chatRes.ok || !chatRes.body) throw new Error('Chat request failed');

        const reader = chatRes.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        const responseMsgId = nextId();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullResponse += parsed.text;
                appendMessage('persona', fullResponse, responseMsgId);
              }
            } catch {
              // Partial JSON line -- ignore
            }
          }
        }

        if (fullResponse) {
          conversationRef.current.push({ role: 'assistant', content: fullResponse });

          // Fire agent message event
          fireEvent('message', { speaker: 'agent', text: fullResponse });

          isSpeakingRef.current = true;
          try {
            await anamClient.talk(fullResponse);
          } finally {
            isSpeakingRef.current = false;
          }
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        console.error('[useAnamSession] Chat error:', err);
        isSpeakingRef.current = false;
      }
    },
    [appendMessage, fireEvent, sessionId],
  );

  // -- Main session lifecycle --------------------------------------------
  const startSession = useCallback(
    async (config: SessionStartConfig) => {
      // Tear down previous session if any
      if (anamClientRef.current) {
        try {
          await anamClientRef.current.stopStreaming();
        } catch {
          /* ignore */
        }
        anamClientRef.current = null;
      }

      setStatus('connecting');
      setMessages([]);
      setError(null);
      setIsMicMuted(false);
      configRef.current = config;

      try {
        // 1. Request session token from backend
        const sessionRes = await fetch('/api/demo/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            personaId: config.persona.personaId,
            prospect: config.prospect,
          }),
        });

        if (!sessionRes.ok) {
          throw new Error(`Session API returned ${sessionRes.status}`);
        }

        const sessionData = await sessionRes.json();
        const { sessionToken, personaConfig, sessionId: sid } = sessionData;
        if (!sessionToken) {
          throw new Error('No session token returned from API');
        }

        // Use returned sessionId, or generate a client-side one as fallback
        const resolvedSessionId = sid || `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setSessionId(resolvedSessionId);

        // Apply persona config overrides from the server
        if (personaConfig?.greeting) {
          config.persona.greeting = personaConfig.greeting;
        }
        if (personaConfig?.calendarLink) {
          config.persona.calendarLink = personaConfig.calendarLink;
        }

        // 2. Dynamic-import the Anam SDK (browser-only, avoid SSR)
        const anamSdk = await import('@anam-ai/js-sdk');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = anamSdk as any;
        const createAnamClient = mod.createClient ?? mod.default?.createClient;
        const AnamEvent = mod.AnamEvent ?? mod.default?.AnamEvent;

        if (typeof createAnamClient !== 'function') {
          throw new Error(
            'Anam SDK createClient is not available. Check that @anam-ai/js-sdk is installed correctly.',
          );
        }

        // Create client with session token
        const anamClient = createAnamClient(sessionToken);
        anamClientRef.current = anamClient;

        // Wire up connection events
        if (AnamEvent?.CONNECTION_ESTABLISHED) {
          anamClient.addListener(AnamEvent.CONNECTION_ESTABLISHED, () => {
            console.log('[Anam] Connection established');
          });
        }
        if (AnamEvent?.CONNECTION_CLOSED) {
          anamClient.addListener(AnamEvent.CONNECTION_CLOSED, () => {
            setStatus('error');
            setError('Connection to avatar was lost');
          });
        }

        // Listen for user speech transcripts from Anam's built-in STT
        if (AnamEvent?.MESSAGE_HISTORY_UPDATED) {
          anamClient.addListener(
            AnamEvent.MESSAGE_HISTORY_UPDATED,
            (history: { role: string; content: string }[]) => {
              if (history.length > 0) {
                const last = history[history.length - 1];
                if (last.role === 'user') {
                  handleUserSpeech(last.content);
                }
              }
            },
          );
        }

        // 3. Start the Anam session -- stream video and audio
        await anamClient.streamToVideoElement('anam-avatar-video');

        // 4. Get mic access for level monitoring
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;
          startMicMonitor(stream);
        } catch {
          // Mic denied -- session can still work with text chat
          console.warn('[useAnamSession] Mic access denied');
        }

        // 5. Send opening greeting
        const firstName = config.prospect.name
          ? config.prospect.name.split(' ')[0]
          : 'there';
        const greeting =
          config.persona.greeting ||
          `Hey ${firstName}! I'm your Brightwave guide. What kind of investment work does your team focus on?`;

        conversationRef.current = [{ role: 'assistant', content: greeting }];
        appendMessage('persona', greeting);
        isSpeakingRef.current = true;
        anamClient.talk(greeting).finally(() => {
          isSpeakingRef.current = false;
        });

        setStatus('connected');

        // Fire session_start event
        fireEvent('session_start');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to start session';
        console.error('[useAnamSession] Error:', message, err);
        setError(message);
        setStatus('error');
      }
    },
    [appendMessage, handleUserSpeech, startMicMonitor, fireEvent],
  );

  const endSession = useCallback(() => {
    // Stop mic level monitoring
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    // Stop mic stream tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    // Stop Anam
    if (anamClientRef.current) {
      try {
        anamClientRef.current.stopStreaming();
      } catch {
        /* ignore */
      }
      anamClientRef.current = null;
    }

    setStatus('ended');
    setMicLevel(0);

    // Fire session_end event with conversation transcript as fallback data
    // so the server has the full conversation even if earlier message events
    // were lost (e.g. due to validation failures or network issues).
    fireEvent('session_end', {
      conversationHistory: conversationRef.current,
    });
  }, [fireEvent]);

  const toggleMic = useCallback(() => {
    const anamClient = anamClientRef.current;
    if (!anamClient) return;

    if (isMicMuted) {
      try {
        anamClient.unmuteInputAudio();
      } catch {
        /* ignore */
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = true;
        });
      }
      setIsMicMuted(false);
    } else {
      try {
        anamClient.muteInputAudio();
      } catch {
        /* ignore */
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      }
      setIsMicMuted(true);
    }
  }, [isMicMuted]);

  const sendText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      handleUserSpeech(text);
    },
    [handleUserSpeech],
  );

  const raiseHand = useCallback(() => {
    fireEvent('raise_hand');
  }, [fireEvent]);

  const sendReaction = useCallback(
    (emoji: string) => {
      fireEvent('reaction', { emoji });
    },
    [fireEvent],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (anamClientRef.current) {
        try {
          anamClientRef.current.stopStreaming();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  return {
    status,
    messages,
    isMicMuted,
    error,
    sessionId,
    micLevel,
    startSession,
    endSession,
    toggleMic,
    sendText,
    raiseHand,
    sendReaction,
  };
}

export default useAnamSession;
