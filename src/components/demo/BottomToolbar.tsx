'use client';

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Hand,
  SmilePlus,
  PhoneOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomToolbarProps {
  isMicMuted: boolean;
  isCameraOn: boolean;
  isChatOpen: boolean;
  isHandRaised: boolean;
  isReactionsOpen: boolean;
  unreadCount: number;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleChat: () => void;
  onToggleHand: () => void;
  onToggleReactions: () => void;
  onEndCall: () => void;
}

function ToolbarButton({
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
        'relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-150',
        danger
          ? 'bg-red-600 text-white hover:bg-red-500'
          : active
            ? 'bg-white/15 text-white'
            : 'text-white/70 hover:bg-white/10 hover:text-white',
      )}
    >
      {icon}
      <span className="text-[10px] mt-1 leading-none font-medium">{label}</span>
      {badge != null && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}

export default function BottomToolbar({
  isMicMuted,
  isCameraOn,
  isChatOpen,
  isHandRaised,
  isReactionsOpen,
  unreadCount,
  onToggleMic,
  onToggleCamera,
  onToggleChat,
  onToggleHand,
  onToggleReactions,
  onEndCall,
}: BottomToolbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-bw-gray-700/90 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/[0.08] shadow-2xl">
      {/* Mute/Unmute */}
      <ToolbarButton
        danger={isMicMuted}
        active={!isMicMuted}
        onClick={onToggleMic}
        label={isMicMuted ? 'Unmute' : 'Mute'}
        icon={isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      />

      {/* Camera toggle */}
      <ToolbarButton
        danger={!isCameraOn}
        active={isCameraOn}
        onClick={onToggleCamera}
        label={isCameraOn ? 'Stop Video' : 'Start Video'}
        icon={isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      />

      <div className="w-px h-8 bg-white/10 mx-1" />

      {/* Chat */}
      <ToolbarButton
        active={isChatOpen}
        onClick={onToggleChat}
        label="Chat"
        badge={isChatOpen ? 0 : unreadCount}
        icon={<MessageSquare className="w-5 h-5" />}
      />

      {/* Reactions */}
      <ToolbarButton
        active={isReactionsOpen}
        onClick={onToggleReactions}
        label="Reactions"
        icon={<SmilePlus className="w-5 h-5" />}
      />

      {/* Raise Hand */}
      <ToolbarButton
        active={isHandRaised}
        onClick={onToggleHand}
        label="Raise Hand"
        icon={
          <Hand
            className={cn(
              'w-5 h-5 transition-colors',
              isHandRaised ? 'text-yellow-400' : '',
            )}
          />
        }
      />

      <div className="w-px h-8 bg-white/10 mx-1" />

      {/* End Call -- separated and distinct */}
      <button
        onClick={onEndCall}
        className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors duration-150 ml-1"
        title="End call"
      >
        <PhoneOff className="w-5 h-5" />
        <span className="text-[10px] mt-1 leading-none font-medium">End</span>
      </button>
    </div>
  );
}
