import React, { useRef, useState } from 'react';
import { Bot, Send, X, Wrench } from 'lucide-react';
import { useT } from '../context/I18nContext';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const AvtoAiWidget: React.FC = () => {
  const { lang, t } = useT();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (textToSend?: string) => {
    const content = (textToSend ?? input).trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: content };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 30);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-6),
          lang,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        setMessages([...nextHistory, { role: 'model', text: t.ai.unavailable }]);
      } else {
        setMessages([...nextHistory, { role: 'model', text: data.reply }]);
      }
    } catch {
      setMessages([...nextHistory, { role: 'model', text: t.ai.unavailable }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 30);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 no-print">
      {open && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold truncate">{t.ai.title}</p>
                <p className="text-xs text-slate-400 truncate">{t.ai.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/60">
            <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {t.ai.greeting}
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-1.5">
                {t.ai.quickPrompts.map((qp) => (
                  <button
                    key={qp}
                    type="button"
                    onClick={() => sendMessage(qp)}
                    className="text-left text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-orange-500 transition-colors cursor-pointer"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
                  {t.common.loading}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.ai.placeholder}
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t.ai.send}
              className="p-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.ai.title}
        className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg font-medium text-sm transition-transform active:scale-95 cursor-pointer"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">AVTO AI</span>
      </button>
    </div>
  );
};
