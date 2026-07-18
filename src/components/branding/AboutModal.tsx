"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";

type Tab = "perfil" | "experiencia" | "skills" | "book";

const TABS: { key: Tab; label: string }[] = [
  { key: "perfil", label: "Perfil" },
  { key: "experiencia", label: "Experiencia" },
  { key: "skills", label: "Skills" },
  { key: "book", label: "Book me" },
];

// From her real CV (2026-06-30-cv-consuelo-burotto.pdf), most recent first
const EXPERIENCE = [
  {
    role: "UX/UI Lead Senior Designer",
    company: "BuildWithin",
    period: "2025–Hoy",
    place: "Remote",
    note: "Diseño UX/UI de una plataforma de desarrollo laboral que conecta aprendizaje, formación y empleo; personas, journey maps y experience blueprints de punta a punta para programas, postulantes y case managers.",
  },
  {
    role: "UX/UI Lead Senior Designer",
    company: "Altafid",
    period: "Jun 2022–Hoy",
    place: "Remote",
    note: "Diseño end-to-end de una plataforma SaaS para asesores financieros e inversionistas. Sistema de diseño propio de la empresa y +20% en retención de clientes al integrar UX con marketing, ventas y customer success.",
  },
  {
    role: "UX/UI Senior Designer",
    company: "Tekpro",
    period: "May 2019–Jun 2022",
    place: "Chile",
    note: "Sitios e-commerce centrados en el usuario sobre plataformas Magento, optimizados para conversión y rendimiento.",
  },
  {
    role: "Graphic Designer",
    company: "Alba Studio",
    period: "Dic 2018–Abr 2019",
    place: "Chile",
    note: "Identidades de marca completas — logos, paletas de color y manuales de marca — para múltiples clientes.",
  },
  {
    role: "UX/UI Designer",
    company: "CETIUC",
    period: "Jun 2018–Sep 2018",
    place: "Chile",
    note: "Rediseño completo del sitio institucional: arquitectura de información, wireframes y UI final.",
  },
];

const EDUCATION = {
  school: "Pontificia Universidad Católica de Chile",
  degree: "Título profesional en Diseño — mención Diseño Estratégico",
  period: "2012–2018",
};

const LANGUAGES = ["Español — Nativo", "Inglés — Avanzado (ETAPP, IGCSE, PET)"];

// derived from every real project's skill tags, not hand-picked — reflects
// what she's actually tagged her case studies with across the site
function topSkills(limit = 8): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const s of p.skills) counts.set(s, (counts.get(s) ?? 0) + 1);
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

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--cb-muted)]">
    {children}
  </span>
);

export default function AboutModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("perfil");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const skills = topSkills();
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
        className="relative w-full max-w-[640px] max-h-[88vh] overflow-auto px-10 pt-11 pb-9"
        style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
      >
        <button
          type="button"
          onClick={onClose}
          title="cerrar"
          className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ borderColor: "var(--cb-hair)" }}
        >
          ✕
        </button>

        <div className="flex flex-wrap gap-1.5">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className="cursor-pointer rounded-full border-none px-4 py-2 font-sans text-[11.5px] font-bold uppercase tracking-[0.06em]"
              style={{
                background: tab === key ? "var(--cb-cta-bg)" : "var(--cb-pill)",
                color: tab === key ? "var(--cb-cta-text)" : "var(--cb-muted)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "perfil" && (
          <div className="mt-7">
            <div
              className="relative aspect-video w-full overflow-hidden rounded-2xl"
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

            <div className="mt-7 flex items-center gap-5">
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

            <p className="mt-[22px] max-w-[52ch] text-[14.5px] leading-[1.65] text-[var(--cb-muted)]">
              UX/UI Lead con 8 años de experiencia diseñando plataformas SaaS
              complejas y sistemas de diseño escalables. He liderado el diseño
              de punta a punta de plataformas de desarrollo laboral y fintech,
              traduciendo research de usuarios en experiencias intuitivas —
              con research, journey mapping y prototipado en Figma que se
              entrega listo para desarrollo.
            </p>

            <div className="mt-[26px] grid grid-cols-2 gap-3">
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="font-sans text-[30px] font-bold leading-none">8+</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                  Años de experiencia
                </div>
              </div>
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="font-sans text-[30px] font-bold leading-none">5</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                  Empresas · roles UX/UI
                </div>
              </div>
            </div>

            <div className="mt-[26px]">
              <SectionLabel>Educación</SectionLabel>
              <div className="mt-2.5 rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="text-[13.5px] font-bold">{EDUCATION.school}</div>
                <div className="mt-1 text-[13px] text-[var(--cb-muted)]">{EDUCATION.degree}</div>
                <div className="mt-1 font-mono text-[11.5px] text-[var(--cb-muted)]">{EDUCATION.period}</div>
              </div>
            </div>

            <div className="mt-7">
              <a
                href="/profile/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full px-[22px] py-[13px] font-sans text-[13.5px] font-bold no-underline"
                style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
              >
                Download CV <span>↓</span>
              </a>
            </div>
          </div>
        )}

        {tab === "experiencia" && (
          <div className="mt-7">
            <SectionLabel>Experiencia</SectionLabel>
            <div className="mt-4 flex flex-col gap-5">
              {EXPERIENCE.map((job) => (
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
              <SectionLabel>Idiomas</SectionLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div className="mt-7">
            <SectionLabel>Skills — por proyecto</SectionLabel>
            <div className="mt-4 flex flex-col gap-3">
              {skills.map(([name, count]) => (
                <div key={name}>
                  <div className="flex items-baseline justify-between gap-3 text-[13px]">
                    <span className="font-semibold">{name}</span>
                    <span className="text-[11.5px] text-[var(--cb-muted)]">
                      {count} proyecto{count > 1 ? "s" : ""}
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
              <SectionLabel>Toolkit completo</SectionLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {TOOLKIT.map((tool) => (
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
            <SectionLabel>Book me</SectionLabel>
            <h2 className="mt-3.5 font-display text-[32px] font-extrabold lowercase leading-[.98] tracking-[-0.03em]">
              let&apos;s build something
            </h2>
            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.6] text-[var(--cb-muted)]">
              Cuéntame sobre tu proyecto de identidad, producto o experiencia.
              Respondo en 24–48 h.
            </p>
            <div className="mt-[26px]">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border-none px-[22px] py-[13px] font-sans text-[13.5px] font-bold"
                style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
              >
                {copied ? "Copiado ✓" : CONTACT_EMAIL} <span>⧉</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
