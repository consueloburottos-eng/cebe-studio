"use client";

import Image from "next/image";

type TopRightProps = {
  audioOn: boolean;
  onToggleAudio: () => void;
  onOpenBook: () => void;
  onOpenAbout: () => void;
};

export default function TopRight({ audioOn, onToggleAudio, onOpenBook, onOpenAbout }: TopRightProps) {
  return (
    <div className="absolute top-4 right-4 z-[130] flex items-center gap-1.5 sm:top-[26px] sm:right-[26px] sm:gap-2.5">
      <button
        type="button"
        onClick={onToggleAudio}
        title="audio"
        aria-pressed={audioOn}
        aria-label={audioOn ? "Silenciar" : "Activar audio"}
        className="flex h-8 w-8 items-center justify-center rounded-full border-none text-sm text-[var(--cb-text)] backdrop-blur-xl sm:h-[38px] sm:w-[38px]"
        style={{ background: "var(--cb-glass-pill)" }}
      >
        {audioOn ? "🔊" : "🔇"}
      </button>
      <button
        type="button"
        onClick={onOpenAbout}
        title="Perfil"
        className="relative h-8 w-8 flex-none overflow-hidden rounded-full border-none backdrop-blur-xl sm:h-[38px] sm:w-[38px]"
        style={{ background: "var(--cb-glass-pill)" }}
      >
        <Image src="/profile/avatar.webp" alt="Perfil" fill sizes="38px" className="object-cover" />
      </button>
      <button
        type="button"
        onClick={onOpenBook}
        className="cb-pillbtn cursor-pointer rounded-full border-none px-3.5 py-2.5 font-sans text-[11px] font-extrabold uppercase tracking-[0.07em] text-black backdrop-blur-xl sm:px-[22px] sm:py-[13px] sm:text-[12.5px]"
        style={{ background: "rgba(241,240,238,.5)" }}
      >
        Book me
      </button>
    </div>
  );
}
