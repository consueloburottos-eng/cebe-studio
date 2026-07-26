"use client";

import { useEffect, useState } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";
import SkillsRadar from "./SkillsRadar";
import RecommendedProject from "./RecommendedProject";
import AiNativeSkills from "./AiNativeSkills";
import Roadmap from "./Roadmap";
import ConnectCard from "./ConnectCard";

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

const SKILLS_EN = [
  "Figma",
  "Design Systems",
  "UX Research",
  "Prototyping",
  "Conversational UX",
  "Art Direction",
  "Editorial Direction",
  "Storytelling",
];

const DISCIPLINES = [
  "Product Design & UX/UI",
  "Diseño de experiencia agéntica",
  "Dirección de arte & fotografía conceptual",
  "Dirección editorial",
];

const DISCIPLINES_EN = [
  "Product Design & UX/UI",
  "Agentic Experience Design",
  "Art Direction & Conceptual Photography",
  "Editorial Direction",
];

// Tools/software, not capabilities — kept distinct from SKILLS above.
const STACK = ["Figma", "FigJam", "Notion", "Slack", "Maze", "Miro", "Zeplin", "Claude"];

function Widget({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`os-glass flex flex-col rounded-2xl px-[18px] py-4 ${className}`}>
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

export default function DesktopWidgets({
  onBookCall,
  onOpenProject,
}: {
  onBookCall: () => void;
  onOpenProject: (slug: string) => void;
}) {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const skills = lang === "en" ? SKILLS_EN : SKILLS;
  const disciplines = lang === "en" ? DISCIPLINES_EN : DISCIPLINES;
  const [today, setToday] = useState<{ day: string; date: number } | null>(null);

  useEffect(() => {
    const kickoff = setTimeout(() => {
      const now = new Date();
      setToday({ day: now.toLocaleDateString(lang === "en" ? "en-US" : "es-ES", { weekday: "long" }), date: now.getDate() });
    }, 0);
    return () => clearTimeout(kickoff);
  }, [lang]);

  const day = today?.day ?? "";
  const date = today?.date ?? "";

  return (
    <div className="absolute top-12 right-4 bottom-24 left-4 z-20 overflow-y-auto pb-4 sm:right-6 sm:bottom-6 sm:overflow-visible sm:pb-0 sm:left-6">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-3.5">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-col gap-3.5 sm:flex-row sm:gap-4">
            <Widget label={ui.years} className="sm:flex-1">
              <div className="mt-3 text-[32px] leading-none font-bold tracking-[-0.02em]" style={{ color: "var(--os-tx)" }}>
                10+
              </div>
              <div className="mt-1 text-xs" style={{ color: "var(--os-mut)" }}>
                {ui.yearsSub}
              </div>
            </Widget>

            <Widget label={ui.projects} className="sm:flex-1">
              <div className="mt-3 text-[32px] leading-none font-bold tracking-[-0.02em]" style={{ color: "var(--os-tx)" }}>
                30+
              </div>
              <div className="mt-1 text-xs" style={{ color: "var(--os-mut)" }}>
                {ui.projectsSub}
              </div>
            </Widget>

            <button
              type="button"
              onClick={onBookCall}
              className="os-glass flex flex-col rounded-2xl px-[18px] py-4 text-left sm:flex-1"
              style={{ color: "var(--os-tx)", fontFamily: "inherit" }}
            >
              <div className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--os-accent)" }}>
                {day}
              </div>
              <div className="mt-1 text-[32px] leading-none font-bold tracking-[-0.02em]">{date}</div>
              <div className="mt-1.5 text-[12.5px] leading-[1.4]" style={{ color: "rgba(var(--os-txrgb),.8)" }}>
                {ui.bookCall}
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-3.5 sm:flex-row sm:gap-4">
            <Widget label={ui.skills} className="sm:flex-1">
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      background: "rgba(var(--os-sfrgb),.06)",
                      border: "1px solid var(--os-hr)",
                      color: "rgba(var(--os-txrgb),.85)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Widget>

            <Widget label={ui.designStack} className="sm:flex-1">
              <div className="mt-3 flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      background: "rgba(var(--os-sfrgb),.06)",
                      border: "1px solid var(--os-accent)",
                      color: "rgba(var(--os-txrgb),.85)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Widget>
          </div>

          <div className="flex flex-col gap-3.5 sm:flex-row sm:gap-4">
            <Widget label={ui.disciplines} className="sm:flex-1">
              <ul className="mt-2.5 flex list-none flex-col gap-1.5 p-0 text-[13px]" style={{ color: "var(--os-tx)" }}>
                {disciplines.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span style={{ color: "var(--os-accent)" }}>—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </Widget>

            <div className="sm:flex-1">
              <RecommendedProject onOpen={onOpenProject} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-[260px] sm:flex-none">
          <SkillsRadar />
          <AiNativeSkills />
          <Roadmap />
          <ConnectCard onBookCall={onBookCall} />
        </div>
      </div>
    </div>
  );
}
