"use client";
import { motion } from "framer-motion";
import { Globe, Volume2, RotateCcw, Moon, Type } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SUPPORTED_LANGUAGES } from "@/lib/knowledge-base";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { profile, setProfile, language, setLanguage, resetProfile } = useAppStore();
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 page-enter">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted text-sm mb-10">Customize your VoteGuide experience.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={20} className="text-[var(--accent)]" />
            <h2 className="font-semibold">Language</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLanguage(l.code); setProfile({ preferredLanguage: l.code }); }}
                className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                  language === l.code
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                    : "border-[var(--glass-border)] hover:border-[var(--accent)]/50"
                }`}
              >
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Voice Support */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-[var(--accent)]" />
              <div>
                <h2 className="font-semibold">Voice Support</h2>
                <p className="text-xs text-muted">Read steps aloud using text-to-speech</p>
              </div>
            </div>
            <button
              onClick={() => setProfile({ needsVoiceSupport: !profile.needsVoiceSupport })}
              className={`w-12 h-6 rounded-full transition-all relative ${
                profile.needsVoiceSupport ? "bg-[var(--accent)]" : "bg-white/10"
              }`}
              aria-label="Toggle voice support"
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                profile.needsVoiceSupport ? "translate-x-6" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Moon size={20} className="text-[var(--accent)]" />
            <div>
              <h2 className="font-semibold">Theme</h2>
              <p className="text-xs text-muted">Dark mode is always on for optimal readability</p>
            </div>
          </div>
        </motion.div>

        {/* Accessibility */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Type size={20} className="text-[var(--accent)]" />
            <div>
              <h2 className="font-semibold">Accessibility</h2>
              <p className="text-xs text-muted">High contrast, large buttons, keyboard navigation, and ARIA labels are enabled by default.</p>
            </div>
          </div>
        </motion.div>

        {/* Reset */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 border-[var(--error)]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-[var(--error)]" />
              <div>
                <h2 className="font-semibold">Reset All Data</h2>
                <p className="text-xs text-muted">Clear your profile and start fresh</p>
              </div>
            </div>
            <button
              onClick={() => { resetProfile(); router.push("/"); }}
              className="px-4 py-2 rounded-lg text-sm border border-[var(--error)]/30 text-[var(--error)] hover:bg-[var(--error)]/10 transition-all"
            >
              Reset
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
