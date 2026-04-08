'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import type { Message } from '@/hooks/useAnamSession';

interface ChatSidePanelProps {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  onSendText: (text: string) => void;
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatSidePanel({ open, onClose, messages, onSendText }: ChatSidePanelProps) {
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendText(text.trim());
      setText('');
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-bw-gray-700 border-l border-white/[0.08] z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
          <h2 className="text-sm font-semibold text-white">In-call messages</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/30 text-sm text-center">
                Messages will appear here...
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.role === 'persona' && (
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <div className="w-5 h-5 rounded-full bg-bw-yellow-550 flex items-center justify-center text-[10px] font-bold text-bw-gray-800">
                    B
                  </div>
                  <span className="text-[11px] text-white/40 font-medium">Brightwave</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : msg.role === 'system'
                      ? 'bg-white/5 text-white/50 italic text-xs rounded-lg'
                      : 'bg-bw-gray-600 text-white rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
              <span className="text-[10px] text-white/30 mt-1 px-1">
                {msg.role === 'user' ? 'You' : msg.role === 'persona' ? 'Brightwave' : 'System'}
                {' \u00B7 '}
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 border-t border-white/[0.08]"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-bw-yellow-550/50 focus:border-bw-yellow-550/50"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 rounded-lg text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
