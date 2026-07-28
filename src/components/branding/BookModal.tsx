"use client";

import { useEffect, useRef, useState } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";

export default function BookModal({ onClose }: { onClose: () => void }) {
  const [lang] = useSiteLanguage();
  const ui = t("about", lang);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // clipboard unavailable — the email is still shown on screen to copy manually
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div
      className="absolute inset-0 z-[120] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] px-10 pt-11 pb-9"
        style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
      >
        <button
          type="button"
          onClick={onClose}
          title={lang === "en" ? "close" : "cerrar"}
          className="absolute top-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ borderColor: "var(--cb-hair)", background: "var(--cb-bg)" }}
        >
          ✕
        </button>

        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--cb-muted)]">
          {ui.tabs.book}
        </span>
        <h2 className="mt-3.5 font-display text-[40px] font-extrabold lowercase leading-[.98] tracking-[-0.03em]">
          {ui.bookHeadline}
        </h2>
        <p className="mt-4 text-[14.5px] leading-[1.6] text-[var(--cb-muted)]">
          {ui.bookBody}
        </p>
        <div className="mt-[26px] flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(ui.mailSubject)}&body=${encodeURIComponent(ui.mailBody)}`}
            className="inline-flex items-center gap-2 rounded-full border-none px-[22px] py-[13px] font-sans text-[13.5px] font-bold no-underline"
            style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
          >
            {ui.sendMessage} <span>→</span>
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border px-[22px] py-[13px] font-sans text-[13.5px] font-semibold"
            style={{ borderColor: "var(--cb-muted)", background: "transparent", color: "inherit" }}
          >
            {copied ? ui.copied : ui.copyEmail} <span>⧉</span>
          </button>
        </div>
      </div>
    </div>
  );
}
