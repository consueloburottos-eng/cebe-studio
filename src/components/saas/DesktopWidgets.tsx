"use client";

import { useEffect, useState } from "react";

const SKILLS = [
  "Figma",
  "Design Systems",
  "UX Research",
  "Prototipado",
  "Conversational UX",
  "Dirección de arte",
  "Dirección editorial",
  "Storytelling",
];

const DISCIPLINES = [
  "Product Design & UX/UI",
  "Diseño de experiencia agéntica",
  "Dirección de arte & fotografía conceptual",
  "Dirección editorial",
];

function Widget({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl px-[18px] py-4 backdrop-blur-xl"
      style={{ background: "var(--os-sf)", border: "1px solid var(--os-hr)" }}
    >
      <div
        className="text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: "var(--os-mut)" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export default function DesktopWidgets({ onBookCall }: { onBookCall: () => void }) {
  const [today, setToday] = useState<{ day: string; date: number } | null>(null);

  useEffect(() => {
    const kickoff = setTimeout(() => {
      const now = new Date();
      setToday({ day: now.toLocaleDateString("es-ES", { weekday: "long" }), date: now.getDate() });
    }, 0);
    return () => clearTimeout(kickoff);
  }, []);

  const day = today?.day ?? "";
  const date = today?.date ?? "";

  return (
    <div className="absolute top-12 right-4 bottom-24 left-4 z-20 flex max-w-[calc(100%-32px)] flex-col gap-4 overflow-y-auto pb-4 sm:right-auto sm:bottom-auto sm:max-h-[calc(100%-96px)] sm:flex-row sm:items-start sm:overflow-visible sm:pb-0 sm:left-6">
      <div className="flex w-full flex-col gap-4 sm:w-[280px]">
        <div className="flex gap-4">
          <div className="flex-1">
            <Widget label="Años">
              <div
                className="mt-4 text-[38px] leading-none font-bold tracking-[-0.02em]"
                style={{ color: "var(--os-tx)" }}
              >
                10+
              </div>
              <div className="mt-1.5 text-xs" style={{ color: "var(--os-mut)" }}>
                de experiencia
              </div>
            </Widget>
          </div>
          <div className="flex-1">
            <Widget label="Proyectos">
              <div
                className="mt-4 text-[38px] leading-none font-bold tracking-[-0.02em]"
                style={{ color: "var(--os-tx)" }}
              >
                30+
              </div>
              <div className="mt-1.5 text-xs" style={{ color: "var(--os-mut)" }}>
                entregados
              </div>
            </Widget>
          </div>
        </div>

        <Widget label="Skills">
          <div className="mt-3.5 flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full px-3 py-1.5 text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid var(--os-hr)",
                  color: "rgba(245,245,247,.85)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </Widget>

        <Widget label="Disciplinas">
          <ul className="mt-3 flex list-none flex-col gap-2 p-0 text-[13px]" style={{ color: "var(--os-tx)" }}>
            {DISCIPLINES.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span style={{ color: "var(--os-accent)" }}>—</span>
                {d}
              </li>
            ))}
          </ul>
        </Widget>
      </div>

      <button
        type="button"
        onClick={onBookCall}
        className="flex min-h-[190px] w-full flex-col rounded-2xl px-[18px] py-4 text-left backdrop-blur-xl sm:w-[190px]"
        style={{
          background: "var(--os-sf)",
          border: "1px solid var(--os-hr)",
          color: "var(--os-tx)",
          fontFamily: "inherit",
        }}
      >
        <div
          className="text-[11px] font-bold tracking-[0.14em] uppercase"
          style={{ color: "var(--os-accent)" }}
        >
          {day}
        </div>
        <div className="mt-1.5 text-[48px] leading-none font-bold tracking-[-0.03em]">
          {date}
        </div>
        <div className="flex-1" />
        <div className="text-[13px] leading-[1.4]" style={{ color: "rgba(245,245,247,.8)" }}>
          Agenda una llamada de 30 min →
        </div>
      </button>
    </div>
  );
}
