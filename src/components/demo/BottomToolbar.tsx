'use client';

import { cn } from '@/lib/utils';

interface BottomToolbarProps {
  isMicMuted: boolean;
  isCameraOn: boolean;
  isChatOpen: boolean;
  isReactionsOpen: boolean;
  unreadCount: number;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleChat: () => void;
  onToggleReactions: () => void;
  onEndCall: () => void;
}

/* ────────────────────────────────────────────────────────────────────────────
 * TBtn — Toolbar icon-tile button
 *   Every icon button renders as a uniform dark square tile:
 *     w-12 h-12 rounded-xl, always has a visible bg
 *   Base: bg-white/[0.08] (subtle tile visible against the toolbar container)
 *   Active: bg-white/15 text-white
 *   Danger: bg-red-600/20 text-red-400
 *   Default: text-white/80
 *   Label: text-[9px] text-white/70 beneath icon
 * ──────────────────────────────────────────────────────────────────────── */
function TBtn({
  icon,
  label,
  active,
  danger,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        'relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all',
        danger
          ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
          : active
            ? 'bg-white/15 text-white'
            : 'bg-white/[0.08] text-white/80 hover:bg-white/15 hover:text-white',
      )}
    >
      {icon}
      <span className="text-[9px] mt-0.5 leading-none">{label}</span>
      {badge != null && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * BottomToolbar — floating pill centered at bottom
 *   fixed bottom-6 left-1/2 -translate-x-1/2 z-30
 *   bg-bw-gray-700/90 backdrop-blur-md rounded-2xl px-3 py-2.5
 *   border border-white/[0.06] shadow-2xl
 *   gap-1.5 between buttons
 *   Dividers: w-px h-8 bg-white/10 mx-1
 *   Buttons: Mute, Camera | Chat, React | End (red pill)
 * ──────────────────────────────────────────────────────────────────────── */
export default function BottomToolbar({
  isMicMuted,
  isCameraOn,
  isChatOpen,
  isReactionsOpen,
  unreadCount,
  onToggleMic,
  onToggleCamera,
  onToggleChat,
  onToggleReactions,
  onEndCall,
}: BottomToolbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-bw-gray-700/90 backdrop-blur-md rounded-2xl px-3 py-2.5 border border-white/[0.06] shadow-2xl">
      {/* Mute */}
      <TBtn
        active={!isMicMuted}
        danger={isMicMuted}
        onClick={onToggleMic}
        label={isMicMuted ? 'Unmute' : 'Mute'}
        icon={
          isMicMuted ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 19L5 5m7-2a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3zM17 11a5 5 0 01-7.586 4.243M3.515 15.243A5 5 0 018 17m4 0v4m-4 0h8" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          )
        }
      />

      {/* Camera */}
      <TBtn
        active={isCameraOn}
        danger={!isCameraOn}
        onClick={onToggleCamera}
        label="Camera"
        icon={
          isCameraOn ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9.75a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V7.5a2.25 2.25 0 012.25-2.25h9M3 3l18 18" />
            </svg>
          )
        }
      />

      <div className="w-px h-8 bg-white/10 mx-1" />

      {/* Chat */}
      <TBtn
        active={isChatOpen}
        onClick={onToggleChat}
        label="Chat"
        badge={isChatOpen ? 0 : unreadCount}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        }
      />

      {/* Reactions */}
      <TBtn
        active={isReactionsOpen}
        onClick={onToggleReactions}
        label="React"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
        }
      />

      <div className="w-px h-8 bg-white/10 mx-1" />

      {/* End Call — separate red pill button */}
      <button
        onClick={onEndCall}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-full font-medium text-sm transition-colors"
        title="End call"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <span className="hidden sm:inline">End</span>
      </button>
    </div>
  );
}
