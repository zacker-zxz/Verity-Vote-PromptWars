"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

interface TranslationContextType {
  translate: (text: string) => Promise<string>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const { language } = useAppStore();
  const [cache, setCache] = useState<Record<string, string>>({});

  const translate = async (text: string) => {
    if (language === 'en') return text;
    const key = `${language}:${text}`;
    if (cache[key]) return cache[key];

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: language }),
      });
      const data = await res.json();
      const result = data.translatedText || text;
      setCache(prev => ({ ...prev, [key]: result }));
      return result;
    } catch {
      return text;
    }
  };

  return (
    <TranslationContext.Provider value={{ translate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used within a TranslationProvider");
  return context;
}

export function T({ children }: { children: string }) {
  const { translate } = useTranslation();
  const { language } = useAppStore();
  const [translated, setTranslated] = useState(children);

  useEffect(() => {
    let active = true;
    translate(children).then(res => {
      if (active) setTranslated(res);
    });
    return () => { active = false; };
  }, [children, language, translate]);

  return <>{translated}</>;
}
