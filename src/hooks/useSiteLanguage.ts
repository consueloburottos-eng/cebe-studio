"use client";

import { useEffect, useState } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "cb-site-lang";

// Shared across Branding/SaaS/Marketplace — each mode is its own route (full
// remount on navigation), so a plain useState resets on every switch.
// Persisting to localStorage makes an EN/ES choice in one mode carry over to
// the others. Defaults to Spanish until a preference is stored.
export function useSiteLanguage() {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {
      // ignore — falls back to the Spanish default
    }
  }, []);

  function setLang(value: Lang) {
    setLangState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore — the toggle still works for this session
    }
  }

  return [lang, setLang] as const;
}
