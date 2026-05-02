"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Globe,
  ArrowRight,
  Vote,
  Clock,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Eligibility Check",
    desc: "Answer a few questions and instantly know if you can vote, what you need, and what to do next.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: MapPin,
    title: "Find Polling Centers",
    desc: "Discover your nearest voting station with Google Maps — distance, hours, accessibility, and directions.",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    icon: Globe,
    title: "Your Language",
    desc: "Switch to your preferred language instantly. Every guide, FAQ, and step is translated for you.",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
  },
];

const STATS = [
  { value: "50+", label: "Countries Covered" },
  { value: "8", label: "Languages" },
  { value: "24/7", label: "AI Assistance" },
  { value: "100%", label: "Free to Use" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Floating orbs */}
        <div
          className="absolute w-72 h-72 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[100px] top-1/4 -left-20"
          aria-hidden="true"
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-[0.05] blur-[120px] bottom-1/4 -right-20"
          aria-hidden="true"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[var(--glass-border)] text-sm text-muted mb-8">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Powered by Google AI &amp; Maps
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Your Election
            <br />
            <span className="gradient-text">Journey Starts Here</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From eligibility to election day — a personalized, step-by-step guide
            that removes confusion and helps you vote with confidence.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding" className="btn-primary px-8 py-4 text-base flex items-center gap-2 group">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/learn" className="btn-ghost px-8 py-4 text-base flex items-center gap-2">
              <BookOpen size={18} />
              Learn How Voting Works
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--success)]" /> Guided</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--success)]" /> Simple</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--success)]" /> Localized</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need,{" "}
              <span className="gradient-text">simplified</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              No more confusion. No more missed deadlines. Just clear, guided steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card glass-card-hover p-8"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5`}>
                  <f.icon size={22} className={f.iconColor} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 border-t border-[var(--glass-border)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell us about you", desc: "Quick onboarding — your country, age, registration status.", icon: Vote },
              { step: "02", title: "Get your plan", desc: "A personalized dashboard with next steps, deadlines, and checklists.", icon: Clock },
              { step: "03", title: "Vote with confidence", desc: "Find your center, prep your docs, and cast your vote.", icon: CheckCircle2 },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/10 flex items-center justify-center mx-auto mb-4 border border-[var(--glass-border)]">
                  <s.icon size={28} className="text-[var(--accent-bright)]" />
                </div>
                <div className="text-xs text-[var(--accent)] font-mono mb-2">STEP {s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-[var(--glass-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-purple-500/5" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to start?
            </h2>
            <p className="text-muted mb-8 max-w-lg mx-auto">
              Join thousands of voters who used VoteGuide AI to navigate their first (or next) election with ease.
            </p>
            <Link href="/onboarding" className="btn-primary px-10 py-4 text-base inline-flex items-center gap-2 group">
              <span className="relative z-10 flex items-center gap-2">
                Begin Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--glass-border)] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center text-white text-xs font-bold">V</div>
            VoteGuide AI
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link>
          </div>
          <p>Built with Google Cloud &amp; Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}
