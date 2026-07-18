"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { categories, searchProjects, projects, Project } from "@/data/projects";
import ModeSwitcher from "@/components/ModeSwitcher";
import MarketplaceHeader from "./MarketplaceHeader";
import ConciergeBar from "./ConciergeBar";
import ResultsGrid from "./ResultsGrid";
import FullscreenMenu from "./FullscreenMenu";

const EXAMPLES = [
  "Muéstrame tu trabajo en product design",
  "Quiero ver dirección de arte y fotografía conceptual",
  "Busco un proyecto de dirección editorial",
  "Enséñame diseño de experiencia agéntica",
];

type Mode = "home" | "loading" | "results";

export default function MarketplaceHome() {
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState<Mode>("home");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setExampleIdx((i) => (i + 1) % EXAMPLES.length), 4000);
    return () => clearInterval(id);
  }, []);

  function submit(text: string) {
    const q = text.trim();
    if (!q) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setSubmitted(q);
    setMode("loading");
    timerRef.current = setTimeout(() => {
      setResults(searchProjects(q));
      setMode("results");
    }, 1100);
  }

  function clear() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMode("home");
    setQuery("");
    setSubmitted("");
  }

  function pickCategory(category: string) {
    setMenuOpen(false);
    setQuery(category);
    submit(category);
  }

  const featured = projects.filter((p) => !p.pending).slice(0, 6);

  return (
    <div
      data-mk-theme={dark ? "dark" : "light"}
      className="flex min-h-dvh w-full flex-col"
      style={{ background: "var(--mk-bg)" }}
    >
      <ModeSwitcher
        mode="marketplace"
        variant={dark ? "dark" : "light"}
        dark={dark}
        onSetLight={() => setDark(false)}
        onSetDark={() => setDark(true)}
      />

      <div className="relative flex-1 font-serif" style={{ color: "var(--mk-tx)" }}>
        {mode === "home" && (
          <>
          {/* The hero is always a dark, atmospheric photo per spec — pin its
              colors regardless of the light/dark toggle, which only governs
              the chrome around it (results/product views, concierge chrome). */}
          <div
            className="relative h-dvh w-full"
            style={
              {
                "--mk-tx": "#f2ede6",
                "--mk-txrgb": "242, 237, 230",
                "--mk-mut": "#cbbfae",
                "--ph-bg": "#1c1a17",
                "--ph-hair": "rgba(255,255,255,.14)",
                "--ph-chip-bg": "rgba(0,0,0,.35)",
                "--ph-chip-text": "rgba(242,237,230,.6)",
              } as CSSProperties
            }
          >
            <MarketplaceHeader onOpenMenu={() => setMenuOpen(true)} />
            <div className="absolute inset-0">
              <video
                className="h-full w-full object-cover"
                src="/marketplace/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-label="hero — estudio y proceso de trabajo"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,.4), rgba(0,0,0,.75))" }}
              />
            </div>
            <div className="mk-blur pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="font-serif text-[clamp(40px,7vw,72px)]" style={{ color: "var(--mk-tx)" }}>
                Welcome
              </span>
              <span
                className="max-w-[560px] text-[17px] leading-[1.5]"
                style={{ color: "rgba(var(--mk-txrgb),.82)" }}
              >
                Immerse yourself in the world of Consuelo Burotto and be inspired by a new,
                harmonious digital experience
              </span>
            </div>
            <ConciergeBar
              id="mkt-home"
              value={query}
              onChange={setQuery}
              onSubmit={() => submit(query)}
              placeholder={EXAMPLES[exampleIdx]}
              label="Describe qué proyectos del portafolio quieres ver"
              className="absolute bottom-11 left-1/2 z-[6] w-[min(640px,88vw)] -translate-x-1/2"
            />
          </div>

          <div className="mx-auto max-w-[1100px] px-6 py-16 sm:px-8">
            <span
              className="text-[12px] uppercase"
              style={{ color: "var(--mk-mut)", letterSpacing: ".2em" }}
            >
              Categorías
            </span>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => pickCategory(category)}
                  className="rounded-full border px-4 py-2 font-sans text-[12.5px]"
                  style={{ borderColor: "var(--mk-hr)", color: "var(--mk-tx)" }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-between">
              <span
                className="text-[12px] uppercase"
                style={{ color: "var(--mk-mut)", letterSpacing: ".2em" }}
              >
                Destacados
              </span>
              <button
                type="button"
                onClick={() => submit("proyectos")}
                className="border-none bg-transparent font-serif text-[13px] italic underline underline-offset-4"
                style={{ color: "var(--mk-tx)" }}
              >
                Ver todo
              </button>
            </div>
            <div className="mt-6">
              <ResultsGrid results={featured} />
            </div>
          </div>
          </>
        )}

        {mode === "loading" && (
          <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden" aria-live="polite">
            <div
              className="mk-glow absolute h-[420px] w-[420px] rounded-full"
              style={{ background: "radial-gradient(circle,rgba(198,138,61,.5),transparent 70%)" }}
            />
            <span className="mk-blur relative font-serif text-[26px] italic" style={{ color: "var(--mk-tx)" }}>
              Crafting your experience
            </span>
            <ConciergeBar
              id="mkt-loading"
              value={submitted}
              onChange={() => {}}
              onSubmit={() => {}}
              onClear={clear}
              placeholder=""
              label="Consulta enviada"
              className="absolute bottom-11 left-1/2 z-[6] w-[min(640px,88vw)] -translate-x-1/2 opacity-70"
            />
          </div>
        )}

        {mode === "results" && (
          <div className="relative h-dvh overflow-y-auto px-6 pt-7 pb-40 sm:px-8">
            <div className="mb-11 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex items-center gap-2 border-none bg-transparent font-sans text-[13px]"
                style={{ color: "var(--mk-tx)" }}
              >
                ☰ Menu
              </button>
              <span
                className="font-serif text-[15px]"
                style={{ color: "var(--mk-tx)", letterSpacing: ".22em", fontVariant: "small-caps" }}
              >
                Cebe:Studio
              </span>
              <span className="w-[52px]" aria-hidden="true" />
            </div>
            <div className="mx-auto max-w-[1100px]">
              <ResultsGrid results={results} />
            </div>
            <ConciergeBar
              id="mkt-results"
              value={query}
              onChange={setQuery}
              onSubmit={() => submit(query)}
              onClear={clear}
              placeholder="Escribe otra consulta o refina esta selección"
              label="Refina tu búsqueda de proyectos"
              className="fixed bottom-8 left-1/2 z-[6] w-[min(640px,88vw)] -translate-x-1/2"
            />
          </div>
        )}

        {menuOpen && (
          <FullscreenMenu categories={categories} onPick={pickCategory} onClose={() => setMenuOpen(false)} />
        )}
      </div>
    </div>
  );
}
