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
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
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
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white',
      )}
    >
      {icon}
      <span className="text-[9px] mt-0.5 leading-none">{label}</span>
    </button>
  );
}

export default function BottomToolbar({
  isMicMuted,
  isCameraOn,
  isChatOpen,
  isHandRaised,
  isReactionsOpen,
  onToggleMic,
  onToggleCamera,
  onToggleChat,
  onToggleHand,
  onToggleReactions,
  onEndCall,
}: BottomToolbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-[#1a1a2e]/90 backdrop-blur-md rounded-2xl px-3 py-2.5 border border-white/[0.06] shadow-2xl">
      {/* Mute/Unmute */}
      <ToolbarButton
        active={!isMicMuted}
        danger={isMicMuted}
        onClick={onToggleMic}
        label={isMicMuted ? 'Unmute' : 'Mute'}
        icon={isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      />

      {/* Camera toggle */}
      <ToolbarButton
        active={isCameraOn}
        danger={!isCameraOn}
        onClick={onToggleCamera}
        label="Camera"
        icon={isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      />

      <div className="w-px h-8 bg-white/10 mx-1" />

      {/* Chat */}
      <ToolbarButton
        active={isChatOpen}
        onClick={onToggleChat}
        label="Chat"
        icon={<MessageSquare className="w-5 h-5" />}
      />

      {/* Raise Hand */}
      <ToolbarButton
        active={isHandRaised}
        onClick={onToggleHand}
        label="Hand"
        icon={<Hand className="w-5 h-5" />}
      />

      {/* Reactions */}
      <ToolbarButton
        active={isReactionsOpen}
        onClick={onToggleReactions}
        label="React"
        icon={<SmilePlus className="w-5 h-5" />}
      />

      <div className="w-px h-8 bg-white/10 mx-1" />

      {/* End Call */}
      <button
        onClick={onEndCall}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium text-sm transition-colors"
        title="End call"
      >
        <PhoneOff className="w-5 h-5" />
        <span className="hidden sm:inline">End</span>
      </button>
    </div>
  );
}
