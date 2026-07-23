"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects, getProject, type Project } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import ProgressiveBlur from "@/components/ProgressiveBlur";
import NavPill from "./NavPill";
import TopRight from "./TopRight";
import HeroDeck from "./HeroDeck";
import LastProjectWidget from "./LastProjectWidget";
import GridButton from "./GridButton";
import ProjectsGridOverlay from "./ProjectsGridOverlay";
import AboutModal from "./AboutModal";
import BookModal from "./BookModal";
import BrandingCursor from "./BrandingCursor";

// Curated hero order per Consu — these six lead the deck (best work first),
// the rest of the catalogue follows behind in its normal order. Doesn't
// affect the projects grid overlay or any other listing, only the hero.
const HERO_PRIORITY_SLUGS = [
  "buildwithin",
  "buildwithin-design-system",
  "altafid-design-system",
  "altafid",
  "rocket-mkt",
  "talent-capital",
];

const heroProjects: Project[] = [
  ...HERO_PRIORITY_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is Project => Boolean(p)
  ),
  ...projects.filter((p) => !HERO_PRIORITY_SLUGS.includes(p.slug)),
];

// Hero intro: "product designer" split into per-letter spans so the .cb-letter
// CSS animation (globals.css) can stagger each one in on first mount.
const HERO_TITLE_LETTERS = "product designer"
  .split("")
  .map((char, i) => ({ char, i }));

export default function BrandingHome() {
  const [dark, setDark] = useSiteTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [front, setFront] = useState(0);

  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const customCursor = finePointer && !reducedMotion;

  const cooldownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  // Landing here from ProjectDetail's grid button (?grid=1) opens the grid
  // overlay directly instead of just dropping back onto the hero.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("grid") === "1") {
      setGridOpen(true);
      window.history.replaceState(null, "", "/");
    }
  }, []);

  function shuffle(dir: number) {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, 360);
    setFront((f) => (f + dir + heroProjects.length) % heroProjects.length);
  }

  useEffect(() => {
    const blocked = bookOpen || aboutOpen || gridOpen;

    function onWheel(e: WheelEvent) {
      if (blocked) return;
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      shuffle(dir);
    }
    function onTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    }
    function onTouchEnd(e: TouchEvent) {
      if (blocked || touchStartYRef.current == null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      if (Math.abs(delta) < 40) return;
      shuffle(delta > 0 ? 1 : -1);
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [bookOpen, aboutOpen, gridOpen]);

  function closeNavAnd(fn: () => void) {
    setNavOpen(false);
    fn();
  }

  const counter = `${String(front + 1).padStart(2, "0")} / ${String(
    heroProjects.length
  ).padStart(2, "0")}`;

  return (
    <div
      data-cb-theme={dark ? "dark" : "light"}
      className="flex h-dvh w-full flex-col overflow-clip"
      style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
    >
      <ModeSwitcher
        mode="branding"
        dark={dark}
        onSetLight={() => setDark(false)}
        onSetDark={() => setDark(true)}
      />

      <div
        className={`relative flex-1 overflow-clip ${customCursor ? "cursor-none" : ""}`}
      >
        <BrandingCursor active={customCursor} />

        <HeroDeck
          projects={heroProjects}
          front={front}
          onAdvance={() =>
            setFront((f) => (f + 1) % heroProjects.length)
          }
        />

        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-[6vw]">
          <h1
            className="m-0 max-w-[15ch] text-center font-display font-extrabold lowercase leading-[.9] tracking-[-0.035em]"
            style={{ fontSize: "clamp(40px,8.6vw,132px)", color: "var(--cb-text)" }}
            aria-label="product designer"
          >
            <span aria-hidden="true">
              {HERO_TITLE_LETTERS.map(({ char, i }) => (
                <span
                  key={i}
                  className="cb-letter"
                  style={{ "--i": i } as CSSProperties}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        <ProgressiveBlur side="top" height={110} className="z-[120]" />

        <div className="absolute inset-x-0 top-0 z-[130] flex h-[60px] items-center justify-between px-4 sm:px-[26px]">
          <NavPill
            open={navOpen}
            onToggle={() => setNavOpen((o) => !o)}
            onOpenAbout={() => closeNavAnd(() => setAboutOpen(true))}
            onOpenGrid={() => closeNavAnd(() => setGridOpen(true))}
            onOpenBook={() => closeNavAnd(() => setBookOpen(true))}
          />

          <TopRight
            audioOn={audioOn}
            onToggleAudio={() => setAudioOn((a) => !a)}
            onOpenBook={() => setBookOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
          />
        </div>

        <LastProjectWidget />
        <GridButton counter={counter} onOpen={() => setGridOpen(true)} />

        <div className="pointer-events-none absolute bottom-[30px] left-1/2 z-[15] -translate-x-1/2 font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--cb-muted)]">
          scroll ↕ para barajar
        </div>

        {gridOpen && (
          <ProjectsGridOverlay projects={projects} onClose={() => setGridOpen(false)} />
        )}
        {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
        {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}
      </div>
    </div>
  );
}
