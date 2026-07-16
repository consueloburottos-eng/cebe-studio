"use client";

export type SaasWindow = "projects" | "about" | null;

type DockProps = {
  active: SaasWindow;
  onHome: () => void;
  onProjects: () => void;
  onAbout: () => void;
  onCV: () => void;
  onContacto: () => void;
};

export default function Dock({ active, onHome, onProjects, onAbout, onCV, onContacto }: DockProps) {
  const items: { id: SaasWindow | "home"; glyph: string; label: string; fn: () => void }[] = [
    { id: "home", glyph: "⌂", label: "Escritorio", fn: onHome },
    { id: "projects", glyph: "▦", label: "Proyectos", fn: onProjects },
    { id: "about", glyph: "✎", label: "About", fn: onAbout },
    { id: "about", glyph: "⤓", label: "CV", fn: onCV },
    { id: "about", glyph: "✉", label: "Contacto", fn: onContacto },
  ];

  return (
    <div
      className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-end gap-3 rounded-[20px] px-3.5 py-2.5 backdrop-blur-2xl"
      style={{
        background: "rgba(var(--os-sfrgb),.06)",
        border: "1px solid rgba(var(--os-sfrgb),.12)",
        boxShadow: "0 20px 50px -20px rgba(0,0,0,.6)",
      }}
    >
      {items.map((d, i) => {
        const isActive = d.id === active;
        return (
          <button
            key={d.label + i}
            type="button"
            onClick={d.fn}
            title={d.label}
            className="os-dockitem relative flex h-[46px] w-[46px] items-center justify-center rounded-[13px] border-none font-sans text-[21px]"
            style={{
              background: isActive ? "#6E7CFF" : "rgba(var(--os-sfrgb),.08)",
              color: isActive ? "#fff" : "var(--os-tx)",
            }}
          >
            {d.glyph}
            {isActive && (
              <span
                className="absolute bottom-[-7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                style={{ background: "var(--os-tx)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
