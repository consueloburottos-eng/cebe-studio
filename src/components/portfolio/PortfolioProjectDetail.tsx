"use client";

import ProjectDecisionBlock from "@/components/ProjectDecisionBlock";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { assetFolder, type Project, type GalleryItem } from "@/data/projects";
import type { CaseSection, SectionBlock } from "@/data/projects/helpers";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteLanguage, type Lang } from "@/hooks/useSiteLanguage";
import { localizeProject, localizeProjects, titleCase } from "@/lib/i18n";
import ProjectMedia from "@/components/ProjectMedia";
import AboutModal from "@/components/branding/AboutModal";
import { INTRO_SPAN_PATTERN, mobileTileSize } from "@/lib/introGrid";
import { toolIconSrc } from "@/lib/tools";
import { displayTitle } from "@/lib/projectTitle";

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

// App-icon tile for a tool: its logo on a rounded square, or a neutral tile
// with initials when the tool has no logo.
function ToolIcon({ name }: { name: string }) {
  const src = toolIconSrc(name);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={48}
        height={48}
        className="block h-12 w-12 flex-none rounded-[11px] shadow-sm ring-1 ring-[var(--cb-hair)]"
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 flex-none items-center justify-center rounded-[11px] font-sans text-[15px] font-bold ring-1 ring-[var(--cb-hair)]"
      style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
    >
      {initials}
    </span>
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

// Renders one structured case-study section (see CaseSection in
// data/projects/helpers.ts): paragraphs, small labels, subtitles, pull-quotes,
// the project result, and optional sub-sections (one per design decision).
function CaseBlocks({
  blocks,
  result,
  bodyText,
  serif,
}: {
  blocks: SectionBlock[];
  result: string;
  bodyText: string;
  serif: CSSProperties;
}) {
  return (
    <div className="flex max-w-[60ch] flex-col gap-4">
      {blocks.map((b, i) => {
        if (b.type === "p") return <p key={i} className={bodyText}>{b.text}</p>;
        if (b.type === "result") return <p key={i} className={bodyText}>{result}</p>;
        if (b.type === "list")
          return (
            <ul key={i} className={`${bodyText} m-0 flex list-disc flex-col gap-2 pl-5`}>
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        if (b.type === "subtitle")
          return (
            <h3 key={i} className="m-0 mt-2 text-[clamp(20px,2.4vw,28px)] leading-[1.2]" style={serif}>
              {b.text}
            </h3>
          );
        if (b.type === "label")
          return (
            <h4 key={i} className="m-0 mt-4 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--cb-muted)]">
              {b.text}
            </h4>
          );
        return (
          <blockquote
            key={i}
            className="m-0 my-2 border-l-[3px] pl-6 text-[clamp(20px,2.3vw,26px)] leading-snug"
            style={{ ...serif, borderColor: "var(--cb-text)" }}
          >
            {b.text}
          </blockquote>
        );
      })}
    </div>
  );
}

function CaseSectionBody({
  section,
  result,
  bodyText,
  serif,
}: {
  section: CaseSection;
  result: string;
  bodyText: string;
  serif: CSSProperties;
}) {
  return (
    <div className="flex flex-col gap-14">
      {section.blocks.length > 0 && <CaseBlocks blocks={section.blocks} result={result} bodyText={bodyText} serif={serif} />}
      {section.children?.map((child) => (
        <div key={child.id} id={child.id} className="scroll-mt-32">
          <h3 className="m-0 mb-5 max-w-[26ch] text-[clamp(22px,2.8vw,32px)] leading-[1.15]" style={serif}>
            {child.title}
          </h3>
          <CaseBlocks blocks={child.blocks} result={result} bodyText={bodyText} serif={serif} />
        </div>
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
export default function PortfolioProjectDetail({
  project: rawProject,
  others: rawOthers,
  prev,
  next,
}: {
  project: Project;
  others: Project[];
  prev: Project;
  next: Project;
}) {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const project = localizeProject(rawProject, lang);
  const others = localizeProjects(rawOthers, lang);
  const folder = assetFolder(project);
  const pageTitle = displayTitle(project);
  const gallery = process.env.NODE_ENV === "development" ? project.gallery : project.gallery.filter((g) => g.media);

  const serif = { fontFamily: "var(--font-merriweather)" };
  const [challenge, ...approach] = project.strategy;

  const meta = [
    { label: lang === "en" ? "Category" : "Categoría", value: project.category },
    { label: lang === "en" ? "Role" : "Rol", value: project.role },
    { label: lang === "en" ? "Client" : "Cliente", value: project.client },
    { label: lang === "en" ? "Year" : "Año", value: project.year },
  ];

  // Case-study copy as a list of titled sections: the titles drive the sticky
  // sidebar (scrollspy), the bodies stack in the right column.
  const bodyText = "m-0 font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]";
  const sections: { id: string; label: string; content: ReactNode; children?: { id: string; label: string }[] }[] = [
    {
      id: "overview",
      label: lang === "en" ? "Overview" : "Resumen",
      content: (
        <div className="max-w-[60ch]">
          <ProjectDecisionBlock decision={project.decision} lang={lang} />
          {!project.sections && <p className={bodyText}>{project.brief}</p>}
          {project.badges && project.badges.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                {lang === "en" ? "What was done" : "Qué se hizo"}
              </div>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {project.badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border px-3 py-1.5 font-sans text-[12px] font-semibold"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];
  if (project.digitalPresence) {
    const presence = project.digitalPresence;
    sections.push({
      id: "digital-presence",
      label:
        lang === "en"
          ? (presence.headingEn ?? presence.heading ?? "Digital presence")
          : (presence.heading ?? "Presencia digital"),
      content: (
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {presence.stats.map((stat) => (
              <div key={stat.title} className="rounded-2xl border p-5 font-sans" style={{ borderColor: "var(--cb-hair)" }}>
                <div className="text-[13px] text-[var(--cb-muted)]">{lang === "en" ? (stat.titleEn ?? stat.title) : stat.title}</div>
                <div className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.01em]">{lang === "en" ? (stat.valueEn ?? stat.value) : stat.value}</div>
                <div className="mt-2 text-[13px] leading-snug text-[var(--cb-muted)]">{lang === "en" ? (stat.detailEn ?? stat.detail) : stat.detail}</div>
              </div>
            ))}
          </div>
          <p className="m-0 mt-4 max-w-[60ch] font-sans text-[12px] leading-relaxed text-[var(--cb-muted)]">
            {lang === "en" ? (presence.noteEn ?? presence.note) : presence.note}
          </p>
        </div>
      ),
    });
  }
  if (project.sections) {
    for (const cs of project.sections) {
      sections.push({
        id: cs.id,
        label: cs.label,
        children: cs.children?.map((c) => ({ id: c.id, label: c.label })),
        content: <CaseSectionBody section={cs} result={project.result} bodyText={bodyText} serif={serif} />,
      });
    }
  }
  if (project.sections && project.features && project.secondaryFeatureIds?.length) {
    const extra = project.features.filter((f) => project.secondaryFeatureIds?.includes(f.id));
    if (extra.length > 0) {
      sections.push({
        id: "more-features",
        label: lang === "en" ? "More features" : "Más funcionalidades",
        content: (
          <div className="flex max-w-[60ch] flex-col gap-10">
            {extra.map((f) => (
              <div key={f.id}>
                <h3 className="m-0 mb-3 text-[clamp(18px,2vw,22px)] leading-[1.25]" style={serif}>
                  {f.title}
                </h3>
                <p className={bodyText}>{f.body[0]}</p>
              </div>
            ))}
          </div>
        ),
      });
    }
  }
  if (!project.sections && challenge) {
    sections.push({
      id: "challenge",
      label: lang === "en" ? "Challenge" : "Desafío",
      content: <p className={`${bodyText} max-w-[60ch]`}>{challenge}</p>,
    });
  }
  if (!project.sections && approach.length > 0) {
    sections.push({
      id: "approach",
      label: lang === "en" ? "Approach" : "Enfoque",
      content: (
        <div className="flex max-w-[60ch] flex-col gap-4">
          {approach.map((paragraph, i) => (
            <p key={i} className={bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      ),
    });
  }
  if (!project.sections) sections.push({
    id: "outcome",
    label: lang === "en" ? "Outcome" : "Resultado",
    content: <p className={`${bodyText} max-w-[60ch]`}>{project.result}</p>,
  });

  if (project.tools && project.tools.length > 0) {
    sections.push({
      id: "tools",
      label: lang === "en" ? "Tools" : "Herramientas",
      content: (
        <ul className="m-0 grid max-w-[60ch] list-none grid-cols-1 gap-3 p-0 lg:grid-cols-2">
          {project.tools.map((tool) => (
            <li
              key={tool.name}
              className="flex items-start gap-4 rounded-2xl border p-4 font-sans"
              style={{ borderColor: "var(--cb-hair)" }}
            >
              <ToolIcon name={tool.name} />
              <div className="min-w-0">
                <div className="text-[15px] font-bold">{tool.name}</div>
                {tool.use && <div className="mt-1 text-[13px] leading-snug text-[var(--cb-muted)]">{tool.use}</div>}
              </div>
            </li>
          ))}
        </ul>
      ),
    });
  }

  const sectionIds = sections.flatMap((sec) => [sec.id, ...(sec.children?.map((c) => c.id) ?? [])]).join("|");
  useEffect(() => {
    const ids = sectionIds.split("|");
    let raf = 0;
    function update() {
      raf = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionIds]);

  function goToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActiveSection(id);
  }

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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Link
            href="/portfolio/work"
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[var(--cb-muted)] no-underline transition-opacity hover:opacity-70"
          >
            <span aria-hidden="true">←</span> {lang === "en" ? "See more work" : "Ver más trabajo"}
          </Link>
          <div className="flex items-center gap-5 font-sans text-[13px] font-semibold">
            <Link
              href={`/portfolio/projects/${prev.slug}`}
              aria-label={`${lang === "en" ? "Previous project" : "Proyecto anterior"}: ${titleCase(prev.title)}`}
              className="inline-flex items-center gap-1.5 text-[var(--cb-text)] no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              <span aria-hidden="true">←</span> {lang === "en" ? "Previous" : "Anterior"}
            </Link>
            <Link
              href={`/portfolio/projects/${next.slug}`}
              aria-label={`${lang === "en" ? "Next project" : "Proyecto siguiente"}: ${titleCase(next.title)}`}
              className="inline-flex items-center gap-1.5 text-[var(--cb-text)] no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              {lang === "en" ? "Next" : "Siguiente"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <h1
          className={`m-0 ${pageTitle.length > 50 ? "max-w-[34ch]" : "max-w-[24ch]"}`}
          style={{
            ...serif,
            fontSize: pageTitle.length > 50 ? "clamp(24px,3.4vw,40px)" : "clamp(28px,4.5vw,52px)",
            lineHeight: 1.15,
          }}
        >
          {pageTitle}
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

        <div className="mt-16 grid grid-cols-1 gap-x-12 sm:mt-24 sm:grid-cols-[200px_1fr]">
          <nav aria-label={lang === "en" ? "Case study sections" : "Secciones del case study"} className="hidden sm:block">
            <ul className="sticky top-32 m-0 flex list-none flex-col gap-3 p-0 font-sans">
              {sections.map((sec) => {
                const childActive = sec.children?.some((c) => c.id === activeSection) ?? false;
                const active = activeSection === sec.id;
                const link = (id: string, label: string, isActive: boolean, dim: boolean, small: boolean) => (
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(id);
                    }}
                    aria-current={isActive ? "location" : undefined}
                    className={`text-left ${small ? "text-[11px] font-semibold" : "text-xs font-bold"} tracking-[0.06em] underline-offset-4 transition-opacity ${
                      isActive ? "underline opacity-100" : dim ? "no-underline opacity-100" : "no-underline opacity-70 hover:opacity-100"
                    }`}
                    style={{ color: "var(--cb-text)" }}
                  >
                    {label}
                  </a>
                );
                return (
                  <li key={sec.id}>
                    {link(sec.id, sec.label, active, childActive, false)}
                    {sec.children && (
                      <ul className="m-0 mt-2 flex list-none flex-col gap-2 border-l p-0 pl-3" style={{ borderColor: "var(--cb-hair)" }}>
                        {sec.children.map((c) => (
                          <li key={c.id}>{link(c.id, c.label, activeSection === c.id, false, true)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-16 sm:gap-24">
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-32">
                <h2
                  className={
                    project.sections
                      ? "m-0 mb-8 text-[clamp(30px,3.8vw,48px)] leading-[1.08]"
                      : "m-0 mb-4 text-[clamp(18px,2.2vw,22px)] sm:sr-only"
                  }
                  style={serif}
                >
                  {project.sections ? (project.sections.find((x) => x.id === sec.id)?.title ?? sec.label) : sec.label}
                </h2>
                {sec.content}
              </section>
            ))}
          </div>
        </div>

        <nav
          aria-label={lang === "en" ? "Project navigation" : "Navegación entre proyectos"}
          className="mt-24 grid grid-cols-1 gap-4 border-t pt-10 sm:mt-32 sm:grid-cols-2 sm:gap-8"
          style={{ borderColor: "var(--cb-hair)" }}
        >
          <Link href={`/portfolio/projects/${prev.slug}`} className="group flex flex-col gap-1.5 no-underline">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
              <span aria-hidden="true">←</span> {lang === "en" ? "Previous project" : "Proyecto anterior"}
            </span>
            <span className="text-[clamp(18px,2.2vw,24px)] leading-snug underline-offset-4 group-hover:underline" style={{ ...serif, color: "var(--cb-text)" }}>
              {titleCase(prev.title)}
            </span>
          </Link>
          <Link href={`/portfolio/projects/${next.slug}`} className="group flex flex-col gap-1.5 no-underline sm:items-end sm:text-right">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
              {lang === "en" ? "Next project" : "Proyecto siguiente"} <span aria-hidden="true">→</span>
            </span>
            <span className="text-[clamp(18px,2.2vw,24px)] leading-snug underline-offset-4 group-hover:underline" style={{ ...serif, color: "var(--cb-text)" }}>
              {titleCase(next.title)}
            </span>
          </Link>
        </nav>

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
