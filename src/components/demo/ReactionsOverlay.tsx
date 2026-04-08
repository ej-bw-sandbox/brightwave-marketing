'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

const REACTIONS = [
  { emoji: '\uD83D\uDC4D', label: 'thumbs up' },
  { emoji: '\uD83C\uDF89', label: 'party' },
  { emoji: '\u2764\uFE0F', label: 'heart' },
  { emoji: '\uD83D\uDC4F', label: 'clap' },
  { emoji: '\uD83D\uDE02', label: 'laugh' },
];

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

let ctr = 0;

interface ReactionsOverlayProps {
  pickerOpen: boolean;
  onClose: () => void;
  onReaction?: (emoji: string) => void;
}

/**
 * Reactions overlay — emoji picker above toolbar + floating animations.
 * Matches sales-avatar/ReactionsOverlay.tsx:
 *   5 emojis, picker at fixed bottom-24, rounded-full pill,
 *   float-up animation for sent reactions.
 * Colors: bg-bw-gray-700/95 backdrop-blur-md.
 */
export default function ReactionsOverlay({ pickerOpen, onClose, onReaction }: ReactionsOverlayProps) {
  const [floating, setFloating] = useState<FloatingReaction[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const send = useCallback(
    (emoji: string) => {
      const id = ++ctr;
      const x = 40 + Math.random() * 20;
      setFloating((p) => [...p, { id, emoji, x }]);
      timers.current.push(
        setTimeout(() => setFloating((p) => p.filter((r) => r.id !== id)), 2000),
      );
      onReaction?.(emoji);
      onClose();
    },
    [onClose, onReaction],
  );

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {/* Emoji Picker */}
      {pickerOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-bw-gray-700/95 backdrop-blur-md rounded-full px-3 py-2 border border-white/[0.06] shadow-2xl">
          {REACTIONS.map((r) => (
            <button
              key={r.label}
              onClick={() => send(r.emoji)}
              title={r.label}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-xl"
            >
              {r.emoji}
            </button>
          ))}
        </div>
      )}

      {/* Floating Reactions */}
      {floating.map((r) => (
        <div
          key={r.id}
          className="fixed z-50 pointer-events-none text-4xl"
          style={{
            left: `${r.x}%`,
            bottom: '100px',
            animation: 'reactionFloatUp 2s ease-out forwards',
          }}
        >
          {r.emoji}
        </div>
      ))}

      {/* Keyframe animation */}
      <style jsx global>{`
        @keyframes reactionFloatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-120px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-250px) scale(0.8);
          }
        }
      `}</style>
    </>
  );
}
