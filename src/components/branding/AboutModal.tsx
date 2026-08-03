"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { EXPERIENCE, EXPERIENCE_EN } from "@/data/experience";
import {
  SNAPSHOT_DIMENSIONS,
  SNAPSHOT_BEST_FIT,
  SNAPSHOT_ALSO_FIT,
  SNAPSHOT_BEST_FIT_REASONS,
  SNAPSHOT_BEST_FIT_REASONS_EN,
} from "@/data/talentSnapshot";
import TalentRadar from "@/components/TalentRadar";
import CalendlyModal from "@/components/CalendlyModal";
import ServiceIllustration from "./ServiceIllustration";
import {
  EDUCATION,
  EDUCATION_EN,
  LANGUAGES,
  LANGUAGES_EN,
  CERTIFICATIONS,
  CERTIFICATIONS_EN,
} from "@/data/profile";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";
const WHATSAPP_URL = "https://wa.me/56984253021";

type Tab = "perfil" | "snapshot" | "experiencia" | "skills" | "servicios" | "book";

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
  const connectUi = t("saas", lang);
  const TABS: { key: Tab; label: string }[] = [
    { key: "perfil", label: ui.tabs.perfil },
    { key: "snapshot", label: ui.tabs.snapshot },
    { key: "experiencia", label: ui.tabs.experiencia },
    { key: "skills", label: ui.tabs.skills },
    { key: "servicios", label: ui.tabs.servicios },
    { key: "book", label: ui.tabs.book },
  ];
  const experience = lang === "en" ? EXPERIENCE_EN : EXPERIENCE;
  const education = lang === "en" ? EDUCATION_EN : EDUCATION;
  const certifications = lang === "en" ? CERTIFICATIONS_EN : CERTIFICATIONS;
  const snapshotBestFitReasons = lang === "en" ? SNAPSHOT_BEST_FIT_REASONS_EN : SNAPSHOT_BEST_FIT_REASONS;
  const languages = lang === "en" ? LANGUAGES_EN : LANGUAGES;
  const toolkit = lang === "en" ? TOOLKIT_EN : TOOLKIT;
  const [tab, setTab] = useState<Tab>("perfil");
  const [calendlyOpen, setCalendlyOpen] = useState(false);
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
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-auto p-3 sm:p-6"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[760px] max-h-[92vh] sm:max-h-[88vh] flex-col sm:flex-row overflow-hidden"
        style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
      >
        <button
          type="button"
          onClick={onClose}
          title={lang === "en" ? "close" : "cerrar"}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ borderColor: "var(--cb-hair)", background: "var(--cb-bg)" }}
        >
          ✕
        </button>

        <div
          className="flex flex-none flex-row gap-1.5 overflow-x-auto border-b p-3 pr-14 sm:w-[150px] sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r sm:p-4 sm:pt-16"
          style={{ borderColor: "var(--cb-hair)" }}
        >
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className="flex-none cursor-pointer whitespace-nowrap rounded-full border-none px-4 py-2.5 text-left font-sans text-[13px] font-bold tracking-[0.01em]"
              style={{
                background: tab === key ? "var(--cb-cta-bg)" : "var(--cb-pill)",
                color: tab === key ? "var(--cb-cta-text)" : "var(--cb-muted)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto px-5 py-6 sm:px-10 sm:pt-11 sm:pb-9">
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
                <h2 className="m-0 font-display text-[30px] font-extrabold leading-none tracking-[-0.02em]">
                  Consuelo Burotto
                </h2>
                <div className="mt-2 text-[13.5px] text-[var(--cb-muted)]">
                  UX/UI Lead Senior Designer
                </div>
                <div className="mt-2.5 flex gap-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={connectUi.connectWhatsapp}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none"
                    style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
                      <path
                        d="M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.8.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.2.4.3.1.2.1.9-.2 1.4-.3.5-1.3 1-2.5.9-1-.1-3-.7-4.7-2.4-1.6-1.5-2.2-3-2.4-3.5-.1-.4-.1-.9.1-1.3Z"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    title={connectUi.connectEmail}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none text-[13px]"
                    style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 6.5l9 6.5 9-6.5" />
                    </svg>
                  </a>
                  <button
                    type="button"
                    onClick={() => setCalendlyOpen(true)}
                    title={ui.scheduleCalendly}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none"
                    style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </button>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={connectUi.connectLinkedin}
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none text-[13px] font-bold"
                    style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
                  >
                    in
                  </a>
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

            <div className="mt-[26px]">
              <SectionLabel>{ui.certifications}</SectionLabel>
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="mt-2.5 rounded-2xl border p-4"
                  style={{ borderColor: "var(--cb-hair)" }}
                >
                  <div className="text-[13.5px] font-bold">{cert.name}</div>
                  <div className="mt-1 text-[13px] text-[var(--cb-muted)]">{cert.issuer}</div>
                  <div className="mt-1 font-mono text-[11.5px] text-[var(--cb-muted)]">{cert.period}</div>
                </div>
              ))}
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

        {tab === "snapshot" && (
          <div>
            <div className="flex items-center justify-between gap-2">
              <SectionLabel>{ui.snapshotTitle}</SectionLabel>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.04em]"
                style={{ background: "var(--cb-pill)", color: "var(--cb-muted)" }}
              >
                {ui.snapshotBadge}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="m-0 text-[19px] font-extrabold leading-snug">
                {ui.snapshotHeadlinePrefix}{" "}
                <span style={{ background: "#ffe066", boxDecorationBreak: "clone" }}>
                  {ui.snapshotHeadlineHighlight}
                </span>
              </h3>
              <p className="mt-2.5 max-w-[52ch] text-[13px] leading-[1.6] text-[var(--cb-muted)]">
                {ui.snapshotSubtext}
              </p>
              <div className="mt-4 flex items-center justify-center">
                <TalentRadar
                  axes={SNAPSHOT_DIMENSIONS.map(
                    ([key]) => ui.snapshotDimensions[key as keyof typeof ui.snapshotDimensions]
                  )}
                  values={SNAPSHOT_DIMENSIONS.map(([, score]) => score)}
                />
              </div>
            </div>

            <div className="mt-2.5 rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
              <div className="text-[13.5px] font-bold">{ui.snapshotTagline}</div>

              <div className="mt-3.5 flex flex-col gap-2 text-[12px]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[var(--cb-muted)]">{ui.snapshotBestFit}:</span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[11.5px] font-bold"
                    style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
                  >
                    {SNAPSHOT_BEST_FIT}
                  </span>
                </div>
                <ul className="m-0 flex list-disc flex-col gap-1 pl-4 text-[11.5px] text-[var(--cb-muted)]">
                  {snapshotBestFitReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[var(--cb-muted)]">{ui.snapshotAlsoFit}:</span>
                  {SNAPSHOT_ALSO_FIT.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border px-2.5 py-1 text-[11.5px]"
                      style={{ borderColor: "var(--cb-hair)" }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--cb-muted)" }}>
                  {ui.snapshotStrongestLabel}
                </span>
                <span className="font-mono text-[10.5px] text-[var(--cb-muted)]">{ui.snapshotScale}</span>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {SNAPSHOT_DIMENSIONS.map(([key, score]) => (
                  <div key={key} className="flex items-center gap-2.5">
                    <span className="w-[140px] flex-none text-[11.5px] text-[var(--cb-muted)]">
                      {ui.snapshotDimensions[key as keyof typeof ui.snapshotDimensions]}
                    </span>
                    <div
                      className="h-1.5 flex-1 overflow-hidden rounded-full"
                      style={{ background: "var(--cb-pill)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(score / 5) * 100}%`, background: "var(--cb-cta-bg)" }}
                      />
                    </div>
                    <span className="w-5 flex-none text-right font-mono text-[11px] text-[var(--cb-muted)]">
                      {score}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2.5 rounded-2xl p-4" style={{ background: "var(--cb-pill)" }}>
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--cb-muted)" }}>
                {ui.snapshotEvidenceLabel}
              </div>
              <div className="mt-1.5 text-[13.5px] font-bold">{ui.snapshotEvidenceDimension}</div>
              <p className="mt-2 text-[13px] leading-[1.6] text-[var(--cb-muted)]">{ui.snapshotEvidenceText}</p>
              <p className="mt-2 text-[13px] leading-[1.6]">
                <span className="font-bold">{ui.snapshotEvidenceSignal.split(":")[0]}:</span>
                <span className="underline decoration-[var(--cb-hair)] underline-offset-2 text-[var(--cb-muted)]">
                  {ui.snapshotEvidenceSignal.split(":").slice(1).join(":")}
                </span>
              </p>
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

        {tab === "servicios" && (
          <div className="mt-7">
            <SectionLabel>{ui.tabs.servicios}</SectionLabel>
            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-6">
              {ui.services.map((s, i) => (
                <div
                  key={s.name}
                  className={`flex flex-col gap-2.5 rounded-2xl border p-4 ${i < 2 ? "sm:col-span-3" : "sm:col-span-2"}`}
                  style={{ borderColor: "var(--cb-hair)" }}
                >
                  <div className="text-[14.5px] font-bold leading-snug">{s.name}</div>
                  <p className="m-0 text-[12.5px] leading-[1.55] text-[var(--cb-muted)]">{s.desc}</p>
                  <div
                    className="mt-1 overflow-hidden rounded-xl"
                    style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
                  >
                    <ServiceIllustration index={i} />
                  </div>
                </div>
              ))}
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

      {calendlyOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <CalendlyModal
            onClose={() => setCalendlyOpen(false)}
            closeLabel={lang === "en" ? "close" : "cerrar"}
          />
        </div>
      )}
    </div>
  );
}
