"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

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
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const items: { id: SaasWindow | "home"; glyph: string; label: string; fn: () => void }[] = [
    { id: "home", glyph: "⌂", label: ui.dockDesktop, fn: onHome },
    { id: "projects", glyph: "▦", label: ui.dockProjects, fn: onProjects },
    { id: "about", glyph: "✎", label: ui.dockAbout, fn: onAbout },
    { id: "about", glyph: "⤓", label: ui.dockCV, fn: onCV },
    { id: "about", glyph: "✉", label: ui.dockContact, fn: onContacto },
  ];

  return (
    <div className="os-glass absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-end gap-3 rounded-[20px] px-3.5 py-2.5">
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
