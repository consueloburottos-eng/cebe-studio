"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";
import ProgressiveBlur from "../ProgressiveBlur";
import AboutModal from "./AboutModal";
import BookModal from "./BookModal";
import NavPill from "./NavPill";
import TopRight from "./TopRight";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { localizeProject, localizeProjects, t } from "@/lib/i18n";

// span sequence lifted from the original prototype's projSel.intro grid (indices 0-12)
const INTRO_SPAN_PATTERN = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1];

// Mobile intro strip: tiles keep the exact pixel size they'd have on desktop
// (computed from the same 9-column / 10px-gap formula as the desktop grid,
// at the page's max content width) instead of shrinking to fit — the strip
// scrolls horizontally in a single row instead.
const DESKTOP_CONTENT_WIDTH = 1130 - 28 * 2; // max-w-[1130px] minus px-7 both sides
const INTRO_GRID_GAP = 10;
const INTRO_UNIT = (DESKTOP_CONTENT_WIDTH - INTRO_GRID_GAP * 8) / 9;
// row height is a single fixed value shared by every tile (as on desktop,
// where grid-auto-rows is one constant) — only width scales with the span,
// so a span-2 tile reads as wide/landscape rather than tall/portrait.
const INTRO_ROW_HEIGHT = Math.round(INTRO_UNIT * 1.4);
function mobileTileSize(span: number) {
  const width = Math.round(INTRO_UNIT * span + INTRO_GRID_GAP * (span - 1));
  return { width, height: INTRO_ROW_HEIGHT };
}

type ProjectDetailProps = {
  project: Project;
  others: Project[];
  prevSlug: string;
  nextSlug: string;
};

type Tab = "brief" | "strategy" | "services" | "skills" | (string & {});

export default function ProjectDetail({ project: rawProject, others: rawOthers, prevSlug, nextSlug }: ProjectDetailProps) {
  const router = useRouter();
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const project = localizeProject(rawProject, lang);
  const others = localizeProjects(rawOthers, lang);
  const ui = t("projectDetail", lang);
  const [activeTab, setActiveTab] = useState<Tab>("brief");
  // services is stored as a single " · "-joined string (see data/projects.ts)
  // in roughly the order the work happened — split back out for the tab's
  // numbered list instead of showing it as one run-on line.
  const serviceSteps = project.services
    ? project.services.split("·").map((s) => s.trim()).filter(Boolean)
    : [];
  const activeFeature = project.features?.find((f) => f.id === activeTab);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredOtherIndex, setHoveredOtherIndex] = useState<number | null>(null);
  const folder = assetFolder(project);

  // Intro splash: reprises the hero's per-letter title stagger (.cb-letter,
  // globals.css) on the project's own name before fading out to reveal
  // the loaded project — reruns on every slug change (prev/next arrows),
  // not just first mount.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [introVisible, setIntroVisible] = useState(!reducedMotion);
  const [introExiting, setIntroExiting] = useState(false);
  // Group letters by word (each word its own non-wrapping unit) so the
  // title can still wrap between words at normal breakable spaces, without
  // splitting a word's own letters — or trailing punctuation — across lines.
  const introWords = project.title.split(" ");
  let introLetterIndex = 0;
  const introNodes: ReactNode[] = [];
  introWords.forEach((word, wi) => {
    if (wi > 0) introNodes.push(" ");
    introNodes.push(
      <span key={`w${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char) => {
          const i = introLetterIndex++;
          return (
            <span key={i} className="cb-letter" style={{ "--i": i } as CSSProperties}>
              {char}
            </span>
          );
        })}
      </span>
    );
  });

  useEffect(() => {
    if (reducedMotion) {
      setIntroVisible(false);
      return;
    }
    setIntroVisible(true);
    setIntroExiting(false);
    // hold until the slowest letter finishes its stagger + settle, then fade
    const holdMs = introLetterIndex * 30 + 620 + 350;
    const exitMs = 500;
    const exitTimer = window.setTimeout(() => setIntroExiting(true), holdMs);
    const hideTimer = window.setTimeout(() => setIntroVisible(false), holdMs + exitMs);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug, reducedMotion]);

  // In production the grid is adaptive — only tiles that actually have media
  // render, so a project with 6 photos shows a clean full row instead of
  // trailing placeholders. In dev we still pad to the full 13-slot grid so the
  // click-to-upload overlay has empty target slots to upload into.
  const isDev = process.env.NODE_ENV === "development";
  const slotCount = isDev
    ? INTRO_SPAN_PATTERN.length
    : Math.min(project.gallery.length, INTRO_SPAN_PATTERN.length);
  const introItems = Array.from(
    { length: slotCount },
    (_, i) => project.gallery[i] ?? { label: "Imagen próximamente" }
  );

  return (
    <div className="min-h-dvh" style={{ color: "var(--cb-text)" }} data-cb-theme={dark ? "dark" : "light"}>
      {introVisible && (
        <div
          key={project.slug}
          aria-hidden="true"
          className={`fixed inset-0 z-[300] flex items-center justify-center px-[6vw] ${
            introExiting ? "cb-intro-exit" : ""
          }`}
          style={{ background: "var(--cb-bg)" }}
        >
          <h1
            className="m-0 max-w-[16ch] text-center font-display font-extrabold lowercase leading-[.9] tracking-[-0.035em]"
            style={{ fontSize: "clamp(28px,7vw,88px)", color: "var(--cb-text)" }}
          >
            {introNodes}
          </h1>
        </div>
      )}

      {/* premium fullscreen frosted-glass backdrop — built from the project's
          own cover photo. Filter lives on this fixed leaf layer, not the
          root, so it never becomes a containing block for the fixed bottom
          bar below (see ProjectMedia CSS bug notes). Layered so it still
          looks intentional (not just empty) on projects whose cover is a
          video, which can't be blurred the same way. */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          background: dark
            ? "linear-gradient(160deg, #2a2622 0%, #201d1a 55%, #17150f 100%)"
            : "linear-gradient(160deg, #efe9df 0%, #e4dccd 55%, #d8ceba 100%)",
        }}
      >
        {project.coverMedia?.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverMedia.src}
            alt=""
            className="h-full w-full scale-125 object-cover"
            style={{ filter: "blur(48px) saturate(1.5) brightness(1.02)" }}
          />
        )}
        {/* wash — enough to keep foreground text legible without flattening
            the blurred photo into a flat color wash */}
        <div
          className="absolute inset-0"
          style={{ background: dark ? "rgba(20,18,16,.4)" : "rgba(244,241,234,.25)" }}
        />
        {/* gentle vignette for premium edge falloff */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 12%, transparent 55%, rgba(20,18,16,.1) 100%)",
          }}
        />
      </div>

      <Link
        href={`/projects/${prevSlug}`}
        title={lang === "en" ? "previous project" : "proyecto anterior"}
        className="fixed top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-none no-underline backdrop-blur-xl sm:left-6"
        style={{ background: "var(--cb-glass-pill)", color: "var(--cb-text)" }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </Link>
      <Link
        href={`/projects/${nextSlug}`}
        title={lang === "en" ? "next project" : "siguiente proyecto"}
        className="fixed top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-none no-underline backdrop-blur-xl sm:right-6"
        style={{ background: "var(--cb-glass-pill)", color: "var(--cb-text)" }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      <div className="fixed inset-x-0 top-0 z-10">
        <ModeSwitcher
          mode="branding"
          variant={dark ? "dark" : "light"}
          dark={dark}
          onSetLight={() => setDark(false)}
          onSetDark={() => setDark(true)}
          lang={lang}
          onSetLang={setLang}
        />
        <ProgressiveBlur side="top" height={110} />
        <div className="relative z-[1] flex h-[60px] items-center justify-between px-4 sm:px-[26px]">
          <NavPill
            open={navOpen}
            onToggle={() => setNavOpen((o) => !o)}
            onOpenAbout={() => {
              setNavOpen(false);
              setAboutOpen(true);
            }}
            onOpenGrid={() => {
              setNavOpen(false);
              router.push("/");
            }}
            onOpenBook={() => {
              setNavOpen(false);
              setBookOpen(true);
            }}
          />

          <TopRight
            onOpenBook={() => setBookOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
          />
        </div>
      </div>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}

      <div className="fixed inset-x-0 bottom-0 z-[110]">
        <ProgressiveBlur side="bottom" height={110} />
        <div className="relative z-[1] flex h-[60px] items-center justify-end gap-2.5 px-7">
          <button
            type="button"
            onClick={() => router.push("/?grid=1")}
            title={lang === "en" ? "view all projects" : "ver todos los proyectos"}
            className="flex h-10 w-10 items-center justify-center rounded-full border-none text-base leading-none"
            style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
          >
            ⊞
          </button>
          <Link
            href="/"
            title={lang === "en" ? "back" : "volver"}
            className="flex h-10 w-10 items-center justify-center rounded-full border-none text-[15px]"
            style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
          >
            ✕
          </Link>
        </div>
      </div>

      <div
        className="relative z-0 min-h-dvh w-full rounded-none backdrop-blur-2xl"
        style={{ background: "var(--cb-glass-pill)" }}
      >
        <div className="mx-auto max-w-[1130px] px-7 pt-[120px] pb-[90px]">
          <div
            className="relative mb-10 aspect-[1482/798] overflow-hidden rounded-[4px] sm:rounded-[20px]"
            style={{ background: "var(--cb-pill)" }}
          >
            <ProjectMedia
              media={project.coverMedia}
              label={project.cover}
              sizes="(min-width:1130px) 1130px, 100vw"
              uploadPath={`/projects/${folder}/cover`}
            />
          </div>

          <div className="mb-14 flex gap-[10px] overflow-x-auto pb-1 sm:hidden">
            {introItems.map((g, i) => {
              const span = INTRO_SPAN_PATTERN[i];
              const { width, height } = mobileTileSize(span);
              return (
                <div
                  key={i}
                  className="flex-none overflow-hidden rounded-[4px]"
                  style={{ width, height, background: "var(--cb-pill)" }}
                >
                  <ProjectMedia
                    media={g.media}
                    label={g.label}
                    sizes={`${width}px`}
                    uploadPath={`/projects/${folder}/intro-${String(i + 1).padStart(2, "0")}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="mb-14 hidden sm:block" style={{ containerType: "inline-size" }}>
            <div
              className="grid gap-[10px]"
              style={{
                gridTemplateColumns: "repeat(9, 1fr)",
                // row height follows the fluid column width, keeping the
                // original 120:168 (1:1.4) tile proportions at any viewport
                gridAutoRows: "calc((100cqw - 80px) / 9 * 1.4)",
                gridAutoFlow: "row dense",
              }}
            >
              {introItems.map((g, i) => {
                const span = INTRO_SPAN_PATTERN[i];
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
                      uploadPath={`/projects/${folder}/intro-${String(i + 1).padStart(2, "0")}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
            <div className="flex flex-col gap-3 font-sans">
              <button
                type="button"
                onClick={() => setActiveTab("brief")}
                className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                style={{ opacity: activeTab === "brief" ? 1 : 0.45 }}
              >
                {ui.brief}
              </button>
              {project.strategy.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("strategy")}
                  className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                  style={{ opacity: activeTab === "strategy" ? 1 : 0.45 }}
                >
                  {ui.strategy}
                </button>
              )}
              {serviceSteps.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("services")}
                  className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                  style={{ opacity: activeTab === "services" ? 1 : 0.45 }}
                >
                  {ui.services}
                </button>
              )}
              {project.skills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("skills")}
                  className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                  style={{ opacity: activeTab === "skills" ? 1 : 0.45 }}
                >
                  {ui.skills}
                </button>
              )}
              {project.features?.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveTab(feature.id)}
                  className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                  style={{ opacity: activeTab === feature.id ? 1 : 0.45 }}
                >
                  {feature.label}
                </button>
              ))}
            </div>
            <div>
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--cb-text)]">
                {project.tag}
              </div>
              <h1 className="mt-2.5 font-display font-extrabold lowercase leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(34px,4.6vw,54px)" }}
              >
                {project.title}
              </h1>
              <div className="mt-4 text-base font-bold">{project.subtitle}</div>

              <div id="project-copy" className="mt-3.5 flex max-w-[60ch] flex-col gap-4 text-[15.5px] font-medium leading-[1.75]">
                {activeTab === "brief" && <p>{project.brief}</p>}

                {activeTab === "strategy" &&
                  project.strategy.map((paragraph, i) => <p key={i}>{paragraph}</p>)}

                {activeTab === "services" && (
                  <ol className="flex flex-col gap-3">
                    {serviceSteps.map((step, i) => (
                      <li key={step} className="flex items-baseline gap-3">
                        <span
                          className="font-mono text-[12px] font-bold"
                          style={{ color: "var(--cb-muted)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === "skills" && (
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border px-3.5 py-1.5 text-xs font-bold"
                        style={{ borderColor: "var(--cb-hair)", background: "transparent", color: "var(--cb-text)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {activeFeature &&
                  activeFeature.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3.5 border-t border-b py-4 sm:grid-cols-3"
                style={{ borderColor: "var(--cb-hair)" }}
              >
                <Meta label={ui.client} value={project.client} />
                <Meta label={ui.role} value={project.role} />
                <Meta label={ui.result} value={project.result} accent />
              </div>
            </div>
          </div>

          <div className="mt-16 border-t pt-[34px]" style={{ borderColor: "var(--cb-hair)" }}>
            <div className="flex flex-wrap gap-6 text-[13px] text-[var(--cb-text)]">
              <Link href="/" className="text-inherit no-underline">
                {ui.home}
              </Link>
              <a href={`mailto:consuelo.burotto.s@gmail.com`} className="text-inherit no-underline">
                {ui.email}
              </a>
            </div>

            {others.length > 0 && (
              <>
                <div className="mt-7 flex gap-4 overflow-x-auto pt-6 pb-3">
                  {others.map((other, i) => {
                    const distance =
                      hoveredOtherIndex === null ? Infinity : Math.abs(i - hoveredOtherIndex);
                    // scaled growth is symmetric around each card's own center, so
                    // neighboring cards' growth eats into the shared 16px (gap-4)
                    // gutter from both sides — keep (scale0-1)+(scale1-1) comfortably
                    // under gap/130 so the gap never visually closes on hover.
                    const scale = distance === 0 ? 1.08 : distance === 1 ? 1.02 : 1;
                    return (
                      <Link
                        key={other.slug}
                        href={`/projects/${other.slug}`}
                        className="relative block w-[260px] flex-none text-inherit no-underline"
                        onMouseEnter={() => setHoveredOtherIndex(i)}
                        onMouseLeave={() => setHoveredOtherIndex(null)}
                        onFocus={() => setHoveredOtherIndex(i)}
                        onBlur={() => setHoveredOtherIndex(null)}
                        style={{
                          transform: `scale(${scale})`,
                          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                          transformOrigin: "center bottom",
                          zIndex: distance === 0 ? 2 : distance === 1 ? 1 : 0,
                        }}
                      >
                        <div
                          className="h-[150px] w-[260px] overflow-hidden rounded-xl"
                          style={{ background: "var(--cb-pill)" }}
                        >
                          <ProjectMedia
                            media={other.coverMedia}
                            label={other.cover}
                            compact
                            sizes="260px"
                            uploadPath={`/projects/${assetFolder(other)}/cover`}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--cb-text)]">
        {label}
      </div>
      <div
        className="mt-1.5 text-sm"
        style={accent ? { color: "#B8623F" } : undefined}
      >
        {value}
      </div>
    </div>
  );
}
