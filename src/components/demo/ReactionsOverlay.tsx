'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

const REACTIONS = [
  { emoji: '\uD83D\uDC4D', label: 'thumbs up' },
  { emoji: '\u2764\uFE0F', label: 'heart' },
  { emoji: '\uD83D\uDE02', label: 'laugh' },
  { emoji: '\uD83D\uDE2E', label: 'wow' },
  { emoji: '\uD83D\uDE22', label: 'sad' },
  { emoji: '\uD83C\uDF89', label: 'party' },
  { emoji: '\uD83D\uDC4F', label: 'clap' },
];

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

let reactionCounter = 0;

interface ReactionsOverlayProps {
  pickerOpen: boolean;
  onClose: () => void;
  onReaction?: (emoji: string) => void;
}

export default function ReactionsOverlay({ pickerOpen, onClose, onReaction }: ReactionsOverlayProps) {
  const [floating, setFloating] = useState<FloatingReaction[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const send = useCallback(
    (emoji: string) => {
      const id = ++reactionCounter;
      const x = 30 + Math.random() * 40;
      setFloating((prev) => [...prev, { id, emoji, x }]);
      timers.current.push(
        setTimeout(() => {
          setFloating((prev) => prev.filter((r) => r.id !== id));
        }, 2200),
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
      {/* Emoji Picker -- positioned above the toolbar */}
      {pickerOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-bw-gray-700/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/[0.08] shadow-2xl">
          {REACTIONS.map((r) => (
            <button
              key={r.label}
              onClick={() => send(r.emoji)}
              title={r.label}
              className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-150 text-2xl"
            >
              {r.emoji}
            </button>
          ))}
        </div>
      )}

      {/* Floating Reactions -- float up from bottom and fade out */}
      {floating.map((r) => (
        <div
          key={r.id}
          className="fixed z-50 pointer-events-none text-5xl"
          style={{
            left: `${r.x}%`,
            bottom: '120px',
            animation: 'reactionFloatUp 2.2s ease-out forwards',
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
          60% {
            opacity: 1;
            transform: translateY(-120px) scale(1.3);
          }
          100% {
            opacity: 0;
            transform: translateY(-240px) scale(1.5);
          }
        }
      `}</style>
    </>
  );
}
