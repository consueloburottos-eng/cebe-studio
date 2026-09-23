"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assetFolder, type Project, type GalleryItem } from "@/data/projects";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteLanguage, type Lang } from "@/hooks/useSiteLanguage";
import { localizeProject, localizeProjects, titleCase } from "@/lib/i18n";
import ProjectMedia from "@/components/ProjectMedia";
import AboutModal from "@/components/branding/AboutModal";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";
const UPWORK_URL = "https://www.upwork.com/freelancers/consueloburotto?";

// A row of at least 2-3 gallery photos side by side, each boxed to a fixed
// aspect ratio and cropped (object-cover) — never a single photo stretched
// to the full page width, since some uploads are small/portrait-format
// source images that look oversized and blurry when forced that wide. Only
// the project's own hero/cover banner is allowed to run full width.
const ROW_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

function GalleryRow({
  items,
  featured = false,
  featuredPosition = "start",
}: {
  items: GalleryItem[];
  featured?: boolean;
  featuredPosition?: "start" | "middle" | "end";
}) {
  // A 2x/1x/1x split — one wide lead photo next to two narrower ones —
  // instead of three equal columns, for visual rhythm. Only applies with
  // exactly 3 items; anything else falls back to the even split. All three
  // share one fixed height (not an aspect-ratio, which sizes each box
  // independently of its siblings) so the wide 2fr column reads as a
  // horizontal rectangle and the two 1fr columns read as vertical ones
  // purely from their own column width. `featuredPosition` picks where the
  // wide photo sits in the row.
  const useFeaturedLayout = featured && items.length === 3;
  const featuredColumns =
    featuredPosition === "start"
      ? "sm:grid-cols-[2fr_1fr_1fr]"
      : featuredPosition === "middle"
        ? "sm:grid-cols-[1fr_2fr_1fr]"
        : "sm:grid-cols-[1fr_1fr_2fr]";
  // A lone leftover photo (last chunk not divisible by 3) keeps its
  // portrait aspect ratio instead of stretching that ratio across the full
  // row width, which is what made single-item rows look oversized.
  const columns = useFeaturedLayout
    ? featuredColumns
    : items.length === 1
      ? "sm:grid-cols-[1fr_3fr]"
      : ROW_COLUMNS[Math.min(items.length, 3)];
  return (
    <div className={`mt-16 grid grid-cols-1 gap-4 sm:mt-20 ${columns}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`relative w-full overflow-hidden ${
            useFeaturedLayout ? "aspect-[3/4] sm:aspect-auto sm:h-[26vw] sm:max-h-[420px] sm:min-h-[240px]" : "aspect-[3/4]"
          }`}
          style={{ background: "var(--cb-pill)" }}
        >
          <ProjectMedia media={item.media} label={item.label} sizes="(min-width:1100px) 360px, 33vw" />
        </div>
      ))}
    </div>
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
          className="group flex w-[260px] flex-none flex-col gap-3 no-underline sm:w-[320px]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: "var(--cb-pill)" }}>
            <ProjectMedia
              media={other.coverMedia}
              label={other.cover}
              sizes="320px"
              uploadPath={`/projects/${assetFolder(other)}/cover`}
              objectPosition="left"
            />
          </div>
          <h3 className="m-0 font-sans text-base font-bold">{titleCase(other.title)}</h3>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
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
  const gallery = project.gallery.filter((g) => g.media);
  const galleryChunks: GalleryItem[][] = [];
  for (let i = 0; i < gallery.length; i += 3) {
    galleryChunks.push(gallery.slice(i, i + 3));
  }

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

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:mt-14 sm:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="m-0 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--cb-muted)]">{item.label}</dt>
              <dd className="m-0 mt-1.5 font-sans text-[13px] leading-snug">{item.value}</dd>
            </div>
          ))}
        </div>

        <div className="relative mt-10 w-full overflow-hidden sm:mt-14" style={{ background: "var(--cb-pill)" }}>
          <ProjectMedia
            media={project.coverMedia}
            label={project.cover}
            sizes="100vw"
            uploadPath={`/projects/${folder}/cover`}
            fit="auto"
          />
        </div>

        <section className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
            <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
              {lang === "en" ? "Overview" : "Resumen"}
            </h2>
            <p className="m-0 max-w-[60ch] font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">{project.brief}</p>
          </div>
        </section>

        {galleryChunks[0] && <GalleryRow items={galleryChunks[0]} featured />}

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

        {galleryChunks[1] && <GalleryRow items={galleryChunks[1]} featured />}

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

        {galleryChunks[2] && <GalleryRow items={galleryChunks[2]} featured featuredPosition="end" />}

        <section className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
            <h2 className="m-0 text-[clamp(18px,2.2vw,22px)]" style={serif}>
              {lang === "en" ? "Outcome" : "Resultado"}
            </h2>
            <p className="m-0 max-w-[60ch] font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">{project.result}</p>
          </div>
        </section>

        {galleryChunks.slice(3).map((chunk, i) => (
          <GalleryRow key={i} items={chunk} featured={i === 0} featuredPosition="middle" />
        ))}

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
        <div data-cb-theme={dark ? "dark" : "light"}>
          <AboutModal onClose={() => setAboutOpen(false)} />
        </div>
      )}
    </div>
  );
}
