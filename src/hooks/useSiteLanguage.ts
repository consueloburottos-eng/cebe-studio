"use client";

import { useEffect, useState } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "cb-site-lang";
const EVENT_NAME = "cb-site-lang-change";

// Shared across Branding/SaaS/Marketplace — each mode is its own route (full
// remount on navigation), so a plain useState resets on every switch.
// Persisting to localStorage makes an EN/ES choice in one mode carry over to
// the others. Defaults to Spanish until a preference is stored.
//
// Many components each call this hook independently (not just the one that
// owns the ES/EN toggle), so a plain localStorage write alone wouldn't reach
// them — the native `storage` event only fires in OTHER tabs, not this one.
// A custom window event closes that gap so every instance re-syncs the
// moment any one of them calls setLang, without needing a page reload.
export function useSiteLanguage() {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {
      // ignore — falls back to the Spanish default
    }

    function onChange(e: Event) {
      const value = (e as CustomEvent<Lang>).detail;
      if (value === "en" || value === "es") setLangState(value);
    }
    window.addEventListener(EVENT_NAME, onChange);
    return () => window.removeEventListener(EVENT_NAME, onChange);
  }, []);

  function setLang(value: Lang) {
    setLangState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore — the toggle still works for this session
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
  }

  return [lang, setLang] as const;
}
