"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { localizeProjects } from "@/lib/i18n";
import AboutModal from "@/components/branding/AboutModal";
import { FILTER_BUCKETS, categoryBucket, type FilterBucket } from "@/lib/projectBucket";
import WorkProjectRow from "./WorkProjectRow";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";
const UPWORK_URL = "https://www.upwork.com/freelancers/consueloburotto?";

// Dedicated "Work" page, separate from the portfolio home — matches
// ulrychkristian.cz/work: full catalogue (not the home's curated set),
// filterable by category. Shares the site's header/footer pattern with
// PortfolioHome so the two feel like one flow, not a bolt-on subpage.
export default function PortfolioWork() {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);

  const allWorks = localizeProjects(projects, lang);
  const [workFilter, setWorkFilter] = useState<FilterBucket>("SaaS");
  const filteredWorks = allWorks.filter((p) => categoryBucket(p) === workFilter);

  const serif = { fontFamily: "var(--font-merriweather)" };

  return (
    <div
      data-cb-theme={dark ? "dark" : "light"}
      data-cb-mode="portfolio"
      className="flex min-h-dvh w-full flex-col"
      style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
    >
      <ModeSwitcher mode="portfolio" dark={dark} onSetLight={() => setDark(false)} onSetDark={() => setDark(true)} lang={lang} onSetLang={setLang} />

      <div
        className="sticky top-0 z-[110] flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b px-8 py-4 backdrop-blur-xl sm:px-20"
        style={{ borderColor: "var(--cb-hair)", background: "var(--cb-glass-pill)" }}
      >
        <div className="flex items-baseline gap-3">
          <Link href="/" className="font-sans text-sm font-extrabold uppercase tracking-[0.04em] no-underline" style={{ color: "var(--cb-text)" }}>
            Consuelo Burotto
          </Link>
          <span className="hidden font-sans text-xs text-[var(--cb-muted)] sm:inline">Product Designer</span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-5 font-sans text-[13px] font-semibold">
            <Link href="/portfolio/work" className="text-[var(--cb-text)] no-underline opacity-70 transition-opacity hover:opacity-100">
              Work
            </Link>
            <button
              type="button"
              onClick={() => setAboutOpen(true)}
              className="cursor-pointer border-none bg-transparent p-0 font-sans text-[13px] font-semibold text-[var(--cb-text)] opacity-70 transition-opacity hover:opacity-100"
            >
              About
            </button>
            <a
              href="/profile/cv.pdf"
              download
              className="text-[var(--cb-text)] no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              CV
            </a>
          </nav>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="whitespace-nowrap rounded-full border-none px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.05em] no-underline"
            style={{ background: "var(--cb-text)", color: "var(--cb-bg)" }}
          >
            {lang === "en" ? "Get in touch" : "Contáctame"}
          </a>
        </div>
      </div>

      <div className="w-full flex-1 overflow-hidden px-8 py-14 sm:px-20 sm:py-20">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[var(--cb-muted)] no-underline transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true">←</span> {lang === "en" ? "Back to home" : "Volver al home"}
        </Link>

        <h1 className="m-0 max-w-[26ch] font-light" style={{ ...serif, fontSize: "clamp(32px,5vw,60px)", lineHeight: 1.08 }}>
          {lang === "en" ? "A closer look at the work I've helped shape" : "Una mirada más de cerca al trabajo que he ayudado a dar forma"}
        </h1>
        <p className="m-0 mt-6 max-w-[52ch] font-sans text-sm leading-relaxed text-[var(--cb-muted)]">
          {lang === "en"
            ? "Every project across product design, SaaS platforms, branding and editorial work — independently and as part of teams."
            : "Todos los proyectos, entre diseño de producto, plataformas SaaS, branding y trabajo editorial — de forma independiente y como parte de equipos."}
        </p>

        <div className="mb-10 mt-10 flex flex-wrap gap-2 sm:mt-14">
          {FILTER_BUCKETS.map((bucket) => (
            <button
              key={bucket}
              type="button"
              onClick={() => setWorkFilter(bucket)}
              className="rounded-full border-none px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.05em] transition"
              style={
                workFilter === bucket
                  ? { background: "var(--cb-text)", color: "var(--cb-bg)" }
                  : { background: "var(--cb-pill)", color: "var(--cb-text)" }
              }
            >
              {bucket}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-y-20 sm:gap-y-24">
          {filteredWorks.map((project) => (
            <WorkProjectRow key={project.slug} project={project} lang={lang} />
          ))}
        </div>
      </div>

      <footer
        className="mt-20 border-t px-8 py-10 sm:px-20 sm:py-14"
        style={{ borderColor: "var(--cb-hair)" }}
      >
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-[var(--cb-muted)]">
            <span>
              © {new Date().getFullYear()} Consuelo Burotto —{" "}
              {lang === "en" ? "built with Claude Code" : "construido con Claude Code"}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-xs font-semibold no-underline transition hover:opacity-70"
                style={{ borderColor: "var(--cb-hair)", color: "var(--cb-text)" }}
              >
                <span
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-[4px] text-[10px] font-bold"
                  style={{ background: "var(--cb-pill)" }}
                >
                  in
                </span>
                LinkedIn
              </a>
              <a
                href={UPWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-xs font-semibold no-underline transition hover:opacity-70"
                style={{ borderColor: "var(--cb-hair)", color: "var(--cb-text)" }}
              >
                <span
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-[4px] text-[10px] font-bold"
                  style={{ background: "var(--cb-pill)" }}
                >
                  Up
                </span>
                Upwork
              </a>
            </div>
          </div>
        </div>
      </footer>

      {aboutOpen && (
        <div data-cb-theme={dark ? "dark" : "light"} data-cb-mode="portfolio">
          <AboutModal onClose={() => setAboutOpen(false)} />
        </div>
      )}
    </div>
  );
}
