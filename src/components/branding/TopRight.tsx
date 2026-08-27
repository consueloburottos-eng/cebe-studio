"use client";

import Image from "next/image";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

type TopRightProps = {
  onOpenBook: () => void;
  onOpenAbout: () => void;
};

export default function TopRight({ onOpenBook, onOpenAbout }: TopRightProps) {
  const [lang] = useSiteLanguage();
  const nav = t("nav", lang);
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5">
      <button
        type="button"
        onClick={onOpenAbout}
        title={lang === "en" ? "Profile" : "Perfil"}
        className="relative h-8 w-8 flex-none overflow-hidden rounded-full border-none backdrop-blur-xl sm:h-[38px] sm:w-[38px]"
        style={{ background: "var(--cb-glass-pill)" }}
      >
        <Image src="/profile/avatar.webp" alt={lang === "en" ? "Profile" : "Perfil"} fill sizes="38px" className="object-cover" />
      </button>
      <button
        type="button"
        onClick={onOpenBook}
        className="cb-pillbtn relative cursor-pointer overflow-hidden rounded-full border-none px-3.5 py-2.5 font-sans text-[11px] font-extrabold uppercase tracking-[0.07em] text-black backdrop-blur-xl sm:px-[22px] sm:py-[13px] sm:text-[12.5px]"
        style={{ background: "rgba(241,240,238,.5)" }}
      >
        <span className="cb-pillbtn-fill" aria-hidden="true" />
        <span className="relative z-[1]">{nav.bookMe}</span>
      </button>
    </div>
  );
}
