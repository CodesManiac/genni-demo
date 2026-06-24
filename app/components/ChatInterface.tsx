'use client';
import React, { useState } from 'react'
import { useChat } from '@ai-sdk/react';
import StockChart  from './StockChart';
import ChartSkeleton from './ChartSkeleton';
import { Send, Bot, User } from 'lucide-react';
const ChatInterface = () => {
    const { messages, sendMessage, status } = useChat();
    const [input, setInput] = useState('');
    const isLoading = status === 'submitted' || status === 'streaming';
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto border border-slate-200 rounded-2xl bg-white shadow-xl overflow-hidden">
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
          <Bot className="w-12 h-12 stroke-[1.5]" />
          <p className="font-medium">Ask something like: &ldquo;How is Apple stock looking?&rdquo;</p>
        </div>
      )}

      {messages.map((m) => (
        <div key={m.id} className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`p-2 rounded-xl text-white shrink-0 ${m.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
            {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>

          <div className="max-w-[85%] space-y-2">
            {m.parts?.map((part, i) => {
              if (part.type === 'text') {
                return (
                  <div key={i} className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                    {part.text}
                  </div>
                );
              }
              if (part.type === 'tool-showStockPerformance') {
                if (part.state !== 'output-available') {
                  return <ChartSkeleton key={part.toolCallId} />;
                }
                const result = part.output as { ticker: string; chartData: Array<{ date: string; price: number }> };
                return <StockChart key={part.toolCallId} data={result.chartData} ticker={result.ticker} />;
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>

    <form onSubmit={(e) => { e.preventDefault(); sendMessage({ text: input }); setInput(''); }} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-slate-100 border-0 focus:ring-2 focus:ring-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all"
        placeholder="Ask for stock evaluations..."
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white p-3 rounded-xl transition-all"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  </div>
  )
}

export default ChatInterface
