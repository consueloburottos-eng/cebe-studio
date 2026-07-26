"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { EXPERIENCE, EXPERIENCE_EN } from "@/data/experience";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";

type Tab = "perfil" | "experiencia" | "skills" | "book";

const EDUCATION_EN = {
  school: "Pontificia Universidad Católica de Chile",
  degree: "Professional degree in Design — Strategic Design major",
  period: "2012–2018",
};

const LANGUAGES_EN = ["Spanish — Native", "English — Advanced (ETAPP, IGCSE, PET)"];

const EDUCATION = {
  school: "Pontificia Universidad Católica de Chile",
  degree: "Título profesional en Diseño — mención Diseño Estratégico",
  period: "2012–2018",
};

const LANGUAGES = ["Español — Nativo", "Inglés — Avanzado (ETAPP, IGCSE, PET)"];

// derived from every real project's skill tags, not hand-picked — reflects
// what she's actually tagged her case studies with across the site
function topSkills(lang: "es" | "en", limit = 8): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of projects) {
    const skills = lang === "en" && p.en?.skills ? p.en.skills : p.skills;
    for (const s of skills) counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

// full toolkit from her CV's "Skills & Tools" section — broader than what
// shows up in per-project tags above, so it's listed separately rather than
// faked into the chart with an invented count
const TOOLKIT = [
  "Confluence",
  "SharePoint",
  "Power BI",
  "HTML",
  "Shopify",
  "Magento",
  "Agile / Scrum",
  "Accesibilidad (WCAG)",
  "User Personas",
  "Journey Maps",
  "A/B Testing",
];

const TOOLKIT_EN = [
  "Confluence",
  "SharePoint",
  "Power BI",
  "HTML",
  "Shopify",
  "Magento",
  "Agile / Scrum",
  "Accessibility (WCAG)",
  "User Personas",
  "Journey Maps",
  "A/B Testing",
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--cb-muted)]">
    {children}
  </span>
);

export default function AboutModal({ onClose }: { onClose: () => void }) {
  const [lang] = useSiteLanguage();
  const ui = t("about", lang);
  const TABS: { key: Tab; label: string }[] = [
    { key: "perfil", label: ui.tabs.perfil },
    { key: "experiencia", label: ui.tabs.experiencia },
    { key: "skills", label: ui.tabs.skills },
    { key: "book", label: ui.tabs.book },
  ];
  const experience = lang === "en" ? EXPERIENCE_EN : EXPERIENCE;
  const education = lang === "en" ? EDUCATION_EN : EDUCATION;
  const languages = lang === "en" ? LANGUAGES_EN : LANGUAGES;
  const toolkit = lang === "en" ? TOOLKIT_EN : TOOLKIT;
  const [tab, setTab] = useState<Tab>("perfil");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const skills = topSkills(lang);
  const maxCount = skills[0]?.[1] ?? 1;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // clipboard unavailable — the email is still shown on screen to copy manually
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-auto p-6"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[760px] max-h-[88vh] overflow-hidden"
        style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
      >
        <button
          type="button"
          onClick={onClose}
          title={lang === "en" ? "close" : "cerrar"}
          className="absolute top-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ borderColor: "var(--cb-hair)", background: "var(--cb-bg)" }}
        >
          ✕
        </button>

        <div
          className="flex w-[150px] flex-none flex-col gap-1.5 border-r p-4 pt-16"
          style={{ borderColor: "var(--cb-hair)" }}
        >
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className="cursor-pointer rounded-full border-none px-4 py-2.5 text-left font-sans text-[13px] font-bold tracking-[0.01em]"
              style={{
                background: tab === key ? "var(--cb-cta-bg)" : "var(--cb-pill)",
                color: tab === key ? "var(--cb-cta-text)" : "var(--cb-muted)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto px-10 pt-11 pb-9">
        {tab === "perfil" && (
          <div>
            <div className="flex items-center gap-5">
              <div className="relative h-[76px] w-[76px] flex-none overflow-hidden rounded-full">
                <Image
                  src="/profile/avatar.webp"
                  alt="Consuelo Burotto"
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="m-0 font-display text-[30px] font-extrabold lowercase leading-none tracking-[-0.02em]">
                  consuelo
                </h2>
                <div className="mt-2 text-[13.5px] text-[var(--cb-muted)]">
                  UX/UI Lead Senior Designer
                </div>
              </div>
            </div>

            <div
              className="relative mt-7 aspect-video w-full overflow-hidden rounded-2xl"
              style={{ background: "var(--cb-pill)" }}
            >
              <video
                className="h-full w-full object-cover"
                src="/profile/intro.mp4"
                controls
                playsInline
                preload="metadata"
                aria-label="Video introductorio de Consuelo Burotto"
              />
            </div>

            <p className="mt-[22px] max-w-[52ch] text-[14.5px] leading-[1.65] text-[var(--cb-muted)]">
              {ui.bio}
            </p>

            <div className="mt-[26px] grid grid-cols-2 gap-3">
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="font-sans text-[30px] font-bold leading-none">8+</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                  {ui.yearsExperience}
                </div>
              </div>
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="font-sans text-[30px] font-bold leading-none">5</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                  {ui.companiesRoles}
                </div>
              </div>
            </div>

            <div className="mt-[26px]">
              <SectionLabel>{ui.education}</SectionLabel>
              <div className="mt-2.5 rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="text-[13.5px] font-bold">{education.school}</div>
                <div className="mt-1 text-[13px] text-[var(--cb-muted)]">{education.degree}</div>
                <div className="mt-1 font-mono text-[11.5px] text-[var(--cb-muted)]">{education.period}</div>
              </div>
            </div>

            <div className="mt-7">
              <a
                href="/profile/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full px-[22px] py-[13px] font-sans text-[13.5px] font-bold no-underline"
                style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
              >
                {ui.downloadCV} <span>↓</span>
              </a>
            </div>
          </div>
        )}

        {tab === "experiencia" && (
          <div className="mt-7">
            <SectionLabel>{ui.experience}</SectionLabel>
            <div className="mt-4 flex flex-col gap-5">
              {experience.map((job) => (
                <div
                  key={`${job.role}-${job.company}`}
                  className="border-b pb-5 last:border-b-0"
                  style={{ borderColor: "var(--cb-hair)" }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-[15px] font-bold">
                      {job.role} — {job.company}
                    </span>
                    <span className="font-mono text-[12px] text-[var(--cb-muted)]">
                      {job.period} · {job.place}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--cb-muted)]">
                    {job.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-[26px]">
              <SectionLabel>{ui.languages}</SectionLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div className="mt-7">
            <SectionLabel>{ui.skillsByProject}</SectionLabel>
            <div className="mt-4 flex flex-col gap-3">
              {skills.map(([name, count]) => (
                <div key={name}>
                  <div className="flex items-baseline justify-between gap-3 text-[13px]">
                    <span className="font-semibold">{name}</span>
                    <span className="text-[11.5px] text-[var(--cb-muted)]">
                      {count} {count > 1 ? ui.projectsPlural : ui.project}
                    </span>
                  </div>
                  <div
                    className="mt-1.5 h-[7px] overflow-hidden rounded-full"
                    style={{ background: "var(--cb-pill)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max((count / maxCount) * 100, 8)}%`,
                        background: "var(--cb-cta-bg)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[26px]">
              <SectionLabel>{ui.fullToolkit}</SectionLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {toolkit.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "book" && (
          <div className="mt-7">
            <SectionLabel>{ui.tabs.book}</SectionLabel>
            <h2 className="mt-3.5 font-display text-[32px] font-extrabold lowercase leading-[.98] tracking-[-0.03em]">
              {ui.bookHeadline}
            </h2>
            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.6] text-[var(--cb-muted)]">
              {ui.bookBody}
            </p>
            <div className="mt-[26px] flex flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(ui.mailSubject)}&body=${encodeURIComponent(ui.mailBody)}`}
                className="inline-flex items-center gap-2 rounded-full border-none px-[22px] py-[13px] font-sans text-[13.5px] font-bold no-underline"
                style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
              >
                {ui.sendMessage} <span>→</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border px-[22px] py-[13px] font-sans text-[13.5px] font-semibold"
                style={{ borderColor: "var(--cb-muted)", background: "transparent", color: "inherit" }}
              >
                {copied ? ui.copied : ui.copyEmail} <span>⧉</span>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
