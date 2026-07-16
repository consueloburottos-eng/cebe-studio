"use client";

import Link from "next/link";

export type SiteMode = "branding" | "saas" | "marketplace";

type ModeSwitcherProps = {
  mode: SiteMode;
  dark?: boolean;
  onSetLight?: () => void;
  onSetDark?: () => void;
  variant?: "light" | "dark";
};

const MODES: { key: SiteMode; label: string; href: string }[] = [
  { key: "branding", label: "Branding", href: "/" },
  { key: "saas", label: "SaaS", href: "/saas" },
  { key: "marketplace", label: "Marketplace", href: "/marketplace" },
];

export default function ModeSwitcher({
  mode,
  dark,
  onSetLight,
  onSetDark,
  variant = "light",
}: ModeSwitcherProps) {
  const isDarkVariant = variant === "dark";
  const stripBg = isDarkVariant ? "rgba(255,255,255,.06)" : "var(--cb-pill, #f1f0ee)";
  const stripHr = isDarkVariant ? "rgba(255,255,255,.1)" : "var(--cb-hair, rgba(17,17,17,.12))";
  const segBg = isDarkVariant ? "rgba(0,0,0,.35)" : "var(--cb-bg, #fff)";
  const mutedColor = isDarkVariant ? "rgba(245,245,247,.5)" : "var(--cb-muted, #8a8a8a)";
  const textColor = isDarkVariant ? "#F5F5F7" : "#111111";

  const segBase =
    "cursor-pointer whitespace-nowrap rounded-full border-none px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.06em] sm:px-3.5 sm:py-1.5 sm:text-[11px] sm:tracking-[0.08em]";

  return (
    <div
      className="relative z-[90] flex flex-none flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-b px-3 py-2 sm:justify-between sm:px-5"
      style={{ background: stripBg, borderColor: stripHr }}
    >
      <span
        className="hidden font-sans text-[10.5px] font-bold uppercase tracking-[0.2em] whitespace-nowrap sm:inline"
        style={{ color: mutedColor }}
      >
        Vista del sitio
      </span>
      <div className="flex gap-0.5 rounded-full p-[3px]" style={{ background: segBg }}>
        {MODES.map((m) => {
          const active = m.key === mode;
          return (
            <Link
              key={m.key}
              href={m.href}
              className={segBase}
              style={{
                background: active ? textColor : "transparent",
                color: active ? (isDarkVariant ? "#141419" : "#fff") : mutedColor,
              }}
            >
              {m.label}
            </Link>
          );
        })}
      </div>
      {onSetLight && onSetDark && (
        <div className="flex gap-0.5 rounded-full p-[3px]" style={{ background: segBg }}>
          <button
            type="button"
            onClick={onSetLight}
            className={segBase}
            style={{
              background: !dark ? textColor : "transparent",
              color: !dark ? (isDarkVariant ? "#141419" : "#fff") : mutedColor,
            }}
          >
            ☀ Light
          </button>
          <button
            type="button"
            onClick={onSetDark}
            className={segBase}
            style={{
              background: dark ? textColor : "transparent",
              color: dark ? (isDarkVariant ? "#141419" : "#fff") : mutedColor,
            }}
          >
            ☾ Dark
          </button>
        </div>
      )}
    </div>
  );
}
