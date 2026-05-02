"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const PoliticianAvatar = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full bg-white">
    <img 
      src="/vector-cartoon-illustration-indian-politician-260nw-1393573994.jpg" 
      alt="VoteGuide Assistant"
      className="w-full h-full object-cover"
    />
  </div>
);

export function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Namaste! I'm your VoteGuide assistant. Ask me anything about voting in India!" },
  ]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sendMessage = async () => {
    if (!msg.trim()) return;
    const userMsg = msg.trim();
    setMsg("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply || "I'm sorry, I couldn't process that. Please try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group border-4 border-[var(--accent)]"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.1, y: -15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open help chat"
      >
        <div className="absolute -top-14 right-0 bg-[var(--accent)] text-white text-[11px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 whitespace-nowrap pointer-events-none shadow-xl">
          Namaste! Need help?
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[var(--accent)] rotate-45" />
        </div>
        
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <X size={28} className="text-gray-800" />
            </motion.div>
          ) : (
            <motion.div key="avatar" className="w-full h-full" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <PoliticianAvatar />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm glass-card flex flex-col overflow-hidden"
            style={{ height: "420px" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--glass-border)] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
              <span className="font-semibold text-sm">VoteGuide Assistant</span>
              <span className="text-xs text-muted ml-auto">Powered by Gemini</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] px-4 py-2.5 text-sm ${
                    m.role === "user" ? "chat-bubble-user ml-auto" : "chat-bubble-ai"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="chat-bubble-ai max-w-[85%] px-4 py-2.5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[var(--glass-border)]">
              <div className="flex gap-2">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about voting..."
                  className="flex-1 bg-white/5 border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:border-[var(--accent)]"
                  aria-label="Type your question"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !msg.trim()}
                  className="p-2 rounded-lg bg-[var(--accent)] text-white disabled:opacity-40 hover:bg-[var(--accent-bright)] transition-colors"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <Link href="/faq" onClick={() => setOpen(false)} className="text-xs text-muted hover:text-[var(--accent)] mt-2 block text-center">
                Open full FAQ →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
