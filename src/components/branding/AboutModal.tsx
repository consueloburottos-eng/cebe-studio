"use client";

import { useRef, useState } from "react";
import { projects } from "@/data/projects";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";

type Tab = "perfil" | "experiencia" | "skills" | "book";

const TABS: { key: Tab; label: string }[] = [
  { key: "perfil", label: "Perfil" },
  { key: "experiencia", label: "Experiencia" },
  { key: "skills", label: "Skills" },
  { key: "book", label: "Book me" },
];

// Found in the original prototype's CV window — flagged to the user for
// confirmation since names like "Northwind" read like placeholder demo data
// rather than a real employer.
const EXPERIENCE = [
  {
    role: "Lead Product Designer",
    company: "Aria",
    period: "2022–Hoy",
    note: "Sistemas de diseño multimarca; unificó cuatro productos y redujo 60% las inconsistencias de UI.",
  },
  {
    role: "Senior UX Designer",
    company: "Northwind",
    period: "2020–22",
    note: "Analítica B2B; −38% en time-to-insight y 2× adopción interna.",
  },
  {
    role: "Product Designer",
    company: "Pocket",
    period: "2018–20",
    note: "App fintech móvil; 2× usuarios activos y +35% en conversión de onboarding.",
  },
];

const CERTS = [
  "Foundations of UX Design — Google (Coursera)",
  "Generative AI: Introduction and Applications — IBM (Coursera)",
];

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
            <div className="flex items-center gap-5">
              <div
                className="h-[76px] w-[76px] flex-none rounded-full"
                style={{ background: "var(--cb-pill)" }}
              />
              <div>
                <h2 className="m-0 font-display text-[30px] font-extrabold lowercase leading-none tracking-[-0.02em]">
                  consuelo
                </h2>
                <div className="mt-2 text-[13.5px] text-[var(--cb-muted)]">
                  Product Designer · UX/UI
                </div>
              </div>
            </div>

            <p className="mt-[22px] max-w-[52ch] text-[14.5px] leading-[1.65] text-[var(--cb-muted)]">
              Diseño flujos B2B complejos y sistemas de diseño multimarca —
              moviéndome entre research, sistemas y pulido pixel a pixel.
            </p>

            <div className="mt-[26px] grid grid-cols-2 gap-3">
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="font-sans text-[30px] font-bold leading-none">10+</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                  Años de experiencia
                </div>
              </div>
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="font-sans text-[30px] font-bold leading-none">30+</div>
                <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                  Proyectos entregados
                </div>
              </div>
            </div>

            <div className="mt-[26px]">
              <SectionLabel>Certificados</SectionLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {CERTS.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <a
                href="#"
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
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--cb-muted)]">
                    {job.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div className="mt-7">
            <SectionLabel>Skills</SectionLabel>
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
              <SectionLabel>Certificados</SectionLabel>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {CERTS.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {cert}
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
