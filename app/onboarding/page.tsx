"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Globe, MapPin, Volume2, User } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { COUNTRIES, AGE_GROUPS, SUPPORTED_LANGUAGES } from "@/lib/knowledge-base";

const STEPS = [
  { id: "country", title: "Where are you located?", subtitle: "We'll customize your election info based on your region.", icon: Globe },
  { id: "voter-type", title: "Is this your first time voting?", subtitle: "We'll adjust the detail level for you.", icon: User },
  { id: "age", title: "What is your age group?", subtitle: "This helps us check your eligibility.", icon: User },
  { id: "registration", title: "Are you registered to vote?", subtitle: "We'll guide you based on your current status.", icon: CheckCircle2 },
  { id: "language", title: "Preferred language?", subtitle: "We'll translate everything for you.", icon: Globe },
  { id: "extras", title: "Any extra help needed?", subtitle: "We can enable voice support and find nearby centers.", icon: Volume2 },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setProfile({ onboardingComplete: true });
      router.push("/dashboard");
    }
  };
  const back = () => { if (step > 0) setStep(step - 1); };

  const canProceed = () => {
    switch (step) {
      case 0: return !!profile.country;
      case 1: return true;
      case 2: return !!profile.ageGroup;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      default: return true;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 page-enter">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--success)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>

        <div className="text-sm text-muted mb-2 font-mono">
          STEP {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-2">{STEPS[step].title}</h2>
            <p className="text-muted text-sm mb-8">{STEPS[step].subtitle}</p>

            {/* Step 0: Country */}
            {step === 0 && (
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto no-scrollbar">
                {COUNTRIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setProfile({ country: c })}
                    className={`px-4 py-3 rounded-lg text-sm text-left transition-all border ${
                      profile.country === c
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                        : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: First-time voter */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                {[{ val: true, label: "Yes, first time!" }, { val: false, label: "No, I have voted before" }].map((opt) => (
                  <button
                    key={String(opt.val)}
                    onClick={() => setProfile({ isFirstTimeVoter: opt.val })}
                    className={`px-6 py-4 rounded-xl text-left transition-all border ${
                      profile.isFirstTimeVoter === opt.val
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                        : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Age group */}
            {step === 2 && (
              <div className="grid grid-cols-3 gap-2">
                {AGE_GROUPS.map((ag) => (
                  <button
                    key={ag}
                    onClick={() => setProfile({ ageGroup: ag })}
                    className={`px-4 py-3 rounded-lg text-sm transition-all border ${
                      profile.ageGroup === ag
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                        : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                    }`}
                  >
                    {ag}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Registration status */}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                {([
                  { val: "registered" as const, label: "Yes, I am registered" },
                  { val: "not-registered" as const, label: "No, I am not registered" },
                  { val: "unsure" as const, label: "I am not sure" },
                ]).map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setProfile({ registrationStatus: opt.val })}
                    className={`px-6 py-4 rounded-xl text-left transition-all border ${
                      profile.registrationStatus === opt.val
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                        : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Language */}
            {step === 4 && (
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setProfile({ preferredLanguage: lang.code })}
                    className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 transition-all border ${
                      profile.preferredLanguage === lang.code
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                        : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                    }`}
                  >
                    <span>{lang.flag}</span> {lang.name}
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Extras */}
            {step === 5 && (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setProfile({ needsVoiceSupport: !profile.needsVoiceSupport })}
                  className={`px-6 py-4 rounded-xl text-left flex items-center gap-3 transition-all border ${
                    profile.needsVoiceSupport
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                  }`}
                >
                  <Volume2 size={20} className={profile.needsVoiceSupport ? "text-[var(--accent)]" : "text-muted"} />
                  <div>
                    <div className="font-medium text-sm">Enable Voice Support</div>
                    <div className="text-xs text-muted">Read steps aloud for easier understanding</div>
                  </div>
                </button>
                <button
                  onClick={() => setProfile({ needsNearbyCenter: !profile.needsNearbyCenter })}
                  className={`px-6 py-4 rounded-xl text-left flex items-center gap-3 transition-all border ${
                    profile.needsNearbyCenter
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--glass-border)] hover:border-[var(--accent)]/50 hover:bg-white/5"
                  }`}
                >
                  <MapPin size={20} className={profile.needsNearbyCenter ? "text-[var(--accent)]" : "text-muted"} />
                  <div>
                    <div className="font-medium text-sm">Find Nearby Centers</div>
                    <div className="text-xs text-muted">Show polling stations near your location</div>
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="btn-ghost px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={next}
            disabled={!canProceed()}
            className="btn-primary px-6 py-2 text-sm flex items-center gap-2 disabled:opacity-40"
          >
            <span className="relative z-10 flex items-center gap-2">
              {step === STEPS.length - 1 ? "Finish Setup" : "Continue"}
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
