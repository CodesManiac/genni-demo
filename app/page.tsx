import ChatInterface from '@/app/components/ChatInterface';

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-br from-slate-900 to-slate-950 p-8 flex flex-col justify-center">
    <div className="w-full max-w-3xl mx-auto mb-4 text-center">
      <h1 className="text-2xl font-black text-white tracking-tight">Genni UI Interface Hub</h1>
      <p className="text-slate-400 text-xs">A live pipeline converting LLM Tool Call Streams into functional React layouts.</p>
    </div>
    <ChatInterface />
  </main>
  );
}
