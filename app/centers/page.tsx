"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation, Accessibility, Clock, ExternalLink, Search } from "lucide-react";
import { DEMO_CENTERS } from "@/lib/knowledge-base";
import { useState } from "react";

export default function CentersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "accessible">("all");

  const filtered = DEMO_CENTERS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.accessible;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 page-enter">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Nearby Polling Centers</h1>
        <p className="text-muted text-sm mb-8">
          Find your closest voting station. Powered by Google Maps.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address..."
            className="w-full bg-white/5 border border-[var(--glass-border)] rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-muted focus:outline-none focus:border-[var(--accent)]"
            aria-label="Search polling centers"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${filter === "all" ? "bg-[var(--accent)]/10 text-[var(--accent-bright)] border border-[var(--accent)]" : "bg-white/5 border border-[var(--glass-border)] text-muted hover:text-foreground"}`}
          >
            All Centers
          </button>
          <button
            onClick={() => setFilter("accessible")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 transition-all ${filter === "accessible" ? "bg-[var(--accent)]/10 text-[var(--accent-bright)] border border-[var(--accent)]" : "bg-white/5 border border-[var(--glass-border)] text-muted hover:text-foreground"}`}
          >
            <Accessibility size={14} /> Accessible
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card overflow-hidden aspect-square lg:aspect-auto lg:min-h-[500px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-purple-500/5 flex flex-col items-center justify-center p-8 text-center">
            <MapPin size={48} className="text-[var(--accent)] mb-4 opacity-40" />
            <h3 className="font-semibold text-lg mb-2">Google Maps Integration</h3>
            <p className="text-muted text-sm max-w-xs mb-4">
              In production, this area displays an interactive Google Map with your nearby polling centers marked.
            </p>
            <div className="text-xs text-muted bg-white/5 px-4 py-2 rounded-lg">
              Add your <code className="text-[var(--accent)]">GOOGLE_MAPS_API_KEY</code> to enable live maps
            </div>

            {/* Demo pins */}
            {DEMO_CENTERS.map((c, i) => (
              <div
                key={c.id}
                className="absolute w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold shadow-lg"
                style={{
                  top: `${25 + i * 15}%`,
                  left: `${20 + i * 18}%`,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center List */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="glass-card p-8 text-center">
              <p className="text-muted">No centers match your search.</p>
            </div>
          )}
          {filtered.map((center, i) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card glass-card-hover p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-xs font-bold text-[var(--accent)]">
                      {center.id}
                    </div>
                    <h3 className="font-semibold">{center.name}</h3>
                  </div>
                  <p className="text-sm text-muted mb-2">{center.address}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Navigation size={12} /> {center.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {center.hours}
                    </span>
                    {center.accessible && (
                      <span className="flex items-center gap-1 text-[var(--success)]">
                        <Accessibility size={12} /> Accessible
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-3 py-2 text-xs shrink-0 flex items-center gap-1"
                  aria-label={`Get directions to ${center.name}`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <ExternalLink size={12} /> Directions
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
