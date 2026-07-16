"use client";

type GridButtonProps = {
  counter: string;
  onOpen: () => void;
};

export default function GridButton({ counter, onOpen }: GridButtonProps) {
  return (
    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 sm:bottom-[30px] sm:right-[26px] sm:gap-3.5">
      <span className="font-sans text-[10px] tracking-[0.14em] text-[var(--cb-muted)] sm:text-[11px] sm:tracking-[0.18em]">
        {counter}
      </span>
      <button
        type="button"
        onClick={onOpen}
        title="ver todos los proyectos"
        className="flex h-10 w-10 items-center justify-center rounded-full border-none text-base leading-none text-[var(--cb-text)] sm:h-12 sm:w-12 sm:text-lg"
        style={{ background: "var(--cb-pill)" }}
      >
        ⊞
      </button>
    </div>
  );
}
