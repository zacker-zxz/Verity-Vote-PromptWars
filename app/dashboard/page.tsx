"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Circle, Clock, MapPin, AlertTriangle, Sparkles, RotateCcw,
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
    <div className="max-w-5xl mx-auto px-4 py-8 page-enter">
      {/* Header */}
      <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {profile.isFirstTimeVoter ? "Welcome, First-Time Voter!" : "Welcome Back!"}
        </h1>
        <p className="text-muted text-sm">
          {profile.country} · {profile.ageGroup} · {statusText}
        </p>
      </motion.div>

      {/* Top cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {/* Progress */}
        <motion.div initial="hidden" animate="show" custom={1} variants={fadeUp} className="glass-card p-6 flex items-center gap-5">
          <ProgressRing progress={progress} size={72} label="Done" />
          <div>
            <div className="text-2xl font-bold">{completed}/{checklist.length}</div>
            <div className="text-sm text-muted">Steps completed</div>
          </div>
        </motion.div>

        {/* Next Step */}
        <motion.div initial="hidden" animate="show" custom={2} variants={fadeUp} className="glass-card p-6">
          <div className="text-xs text-[var(--accent)] font-mono mb-2">NEXT STEP</div>
          {nextStep ? (
            <>
              <div className="font-semibold mb-1">{nextStep.label}</div>
              <button
                onClick={() => toggleChecklistItem(nextStep.id)}
                className="text-xs text-[var(--accent-bright)] hover:underline flex items-center gap-1 mt-2"
              >
                Mark as done <CheckCircle2 size={12} />
              </button>
            </>
          ) : (
            <div className="text-[var(--success)] font-semibold flex items-center gap-2">
              <CheckCircle2 size={18} /> All steps complete!
            </div>
          )}
        </motion.div>

        {/* Deadlines */}
        <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="glass-card p-6">
          <div className="text-xs text-[var(--warning)] font-mono mb-2 flex items-center gap-1">
            <AlertTriangle size={12} /> DEADLINE REMINDER
          </div>
          <div className="font-semibold text-sm mb-1">Registration Deadline</div>
          <div className="text-muted text-xs">Check your region&apos;s specific date</div>
          <Link href="/timeline" className="text-xs text-[var(--accent-bright)] hover:underline flex items-center gap-1 mt-2">
            View timeline <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial="hidden" animate="show" custom={4} variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { href: "/timeline", label: "Timeline", icon: Clock, color: "text-blue-400" },
          { href: "/centers", label: "Find Centers", icon: MapPin, color: "text-emerald-400" },
          { href: "/learn", label: "Learn", icon: Sparkles, color: "text-purple-400" },
          { href: "/faq", label: "Ask AI", icon: Sparkles, color: "text-amber-400" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="glass-card glass-card-hover p-4 flex flex-col items-center gap-2 text-center">
            <a.icon size={22} className={a.color} />
            <span className="text-sm font-medium">{a.label}</span>
          </Link>
        ))}
      </motion.div>

      {/* Checklist */}
      <motion.div initial="hidden" animate="show" custom={5} variants={fadeUp}>
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
