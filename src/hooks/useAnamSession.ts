'use client';

/**
 * Custom hook managing the Anam.ai avatar session lifecycle.
 *
 * Refactored to use the Pi harness framework (`@mariozechner/pi-agent-core`)
 * for all LLM interactions. The Pi {@link Agent} handles streaming, message
 * state, and abort semantics while this hook manages:
 *   - Anam SDK session lifecycle (connect, stream, disconnect)
 *   - Microphone access and level monitoring
 *   - Analytics event pipeline (`/api/demo/events`)
 *   - UI state (messages, status, mute, reactions)
 *   - Booking URL overlay state (from `book_appointment` tool results)
 *
 * Pipeline:
 *   Client mic -> Anam built-in STT -> Pi Agent (via streamProxy) -> anamClient.talk()
 *
 * Communicates with:
 *   POST /api/demo/session       - get Anam session token
 *   POST /api/stream             - Pi streamProxy backend (LLM streaming)
 *   POST /api/demo/events        - fire analytics events
 *   GET  /api/demo/qualification - poll qualification result
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { ProspectContext, DemoPersonaConfig } from '@/lib/demo-utils';
import {
  createDemoAgent,
  createFireEventTool,
  getMessageText,
} from '@/lib/demo-agent';
import type { Agent, AgentEvent } from '@/lib/demo-agent';
import type { BookAppointmentDetails } from '@/lib/calendly-tools';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/** Possible states of the Anam session. */
export type SessionStatus = 'idle' | 'connecting' | 'connected' | 'ended' | 'error';

/** A single message displayed in the chat transcript UI. */
export interface Message {
  id: string;
  role: 'user' | 'persona' | 'system';
  content: string;
  timestamp: number;
}

/** Configuration passed to {@link startSession}. */
export interface SessionStartConfig {
  prospect: ProspectContext;
  persona: DemoPersonaConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnamClientType = any;

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * React hook that orchestrates the Brightwave demo avatar session.
 *
 * It creates a Pi {@link Agent} on session start, subscribes to its event
 * stream for real-time text updates, and pipes completed responses to the
 * Anam avatar's text-to-speech engine.
 *
 * When the `book_appointment` tool completes with a booking URL, this hook
 * captures it via the `tool_execution_end` event and exposes it as
 * `bookingUrl` state for the UI overlay.
 *
 * @returns Session state and control functions.
 */
export function useAnamSession() {
  // -- React state -----------------------------------------------------------
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState(0);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  // -- Refs ------------------------------------------------------------------
  const anamClientRef = useRef<AnamClientType>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const configRef = useRef<SessionStartConfig | null>(null);
  const isSpeakingRef = useRef(false);

  /** Pi Agent instance -- created per-session. */
  const agentRef = useRef<Agent | null>(null);

  /** Monotonically increasing message ID counter. */
  const msgCounter = useRef(0);

  // ---------------------------------------------------------------------------
  // Booking URL controls
  // ---------------------------------------------------------------------------

  /**
   * Clear the booking URL, dismissing the overlay.
   *
   * Exposed to the UI so the dismiss button can hide the booking CTA.
   */
  const clearBookingUrl = useCallback(() => setBookingUrl(null), []);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /** Generate a unique message ID for the transcript. */
  function nextId(): string {
    msgCounter.current++;
    return `msg-${Date.now()}-${msgCounter.current}`;
  }

  /**
   * Append or update a message in the transcript.
   *
   * If a message with the given `id` already exists it is updated in place
   * (used for streaming assistant responses). Otherwise a new entry is added.
   *
   * @param role    - Who authored the message.
   * @param content - The message text.
   * @param id      - Optional explicit ID; a new one is generated if omitted.
   * @returns The message ID.
   */
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

  // ---------------------------------------------------------------------------
  // Analytics events
  // ---------------------------------------------------------------------------

  /**
   * Fire an analytics event to the `/api/demo/events` endpoint.
   *
   * @param eventType - Event type identifier.
   * @param payload   - Arbitrary payload data.
   */
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

  // ---------------------------------------------------------------------------
  // Mic level monitoring
  // ---------------------------------------------------------------------------

  /**
   * Start monitoring the microphone input level via Web Audio API.
   *
   * Updates the `micLevel` state (0..1) at animation-frame rate for the
   * visual volume indicator in the UI.
   *
   * @param stream - The user's microphone MediaStream.
   */
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

  // ---------------------------------------------------------------------------
  // LLM chat via Pi Agent
  // ---------------------------------------------------------------------------

  /**
   * Handle user speech: send the transcript to the Pi Agent, stream the
   * response into the UI, and pipe the final text to the Anam avatar.
   *
   * Replaces the old manual `fetch` + SSE parsing with `agent.prompt()`.
   *
   * @param transcript - The user's spoken (or typed) text.
   */
  const handleUserSpeech = useCallback(
    async (transcript: string) => {
      if (!transcript.trim()) return;
      const anamClient = anamClientRef.current;
      const agent = agentRef.current;
      if (!anamClient || !agent) return;

      // Interrupt avatar if currently speaking
      if (isSpeakingRef.current) {
        try {
          anamClient.interruptPersona();
        } catch {
          /* ignore */
        }
        isSpeakingRef.current = false;
      }

      // Abort any in-flight agent run
      agent.abort();

      // Add user message to the UI transcript
      appendMessage('user', transcript);

      // Fire user message analytics event
      fireEvent('message', { speaker: 'user', text: transcript });

      // -- Set up event subscription for THIS prompt -----------------------
      // We track the streaming response via a closure-scoped message ID.
      const responseMsgId = nextId();
      let fullResponse = '';

      const unsubscribe = agent.subscribe(async (event: AgentEvent) => {
        if (event.type === 'message_update') {
          // Accumulate text deltas for the streaming UI update
          if (event.assistantMessageEvent.type === 'text_delta') {
            fullResponse += event.assistantMessageEvent.delta;
            appendMessage('persona', fullResponse, responseMsgId);
          }
        }

        // Detect book_appointment tool completion and extract booking URL
        if (event.type === 'tool_execution_end' && event.toolName === 'book_appointment' && !event.isError) {
          const details = event.result?.details as BookAppointmentDetails | undefined;
          if (details?.booking_url) {
            setBookingUrl(details.booking_url);
          }
        }

        if (event.type === 'agent_end') {
          unsubscribe();

          if (!fullResponse) return;

          // Fire agent message analytics event
          fireEvent('message', { speaker: 'agent', text: fullResponse });

          // Pipe the full response to the Anam avatar's TTS
          isSpeakingRef.current = true;
          try {
            await anamClient.talk(fullResponse);
          } finally {
            isSpeakingRef.current = false;
          }
        }
      });

      // -- Send the prompt to the Pi Agent --------------------------------
      try {
        await agent.prompt(transcript);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        console.error('[useAnamSession] Agent prompt error:', err);
        isSpeakingRef.current = false;
        unsubscribe();
      }
    },
    [appendMessage, fireEvent],
  );

  // ---------------------------------------------------------------------------
  // Session lifecycle
  // ---------------------------------------------------------------------------

  /**
   * Start a new demo session.
   *
   * 1. Requests an Anam session token from the backend.
   * 2. Creates and configures the Pi Agent.
   * 3. Initializes the Anam SDK and starts video/audio streaming.
   * 4. Requests microphone access for level monitoring.
   * 5. Sends the opening greeting to the avatar.
   *
   * @param config - Session configuration with prospect and persona data.
   */
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
      if (agentRef.current) {
        agentRef.current.abort();
        agentRef.current = null;
      }

      setStatus('connecting');
      setMessages([]);
      setError(null);
      setIsMicMuted(false);
      setBookingUrl(null);
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

        // Use returned sessionId, or generate a client-side fallback
        const resolvedSessionId =
          sid || `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setSessionId(resolvedSessionId);

        // Apply persona config overrides from the server
        if (personaConfig?.greeting) {
          config.persona.greeting = personaConfig.greeting;
        }
        if (personaConfig?.calendarLink) {
          config.persona.calendarLink = personaConfig.calendarLink;
        }

        // 2. Create the Pi Agent with demo configuration
        const prospect = config.prospect;
        const agent = createDemoAgent({
          systemPrompt:
            config.persona.knowledgeBase ||
            (await import('@/lib/kb/brightwave')).buildDefaultSystemPrompt(prospect),
          modelId: config.persona.llmModel,
          sessionId: resolvedSessionId,
          tools: [
            createFireEventTool(resolvedSessionId, {
              name: prospect.name || '',
              email: prospect.email || '',
              company: prospect.company || '',
              role: prospect.role || '',
              firmType: prospect.firmType || '',
            }),
          ],
        });
        agentRef.current = agent;

        // 3. Dynamic-import the Anam SDK (browser-only, avoid SSR)
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

        // Create Anam client with session token
        const anamClient = createAnamClient(sessionToken);
        anamClientRef.current = anamClient;

        // Wire up Anam connection events
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

        // 4. Start the Anam session -- stream video and audio
        await anamClient.streamToVideoElement('anam-avatar-video');

        // 5. Get mic access for level monitoring
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;
          startMicMonitor(stream);
        } catch {
          // Mic denied -- session can still work with text chat
          console.warn('[useAnamSession] Mic access denied');
        }

        // 6. Send opening greeting
        const firstName = config.prospect.name
          ? config.prospect.name.split(' ')[0]
          : 'there';
        const greeting =
          config.persona.greeting ||
          `Hey ${firstName}! I'm your Brightwave guide. What kind of investment work does your team focus on?`;

        // Seed the Pi Agent's message history with the greeting
        agent.state.messages = [
          {
            role: 'assistant' as const,
            content: [{ type: 'text' as const, text: greeting }],
            api: 'anthropic-messages',
            provider: 'anthropic',
            model: config.persona.llmModel || 'claude-sonnet-4-5-20250929',
            usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
            stopReason: 'stop' as const,
            timestamp: Date.now(),
          },
        ];

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

  /**
   * End the current session.
   *
   * Tears down the microphone monitor, Anam client, and Pi Agent, then
   * fires a `session_end` analytics event with the full conversation
   * transcript as fallback data.
   */
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

    // Build conversation history from Pi Agent's message state
    const agent = agentRef.current;
    const conversationHistory: { role: string; content: string }[] = [];
    if (agent) {
      for (const msg of agent.state.messages) {
        if ('role' in msg) {
          if (msg.role === 'user' || msg.role === 'assistant') {
            conversationHistory.push({
              role: msg.role,
              content: getMessageText(msg),
            });
          }
        }
      }
      agent.abort();
      agentRef.current = null;
    }

    setStatus('ended');
    setMicLevel(0);
    setBookingUrl(null);

    // Fire session_end event with conversation transcript as fallback data
    fireEvent('session_end', { conversationHistory });
  }, [fireEvent]);

  /**
   * Toggle the microphone mute state.
   *
   * Mutes/unmutes both the Anam client's input audio and the local
   * MediaStream tracks.
   */
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

  /**
   * Send a text message (fallback for text-based input when mic is unavailable).
   *
   * @param text - The text to send to the agent.
   */
  const sendText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      handleUserSpeech(text);
    },
    [handleUserSpeech],
  );

  /**
   * Fire a "raise hand" analytics event.
   */
  const raiseHand = useCallback(() => {
    fireEvent('raise_hand');
  }, [fireEvent]);

  /**
   * Fire a reaction analytics event.
   *
   * @param emoji - The emoji string for the reaction.
   */
  const sendReaction = useCallback(
    (emoji: string) => {
      fireEvent('reaction', { emoji });
    },
    [fireEvent],
  );

  // ---------------------------------------------------------------------------
  // Cleanup on unmount
  // ---------------------------------------------------------------------------

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
      if (agentRef.current) {
        agentRef.current.abort();
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  return {
    status,
    messages,
    isMicMuted,
    error,
    sessionId,
    micLevel,
    bookingUrl,
    clearBookingUrl,
    startSession,
    endSession,
    toggleMic,
    sendText,
    raiseHand,
    sendReaction,
  };
}

export default useAnamSession;
