"use client";
import Link from "next/link";
import { T } from "@/components/TranslationProvider";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  Clock,
  MapPin,
  MessageCircle,
  Menu,
  X,
  BookOpen,
  Settings,
  Globe,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SUPPORTED_LANGUAGES } from "@/lib/knowledge-base";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/centers", label: "Centers", icon: MapPin },
  { href: "/faq", label: "FAQ", icon: MessageCircle },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 glass-card border-b border-[var(--glass-border)] px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/5" />
            <span className="font-bold text-lg hidden sm:block opacity-50">VoteGuide AI</span>
          </div>
          <div className="flex gap-4">
            <div className="w-24 h-8 rounded-full bg-white/5" />
            <div className="w-8 h-8 rounded-lg bg-white/5" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 glass-card border-b border-[var(--glass-border)] px-4 md:px-8 overflow-hidden" role="navigation" aria-label="Main navigation">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="VoteGuide AI Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--success)] flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              V
            </div>
            <span className="font-bold text-lg hidden sm:block">
              <span className="gradient-text">VoteGuide</span>{" "}
              <span className="text-muted text-sm font-normal">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                      : "text-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <item.icon size={16} />
                  <T>{item.label}</T>
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-[var(--glass-border)] text-sm hover:border-[var(--accent)] transition-all"
                aria-label="Change language"
              >
                <Globe size={14} />
                <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.name}</span>
                <span className="sm:hidden">{currentLang?.flag}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 glass-card p-2 z-50"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          language === lang.code
                            ? "bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <Link href="/settings" className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Settings">
              <Settings size={18} className="text-muted" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-b border-[var(--glass-border)] overflow-hidden z-40"
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <item.icon size={18} />
                    <T>{item.label}</T>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
