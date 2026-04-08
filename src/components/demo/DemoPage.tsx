'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProspectContext } from '@/lib/demo-utils';
import type { ProspectContext, DemoPersonaConfig } from '@/lib/demo-utils';
import { useAnamSession } from '@/hooks/useAnamSession';
import PreCallLobby from './PreCallLobby';
import VideoCallView from './VideoCallView';
import PostCallScreen from './PostCallScreen';

type DemoPhase = 'lobby' | 'call' | 'post-call';

interface DemoPageProps {
  persona: DemoPersonaConfig;
}

export default function DemoPage({ persona }: DemoPageProps) {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<DemoPhase>('lobby');
  const [prospect, setProspect] = useState<ProspectContext | null>(null);

  const {
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
  } = useAnamSession();

  // Parse prospect context on mount (client-side only for localStorage access)
  useEffect(() => {
    const ctx = getProspectContext(searchParams);
    setProspect(ctx);
  }, [searchParams]);

  // Transition to post-call when session ends
  useEffect(() => {
    if (status === 'ended' && phase === 'call') {
      setPhase('post-call');
    }
  }, [status, phase]);

  const handleStartDemo = useCallback(() => {
    if (!prospect) return;
    setPhase('call');
    startSession({ prospect, persona });
  }, [prospect, persona, startSession]);

  const handleEndCall = useCallback(() => {
    endSession();
  }, [endSession]);

  const handleReaction = useCallback(
    (emoji: string) => {
      sendReaction(emoji);
    },
    [sendReaction],
  );

  // Show loading while prospect context is being parsed
  if (!prospect) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === 'lobby') {
    return <PreCallLobby prospect={prospect} onStart={handleStartDemo} />;
  }

  if (phase === 'post-call') {
    return (
      <PostCallScreen
        prospect={prospect}
        sessionId={sessionId}
        calendarLink={persona.calendarLink}
      />
    );
  }

  return (
    <VideoCallView
      status={status}
      messages={messages}
      isMicMuted={isMicMuted}
      error={error}
      micLevel={micLevel}
      onToggleMic={toggleMic}
      onSendText={sendText}
      onEndCall={handleEndCall}
      onRaiseHand={raiseHand}
      onReaction={handleReaction}
    />
  );
}
