"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Vote, ClipboardList, FileText, MapPin, ArrowRight, AlertTriangle, Lightbulb, BookOpen,
} from "lucide-react";
import { LEARNING_CARDS } from "@/lib/knowledge-base";
import { useState } from "react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  vote: Vote, "clipboard-list": ClipboardList, "file-text": FileText, "map-pin": MapPin,
};

export default function LearnPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 page-enter">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Learn How Voting Works</h1>
        <p className="text-muted text-sm mb-10">
          Simple, bite-sized cards that explain everything step by step.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {LEARNING_CARDS.map((card, i) => {
          const Icon = ICONS[card.icon] || BookOpen;
          const isOpen = expanded === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : card.id)}
                className="w-full text-left p-6"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[var(--accent-bright)]" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="text-sm text-muted">{card.whatItMeans}</p>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-6 pb-6 space-y-4"
                >
                  <div className="border-t border-[var(--glass-border)] pt-4">
                    <div className="flex items-start gap-2 mb-3">
                      <Lightbulb size={16} className="text-[var(--warning)] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[var(--warning)] mb-1">WHY IT MATTERS</div>
                        <p className="text-sm text-muted">{card.whyItMatters}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <BookOpen size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[var(--accent)] mb-1">WHAT TO DO</div>
                        <p className="text-sm text-muted">{card.whatToDo}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mb-4">
                      <AlertTriangle size={16} className="text-[var(--error)] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[var(--error)] mb-1">COMMON MISTAKES</div>
                        <p className="text-sm text-muted">{card.commonMistakes}</p>
                      </div>
                    </div>
                    <Link
                      href={card.actionLink}
                      className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {card.actionLabel} <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
