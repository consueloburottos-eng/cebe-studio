type MediaPlaceholderProps = {
  label: string;
  className?: string;
  compact?: boolean;
};

export default function MediaPlaceholder({
  label,
  className = "",
  compact = false,
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} — imagen pendiente de carga`}
      className={`relative flex h-full w-full items-end overflow-hidden ${className}`}
      style={{
        background: "var(--ph-bg)",
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--ph-hair) 0px, var(--ph-hair) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <span
        className={`m-2 max-w-[calc(100%-16px)] truncate rounded-full backdrop-blur px-2.5 py-1 font-sans ${
          compact ? "text-[9px]" : "text-[10.5px]"
        } uppercase tracking-[0.14em]`}
        style={{ background: "var(--ph-chip-bg)", color: "var(--ph-chip-text)" }}
      >
        {label}
      </span>
    </div>
  );
}
