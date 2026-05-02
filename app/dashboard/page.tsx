"use client";
import React, { useState, useEffect } from "react";
import { T } from "@/components/TranslationProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Circle, Clock, MapPin, AlertTriangle, Sparkles, RotateCcw,
  Globe, User, ShieldCheck, MessageCircle, BookOpen
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function DashboardPage() {
  const { profile, checklist, toggleChecklistItem, resetProfile } = useAppStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-10 h-10 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile.onboardingComplete) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 page-enter">
        <div className="glass-card p-10 text-center max-w-md">
          <Sparkles size={40} className="text-[var(--accent)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-muted text-sm mb-6">Complete onboarding first to get your personalized dashboard.</p>
          <Link href="/onboarding" className="btn-primary px-6 py-3 inline-flex items-center gap-2">
            <span className="relative z-10 flex items-center gap-2">Start Onboarding <ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    );
  }

  const completed = checklist.filter((c) => c.completed).length;
  const progress = Math.round((completed / checklist.length) * 100);
  const nextStep = checklist.find((c) => !c.completed);

  const categories = [
    { key: "eligibility", label: "Eligibility", color: "text-emerald-400" },
    { key: "registration", label: "Registration", color: "text-blue-400" },
    { key: "documents", label: "Documents", color: "text-amber-400" },
    { key: "preparation", label: "Preparation", color: "text-purple-400" },
    { key: "election-day", label: "Election Day", color: "text-pink-400" },
  ];

  const statusText = profile.registrationStatus === "registered"
    ? "Registered ✓"
    : profile.registrationStatus === "not-registered"
    ? "Not Registered"
    : "Status Unknown";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 page-enter space-y-8">
      {/* Hero Header */}
      <motion.div 
        initial="hidden" animate="show" custom={0} variants={fadeUp}
        className="glass-card p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border-none bg-gradient-to-br from-[var(--surface-elevated)] to-transparent"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-[0.03] blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent-bright)] text-xs font-bold mb-4 border border-[var(--accent)]/20">
            <Sparkles size={12} /> Personalized for you
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <T>{profile.isFirstTimeVoter ? "Welcome, First-Time Voter!" : "Welcome Back!"}</T>
          </h1>
          <p className="text-muted text-sm flex items-center justify-center md:justify-start gap-3">
            <span className="flex items-center gap-1"><Globe size={14} /> {profile.country}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1"><User size={14} /> {profile.ageGroup}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1 text-[var(--accent-bright)]">{statusText}</span>
          </p>
        </div>

        <div className="flex items-center gap-8 relative z-10">
          <div className="text-center">
            <ProgressRing progress={progress} size={100} label="Complete" />
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <div>
            <div className="text-4xl font-bold">{progress}%</div>
            <div className="text-xs text-muted font-mono uppercase tracking-wider">Overall Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Actions & Next Step */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Next Step */}
            <motion.div initial="hidden" animate="show" custom={1} variants={fadeUp} className="glass-card p-6 border-l-4 border-l-[var(--accent)]">
              <div className="text-xs text-[var(--accent)] font-mono mb-3 uppercase tracking-widest">Next Action Item</div>
              {nextStep ? (
                <>
                  <div className="font-bold text-lg mb-4">{nextStep.label}</div>
                  <button
                    onClick={() => toggleChecklistItem(nextStep.id)}
                    className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Mark as Complete <CheckCircle2 size={16} />
                    </span>
                  </button>
                </>
              ) : (
                <div className="text-[var(--success)] font-bold flex flex-col items-center gap-3 py-4">
                  <CheckCircle2 size={40} className="animate-bounce" />
                  You are all set!
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial="hidden" animate="show" custom={2} variants={fadeUp} className="glass-card p-6 flex flex-col justify-between">
              <div className="text-xs text-muted font-mono mb-4 uppercase tracking-widest">Voter Checklist</div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold">{completed}/{checklist.length}</span>
                  <span className="text-xs text-muted">Steps Done</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions Bar */}
          <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { href: "/timeline", label: "Timeline", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
              { href: "/centers", label: "Find Centers", icon: MapPin, color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { href: "/learn", label: "Learn", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-400/10" },
              { href: "/faq", label: "Ask AI", icon: MessageCircle, color: "text-amber-400", bg: "bg-amber-400/10" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="glass-card glass-card-hover p-4 flex flex-col items-center gap-3 text-center border-none">
                <div className={`p-3 rounded-xl ${a.bg} ${a.color}`}>
                  <a.icon size={20} />
                </div>
                <span className="text-sm font-semibold">{a.label}</span>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Deadlines & Info */}
        <div className="space-y-6">
          <motion.div initial="hidden" animate="show" custom={4} variants={fadeUp} className="glass-card p-6 bg-gradient-to-br from-[var(--error)]/5 to-transparent border-none">
            <div className="text-xs text-[var(--error)] font-mono mb-4 flex items-center gap-2 uppercase tracking-widest">
              <AlertTriangle size={14} /> Urgent Notice
            </div>
            <div className="font-bold text-lg mb-2">Registration Deadline</div>
            <p className="text-muted text-sm mb-4 leading-relaxed">
              Voter registration for your area typically closes 2-4 weeks before election day. Don&apos;t wait!
            </p>
            <Link href="/timeline" className="btn-ghost w-full py-2.5 text-xs flex items-center justify-center gap-2">
              Explore Timeline <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="show" custom={5} variants={fadeUp} className="glass-card p-6 border-none">
            <div className="text-xs text-[var(--accent-bright)] font-mono mb-4 uppercase tracking-widest">Resource Box</div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
                <ShieldCheck size={18} className="text-blue-400" />
                <span className="text-xs font-medium">Official ID Requirements</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
                <Globe size={18} className="text-emerald-400" />
                <span className="text-xs font-medium">Verify Status Online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Width Checklist */}
      <motion.div initial="hidden" animate="show" custom={6} variants={fadeUp}>
        <h2 className="text-xl font-bold mb-4">Your Checklist</h2>
        <div className="space-y-4">
          {categories.map((cat) => {
            const items = checklist.filter((c) => c.category === cat.key);
            return (
              <div key={cat.key} className="glass-card p-5">
                <h3 className={`text-sm font-semibold mb-3 ${cat.color}`}>{cat.label}</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                    >
                      {item.completed ? (
                        <CheckCircle2 size={18} className="text-[var(--success)] shrink-0" />
                      ) : (
                        <Circle size={18} className="text-muted shrink-0" />
                      )}
                      <span className={`text-sm ${item.completed ? "line-through text-muted" : ""}`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Reset */}
      <motion.div initial="hidden" animate="show" custom={6} variants={fadeUp} className="mt-8 text-center">
        <button
          onClick={() => { resetProfile(); router.push("/"); }}
          className="text-xs text-muted hover:text-[var(--error)] transition-colors flex items-center gap-1 mx-auto"
        >
          <RotateCcw size={12} /> Reset profile and start over
        </button>
      </motion.div>
    </div>
  );
}
