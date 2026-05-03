"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Navigation, Accessibility, Clock, ExternalLink, Search,
  Plus, Minus, X, Route, Star, ChevronRight,
} from "lucide-react";
import { DEMO_CENTERS } from "@/lib/knowledge-base";
import { useState, useEffect, useCallback } from "react";
import { calculateDistance } from "@/lib/utils";

type CenterType = (typeof DEMO_CENTERS)[number];

export default function CentersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "accessible">("all");
  const [locating, setLocating] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [selectedCenter, setSelectedCenter] = useState<CenterType | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filtered = DEMO_CENTERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.accessible;
    return matchSearch && matchFilter;
  });

  const handleLocateMe = useCallback(() => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setSearch(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
          setZoom(14);
          setLocating(false);
        },
        () => {
          alert("Could not get your location. Please check browser permissions.");
          setLocating(false);
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
    }
  }, []);

  // Auto-fetch user location silently on mount for distance calculation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          // Silently fail — user can still click Locate Me manually
        },
      );
    }
  }, []);

  /** Generate a Google Static Maps URL with all markers */
  const buildMapUrl = () => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key) return null;

    // Use Embed API with place search when no center is selected
    if (!selectedCenter) {
      const q = search
        ? encodeURIComponent(search)
        : "polling+centers+in+india";
      return `https://www.google.com/maps/embed/v1/search?key=${key}&q=${q}&zoom=${zoom}`;
    }

    // When a center is selected, show its exact location
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${selectedCenter.lat},${selectedCenter.lng}&zoom=15`;
  };

  const mapUrl = buildMapUrl();

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 page-enter flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 shrink-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Polling Stations</h1>
          <p className="text-muted text-sm">
            Discover verified voting centers across India.{" "}
            <span className="text-[var(--accent)]">{DEMO_CENTERS.length} centers indexed.</span>
          </p>
        </motion.div>

        <div className="relative sm:w-96">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="center-search-input" className="sr-only">Search polling centers</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, area or address..."
            className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl pl-12 pr-4 py-3.5 text-sm placeholder:text-muted focus:outline-none focus:border-[var(--accent)] transition-all"
            id="center-search-input"
            aria-label="Search polling centers"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* ── Map ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-[2] glass-card overflow-hidden relative border border-[var(--glass-border)] shadow-2xl min-h-[350px] lg:min-h-full rounded-2xl"
        >
          {mapUrl ? (
            <iframe
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)",
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
              title="Polling station map"
            />
          ) : (
            /* Fallback interactive demo map when no API key */
            <div className="absolute inset-0 bg-[#080a12] flex flex-col items-center justify-center">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(var(--accent) 0.5px, transparent 0.5px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Animated Pin Grid */}
              <div className="relative w-full h-full">
                {DEMO_CENTERS.map((c, i) => {
                  // Approximate India bounds mapping for demo
                  const latRange = { min: 8, max: 35 };
                  const lngRange = { min: 68, max: 97 };
                  const top = ((latRange.max - c.lat) / (latRange.max - latRange.min)) * 80 + 10;
                  const left = ((c.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 80 + 10;

                  return (
                    <motion.button
                      key={c.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 200 }}
                      onClick={() => setSelectedCenter(c)}
                      className={`absolute group cursor-pointer z-10 ${
                        selectedCenter?.id === c.id ? "z-30" : ""
                      }`}
                      style={{ top: `${top}%`, left: `${left}%` }}
                      whileHover={{ scale: 1.3 }}
                      aria-label={`Select ${c.name}`}
                    >
                      {/* Pin */}
                      <div
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all ${
                          selectedCenter?.id === c.id
                            ? "bg-[var(--accent)] scale-125 ring-4 ring-[var(--accent)]/30"
                            : "bg-red-600 hover:bg-[var(--accent)]"
                        }`}
                      >
                        <MapPin size={16} className="text-white" />
                        {/* Ping animation */}
                        <div className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-30" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        {c.name.split(" ").slice(0, 3).join(" ")}
                      </div>
                    </motion.button>
                  );
                })}

                {/* User Location Pin */}
                {userLocation && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute z-20"
                    style={{
                      top: `${((35 - userLocation.lat) / 27) * 80 + 10}%`,
                      left: `${((userLocation.lng - 68) / 29) * 80 + 10}%`,
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500 border-3 border-white shadow-lg">
                      <div className="absolute w-full h-full rounded-full bg-blue-500 animate-ping opacity-50" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ── Floating Map Controls ───────────── */}
          <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
            <button
              onClick={handleLocateMe}
              disabled={locating}
              className="p-4 rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
              title="Go to my location"
              aria-label="Locate me on map"
            >
              <Navigation
                size={20}
                className={locating ? "animate-spin" : "fill-current"}
              />
            </button>
            <div className="flex flex-col rounded-full bg-white text-black shadow-2xl overflow-hidden">
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 1, 21))}
                className="p-3 hover:bg-gray-100 border-b border-gray-100"
                aria-label="Zoom in"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={() => setZoom((prev) => Math.max(prev - 1, 1))}
                className="p-3 hover:bg-gray-100"
                aria-label="Zoom out"
              >
                <Minus size={18} />
              </button>
            </div>
          </div>

          {/* Map Overlay Stats */}
          <div className="absolute bottom-6 left-6 p-5 glass-card bg-black/60 border-none backdrop-blur-xl hidden sm:block border-l-4 border-l-[var(--accent)] z-20">
            <div className="text-xs text-[var(--accent)] mb-1 font-mono uppercase tracking-widest">
              Active Search
            </div>
            <div className="font-bold text-xl">{search || "All India"}</div>
            <div className="text-[var(--success)] text-xs font-bold mt-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
              {filtered.length} Centers Verified
            </div>
          </div>
        </motion.div>

        {/* ── Detail Sidebar (appears on pin click) ─── */}
        <AnimatePresence>
          {selectedCenter && (
            <motion.div
              key="detail-panel"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute lg:relative right-0 top-0 h-full w-full max-w-md z-40 glass-card border-none bg-[var(--surface-elevated)] shadow-2xl overflow-y-auto no-scrollbar flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedCenter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="p-8 pb-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--success)] flex items-center justify-center mb-6 shadow-xl">
                  <MapPin size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedCenter.name}</h2>
                <p className="text-muted text-sm leading-relaxed mb-6">{selectedCenter.address}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <Clock size={16} className="text-[var(--warning)] mb-2" />
                    <div className="text-xs text-muted font-mono uppercase">Hours</div>
                    <div className="font-bold text-sm mt-1">{selectedCenter.hours}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <Route size={16} className="text-blue-400 mb-2" />
                    <div className="text-xs text-muted font-mono uppercase">Distance</div>
                    <div className="font-bold text-sm mt-1">
                      {userLocation
                        ? `${calculateDistance(userLocation.lat, userLocation.lng, selectedCenter.lat, selectedCenter.lng)} km`
                        : selectedCenter.distance}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <Accessibility size={16} className={selectedCenter.accessible ? "text-[var(--success)]" : "text-muted"} />
                    <div className="text-xs text-muted font-mono uppercase">PWD Access</div>
                    <div className={`font-bold text-sm mt-1 ${selectedCenter.accessible ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                      {selectedCenter.accessible ? "Available" : "Limited"}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <Star size={16} className="text-[var(--accent)] mb-2" />
                    <div className="text-xs text-muted font-mono uppercase">Status</div>
                    <div className="font-bold text-sm mt-1 text-[var(--success)]">Active</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 pt-0 mt-auto space-y-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCenter.lat},${selectedCenter.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-bold"
                >
                  <Navigation size={20} />
                  Get Directions
                </a>
                <a
                  href={`https://www.google.com/maps/@${selectedCenter.lat},${selectedCenter.lng},18z`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <ExternalLink size={16} /> Open in Google Maps
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Center List ────────────────────────── */}
        <div
          className={`flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar lg:max-w-md transition-all ${
            selectedCenter ? "hidden lg:flex" : ""
          }`}
        >
          <div className="flex items-center justify-between sticky top-0 bg-[var(--background)]/90 backdrop-blur-md py-3 z-20">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[var(--success)] rounded-full" />
              <h2 className="font-bold text-lg">List View</h2>
            </div>
            <button
              onClick={() =>
                setFilter(filter === "all" ? "accessible" : "all")
              }
              className={`text-xs px-4 py-2 rounded-full border transition-all ${
                filter === "accessible"
                  ? "bg-[var(--success)] border-[var(--success)] text-white"
                  : "border-[var(--glass-border)] text-muted hover:text-foreground"
              }`}
              id="filter-accessible-btn"
            >
              {filter === "accessible" ? "Accessible Only" : "Show All"}
            </button>
          </div>

          <div className="space-y-3 pb-8">
            {filtered.length === 0 && (
              <div className="glass-card p-12 text-center opacity-50 border-dashed">
                <Search size={32} className="mx-auto mb-4 text-muted" />
                <p className="text-sm">No stations found in this area.</p>
              </div>
            )}

            {filtered.map((center, i) => (
              <motion.button
                key={center.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedCenter(center)}
                className={`w-full text-left glass-card p-5 group hover:bg-white/[0.05] transition-all relative overflow-hidden ${
                  selectedCenter?.id === center.id
                    ? "ring-2 ring-[var(--accent)] bg-[var(--accent)]/5"
                    : ""
                }`}
                id={`center-card-${center.id}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)] opacity-[0.02] -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:opacity-[0.05] transition-opacity" />

                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--surface-elevated)] to-transparent border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[var(--accent)]/30 transition-colors">
                    <MapPin
                      size={20}
                      className="text-[var(--accent)] group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base truncate mb-1 group-hover:text-[var(--accent-bright)] transition-colors">
                      {center.name}
                    </h3>
                    <p className="text-xs text-muted truncate mb-3">
                      {center.address}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-muted font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Navigation size={10} />{" "}
                        {userLocation
                          ? `${calculateDistance(userLocation.lat, userLocation.lng, center.lat, center.lng)} km`
                          : center.distance}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={10} className="text-[var(--warning)]" />{" "}
                        {center.hours}
                      </span>
                      {center.accessible && (
                        <span className="text-[var(--success)] flex items-center gap-1.5">
                          <Accessibility size={10} /> PWD
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-4"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
