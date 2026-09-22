"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

type NavPillProps = {
  onOpenAbout: () => void;
  onOpenGrid: () => void;
  onOpenBook: () => void;
};

export default function NavPill({
  onOpenAbout,
  onOpenGrid,
  onOpenBook,
}: NavPillProps) {
  const [lang] = useSiteLanguage();
  const nav = t("nav", lang);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const linkClass =
    "cursor-pointer rounded-full border-none bg-transparent px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.05em] text-[var(--cb-text)]";

  // About/Projects/Services collapse behind the "..." trigger — click it to
  // reveal them, click outside or pick one to collapse back.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function pick(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div
      ref={rootRef}
      className="flex items-center gap-1 rounded-full border-2 border-white py-1 pr-3 pl-3 backdrop-blur-xl sm:py-1.5 sm:pr-4 sm:pl-4"
      style={{ background: "var(--cb-glass-pill)" }}
    >
      <Link
        href="/"
        className="font-sans text-[11px] font-extrabold uppercase tracking-[0.04em] text-[var(--cb-text)] no-underline sm:text-sm"
      >
        CEBE:STUDIO
      </Link>
      <div className="flex items-center gap-0.5 pl-1">
        {open && (
          <>
            <button type="button" onClick={() => pick(onOpenAbout)} className={linkClass}>
              {nav.about}
            </button>
            <button type="button" onClick={() => pick(onOpenGrid)} className={linkClass}>
              {nav.projects}
            </button>
            <button type="button" onClick={() => pick(onOpenBook)} className={linkClass}>
              {nav.services}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={lang === "en" ? "More" : "Más"}
          className="cursor-pointer rounded-full border-none bg-transparent px-2.5 py-1.5 font-sans text-xs font-bold text-[var(--cb-text)]"
        >
          {open ? "×" : "···"}
        </button>
      </div>
    </div>
  );
}
