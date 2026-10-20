"use client";

import ProjectDecisionBlock from "@/components/ProjectDecisionBlock";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assetFolder, type Project, type GalleryItem } from "@/data/projects";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteLanguage, type Lang } from "@/hooks/useSiteLanguage";
import { localizeProject, localizeProjects, titleCase } from "@/lib/i18n";
import ProjectMedia from "@/components/ProjectMedia";
import AboutModal from "@/components/branding/AboutModal";
import { INTRO_SPAN_PATTERN, mobileTileSize } from "@/lib/introGrid";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";
const UPWORK_URL = "https://www.upwork.com/freelancers/consueloburotto?";

// Same intro grid Corporate's project page uses, right under the hero: a
// 9-column grid with a fixed span pattern (wide/narrow tiles at one shared row
// height), and a horizontally scrolling strip of the same tiles on mobile.
// Dev pads to the full 13 slots so empty slots stay click-to-upload targets;
// production only renders tiles that have media, repeating the span pattern
// if a project has more photos than the 13 base slots.
function IntroGrid({ gallery, folder }: { gallery: GalleryItem[]; folder: string }) {
  const isDev = process.env.NODE_ENV === "development";
  const slotCount = isDev ? Math.max(gallery.length, INTRO_SPAN_PATTERN.length) : gallery.length;
  const items = Array.from({ length: slotCount }, (_, i) => gallery[i] ?? { label: "Imagen próximamente" });
  const spanFor = (i: number) => INTRO_SPAN_PATTERN[i % INTRO_SPAN_PATTERN.length];
  const uploadFor = (i: number) => `/projects/${folder}/intro-${String(i + 1).padStart(2, "0")}`;
  if (items.length === 0) return null;

  return (
    <>
      <div className="mt-10 flex gap-[10px] overflow-x-auto pb-1 sm:hidden">
        {items.map((g, i) => {
          const { width, height } = mobileTileSize(spanFor(i));
          return (
            <div
              key={i}
              className="flex-none overflow-hidden rounded-[4px]"
              style={{ width, height, background: "var(--cb-pill)" }}
            >
              <ProjectMedia media={g.media} label={g.label} sizes={`${width}px`} uploadPath={uploadFor(i)} />
            </div>
          );
        })}
      </div>

      <div className="mt-10 hidden sm:block" style={{ containerType: "inline-size" }}>
        <div
          className="grid gap-[10px]"
          style={{
            gridTemplateColumns: "repeat(9, 1fr)",
            gridAutoRows: "calc((100cqw - 80px) / 9 * 1.4)",
            gridAutoFlow: "row dense",
          }}
        >
          {items.map((g, i) => {
            const span = spanFor(i);
            return (
              <div
                key={i}
                className="overflow-hidden rounded-[10px]"
                style={{ background: "var(--cb-pill)", gridColumn: `span ${span}` }}
              >
                <ProjectMedia
                  media={g.media}
                  label={g.label}
                  sizes={span === 2 ? "(min-width:1200px) 246px, 24vw" : "(min-width:1200px) 118px, 11vw"}
                  uploadPath={uploadFor(i)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// "More projects" strip — scrolls itself slowly and continuously (a plain
// requestAnimationFrame loop nudging scrollLeft, not a CSS transform, so
// the browser's own horizontal scroll still works on top of it) and stops
// the moment the pointer is over it, so a visitor can scroll it by hand
// (trackpad, shift+wheel, touch) without fighting the auto-motion. The
// item list is duplicated once so the loop point is invisible.
function MoreProjectsRow({ others, lang }: { others: Project[]; lang: Lang }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const loopItems = others.length > 1 ? [...others, ...others] : others;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || others.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    function step() {
      if (el && !hoveredRef.current) {
        el.scrollLeft += 0.6;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [others.length]);

  return (
    <div
      ref={scrollerRef}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      className="flex gap-8 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {loopItems.map((other, i) => (
        <Link
          key={`${other.slug}-${i}`}
          href={`/portfolio/projects/${other.slug}`}
          className="group flex flex-none flex-col gap-3 no-underline"
        >
          <div className="relative h-[220px] overflow-hidden sm:h-[260px]" style={{ background: "var(--cb-pill)" }}>
            <ProjectMedia
              media={other.coverMedia}
              label={other.cover}
              sizes="400px"
              uploadPath={`/projects/${assetFolder(other)}/cover`}
              fit="natural"
            />
          </div>
          <h3 className="m-0 max-w-[360px] font-sans text-base font-bold">{titleCase(other.title)}</h3>
          <span className="max-w-[360px] font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
            {other.category} · {other.year}
          </span>
        </Link>
      ))}
    </div>
  );
}

// Case-study project template for the portfolio flow — matches
// ulrychkristian.cz's project pages: big headline, a meta row, then
// Overview/Challenge/Approach/Outcome sections interleaved with gallery
// images, closing with "More projects" and the shared footer. Pulls from
// the same Project data every other mode's project page already uses —
// brief → Overview, strategy → Challenge/Approach, result → Outcome —
// nothing new to write, just a different arrangement of what's there.
export default function PortfolioProjectDetail({ project: rawProject, others: rawOthers }: { project: Project; others: Project[] }) {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);

  const project = localizeProject(rawProject, lang);
  const others = localizeProjects(rawOthers, lang);
  const folder = assetFolder(project);
  const gallery = process.env.NODE_ENV === "development" ? project.gallery : project.gallery.filter((g) => g.media);

  const serif = { fontFamily: "var(--font-merriweather)" };
  const [challenge, ...approach] = project.strategy;

  const meta = [
    { label: lang === "en" ? "Category" : "Categoría", value: project.category },
    { label: lang === "en" ? "Role" : "Rol", value: project.role },
    { label: lang === "en" ? "Client" : "Cliente", value: project.client },
    { label: lang === "en" ? "Year" : "Año", value: project.year },
  ];

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

      <div className="w-full flex-1 px-8 py-14 sm:px-20 sm:py-20">
        <Link
          href="/portfolio/work"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[var(--cb-muted)] no-underline transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true">←</span> {lang === "en" ? "See more work" : "Ver más trabajo"}
        </Link>

        <h1 className="m-0 max-w-[24ch]" style={{ ...serif, fontSize: "clamp(28px,4.5vw,52px)", lineHeight: 1.1 }}>
          {titleCase(project.headline)}
        </h1>

        <dl className="m-0 mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:mt-14 sm:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="m-0 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--cb-muted)]">{item.label}</dt>
              <dd className="m-0 mt-1.5 font-sans text-[13px] leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-10 w-full overflow-hidden sm:mt-14" style={{ background: "var(--cb-pill)" }}>
          <ProjectMedia
            media={project.coverMedia}
            label={project.cover}
            sizes="100vw"
            uploadPath={`/projects/${folder}/cover`}
            fit="auto"
          />
        </div>

        <IntroGrid gallery={gallery} folder={folder} />

        <section className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
            <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
              {lang === "en" ? "Overview" : "Resumen"}
            </h2>
            <div className="max-w-[60ch]">
              <ProjectDecisionBlock decision={project.decision} lang={lang} />
              <p className="m-0 font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">{project.brief}</p>
            </div>
          </div>
        </section>

        {project.digitalPresence && (
          <section className="mt-16 sm:mt-24">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
              <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
                {lang === "en" ? "Digital presence" : "Presencia digital"}
              </h2>
              <div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.digitalPresence.stats.map((stat) => (
                    <div
                      key={stat.title}
                      className="rounded-2xl border p-5 font-sans"
                      style={{ borderColor: "var(--cb-hair)" }}
                    >
                      <div className="text-[13px] text-[var(--cb-muted)]">
                        {lang === "en" ? (stat.titleEn ?? stat.title) : stat.title}
                      </div>
                      <div className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.01em]">{stat.value}</div>
                      <div className="mt-2 text-[13px] leading-snug text-[var(--cb-muted)]">
                        {lang === "en" ? (stat.detailEn ?? stat.detail) : stat.detail}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-4 max-w-[60ch] font-sans text-[12px] leading-relaxed text-[var(--cb-muted)]">
                  {lang === "en"
                    ? (project.digitalPresence.noteEn ?? project.digitalPresence.note)
                    : project.digitalPresence.note}
                </p>
              </div>
            </div>
          </section>
        )}

        {challenge && (
          <section className="mt-16 sm:mt-24">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
              <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
                {lang === "en" ? "Challenge" : "Desafío"}
              </h2>
              <p className="m-0 max-w-[60ch] font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">{challenge}</p>
            </div>
          </section>
        )}

        {approach.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
              <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
                {lang === "en" ? "Approach" : "Enfoque"}
              </h2>
              <div className="flex max-w-[60ch] flex-col gap-4">
                {approach.map((paragraph, i) => (
                  <p key={i} className="m-0 font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
            <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
              {lang === "en" ? "Outcome" : "Resultado"}
            </h2>
            <p className="m-0 max-w-[60ch] font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">{project.result}</p>
          </div>
        </section>

        {others.length > 0 && (
          <section className="mt-24 border-t pt-16 sm:mt-32 sm:pt-20" style={{ borderColor: "var(--cb-hair)" }}>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 sm:mb-14">
              <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
                {lang === "en" ? "More projects" : "Más proyectos"}
              </h2>
              <Link
                href="/portfolio/work"
                className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border-none px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.05em] no-underline"
                style={{ background: "var(--cb-text)", color: "var(--cb-bg)" }}
              >
                {lang === "en" ? "See more projects" : "Ver más proyectos"} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <MoreProjectsRow others={others} lang={lang} />
          </section>
        )}
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
