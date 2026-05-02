"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Vote, ClipboardList, FileText, MapPin, ArrowRight, AlertTriangle, Lightbulb, BookOpen,
  ArrowLeft, ShieldCheck, CheckCircle2, User
} from "lucide-react";
import { LEARNING_CARDS } from "@/lib/knowledge-base";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  vote: Vote, "clipboard-list": ClipboardList, "file-text": FileText, "map-pin": MapPin,
};

const PARTIES = [
  { name: "BJP", full: "Bharatiya Janata Party", ideology: "Right-wing", founded: "1980", color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "INC", full: "Indian National Congress", ideology: "Centrist", founded: "1885", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "AAP", full: "Aam Aadmi Party", ideology: "Populist", founded: "2012", color: "text-sky-400", bg: "bg-sky-400/10" },
  { name: "BSP", full: "Bahujan Samaj Party", ideology: "Social Justice", founded: "1984", color: "text-blue-800", bg: "bg-blue-800/10" },
  { name: "CPI(M)", full: "Communist Party of India (Marxist)", ideology: "Left-wing", founded: "1964", color: "text-red-500", bg: "bg-red-500/10" },
];

const VOTING_STEPS = [
  { title: "Verification", desc: "First polling official checks your name on the voter list and your ID proof.", icon: User },
  { title: "Ink & Signature", desc: "Second official will ink your finger, give you a slip and take your signature.", icon: CheckCircle2 },
  { title: "Slip Collection", desc: "Third official will take the slip and check the ink on your finger.", icon: ClipboardList },
  { title: "The Vote", desc: "You go to the voting compartment and press the button on the EVM for your candidate.", icon: Vote },
  { title: "VVPAT Slip", desc: "Check the VVPAT glass for 7 seconds to see a slip with your choice.", icon: FileText },
];

export default function LearnPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mockVoteOpen, setMockVoteOpen] = useState(false);
  const [voteStep, setVoteStep] = useState(0);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col page-enter overflow-hidden pb-20">
      <div className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Your Vote</h1>
            <p className="text-muted text-lg max-w-2xl">
              Understand the Indian democratic landscape and the step-by-step voting process.
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMockVoteOpen(true)}
            className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(255,153,51,0.3)] border-none"
          >
            <Vote size={24} />
            <div className="text-left">
              <div className="text-xs font-bold opacity-80 uppercase tracking-widest">Special Feature</div>
              <div className="text-lg font-bold">Start Mock Vote</div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Continuous Flow Section */}
      <div className="relative flex-1 flex flex-col justify-center py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="absolute inset-0 aura opacity-10" />
        
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 px-6"
          >
            {[...LEARNING_CARDS, ...LEARNING_CARDS].map((card, i) => {
              const Icon = ICONS[card.icon] || BookOpen;
              const isSelected = expanded === `${card.id}-${i}`;

              return (
                <motion.div
                  key={`${card.id}-${i}`}
                  className={`flex-shrink-0 w-80 md:w-96 glass-card transition-all duration-500 cursor-pointer overflow-hidden ${
                    isSelected ? "ring-2 ring-[var(--accent)] scale-[1.02] shadow-[0_0_40px_rgba(255,153,51,0.15)]" : "hover:border-[var(--accent)]/50"
                  }`}
                  onClick={() => setExpanded(isSelected ? null : `${card.id}-${i}`)}
                  whileHover={{ y: -8 }}
                >
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--success)] flex items-center justify-center text-white shadow-lg">
                        <Icon size={24} />
                      </div>
                      <div className="text-xs font-mono text-muted uppercase tracking-widest">Phase 0{ (i % LEARNING_CARDS.length) + 1 }</div>
                    </div>

                    <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">{card.whatItMeans}</p>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 overflow-hidden border-t border-[var(--glass-border)] pt-6"
                        >
                          <div className="flex gap-3">
                            <Lightbulb size={18} className="text-[var(--warning)] shrink-0" />
                            <p className="text-xs text-muted leading-relaxed">
                              <span className="font-bold text-[var(--warning)] block mb-1 uppercase tracking-tighter">Crucial Context</span>
                              {card.whyItMatters}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <ArrowRight size={18} className="text-[var(--success)] shrink-0" />
                            <p className="text-xs text-muted leading-relaxed">
                              <span className="font-bold text-[var(--success)] block mb-1 uppercase tracking-tighter">Your Action</span>
                              {card.whatToDo}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isSelected && (
                      <div className="mt-auto pt-6 flex items-center justify-between text-xs font-bold text-[var(--accent)] uppercase tracking-widest">
                        <span>Read Detailed Guide</span>
                        <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Political Parties Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Democratic Landscape</h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            India&apos;s multi-party democracy spans the full political spectrum. Explore the major national parties.
          </p>
        </motion.div>

        {/* Parliament Hemicycle */}
        <div className="relative w-full max-w-2xl mx-auto aspect-[2/1] mb-16">
          {/* Orbit rings */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%] border border-dashed border-white/[0.06] rounded-t-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[70%] border border-dashed border-white/[0.04] rounded-t-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[50%] border border-dashed border-white/[0.03] rounded-t-full" />

          {/* Center hub */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--accent)]/30 flex items-center justify-center z-20 shadow-[0_0_40px_rgba(255,153,51,0.15)]"
          >
            <div className="text-center">
              <div className="text-[8px] font-bold text-muted uppercase tracking-wider">India</div>
              <div className="text-sm font-black text-[var(--accent)]">ECI</div>
            </div>
          </motion.div>

          {/* Party nodes on the hemicycle */}
          {PARTIES.map((p, i) => {
            // Spread parties along a semicircle from left (π) to right (0)
            const angle = Math.PI - (i / (PARTIES.length - 1)) * Math.PI;
            const radius = 85; // percentage of half-width
            const cx = 50 + radius * Math.cos(angle) * 0.48;
            const cy = 100 - radius * Math.sin(angle) * 0.92;

            return (
              <motion.div
                key={p.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 200 }}
                className="absolute group z-10"
                style={{ left: `${cx}%`, top: `${cy}%`, transform: "translate(-50%, -50%)" }}
              >
                {/* Connecting line to center */}
                <svg className="absolute pointer-events-none" style={{ width: "200px", height: "200px", left: "-100px", top: "-100px", overflow: "visible" }}>
                  <line x1="100" y1="100" x2="100" y2="200" className="stroke-white/[0.04]" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* Party bubble */}
                <motion.div
                  whileHover={{ scale: 1.25, y: -8 }}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full ${p.bg} border-2 border-white/10 flex flex-col items-center justify-center shadow-xl cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
                >
                  <span className={`text-sm md:text-base font-black ${p.color}`}>{p.name}</span>
                  <span className="text-[8px] md:text-[9px] text-muted font-medium mt-0.5">{p.founded}</span>
                </motion.div>

                {/* Expanded tooltip on hover */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 whitespace-nowrap">
                  <div className="bg-[var(--surface-elevated)] border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-center">
                    <div className="font-bold text-sm">{p.full}</div>
                    <div className="text-[10px] text-muted font-mono">{p.ideology} · Est. {p.founded}</div>
                  </div>
                  <div className="w-2 h-2 bg-[var(--surface-elevated)] border-r border-b border-white/10 rotate-45 mx-auto -mt-1" />
                </div>
              </motion.div>
            );
          })}

          {/* Spectrum labels */}
          <div className="absolute bottom-0 left-2 text-[10px] text-red-400 font-bold uppercase tracking-widest opacity-60">Left</div>
          <div className="absolute bottom-0 right-2 text-[10px] text-orange-400 font-bold uppercase tracking-widest opacity-60">Right</div>
        </div>

        {/* Party detail cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {PARTIES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 border-none bg-white/[0.02] hover:bg-white/[0.05] transition-all group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full ${p.bg} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`} />
              <div className="relative z-10 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${p.bg} ${p.color} flex items-center justify-center font-bold text-lg shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm mb-1">{p.full}</div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={`${p.color} font-bold`}>{p.ideology}</span>
                    <span className="text-muted">·</span>
                    <span className="text-muted">Est. {p.founded}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mock Vote Modal */}
      <AnimatePresence>
        {mockVoteOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <div className="max-w-4xl w-full h-full max-h-[700px] glass-card flex flex-col md:flex-row overflow-hidden border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              {/* Left Side: Visuals */}
              <div className="flex-1 bg-gradient-to-br from-[var(--surface-elevated)] to-black p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 aura opacity-20" />
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={voteStep}
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: -20 }}
                    className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center"
                  >
                    {(() => { const StepIcon = VOTING_STEPS[voteStep].icon; return (
                    <div className="w-32 h-32 rounded-3xl bg-[var(--accent)]/10 flex items-center justify-center mb-8 border border-[var(--accent)]/20">
                      <StepIcon size={64} className="text-[var(--accent)]" />
                    </div>); })()}
                    <h2 className="text-3xl font-bold mb-4">{VOTING_STEPS[voteStep].title}</h2>
                    <p className="text-muted text-lg max-w-sm leading-relaxed">
                      {VOTING_STEPS[voteStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Progress Indicators */}
                <div className="absolute bottom-8 flex gap-3">
                  {VOTING_STEPS.map((_, i) => (
                    <div key={i} className={`w-8 h-1.5 rounded-full transition-all duration-500 ${i === voteStep ? "bg-[var(--accent)] w-16" : i < voteStep ? "bg-[var(--success)]" : "bg-white/10"}`} />
                  ))}
                </div>
              </div>

              {/* Right Side: Interaction */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-white/[0.01]">
                <div>
                  <button onClick={() => setMockVoteOpen(false)} className="text-muted hover:text-white flex items-center gap-2 text-sm mb-12">
                    <ArrowLeft size={16} /> Exit Simulation
                  </button>
                  <div className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2">Step {voteStep + 1} of 5</div>
                  <h3 className="text-2xl font-bold mb-6">Interactive Simulation</h3>
                  
                  {/* Step Specific UI */}
                  <div className="space-y-6">
                    {voteStep === 0 && (
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 animate-pulse">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"><ShieldCheck className="text-blue-400" /></div>
                        <div className="text-sm font-medium">Place your Voter ID on the table...</div>
                      </div>
                    )}
                    {voteStep === 1 && (
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="w-24 h-40 bg-[#ffe0bd] rounded-t-3xl border border-amber-900/10 shadow-2xl" />
                          <motion.div 
                            animate={{ y: [0, 40, 0] }} transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-20 bg-purple-900 rounded-full"
                          >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-900 rounded-full blur-sm" />
                          </motion.div>
                        </div>
                      </div>
                    )}
                    {voteStep === 3 && (
                      <div className="grid grid-cols-1 gap-3">
                        <button className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-[var(--accent)] transition-all">
                          <span className="font-bold">Candidate A</span>
                          <div className="w-4 h-4 rounded-full border-2 border-[var(--accent)]" />
                        </button>
                        <button className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-[var(--accent)] transition-all">
                          <span className="font-bold">Candidate B</span>
                          <div className="w-4 h-4 rounded-full border-2 border-[var(--accent)]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  {voteStep > 0 && (
                    <button onClick={() => setVoteStep(voteStep - 1)} className="btn-ghost flex-1 py-4">Back</button>
                  )}
                  <button 
                    onClick={() => {
                      if (voteStep < VOTING_STEPS.length - 1) setVoteStep(voteStep + 1);
                      else setMockVoteOpen(false);
                    }}
                    className="btn-primary flex-[2] py-4 rounded-xl text-lg font-bold"
                  >
                    {voteStep === VOTING_STEPS.length - 1 ? "Complete Simulation" : "Next Step"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
