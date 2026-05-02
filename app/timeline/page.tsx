"use client";
import { motion } from "framer-motion";
import {
  ShieldCheck, ClipboardList, CheckCircle, FileText, MapPin, Vote, TrendingUp,
} from "lucide-react";
import { ELECTION_TIMELINE } from "@/lib/knowledge-base";
import { useState } from "react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "shield-check": ShieldCheck,
  "clipboard-list": ClipboardList,
  "check-circle": CheckCircle,
  "file-text": FileText,
  "map-pin": MapPin,
  vote: Vote,
  "trending-up": TrendingUp,
};

export default function TimelinePage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 page-enter">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Election Timeline</h1>
        <p className="text-muted text-sm mb-10">
          Follow each step from eligibility to post-vote. Tap any stage for details.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="timeline-line" aria-hidden="true" />

        <div className="space-y-6 pl-12">
          {ELECTION_TIMELINE.map((stage, i) => {
            const Icon = ICONS[stage.icon] || Vote;
            const isExpanded = expanded === stage.id;
            const dotClass =
              stage.status === "complete"
                ? "timeline-dot timeline-dot-complete"
                : stage.status === "active"
                ? "timeline-dot timeline-dot-active"
                : "timeline-dot";

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-[14px]" style={{ marginTop: "6px" }}>
                  <div className={dotClass} />
                </div>

                <button
                  onClick={() => setExpanded(isExpanded ? null : stage.id)}
                  className="w-full text-left glass-card glass-card-hover p-5"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      stage.status === "complete" ? "bg-[var(--success)]/10" :
                      stage.status === "active" ? "bg-[var(--accent)]/10" : "bg-white/5"
                    }`}>
                      <Icon
                        size={20}
                        className={
                          stage.status === "complete" ? "text-[var(--success)]" :
                          stage.status === "active" ? "text-[var(--accent-bright)]" : "text-muted"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{stage.title}</h3>
                        {stage.status === "complete" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)]">Done</span>
                        )}
                        {stage.status === "active" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent-bright)]">Current</span>
                        )}
                      </div>
                      <p className="text-sm text-muted">{stage.description}</p>
                      {stage.deadline && (
                        <p className="text-xs text-[var(--warning)] mt-1">⏰ {stage.deadline}</p>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-[var(--glass-border)]"
                    >
                      <p className="text-sm text-muted leading-relaxed">{stage.details}</p>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
