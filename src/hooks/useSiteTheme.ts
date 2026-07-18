"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cb-site-theme-dark";

// Shared across Branding/SaaS/Marketplace — each mode is its own route (full
// remount on navigation), so a plain useState resets on every switch.
// Persisting to localStorage makes a dark/light choice in one mode carry
// over to the others. Defaults to light until a preference is stored.
export function useSiteTheme() {
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    try {
      setDarkState(window.localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // ignore — falls back to the light default
    }
  }, []);

  function setDark(value: boolean) {
    setDarkState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // ignore — the toggle still works for this session
    }
  }

  return [dark, setDark] as const;
}
