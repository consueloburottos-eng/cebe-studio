"use client";

type MarketplaceHeaderProps = {
  onOpenMenu: () => void;
};

export default function MarketplaceHeader({ onOpenMenu }: MarketplaceHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-[5] flex items-center justify-between px-6 py-6 sm:px-8">
      <button
        type="button"
        onClick={onOpenMenu}
        className="flex items-center gap-2 border-none bg-transparent font-sans text-[13px] tracking-[0.04em]"
        style={{ color: "var(--mk-tx)" }}
      >
        ☰ Menu
      </button>
      <span
        className="font-serif text-[15px]"
        style={{ color: "var(--mk-tx)", letterSpacing: ".22em", fontVariant: "small-caps" }}
      >
        Cebe:Studio
      </span>
      <div className="flex gap-4" style={{ color: "var(--mk-tx)" }} aria-hidden="true">
        <span title="Historial">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
            <path d="M12 7v5l3 3" />
          </svg>
        </span>
        <span title="Guardados">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.8 4.5 5.2 4c2-.3 3.7.7 4.8 2.3C11.1 4.7 12.8 3.7 14.8 4c3.4.5 4.8 4 3.2 7.2C15.5 15.9 12 20.5 12 20.5Z" />
          </svg>
        </span>
        <span title="Propuestas">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8h12l-1 12H7L6 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
        </span>
      </div>
    </div>
  );
}
