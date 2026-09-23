"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getProject, assetFolder } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { localizeProjects, titleCase } from "@/lib/i18n";
import { LANGUAGES, LANGUAGES_EN } from "@/data/profile";
import ProjectMedia from "@/components/ProjectMedia";
import AboutModal from "@/components/branding/AboutModal";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";
const UPWORK_URL = "https://www.upwork.com/freelancers/consueloburotto?";

// The real SaaS / digital-product case studies — excludes brava (physical
// hardware product design) and everything outside "Product Design" that
// isn't a software product (art direction, branding, editorial, etc.),
// same reasoning BrandingHome's hero curation already applies.
const SELECTED_WORK_SLUGS = [
  "talent-capital",
  "buildwithin",
  "buildwithin-design-system",
  "altafid",
  "altafid-risk-assessment",
  "altafid-calendar",
  "altafid-marketplace",
];

const WHAT_I_DO = [
  {
    n: "01",
    title: { es: "Product design end-to-end", en: "End-to-end product design" },
    body: {
      es: "De la definición del problema al hand-off developer-ready, pasando por flujos, wireframes y UI de producción.",
      en: "From problem definition to developer-ready hand-off, through flows, wireframes and production UI.",
    },
  },
  {
    n: "02",
    title: { es: "Design systems", en: "Design systems" },
    body: {
      es: "Construcción y gobierno de sistemas de diseño escalables — tokens, componentes, y configuración de client-branding.",
      en: "Building and governing scalable design systems — tokens, components, and client-branding configuration.",
    },
  },
  {
    n: "03",
    title: { es: "IA conversacional", en: "AI-conversational design" },
    body: {
      es: "Flujos de agentes de IA, experiencias tipo copiloto, y momentos de control/override humano en productos con IA.",
      en: "AI agent flows, copilot-style experiences, and human control/override moments in AI-driven products.",
    },
  },
  {
    n: "04",
    title: { es: "Research & testing", en: "Research & testing" },
    body: {
      es: "Investigación primaria, entrevistas y usability testing (Maze) para validar decisiones antes de construir.",
      en: "Primary research, interviews and usability testing (Maze) to validate decisions before building.",
    },
  },
  {
    n: "05",
    title: { es: "Liderazgo de equipo", en: "Team leadership" },
    body: {
      es: "Mentoría y dirección de equipos de diseño, integrando UX con marketing, ventas y customer success.",
      en: "Mentoring and directing design teams, integrating UX with marketing, sales and customer success.",
    },
  },
  {
    n: "06",
    title: { es: "AI-assisted workflow", en: "AI-assisted workflow" },
    body: {
      es: "Prototipado y producción de diseño con Claude y herramientas GenAI como parte del flujo diario, no como experimento.",
      en: "Design prototyping and production with Claude and GenAI tools as part of the daily workflow, not an experiment.",
    },
  },
];

// A deliberately editorial portfolio view — inspired by ulrychkristian.cz:
// name/role header with nav + CTA, hero statement, a curated "selected
// works" list (SaaS/product only), a numbered "what I do" section, and a
// footer with contact links. Shares the site's light/dark theme tokens and
// toggle with Branding/SaaS/Marketplace, defaulting to light.
export default function PortfolioHome() {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);
  const languages = lang === "en" ? LANGUAGES_EN : LANGUAGES;

  const selectedWorks = localizeProjects(
    SELECTED_WORK_SLUGS.map((slug) => getProject(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)),
    lang
  );

  const meta =
    lang === "en"
      ? [
          { label: "Based in", value: "Barcelona, Spain" },
          { label: "Focus", value: "SaaS · Fintech · AI-conversational" },
          { label: "Languages", value: languages.join(" · ") },
          { label: "Availability", value: "Open to new roles" },
        ]
      : [
          { label: "Ubicación", value: "Barcelona, España" },
          { label: "Foco", value: "SaaS · Fintech · IA conversacional" },
          { label: "Idiomas", value: languages.join(" · ") },
          { label: "Disponibilidad", value: "Abierta a nuevos roles" },
        ];

  const serif = { fontFamily: "var(--font-merriweather)" };

  // Hero photo sits behind the headline/meta text (z-index) and drifts
  // upward slower than the page scrolls, so it reads as rising up from
  // underneath the text rather than scrolling in lockstep with it.
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = Math.max(-48, Math.min(48, (progress - 0.5) * 96));
      el.style.transform = `translateY(${-offset}px)`;
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hero banner cycles through each selected project's own hero media
  // (video or image) one at a time, instead of showing three static tiles
  // side by side — matching the reference's single large demo banner. The
  // single pause button's ring fills over each cycle and advances to the
  // next project itself once full, rather than a separate JS interval.
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerPaused, setBannerPaused] = useState(false);
  const bannerWorks = selectedWorks.slice(0, 4);
  const reducedMotionBanner = useMediaQuery("(prefers-reduced-motion: reduce)");

  function goToNextBannerWork() {
    setBannerIndex((i) => (i + 1) % bannerWorks.length);
  }

  return (
    <div
      data-cb-theme={dark ? "dark" : "light"}
      className="flex min-h-dvh w-full flex-col"
      style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
    >
      {/* Shared mode switcher (Corporate/SaaS/E-commerce/Portfolio) sits on
          top, same as the other 3 flows — this view's own identity/nav/CTA
          bar goes directly below it, not instead of it. */}
      <ModeSwitcher mode="portfolio" dark={dark} onSetLight={() => setDark(false)} onSetDark={() => setDark(true)} lang={lang} onSetLang={setLang} />

      <div
        className="sticky top-0 z-[110] flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b px-8 py-4 backdrop-blur-xl sm:px-20"
        style={{ borderColor: "var(--cb-hair)", background: "var(--cb-glass-pill)" }}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-sans text-sm font-extrabold uppercase tracking-[0.04em]">
            Consuelo Burotto
          </span>
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
        {/* Hero — headline + meta grid left, large photo bleeding toward the
            edge on the right, matching the ulrychkristian.cz reference more
            closely than a small circular avatar. */}
        <header className="mb-20 sm:mb-28">
          {/* Headline spans the full width on its own row, same as the
              reference — it's not sharing a column with the photo, which
              is why it can wrap to only 3-4 wide lines instead of 6+. */}
          <h1 className="relative z-[1] m-0 w-full leading-[1.08] tracking-[-0.01em]" style={serif}>
            {lang === "en" ? (
              <span className="block font-light" style={{ fontSize: "clamp(38px,8.5vw,95px)" }}>
                <em
                  className="not-italic italic underline decoration-1 underline-offset-4"
                  style={{ color: "#015fca", textDecorationColor: "var(--cb-hair)" }}
                >
                  Product Designer
                </em>{" "}
                shaping SaaS platforms, design systems and AI-driven experiences with research at the core.
              </span>
            ) : (
              <span className="block font-light" style={{ fontSize: "clamp(38px,8.5vw,95px)" }}>
                <em
                  className="not-italic italic underline decoration-1 underline-offset-4"
                  style={{ color: "#015fca", textDecorationColor: "var(--cb-hair)" }}
                >
                  Product Designer
                </em>{" "}
                dando forma a plataformas SaaS, sistemas de diseño y experiencias impulsadas por IA, con la investigación en el centro.
              </span>
            )}
          </h1>

          {/* Circular "available for work" badge — floats over whatever
              sits below the headline instead of pushing it down: this
              wrapper is zero-height in the flow, and the actual badge is
              absolutely positioned inside it. The text ring spins slowly on
              its own (see .cb-spin-slow in globals.css); no fill, just the
              uppercase text on the circular path. */}
          <div className="relative z-[2] mx-auto h-0 w-[110px] sm:w-[130px]">
            <div className="pointer-events-none absolute left-1/2 top-4 h-[110px] w-[110px] -translate-x-1/2 sm:top-6 sm:h-[130px] sm:w-[130px]">
              <svg viewBox="0 0 100 100" className="cb-spin-slow h-full w-full">
                <defs>
                  <path id="cb-badge-circle" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>
                <text className="font-sans" fontSize="8" fontWeight={700} letterSpacing="0.5" fill="var(--cb-text)">
                  <textPath href="#cb-badge-circle" startOffset="0%">
                    {lang === "en"
                      ? "AVAILABLE FOR WORK ✦ AVAILABLE FOR WORK ✦ "
                      : "DISPONIBLE PARA TRABAJAR ✦ DISPONIBLE PARA TRABAJAR ✦ "}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          <div className="relative mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
            <dl className="relative z-[1] grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="m-0 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--cb-muted)]">
                    {item.label}
                  </dt>
                  <dd className="m-0 mt-1.5 font-sans text-[16px] font-bold leading-snug">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div
              ref={photoRef}
              className="relative z-0 aspect-square w-full overflow-hidden will-change-transform sm:max-w-[620px] lg:mx-0 lg:ml-auto lg:-mt-24"
              style={{ background: "var(--cb-pill)" }}
            >
              <Image
                src="/profile/avatar-portfolio.webp"
                alt="Consuelo Burotto"
                fill
                sizes="(min-width:1024px) 620px, 80vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* One large banner playing each selected project's own hero
              media (video autoplays, image just displays) one at a time,
              instead of three small static tiles — echoing the reference's
              single big demo banner rather than a photo collage. Sized to
              each slide's own natural length (fit="auto") rather than a
              fixed box, so the full banner shows with no crop or letterbox. */}
          {bannerWorks.length > 0 && (
            <div className="relative mt-14 w-full sm:mt-20" style={{ background: "var(--cb-pill)" }}>
              <div key={bannerWorks[bannerIndex].slug} className={reducedMotionBanner ? "" : "cb-banner-fade-in"}>
                <ProjectMedia
                  media={bannerWorks[bannerIndex].coverMedia}
                  label={bannerWorks[bannerIndex].cover}
                  sizes="(min-width:1100px) 1040px, 100vw"
                  uploadPath={`/projects/${assetFolder(bannerWorks[bannerIndex])}/cover`}
                  fit="auto"
                />
              </div>

              <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
                <div className="pointer-events-none font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                  {titleCase(bannerWorks[bannerIndex].title)}
                </div>

                {bannerWorks.length > 1 && (
                  <div className="flex gap-2">
                    {bannerWorks.map((project, i) => (
                      <button
                        key={project.slug}
                        type="button"
                        onClick={() => setBannerIndex(i)}
                        aria-label={project.title}
                        className="h-1.5 rounded-full border-none p-0 transition-all"
                        style={{
                          width: i === bannerIndex ? "24px" : "8px",
                          background: i === bannerIndex ? "#fff" : "rgba(255,255,255,0.5)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {bannerWorks.length > 1 && (
                <button
                  type="button"
                  onClick={() => setBannerPaused((p) => !p)}
                  aria-label={bannerPaused ? (lang === "en" ? "Resume" : "Reanudar") : lang === "en" ? "Pause" : "Pausar"}
                  className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
                >
                  {!reducedMotionBanner && (
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
                      <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                      <circle
                        key={bannerIndex}
                        cx="22"
                        cy="22"
                        r="19"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        pathLength={100}
                        strokeDasharray={100}
                        className="cb-ring-fill"
                        style={{ animationPlayState: bannerPaused ? "paused" : "running" }}
                        onAnimationEnd={() => {
                          if (!bannerPaused) goToNextBannerWork();
                        }}
                      />
                    </svg>
                  )}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="relative z-[1]">
                    <rect x="3" y="2" width="3.5" height="12" rx="0.5" />
                    <rect x="9.5" y="2" width="3.5" height="12" rx="0.5" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </header>

        {/* Selected works — SaaS/product only, 2-up grid */}
        <section id="work" className="scroll-mt-24">
          <h2 className="m-0 text-[clamp(22px,3vw,28px)]" style={{ ...serif, marginBottom: "34px" }}>
            {lang === "en" ? "Selected work" : "Trabajos seleccionados"}
          </h2>

          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16">
            {selectedWorks.map((project, i) => (
              <Link
                key={project.slug}
                href={`/portfolio/projects/${project.slug}`}
                className={`group flex flex-col gap-[20px] no-underline ${i % 2 === 1 ? "sm:mt-24" : ""}`}
              >
                <div className="relative aspect-[675.5/928.81] w-full overflow-hidden" style={{ background: "var(--cb-pill)" }}>
                  <ProjectMedia
                    media={project.coverMedia}
                    label={project.cover}
                    sizes="(min-width:1100px) 520px, 100vw"
                    uploadPath={`/projects/${assetFolder(project)}/cover`}
                    objectPosition={project.slug === "altafid-risk-assessment" ? "center" : "left"}
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="m-0 font-sans text-lg font-bold">{titleCase(project.title)}</h3>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
                      {project.client} · {project.year}
                    </span>
                  </div>
                  <p className="m-0 max-w-[52ch] font-sans text-[15px] leading-relaxed text-[var(--cb-muted)]">
                    {project.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* What I do — clean 3-up grid, no numbers, closing with a CTA
            (matches the reference's "Have a project in mind?" pattern). */}
        <section id="about" className="mt-28 scroll-mt-24 border-t pt-16 sm:mt-36 sm:pt-20" style={{ borderColor: "var(--cb-hair)" }}>
          <h2 className="m-0 mb-12 text-[clamp(22px,3vw,28px)] sm:mb-16" style={serif}>
            {lang === "en" ? "What I do" : "Qué hago"}
          </h2>
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
            {WHAT_I_DO.map((item, i) => {
              // Gray hairline dividers, same token used everywhere else on
              // the site — a top divider above every row after the first
              // (all items but the first on mobile's single column; only
              // the second row at sm+'s 3-col grid), plus a left divider
              // between columns at sm+ (never on mobile, single column).
              const isFirstRowDesktop = i < 3;
              const isFirstColDesktop = i % 3 === 0;
              const dividerClass = [
                "p-[34px]",
                i === 0 ? "" : "border-t",
                isFirstRowDesktop ? "sm:border-t-0" : "sm:border-t",
                isFirstColDesktop ? "" : "sm:border-l",
              ].join(" ");
              return (
                <div key={item.n} className={dividerClass} style={{ borderColor: "var(--cb-hair)" }}>
                  <div className="m-0 font-sans text-[11px] font-bold tracking-[0.08em] text-[var(--cb-muted)]">{item.n}</div>
                  <h3 className="m-0 mt-3 font-sans text-base font-bold">{lang === "en" ? item.title.en : item.title.es}</h3>
                  <p className="m-0 mt-2 max-w-[38ch] font-sans text-sm leading-relaxed text-[var(--cb-muted)]">
                    {lang === "en" ? item.body.en : item.body.es}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer — copyright + social links. */}
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
