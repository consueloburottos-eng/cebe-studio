"use client";

import { useEffect, useRef, useState } from "react";
import { projects, getProject, featuredProjectSlug } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import ModeSwitcher from "@/components/ModeSwitcher";
import NavPill from "./NavPill";
import TopRight from "./TopRight";
import HeroDeck from "./HeroDeck";
import LastProjectWidget from "./LastProjectWidget";
import GridButton from "./GridButton";
import ProjectsGridOverlay from "./ProjectsGridOverlay";
import AboutModal from "./AboutModal";
import BookModal from "./BookModal";
import BrandingCursor from "./BrandingCursor";

const featuredProject = getProject(featuredProjectSlug)!;

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

  function shuffle(dir: number) {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, 360);
    setFront((f) => (f + dir + projects.length) % projects.length);
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
    projects.length
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
          projects={projects}
          front={front}
          onAdvance={() =>
            setFront((f) => (f + 1) % projects.length)
          }
        />

        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-[6vw]">
          <h1 className="cb-title m-0 max-w-[15ch] text-center font-display font-extrabold lowercase leading-[.9] tracking-[-0.035em]"
            style={{ fontSize: "clamp(40px,8.6vw,132px)", color: "var(--cb-text)" }}
          >
            product designer
          </h1>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[120] h-[92px] backdrop-blur-2xl sm:h-[112px]"
          style={{ background: "linear-gradient(180deg, rgba(var(--cb-bgrgb), .55), rgba(var(--cb-bgrgb), 0))" }}
        />

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

        <LastProjectWidget project={featuredProject} />
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
