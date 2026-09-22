"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteLanguage, type Lang } from "@/hooks/useSiteLanguage";
import { localizeProjects, titleCase } from "@/lib/i18n";
import ProjectMedia from "@/components/ProjectMedia";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";
const UPWORK_URL = "https://www.upwork.com/freelancers/consueloburotto?";

// Four broad filter buckets instead of one pill per raw project category.
// No "All" — every project resolves to exactly one bucket, Branding being
// the catch-all for anything that isn't SaaS/Ecommerce/Service (industrial
// design pieces like cnc/longboard/brava, the "polucio" case study, and any
// pending "coming soon" stub all land there).
const FILTER_BUCKETS = ["SaaS", "Ecommerce", "Service", "Branding"] as const;
type FilterBucket = (typeof FILTER_BUCKETS)[number];

function categoryBucket(project: Pick<Project, "slug" | "category">): FilterBucket {
  // SaaS is the three real software families, by slug — not by category —
  // since "Product Design" alone would also catch physical/industrial
  // pieces (cnc, longboard, brava) that aren't software at all.
  const { slug, category } = project;
  if (slug === "talent-capital" || slug.startsWith("altafid") || slug.startsWith("buildwithin")) {
    return "SaaS";
  }
  const c = category.toLowerCase();
  if (c.includes("e-commerce") || c.includes("ecommerce") || c.includes("web design") || c.includes("brand + web")) {
    return "Ecommerce";
  }
  if (c.includes("servicio") || c.includes("service")) {
    return "Service";
  }
  return "Branding";
}

// One project per section: title + "view case study" sit above a single
// horizontal strip of that project's gallery photos. Every photo in the
// strip shares one fixed height (so the strip reads as one clean line)
// but keeps its own natural width via fit="natural" — a wide screenshot
// stays wide, a portrait phone shot stays narrow, instead of every photo
// being cropped into the same box. The strip is duplicated once and
// animated with a slow CSS translateX loop (see .cb-marquee in
// globals.css) so it scrolls on its own, no interaction required.
function WorkProjectRow({ project, lang }: { project: Project; lang: Lang }) {
  const gallery = project.gallery.filter((g) => g.media);
  const items = gallery.length ? gallery : project.coverMedia ? [{ label: project.cover, media: project.coverMedia }] : [];
  const loopItems = items.length > 1 ? [...items, ...items] : items;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h3 className="m-0 flex items-baseline gap-2 font-sans text-xl font-bold sm:text-2xl">
            {titleCase(project.title)}
            {project.pending && (
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: "#015fca" }}>
                {lang === "en" ? "Soon" : "Pronto"}
              </span>
            )}
          </h3>
          <span className="mt-1.5 block font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
            {project.category} · {project.year}
          </span>
          <p className="m-0 mt-2 max-w-[60ch] font-sans text-[14px] leading-relaxed text-[var(--cb-muted)]">
            {project.subtitle}
          </p>
        </div>
        <Link
          href={`/portfolio/projects/${project.slug}`}
          className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border-none px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.05em] no-underline"
          style={{ background: "var(--cb-text)", color: "var(--cb-bg)" }}
        >
          {lang === "en" ? "View case study" : "Ver caso"} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {items.length > 0 && (
        <div className="cb-marquee-mask overflow-hidden">
          <div className={`flex w-max gap-4 ${loopItems !== items ? "cb-marquee" : ""}`}>
            {loopItems.map((item, i) => (
              <div
                key={i}
                className="relative flex-none overflow-hidden rounded-[10px]"
                style={{ height: "clamp(200px, 28vw, 360px)", background: "var(--cb-pill)" }}
              >
                <ProjectMedia media={item.media} label={item.label} fit="natural" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Dedicated "Work" page, separate from the portfolio home — matches
// ulrychkristian.cz/work: full catalogue (not the home's curated set),
// filterable by category. Shares the site's header/footer pattern with
// PortfolioHome so the two feel like one flow, not a bolt-on subpage.
export default function PortfolioWork() {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();

  const allWorks = localizeProjects(projects, lang);
  const [workFilter, setWorkFilter] = useState<FilterBucket>("SaaS");
  const filteredWorks = allWorks.filter((p) => categoryBucket(p) === workFilter);

  const serif = { fontFamily: "var(--font-merriweather)" };

  return (
    <div
      data-cb-theme={dark ? "dark" : "light"}
      className="flex min-h-dvh w-full flex-col"
      style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
    >
      <ModeSwitcher mode="portfolio" dark={dark} onSetLight={() => setDark(false)} onSetDark={() => setDark(true)} lang={lang} onSetLang={setLang} />

      <div
        className="sticky top-0 z-[110] flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b px-4 py-4 backdrop-blur-xl sm:px-8"
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
            <Link
              href="/portfolio/work"
              className="border-b-2 pb-1 text-[var(--cb-text)] no-underline opacity-100"
              style={{ borderColor: "var(--cb-text)" }}
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="border-b-2 border-transparent pb-1 text-[var(--cb-text)] no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              About
            </Link>
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

      <div className="w-full flex-1 overflow-hidden px-4 py-14 sm:px-8 sm:py-20">
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
        className="mt-20 border-t px-4 py-10 sm:px-8 sm:py-14"
        style={{ borderColor: "var(--cb-hair)" }}
      >
        <div className="w-full">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="block text-[clamp(24px,5vw,48px)] leading-none tracking-[-0.01em] no-underline"
            style={{ ...serif, color: "#015fca" }}
          >
            {CONTACT_EMAIL}
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-[var(--cb-muted)] sm:mt-10">
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
    </div>
  );
}
