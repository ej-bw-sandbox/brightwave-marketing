'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatElapsed } from '@/lib/demo-utils';
import type { SessionStatus, Message } from '@/hooks/useAnamSession';
import BottomToolbar from './BottomToolbar';
import ChatSidePanel from './ChatSidePanel';
import ReactionsOverlay from './ReactionsOverlay';

interface VideoCallViewProps {
  status: SessionStatus;
  messages: Message[];
  isMicMuted: boolean;
  error: string | null;
  micLevel: number;
  onToggleMic: () => void;
  onSendText: (text: string) => void;
  onEndCall: () => void;
  onRaiseHand: () => void;
  onReaction: (emoji: string) => void;
}

/* ---------- Self-view PiP ---------- */
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
      .catch(() => {
        /* Camera unavailable */
      });
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
      className="fixed z-40 rounded-xl overflow-hidden shadow-2xl border border-white/20 cursor-grab active:cursor-grabbing select-none"
      style={{
        width: 200,
        height: 150,
        left: position.x === -1 ? undefined : position.x,
        top: position.y === -1 ? undefined : position.y,
        right: position.x === -1 ? 16 : undefined,
        bottom: position.y === -1 ? 100 : undefined,
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

/* ---------- Call timer ---------- */
function CallTimer({ status }: { status: SessionStatus }) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'connected') {
      if (!startTimeRef.current) startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
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
      ? 'bg-green-500'
      : status === 'connecting'
        ? 'bg-yellow-400 animate-pulse'
        : status === 'error'
          ? 'bg-red-500'
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
      {/* Connection status + timer */}
      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
        <span className={cn('w-2 h-2 rounded-full', dotColor)} />
        <span className="text-xs text-white/70 font-medium">{label}</span>
        {(status === 'connected' || status === 'ended') && (
          <>
            <span className="text-white/30">|</span>
            <span className="text-xs text-white/60 font-mono tabular-nums">
              {formatElapsed(elapsed)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- End-call confirmation modal ---------- */
function EndCallModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 p-6 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">End Demo?</h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-white/60 text-sm mb-6">
          Are you sure you want to end this demo session?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 text-sm font-medium transition-colors"
          >
            Continue Demo
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main VideoCallView ---------- */
export default function VideoCallView({
  status,
  messages,
  isMicMuted,
  error,
  micLevel,
  onToggleMic,
  onSendText,
  onEndCall,
  onRaiseHand,
  onReaction,
}: VideoCallViewProps) {
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [endCallModalOpen, setEndCallModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const lastSeenCountRef = useRef(0);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (chatOpen) {
      // Mark all as read when chat opens
      lastSeenCountRef.current = messages.filter((m) => m.role === 'persona').length;
      setUnreadCount(0);
    } else {
      const personaMessages = messages.filter((m) => m.role === 'persona').length;
      const newCount = personaMessages - lastSeenCountRef.current;
      if (newCount > 0) setUnreadCount(newCount);
    }
  }, [chatOpen, messages]);

  const handleToggleHand = () => {
    setHandRaised((prev) => !prev);
    onRaiseHand();
  };

  const handleEndCall = () => {
    setEndCallModalOpen(true);
  };

  const handleConfirmEnd = () => {
    setEndCallModalOpen(false);
    onEndCall();
  };

  return (
    <div className="fixed inset-0 bg-[#0f0f0f] flex flex-col">
      {/* Main area: avatar video fills center */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Loading state */}
        {status === 'connecting' && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-white/60 text-sm font-medium">
                Connecting to your Brightwave guide...
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && error && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-xl px-4 py-3 backdrop-blur-sm">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Anam avatar video element -- fills the main area */}
        <video
          id="anam-avatar-video"
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Hidden audio element for Anam */}
        <audio id="anam-avatar-audio" autoPlay style={{ display: 'none' }} />

        {/* Participant name label */}
        {status === 'connected' && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm text-white font-medium">
                Max {'\u2022'} Brightwave
              </span>
            </div>
          </div>
        )}

        {/* Hand raised indicator */}
        {handRaised && (
          <div className="absolute top-20 right-4 z-30 flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-2 backdrop-blur-sm animate-bounce">
            <span className="text-xl" role="img" aria-label="raised hand">
              {'\u270B'}
            </span>
            <span className="text-yellow-300 text-sm font-medium">Hand Raised</span>
          </div>
        )}
      </div>

      {/* Call timer -- top left */}
      <CallTimer status={status} />

      {/* Self-view PiP -- bottom right */}
      <SelfViewPip visible={cameraOn} />

      {/* Bottom Toolbar */}
      <BottomToolbar
        isMicMuted={isMicMuted}
        isCameraOn={cameraOn}
        isChatOpen={chatOpen}
        isHandRaised={handRaised}
        isReactionsOpen={reactionsOpen}
        unreadCount={unreadCount}
        onToggleMic={onToggleMic}
        onToggleCamera={() => setCameraOn((prev) => !prev)}
        onToggleChat={() => setChatOpen((prev) => !prev)}
        onToggleHand={handleToggleHand}
        onToggleReactions={() => setReactionsOpen((prev) => !prev)}
        onEndCall={handleEndCall}
      />

      {/* Reactions Overlay */}
      <ReactionsOverlay
        pickerOpen={reactionsOpen}
        onClose={() => setReactionsOpen(false)}
        onReaction={onReaction}
      />

      {/* Chat Side Panel */}
      <ChatSidePanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={messages}
        onSendText={onSendText}
      />

      {/* End Call Confirmation Modal */}
      <EndCallModal
        open={endCallModalOpen}
        onConfirm={handleConfirmEnd}
        onCancel={() => setEndCallModalOpen(false)}
      />
    </div>
  );
}
