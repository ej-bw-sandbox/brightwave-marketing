'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

const REACTIONS = [
  { emoji: '\uD83D\uDC4D', label: 'thumbs up' },
  { emoji: '\u2764\uFE0F', label: 'heart' },
  { emoji: '\uD83D\uDE02', label: 'laugh' },
  { emoji: '\uD83D\uDE2E', label: 'wow' },
  { emoji: '\uD83D\uDE22', label: 'sad' },
  { emoji: '\uD83C\uDF89', label: 'party' },
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
      const x = 40 + Math.random() * 20;
      setFloating((prev) => [...prev, { id, emoji, x }]);
      timers.current.push(
        setTimeout(() => {
          setFloating((prev) => prev.filter((r) => r.id !== id));
        }, 2000),
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
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-[#1a1a2e]/95 backdrop-blur-md rounded-full px-3 py-2 border border-white/[0.06] shadow-2xl">
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
            animation: 'floatUp 2s ease-out forwards',
          }}
        >
          {r.emoji}
        </div>
      ))}

      {/* Keyframe animation style */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(1.5);
          }
        }
      `}</style>
    </>
  );
}
