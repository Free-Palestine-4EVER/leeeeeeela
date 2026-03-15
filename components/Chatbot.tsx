'use client';

import { useState, useRef, useEffect } from 'react';
import { faqData, FAQ } from '@/lib/faq-data';

interface Message {
  role: 'bot' | 'user';
  text: string;
  options?: string[];
}

const CATEGORIES = [
  { key: 'dostava', label: '📦 Dostava', emoji: '📦' },
  { key: 'perike', label: '💇‍♀️ Perike', emoji: '💇‍♀️' },
  { key: 'repovi', label: '🎀 Repovi', emoji: '🎀' },
  { key: 'ekstenzije', label: '✨ Ekstenzije', emoji: '✨' },
  { key: 'toperi', label: '👑 Toperi', emoji: '👑' },
  { key: 'njega', label: '🧴 Njega', emoji: '🧴' },
  { key: 'narudžba', label: '🛒 Narudžba', emoji: '🛒' },
  { key: 'o-nama', label: '🏪 O nama', emoji: '🏪' },
  { key: 'kvalitet', label: '💎 Kvalitet', emoji: '💎' },
  { key: 'ostalo', label: '❓ Ostalo', emoji: '❓' },
];

function searchFAQ(query: string): FAQ[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = faqData.map((faq) => {
    let score = 0;
    // Keyword match (strongest)
    faq.keywords.forEach((kw) => {
      if (q.includes(kw.toLowerCase())) score += 10;
      if (kw.toLowerCase().includes(q)) score += 5;
    });
    // Question text match
    const qWords = q.split(/\s+/);
    qWords.forEach((word) => {
      if (word.length < 3) return;
      if (faq.q.toLowerCase().includes(word)) score += 3;
      if (faq.a.toLowerCase().includes(word)) score += 1;
    });
    return { faq, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.faq);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Zdravo! 👋 Ja sam Eynna asistent. Kako vam mogu pomoći?\n\nOdaberite kategoriju ili upišite pitanje:',
      role: 'bot',
      options: CATEGORIES.map((c) => c.label),
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleCategoryClick = (label: string) => {
    const cat = CATEGORIES.find((c) => c.label === label);
    if (!cat) return;

    addMessage({ role: 'user', text: label });

    const faqs = faqData.filter((f) => f.category === cat.key);
    const options = faqs.slice(0, 6).map((f) => f.q);

    setTimeout(() => {
      addMessage({
        role: 'bot',
        text: `${cat.emoji} Evo najčešćih pitanja o "${cat.label.split(' ').slice(1).join(' ')}":`,
        options,
      });
    }, 300);
  };

  const handleQuestionClick = (question: string) => {
    addMessage({ role: 'user', text: question });

    const faq = faqData.find((f) => f.q === question);
    if (faq) {
      setTimeout(() => {
        addMessage({
          role: 'bot',
          text: faq.a + '\n\nImate li još pitanja? 😊',
          options: ['⬅️ Nazad na kategorije', '💬 Kontaktiraj nas na WhatsApp'],
        });
      }, 400);
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === '⬅️ Nazad na kategorije') {
      addMessage({ role: 'user', text: option });
      setTimeout(() => {
        addMessage({
          role: 'bot',
          text: 'Odaberite kategoriju:',
          options: CATEGORIES.map((c) => c.label),
        });
      }, 300);
    } else if (option === '💬 Kontaktiraj nas na WhatsApp') {
      window.open('https://wa.me/387671497444', '_blank');
    } else if (CATEGORIES.some((c) => c.label === option)) {
      handleCategoryClick(option);
    } else {
      handleQuestionClick(option);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const query = input.trim();
    setInput('');
    addMessage({ role: 'user', text: query });

    const results = searchFAQ(query);

    setTimeout(() => {
      if (results.length > 0) {
        if (results.length === 1) {
          addMessage({
            role: 'bot',
            text: `**${results[0].q}**\n\n${results[0].a}`,
            options: ['⬅️ Nazad na kategorije', '💬 Kontaktiraj nas na WhatsApp'],
          });
        } else {
          addMessage({
            role: 'bot',
            text: 'Pronašla sam ova pitanja koja bi vam mogla pomoći:',
            options: results.map((r) => r.q),
          });
        }
      } else {
        addMessage({
          role: 'bot',
          text: 'Nisam pronašla odgovor na vaše pitanje. 😔\n\nMožete nas kontaktirati direktno:',
          options: ['💬 Kontaktiraj nas na WhatsApp', '⬅️ Nazad na kategorije'],
        });
      }
    }, 500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          open
            ? 'bg-red-500 hover:bg-red-600 rotate-90'
            : 'bg-gradient-to-br from-[#C9A96E] to-[#A88B4A] hover:scale-110 hover:shadow-[0_0_25px_rgba(201,169,110,0.4)]'
        }`}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-40 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-right ${
          open ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C9A96E] to-[#A88B4A] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
              💇‍♀️
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Eynna Hair Asistent</h3>
              <p className="text-white/70 text-xs">Odgovara odmah • 100+ pitanja</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#C9A96E] text-white rounded-br-sm'
                        : 'bg-[#1a1a1a] text-gray-200 rounded-bl-sm border border-[#2a2a2a]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick Reply Buttons */}
                  {msg.options && msg.role === 'bot' && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.options.map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => handleOptionClick(opt)}
                          className="px-3 py-1.5 text-xs rounded-full border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E]/10 hover:border-[#C9A96E] transition-all duration-200 text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#2a2a2a]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Upišite pitanje..."
                className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-2.5 text-[16px] text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center hover:bg-[#A88B4A] transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
