'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/hooks/useAnamSession';

interface ChatSidePanelProps {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  onSendText: (text: string) => void;
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Chat side panel — slides in from right.
 * Matches sales-avatar/ChatSidePanel.tsx layout:
 *   fixed right panel, sm:w-[380px], dark bg, persona avatar, messages.
 * Colors adapted: bg-bw-gray-800 body, bw-gray-700 persona messages,
 *   bw-yellow-550 persona avatar + send button.
 */
export default function ChatSidePanel({ open, onClose, messages, onSendText }: ChatSidePanelProps) {
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendText(text.trim());
      setText('');
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {open && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-bw-gray-800 border-l border-white/[0.08] z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Chat</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/30 text-sm text-center">Conversation will appear here...</p>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'persona' && (
                <div className="flex items-center gap-2 mb-1 px-1">
                  <div className="w-5 h-5 rounded-full bg-bw-yellow-550 flex items-center justify-center text-[10px] font-bold text-bw-gray-800">
                    B
                  </div>
                  <span className="text-[11px] text-white/40 font-medium">Brightwave</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-bw-yellow-550/20 text-white rounded-br-sm'
                    : msg.role === 'system'
                      ? 'bg-white/[0.05] text-white/50 italic text-xs'
                      : 'bg-bw-gray-700 text-white rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
              <span className="text-[10px] text-white/30 mt-1 px-1">
                {msg.role === 'user' ? 'You' : msg.role === 'persona' ? 'Brightwave' : 'System'}
                {' \u00B7 '}
                {fmtTime(msg.timestamp)}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={submit} className="flex items-center gap-2 p-4 border-t border-white/[0.08]">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-bw-yellow-550/50 focus:border-bw-yellow-550/50"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="p-2.5 bg-bw-yellow-550 hover:bg-bw-yellow-600 disabled:opacity-30 rounded-lg text-bw-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
