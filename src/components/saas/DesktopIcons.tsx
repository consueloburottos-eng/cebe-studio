"use client";

type DesktopIconsProps = {
  onOpenCV: () => void;
  onOpenProjects: () => void;
};

export default function DesktopIcons({ onOpenCV, onOpenProjects }: DesktopIconsProps) {
  const icons = [
    { glyph: "⤓", label: "CV.pdf", fn: onOpenCV },
    { glyph: "▦", label: "Proyectos", fn: onOpenProjects },
  ];

  return (
    <div className="absolute top-14 right-4 z-20 hidden gap-3.5 sm:flex sm:right-7">
      {icons.map((ic) => (
        <button
          key={ic.label}
          type="button"
          onClick={ic.fn}
          title={ic.label}
          className="flex w-[78px] flex-col items-center gap-2 border-none bg-transparent font-sans"
          style={{ color: "var(--os-tx)" }}
        >
          <span
            className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl text-[25px] transition-colors"
            style={{ background: "rgba(var(--os-sfrgb),.07)", border: "1px solid var(--os-hr)" }}
          >
            {ic.glyph}
          </span>
          <span className="text-xs" style={{ color: "rgba(var(--os-txrgb),.75)" }}>
            {ic.label}
          </span>
        </button>
      ))}
    </div>
  );
}
