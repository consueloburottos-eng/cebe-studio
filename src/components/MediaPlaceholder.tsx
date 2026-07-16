type MediaPlaceholderProps = {
  label: string;
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
};

export default function MediaPlaceholder({
  label,
  className = "",
  compact = false,
  tone = "light",
}: MediaPlaceholderProps) {
  const isDark = tone === "dark";
  const bg = isDark ? "rgba(255,255,255,.06)" : "var(--cb-pill)";
  const hairline = isDark ? "rgba(255,255,255,.14)" : "var(--cb-hair)";
  const chipBg = isDark ? "rgba(0,0,0,.35)" : "var(--cb-glass-pill)";
  const chipText = isDark ? "rgba(245,245,247,.6)" : "var(--cb-muted)";

  return (
    <div
      role="img"
      aria-label={`${label} — imagen pendiente de carga`}
      className={`relative flex h-full w-full items-end overflow-hidden ${className}`}
      style={{
        background: bg,
        backgroundImage: `repeating-linear-gradient(135deg, ${hairline} 0px, ${hairline} 1px, transparent 1px, transparent 14px)`,
      }}
    >
      <span
        className={`m-2 max-w-[calc(100%-16px)] truncate rounded-full backdrop-blur px-2.5 py-1 font-sans ${
          compact ? "text-[9px]" : "text-[10.5px]"
        } uppercase tracking-[0.14em]`}
        style={{ background: chipBg, color: chipText }}
      >
        {label}
      </span>
    </div>
  );
}
