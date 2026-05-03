"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import { FAQ_DATA } from "@/lib/knowledge-base";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function FAQPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello! I'm your CivicFlow assistant. How can I help you today? Ask me anything about elections, registration, or voting." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setShowFAQ(false);
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply || "Sorry, I couldn't process that. Please try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Connection error. Please check your internet and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 page-enter flex flex-col" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--success)] flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CivicFlow Assistant</h1>
            <p className="text-xs text-muted">Powered by AI</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar glass-card p-4 mb-4">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-[var(--accent)]" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
              }`}>
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-[var(--accent)]" />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-[var(--accent)]" />
              </div>
              <div className="chat-bubble-ai px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Quick questions */}
      {showFAQ && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <ChevronDown size={14} className="text-muted" />
            <span className="text-xs text-muted">Suggested questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {FAQ_DATA.slice(0, 5).map((faq) => (
              <button
                key={faq.question}
                onClick={() => sendMessage(faq.question)}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-[var(--glass-border)] text-xs text-muted hover:text-foreground hover:border-[var(--accent)] transition-all"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="shrink-0 flex gap-2">
        <label htmlFor="faq-chat-input" className="sr-only">Type your question</label>
        <input
          id="faq-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about voting, registration, documents..."
          className="flex-1 bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-[var(--accent)]"
          aria-label="Type your question"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="btn-primary px-4 py-3 disabled:opacity-40"
          aria-label="Send message"
        >
          <span className="relative z-10"><Send size={18} /></span>
        </button>
      </div>
    </div>
  );
}
