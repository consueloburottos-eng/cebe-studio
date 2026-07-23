"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

type NavPillProps = {
  open: boolean;
  onToggle: () => void;
  onOpenAbout: () => void;
  onOpenGrid: () => void;
  onOpenBook: () => void;
};

export default function NavPill({
  open,
  onToggle,
  onOpenAbout,
  onOpenGrid,
  onOpenBook,
}: NavPillProps) {
  const [lang] = useSiteLanguage();
  const nav = t("nav", lang);
  const linkClass =
    "cursor-pointer rounded-full border-none bg-transparent px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.05em] text-[var(--cb-text)]";

  return (
    <div
      className="flex items-center gap-1 rounded-full border-2 border-white py-1 pr-1 pl-3 backdrop-blur-xl sm:py-1.5 sm:pr-1.5 sm:pl-4"
      style={{ background: "var(--cb-glass-pill)" }}
    >
      <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.04em] text-[var(--cb-text)] sm:text-sm">
        CEBE:STUDIO
      </span>
      <button
        type="button"
        onClick={onToggle}
        title="menú"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-none font-display text-xs font-black leading-none sm:h-[30px] sm:w-[30px]"
        style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
      >
        {open ? "×" : "···"}
      </button>
      {open && (
        <div className="flex gap-0.5 pl-1">
          <button type="button" onClick={onOpenAbout} className={linkClass}>
            {nav.about}
          </button>
          <button type="button" onClick={onOpenGrid} className={linkClass}>
            {nav.projects}
          </button>
          <button type="button" onClick={onOpenBook} className={linkClass}>
            {nav.services}
          </button>
        </div>
      )}
    </div>
  );
}
