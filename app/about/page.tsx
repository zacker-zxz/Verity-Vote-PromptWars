"use client";
import { motion } from "framer-motion";
import { Cloud, Map, Languages, Brain, Shield, Database } from "lucide-react";

const SERVICES = [
  { icon: Cloud, name: "Google Cloud Run", desc: "Serverless deployment for backend API routes and app hosting.", color: "text-blue-400" },
  { icon: Map, name: "Google Maps Platform", desc: "Geocoding, Places API, and directions for polling center discovery.", color: "text-emerald-400" },
  { icon: Languages, name: "Google Cloud Translation", desc: "Real-time multilingual translation for the entire interface.", color: "text-amber-400" },
  { icon: Brain, name: "Gemini / Google AI", desc: "Conversational guidance, contextual decisions, and FAQ answers.", color: "text-purple-400" },
  { icon: Shield, name: "Google Identity Services", desc: "Optional secure sign-in for saving user progress.", color: "text-pink-400" },
  { icon: Database, name: "Firestore", desc: "Persistent storage for user profiles, checklists, and saved centers.", color: "text-cyan-400" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 page-enter">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">About VoteGuide AI</h1>
        <p className="text-muted text-sm mb-10">
          An AI-powered election assistant that simplifies the voting process for everyone.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 mb-8">
        <h2 className="text-xl font-bold mb-3 gradient-text">Our Mission</h2>
        <p className="text-muted text-sm leading-relaxed">
          Voting is a fundamental right, yet millions of eligible voters skip elections due to confusion, 
          lack of information, or unclear processes. VoteGuide AI bridges this gap by providing personalized, 
          step-by-step guidance in multiple languages — making election participation accessible, simple, and 
          stress-free for everyone, especially first-time voters.
        </p>
      </motion.div>

      {/* Google Services */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold mb-4">Built with Google Services</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass-card p-5"
            >
              <s.icon size={22} className={`${s.color} mb-3`} />
              <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
              <p className="text-xs text-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Sources */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 mb-8">
        <h2 className="text-xl font-bold mb-3">Data &amp; Sources</h2>
        <p className="text-muted text-sm leading-relaxed mb-4">
          This demo uses a structured knowledge base with sample election data. In production, it connects 
          to official election commission APIs and databases. All election-specific information is clearly 
          labeled and sourced.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Election Commissions", "Government Portals", "Google Maps", "Official Voter Databases"].map((src) => (
            <span key={src} className="px-3 py-1 rounded-full bg-white/5 border border-[var(--glass-border)] text-xs text-muted">
              {src}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-8">
        <h2 className="text-xl font-bold mb-3">Privacy &amp; Security</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li>• No personal data is shared with third parties</li>
          <li>• API keys are server-side only — never exposed to clients</li>
          <li>• All inputs are validated and rate-limited</li>
          <li>• Local storage is used for profile persistence — you own your data</li>
          <li>• Open source and transparent by design</li>
        </ul>
      </motion.div>
    </div>
  );
}
