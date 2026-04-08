'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { formatElapsed } from '@/lib/demo-utils';
import type { SessionStatus, Message } from '@/hooks/useAnamSession';
import BottomToolbar from './BottomToolbar';
import ChatSidePanel from './ChatSidePanel';
import ReactionsOverlay from './ReactionsOverlay';
import { BrightwaveLogo } from '@/components/layout/logo';

interface VideoCallViewProps {
  status: SessionStatus;
  messages: Message[];
  isMicMuted: boolean;
  error: string | null;
  micLevel: number;
  onToggleMic: () => void;
  onSendText: (text: string) => void;
  onEndCall: () => void;
  onReaction: (emoji: string) => void;
  calendarLink?: string;
}

/* ────────────────────────────────────────────────────────────────────────────
 * SelfViewPip — draggable picture-in-picture of user's camera
 * Matches sales-avatar/SelfViewPip.tsx: 200×150, rounded-xl, border-2,
 * draggable with mouse, "You" label bottom-left.
 * ──────────────────────────────────────────────────────────────────────── */
function SelfViewPip({ visible }: { visible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: -1, y: -1 });
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let localStream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({ video: { width: 320, height: 240, facingMode: 'user' }, audio: false })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        localStream = s;
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      localStream?.getTracks().forEach((t) => t.stop());
    };
  }, [visible]);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    if (position.x === -1 && typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 216, y: window.innerHeight - 230 });
    }
  }, [position.x]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 150, e.clientY - dragOffset.current.y)),
      });
    };
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="fixed z-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 cursor-grab active:cursor-grabbing select-none"
      style={{
        width: 200,
        height: 150,
        left: position.x === -1 ? undefined : position.x,
        top: position.y === -1 ? undefined : position.y,
        right: position.x === -1 ? 16 : undefined,
        bottom: position.y === -1 ? 80 : undefined,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-md px-2 py-0.5">
        <span className="text-[11px] text-white/80 font-medium">You</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * StatusIndicators — top-left status pills
 * Matches sales-avatar/StatusIndicators.tsx: 3 separate pills:
 *   1) Connection status dot + label
 *   2) Elapsed timer (font-mono tabular-nums)
 *   3) Red LIVE badge with pulsing dot
 * ──────────────────────────────────────────────────────────────────────── */
function StatusIndicators({ status }: { status: SessionStatus }) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'connected') {
      if (!startTimeRef.current) startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else if (status === 'ended' || status === 'error') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const dotColor =
    status === 'connected'
      ? 'bg-green-400'
      : status === 'connecting'
        ? 'bg-yellow-400 animate-pulse'
        : status === 'error'
          ? 'bg-red-400'
          : 'bg-gray-500';

  const label =
    status === 'connected'
      ? 'Connected'
      : status === 'connecting'
        ? 'Connecting...'
        : status === 'error'
          ? 'Disconnected'
          : status === 'ended'
            ? 'Ended'
            : 'Idle';

  return (
    <div className="fixed top-4 left-4 z-30 flex items-center gap-3">
      {/* Status pill */}
      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
        <span className={cn('w-2.5 h-2.5 rounded-full', dotColor)} />
        <span className="text-xs text-white/70 font-medium">{label}</span>
      </div>

      {/* Timer pill */}
      {(status === 'connected' || status === 'ended') && (
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-xs text-white/60 font-mono tabular-nums">{formatElapsed(elapsed)}</span>
        </div>
      )}

      {/* LIVE badge */}
      {status === 'connected' && (
        <div className="flex items-center gap-1.5 bg-red-600/80 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs text-white font-bold uppercase tracking-wider">Live</span>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * EndCallModal — confirmation overlay
 * Matches sales-avatar/EndCallModal.tsx: options layout with
 * "Talk to a live person" (schedule) and "End call" buttons + cancel.
 * ──────────────────────────────────────────────────────────────────────── */
function EndCallModal({
  open,
  onConfirm,
  onCancel,
  calendarLink,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  calendarLink?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black" />
      <div className="relative bg-bw-gray-700 border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2">Leave the call?</h2>
          <p className="text-sm text-white/50 mb-6">Before you go, would you like to connect with our team?</p>
          <div className="space-y-3">
            {/* Schedule option */}
            <button
              onClick={() => window.open(calendarLink || process.env.NEXT_PUBLIC_CALENDLY_WORKSHOP_URL || '#', '_blank')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-bw-gray-600 hover:bg-white/[0.06] transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-white">Talk to a live person</span>
                <p className="text-xs text-white/40 mt-0.5">Schedule time with our sales team</p>
              </div>
              <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* End call option */}
            <button
              onClick={onConfirm}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-red-900/30 bg-red-900/20 hover:bg-red-900/30 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-red-900/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-red-400">End call</span>
                <p className="text-xs text-white/40 mt-0.5">Leave and see next steps</p>
              </div>
            </button>

            {/* Cancel */}
            <button onClick={onCancel} className="w-full py-3 text-sm text-white/40 hover:text-white/60 transition-colors text-center">
              Cancel &mdash; return to call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Main VideoCallView
 * Matches sales-avatar reference exactly:
 *   - fixed inset-0, bg-bw-gray-800
 *   - Full-viewport video element
 *   - Loading/error/ended overlays
 *   - StatusIndicators top-left
 *   - Brand mark top-right
 *   - SelfViewPip, BottomToolbar, ReactionsOverlay, ChatSidePanel, EndCallModal
 * ──────────────────────────────────────────────────────────────────────── */
export default function VideoCallView({
  status,
  messages,
  isMicMuted,
  error,
  micLevel,
  onToggleMic,
  onSendText,
  onEndCall,
  onReaction,
  calendarLink,
}: VideoCallViewProps) {
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [endCallModalOpen, setEndCallModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const lastSeenCountRef = useRef(0);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (chatOpen) {
      lastSeenCountRef.current = messages.filter((m) => m.role === 'persona').length;
      setUnreadCount(0);
    } else {
      const personaMessages = messages.filter((m) => m.role === 'persona').length;
      const newCount = personaMessages - lastSeenCountRef.current;
      if (newCount > 0) setUnreadCount(newCount);
    }
  }, [chatOpen, messages]);

  const handleToggleChat = useCallback(() => {
    setChatOpen((prev) => !prev);
    setReactionsOpen(false);
  }, []);

  const handleToggleReactions = useCallback(() => {
    setReactionsOpen((prev) => !prev);
  }, []);

  const handleEndCall = () => {
    setEndCallModalOpen(true);
  };

  const handleConfirmEnd = () => {
    setEndCallModalOpen(false);
    onEndCall();
  };

  const isLive = status === 'connected';
  const isConnecting = status === 'connecting' || status === 'idle';

  return (
    <main className="fixed inset-0 bg-bw-gray-800 overflow-hidden">
      {/* ── Main video stage ──────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          id="anam-avatar-video"
          autoPlay
          playsInline
          className={cn(
            'w-full h-full object-cover transition-opacity duration-700',
            isLive ? 'opacity-100' : 'opacity-0',
          )}
        />
        <audio id="anam-avatar-audio" autoPlay style={{ display: 'none' }} />

        {/* Loading overlay */}
        {isConnecting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bw-gray-800">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-white/[0.05] flex items-center justify-center">
                <svg className="w-10 h-10 text-bw-yellow-550" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-bw-yellow-550/30 border-t-bw-yellow-550 animate-spin" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Connecting to your Brightwave guide...</h2>
            <p className="text-sm text-white/50">Setting up your session</p>
          </div>
        )}

        {/* Error overlay */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bw-gray-800">
            <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Connection lost</h2>
            <p className="text-sm text-white/50 mb-4">{error || 'Unable to connect to the server'}</p>
          </div>
        )}

        {/* Ended overlay */}
        {status === 'ended' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bw-gray-800">
            <div className="w-20 h-20 rounded-full bg-white/[0.05] flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Session ended</h2>
            <p className="text-sm text-white/50">Redirecting...</p>
          </div>
        )}
      </div>

      {/* ── Status indicators (top-left) ─────────────────────────────── */}
      <StatusIndicators status={status} />

      {/* ── Brightwave brand mark (top-right) ────────────────────────── */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
        <BrightwaveLogo className="text-white/60 h-4 w-auto" />
      </div>

      {/* ── Self-view PiP ────────────────────────────────────────────── */}
      <SelfViewPip visible={cameraOn} />

      {/* ── Bottom Toolbar ───────────────────────────────────────────── */}
      <BottomToolbar
        isMicMuted={isMicMuted}
        isCameraOn={cameraOn}
        isChatOpen={chatOpen}
        isReactionsOpen={reactionsOpen}
        unreadCount={unreadCount}
        onToggleMic={onToggleMic}
        onToggleCamera={() => setCameraOn((prev) => !prev)}
        onToggleChat={handleToggleChat}
        onToggleReactions={handleToggleReactions}
        onEndCall={handleEndCall}
      />

      {/* ── Reactions Overlay ────────────────────────────────────────── */}
      <ReactionsOverlay
        pickerOpen={reactionsOpen}
        onClose={() => setReactionsOpen(false)}
        onReaction={onReaction}
      />

      {/* ── Chat Side Panel ──────────────────────────────────────────── */}
      <ChatSidePanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={messages}
        onSendText={onSendText}
      />

      {/* ── End Call Modal ───────────────────────────────────────────── */}
      <EndCallModal
        open={endCallModalOpen}
        onConfirm={handleConfirmEnd}
        onCancel={() => setEndCallModalOpen(false)}
        calendarLink={calendarLink}
      />
    </main>
  );
}
