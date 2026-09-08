"use client";

import Link from "next/link";
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
  const linkClass =
    "cursor-pointer rounded-full border-none bg-transparent px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.05em] text-[var(--cb-text)]";

  return (
    <div
      className="flex items-center gap-1 rounded-full border-2 border-white py-1 pr-3 pl-3 backdrop-blur-xl sm:py-1.5 sm:pr-4 sm:pl-4"
      style={{ background: "var(--cb-glass-pill)" }}
    >
      <Link
        href="/"
        className="font-sans text-[11px] font-extrabold uppercase tracking-[0.04em] text-[var(--cb-text)] no-underline sm:text-sm"
      >
        CEBE:STUDIO
      </Link>
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
    </div>
  );
}
