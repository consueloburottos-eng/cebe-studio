"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EXPERIENCE, EXPERIENCE_EN } from "@/data/experience";
import {
  EDUCATION,
  EDUCATION_EN,
  CERTIFICATIONS,
  CERTIFICATIONS_EN,
} from "@/data/profile";
import {
  SNAPSHOT_DIMENSIONS,
  SNAPSHOT_BEST_FIT,
  SNAPSHOT_ALSO_FIT,
  SNAPSHOT_BEST_FIT_REASONS,
  SNAPSHOT_BEST_FIT_REASONS_EN,
} from "@/data/talentSnapshot";
import TalentRadar from "@/components/TalentRadar";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";

export type NoteId = "about" | "talent" | "experiencia" | "servicios" | "contacto";

type NotesWindowProps = {
  note: NoteId;
  onNoteChange: (note: NoteId) => void;
  onClose: () => void;
  onOpenBook: () => void;
};

export default function NotesWindow({
  note,
  onNoteChange,
  onClose,
  onOpenBook,
}: NotesWindowProps) {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const snapshotUi = t("about", lang);
  const experience = lang === "en" ? EXPERIENCE_EN : EXPERIENCE;
  const education = lang === "en" ? EDUCATION_EN : EDUCATION;
  const certifications = lang === "en" ? CERTIFICATIONS_EN : CERTIFICATIONS;
  const snapshotBestFitReasons = lang === "en" ? SNAPSHOT_BEST_FIT_REASONS_EN : SNAPSHOT_BEST_FIT_REASONS;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
  const NOTES: { id: NoteId; label: string }[] = [
    { id: "about", label: ui.notesTabs.about },
    { id: "talent", label: ui.notesTabs.talent },
    { id: "experiencia", label: ui.notesTabs.experiencia },
    { id: "servicios", label: ui.notesTabs.servicios },
    { id: "contacto", label: ui.notesTabs.contacto },
  ];
  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
      style={{ background: "rgba(6,6,10,.5)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="os-win flex h-[min(600px,84vh)] w-[min(820px,92vw)] flex-col overflow-hidden rounded-[14px]"
        style={{
          background: "var(--os-win)",
          border: "1px solid var(--os-hr)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,.75)",
        }}
      >
        <div
          className="flex flex-none items-center gap-3.5 px-4 py-3"
          style={{ background: "rgba(var(--os-barrgb),.92)", borderBottom: "1px solid var(--os-hr)" }}
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              title={ui.close}
              className="h-3 w-3 rounded-full border-none p-0"
              style={{ background: "#ED6A5E" }}
            />
            <span className="h-3 w-3 rounded-full" style={{ background: "#F4BF4F" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#61C554" }} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: "rgba(var(--os-txrgb),.85)" }}>
            {NOTES.find((n) => n.id === note)?.label} — CEBE:STUDIO
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          <div
            className="w-[150px] flex-none overflow-y-auto px-2.5 py-3.5 sm:w-[190px]"
            style={{ borderRight: "1px solid var(--os-hr)", background: "rgba(var(--os-sfrgb),.02)" }}
          >
            {NOTES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => onNoteChange(n.id)}
                className="mb-0.5 w-full rounded-lg border-none px-2.5 py-2 text-left font-sans text-[13px]"
                style={{
                  background: note === n.id ? "rgba(110,124,255,.16)" : "transparent",
                  color: note === n.id ? "var(--os-tx)" : "rgba(var(--os-txrgb),.6)",
                  fontWeight: note === n.id ? 600 : 400,
                }}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-y-auto px-6 py-5" style={{ color: "var(--os-tx)" }}>
            {note === "about" && (
              <div>
                <div className="flex items-center gap-4">
                  <div className="relative h-[64px] w-[64px] flex-none overflow-hidden rounded-full">
                    <Image src="/profile/avatar.webp" alt="Consuelo Burotto" fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">consuelo</div>
                    <div className="text-[13px]" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                      UX/UI Lead Senior Designer
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl" style={{ background: "rgba(var(--os-sfrgb),.06)" }}>
                  <video
                    className="h-full w-full object-cover"
                    src="/profile/intro.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="Video introductorio de Consuelo Burotto"
                  />
                </div>

                <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.65]" style={{ color: "rgba(var(--os-txrgb),.75)" }}>
                  {snapshotUi.bio}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-3.5" style={{ border: "1px solid var(--os-hr)" }}>
                    <div className="font-mono text-[26px] font-bold leading-none">8+</div>
                    <div className="mt-1 text-[11px] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                      {snapshotUi.yearsExperience}
                    </div>
                  </div>
                  <div className="rounded-xl p-3.5" style={{ border: "1px solid var(--os-hr)" }}>
                    <div className="font-mono text-[26px] font-bold leading-none">5</div>
                    <div className="mt-1 text-[11px] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                      {snapshotUi.companiesRoles}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] font-semibold uppercase" style={{ color: "rgba(var(--os-txrgb),.4)" }}>
                    {snapshotUi.education}
                  </span>
                  <div className="mt-2 rounded-xl p-3.5" style={{ border: "1px solid var(--os-hr)" }}>
                    <div className="text-[13.5px] font-bold">{education.school}</div>
                    <div className="mt-1 text-[13px]" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                      {education.degree}
                    </div>
                    <div className="mt-1 font-mono text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                      {education.period}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] font-semibold uppercase" style={{ color: "rgba(var(--os-txrgb),.4)" }}>
                    {snapshotUi.certifications}
                  </span>
                  <div className="mt-2 flex flex-col gap-2">
                    {certifications.map((cert) => (
                      <div key={cert.name} className="rounded-xl p-3.5" style={{ border: "1px solid var(--os-hr)" }}>
                        <div className="text-[13.5px] font-bold">{cert.name}</div>
                        <div className="mt-1 text-[13px]" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                          {cert.issuer}
                        </div>
                        <div className="mt-1 font-mono text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                          {cert.period}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="/profile/cv.pdf"
                  download
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold no-underline"
                  style={{ background: "var(--os-tx)", color: "var(--os-win)" }}
                >
                  {ui.downloadCV} <span>↓</span>
                </a>
              </div>
            )}

            {note === "talent" && (
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                    {snapshotUi.snapshotTitle}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.04em]"
                    style={{ background: "rgba(var(--os-sfrgb),.06)", color: "rgba(var(--os-txrgb),.55)" }}
                  >
                    {snapshotUi.snapshotBadge}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="m-0 text-[19px] font-extrabold leading-snug">
                    {snapshotUi.snapshotHeadlinePrefix}{" "}
                    <span style={{ background: "#ffe066", color: "#141419", boxDecorationBreak: "clone" }}>
                      {snapshotUi.snapshotHeadlineHighlight}
                    </span>
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] text-[13px] leading-[1.6]" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                    {snapshotUi.snapshotSubtext}
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <TalentRadar
                      axes={SNAPSHOT_DIMENSIONS.map(
                        ([key]) => snapshotUi.snapshotDimensions[key as keyof typeof snapshotUi.snapshotDimensions]
                      )}
                      values={SNAPSHOT_DIMENSIONS.map(([, score]) => score)}
                      hairColor="var(--os-hr)"
                      bgColor="var(--os-win)"
                      labelColor="rgba(var(--os-txrgb),.55)"
                    />
                  </div>
                </div>

                <div className="mt-2.5 rounded-xl p-4" style={{ border: "1px solid var(--os-hr)" }}>
                  <div className="text-[13.5px] font-bold">{snapshotUi.snapshotTagline}</div>

                  <div className="mt-3.5 flex flex-col gap-2 text-[12px]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span style={{ color: "rgba(var(--os-txrgb),.55)" }}>{snapshotUi.snapshotBestFit}:</span>
                      <span
                        className="rounded-full px-2.5 py-1 text-[11.5px] font-bold"
                        style={{ background: "var(--os-tx)", color: "var(--os-win)" }}
                      >
                        {SNAPSHOT_BEST_FIT}
                      </span>
                    </div>
                    <ul className="m-0 flex list-disc flex-col gap-1 pl-4 text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.55)" }}>
                      {snapshotBestFitReasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span style={{ color: "rgba(var(--os-txrgb),.55)" }}>{snapshotUi.snapshotAlsoFit}:</span>
                      {SNAPSHOT_ALSO_FIT.map((role) => (
                        <span
                          key={role}
                          className="rounded-full px-2.5 py-1 text-[11.5px]"
                          style={{ border: "1px solid var(--os-hr)" }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                      {snapshotUi.snapshotStrongestLabel}
                    </span>
                    <span className="font-mono text-[10.5px]" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                      {snapshotUi.snapshotScale}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    {SNAPSHOT_DIMENSIONS.map(([key, score]) => (
                      <div key={key} className="flex items-center gap-2.5">
                        <span className="w-[140px] flex-none text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.55)" }}>
                          {snapshotUi.snapshotDimensions[key as keyof typeof snapshotUi.snapshotDimensions]}
                        </span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "rgba(var(--os-sfrgb),.08)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(score / 5) * 100}%`, background: "var(--os-tx)" }}
                          />
                        </div>
                        <span className="w-5 flex-none text-right font-mono text-[11px]" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                          {score}/5
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2.5 rounded-xl p-4" style={{ background: "rgba(var(--os-sfrgb),.04)" }}>
                  <div className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                    {snapshotUi.snapshotEvidenceLabel}
                  </div>
                  <div className="mt-1.5 text-[13.5px] font-bold">{snapshotUi.snapshotEvidenceDimension}</div>
                  <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                    {snapshotUi.snapshotEvidenceText}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6]">
                    <span className="font-bold">{snapshotUi.snapshotEvidenceSignal.split(":")[0]}:</span>
                    <span className="underline decoration-[var(--os-hr)] underline-offset-2" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                      {snapshotUi.snapshotEvidenceSignal.split(":").slice(1).join(":")}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {note === "experiencia" && (
              <div className="flex flex-col gap-4">
                {experience.map((job) => (
                  <div
                    key={`${job.role}-${job.company}`}
                    className="rounded-xl p-4"
                    style={{ border: "1px solid var(--os-hr)" }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-base font-bold">
                        {job.role} — {job.company}
                      </span>
                      <span className="font-mono text-xs" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                        {job.period} · {job.place}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-[1.6]" style={{ color: "rgba(var(--os-txrgb),.55)" }}>
                      {job.note}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {note === "servicios" && (
              <div className="flex flex-col gap-4">
                {ui.services.map((s) => (
                  <div key={s.name}>
                    <div className="text-[14.5px] font-bold">{s.name}</div>
                    <div className="mt-1 text-[13px] leading-[1.5]" style={{ color: "rgba(var(--os-txrgb),.65)" }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {note === "contacto" && (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                  {snapshotUi.tabs.book}
                </span>
                <h2 className="mt-3.5 text-[36px] leading-[.98] font-extrabold lowercase tracking-[-0.03em]">
                  {snapshotUi.bookHeadline}
                </h2>
                <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.6]" style={{ color: "rgba(var(--os-txrgb),.75)" }}>
                  {snapshotUi.bookBody}
                </p>
                <div className="mt-[26px] flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(snapshotUi.mailSubject)}&body=${encodeURIComponent(snapshotUi.mailBody)}`}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-bold no-underline"
                    style={{ background: "var(--os-tx)", color: "var(--os-win)" }}
                  >
                    {snapshotUi.sendMessage} <span>→</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold"
                    style={{ border: "1px solid var(--os-hr)", background: "transparent", color: "inherit" }}
                  >
                    {copied ? snapshotUi.copied : snapshotUi.copyEmail} <span>⧉</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBook}
                    className="rounded-full px-5 py-2.5 text-[13.5px] font-semibold"
                    style={{ border: "1px solid var(--os-hr)", background: "transparent", color: "inherit" }}
                  >
                    {ui.bookCallBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
