"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { categories, searchProjects, Project } from "@/data/projects";
import ModeSwitcher from "@/components/ModeSwitcher";
import MarketplaceHeader from "./MarketplaceHeader";
import ConciergeBar from "./ConciergeBar";
import ResultsGrid from "./ResultsGrid";
import FullscreenMenu from "./FullscreenMenu";
import ProjectMedia from "@/components/ProjectMedia";
import { useSiteTheme } from "@/hooks/useSiteTheme";

const EXAMPLES = [
  "Muéstrame tu trabajo en product design",
  "Quiero ver dirección de arte y fotografía conceptual",
  "Busco un proyecto de dirección editorial",
  "Enséñame diseño de experiencia agéntica",
];

// asymmetric 6-photo showcase grid (tall-short-short-tall), styled after a
// gallery landing strip. Not tied to any single project — these represent
// services (spanning many projects each), so each tile is its own upload
// slot under /showcase/ rather than pulling from a project's media.
const SHOWCASE = [
  {
    id: "service-1",
    label: "Servicio 01",
    title: "SaaS Design",
    desc: "Interfaces intuitivas que convierten usuarios en clientes.",
    media: { type: "image" as const, src: "/showcase/service-1.webp" },
  },
  {
    id: "service-2",
    label: "Servicio 02",
    title: "Ecommerce Websites",
    desc: "Tiendas online diseñadas para vender más y mejor.",
    media: { type: "image" as const, src: "/showcase/service-2.webp" },
  },
  {
    id: "service-3",
    label: "Servicio 03",
    title: "UX Research",
    desc: "Investigación de usuarios para tomar decisiones acertadas.",
    media: { type: "image" as const, src: "/showcase/service-3.webp" },
  },
  {
    id: "service-4",
    label: "Servicio 04",
    title: "Design Systems",
    desc: "Sistemas de diseño escalables que alinean equipos y productos.",
    media: { type: "image" as const, src: "/showcase/service-4.webp" },
  },
  {
    id: "service-5",
    label: "Servicio 05",
    title: "Brand & Visual Identity",
    desc: "Marcas memorables que comunican valor y generan confianza.",
    media: { type: "image" as const, src: "/showcase/service-5.webp" },
  },
  {
    id: "service-6",
    label: "Servicio 06",
    title: "Product Strategy",
    desc: "Estrategia de producto centrada en el usuario y el negocio.",
    media: { type: "image" as const, src: "/showcase/service-6.png" },
  },
];

type Mode = "home" | "loading" | "results";

const DEV_UPLOAD_ENABLED = process.env.NODE_ENV === "development";
const HERO_UPLOAD_PATH = "/marketplace/hero";

type HeroCacheEntry = { type: "video" | "image"; src: string; version: number };

export default function MarketplaceHome() {
  const [dark, setDark] = useSiteTheme();
  const [mode, setMode] = useState<Mode>("home");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [favorited, setFavorited] = useState<Set<string>>(new Set());
  const [inCart, setInCart] = useState<Set<string>>(new Set());
  const [heroCache, setHeroCache] = useState<HeroCacheEntry | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!DEV_UPLOAD_ENABLED) return;
    try {
      const raw = window.localStorage.getItem(`cb-dev-upload:${HERO_UPLOAD_PATH}`);
      if (raw) setHeroCache(JSON.parse(raw));
    } catch {
      // ignore — worst case the banner just won't remember across reloads
    }
  }, []);

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("path", HERO_UPLOAD_PATH);
    const res = await fetch("/api/dev-upload", { method: "POST", body: form });
    if (!res.ok) {
      alert(`No se pudo subir el archivo: ${await res.text()}`);
      return;
    }
    const { path: savedPath }: { path: string } = await res.json();
    const entry: HeroCacheEntry = {
      type: file.type.startsWith("video/") ? "video" : "image",
      src: savedPath,
      version: Date.now(),
    };
    window.localStorage.setItem(`cb-dev-upload:${HERO_UPLOAD_PATH}`, JSON.stringify(entry));
    setHeroCache(entry);
  }

  const heroMedia: HeroCacheEntry = heroCache ?? { type: "image", src: "/marketplace/hero.webp", version: 0 };
  const heroSrc = heroCache ? `${heroCache.src}?v=${heroCache.version}` : heroMedia.src;

  function toggleFavorite(id: string) {
    setFavorited((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCart(id: string) {
    setInCart((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

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

      <div
        className="relative flex-1 font-normal"
        style={{ color: "var(--mk-tx)", fontFamily: "var(--font-montserrat)" }}
      >
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
              {heroMedia.type === "video" ? (
                <video
                  key={heroSrc}
                  className="h-full w-full object-cover"
                  src={heroSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="hero — estudio y proceso de trabajo"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroSrc}
                  alt="hero — estudio y proceso de trabajo"
                  className="h-full w-full object-cover"
                />
              )}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,.3), rgba(0,0,0,0) 50%)" }}
              />
            </div>
            {DEV_UPLOAD_ENABLED && (
              <>
                <input
                  ref={heroInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleHeroUpload}
                />
                <button
                  type="button"
                  onClick={() => heroInputRef.current?.click()}
                  title="Subir banner (solo en desarrollo local)"
                  className="absolute bottom-4 left-4 z-[7] rounded-full border-none bg-black/45 px-3.5 py-2 font-sans text-[11px] font-semibold text-white backdrop-blur-md"
                >
                  subir banner
                </button>
              </>
            )}
            <div className="mk-blur pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <span
                className="font-serif text-[clamp(34px,6vw,60px)] leading-[1.15]"
                style={{ color: "var(--mk-tx)" }}
              >
                Design with <em className="italic">purpose</em>.
                <br />
                Create with <em className="italic">clarity</em>.
              </span>
              <span
                className="max-w-[560px] text-[15px] leading-[1.5]"
                style={{ color: "rgba(var(--mk-txrgb),.82)" }}
              >
                A design studio crafting digital products, brands and experiences that are
                beautiful, functional and meaningful.
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

          <div className="pt-14 pb-2 text-center sm:pt-16">
            <span
              className="font-serif text-[clamp(26px,4vw,40px)]"
              style={{ color: "var(--mk-tx)" }}
            >
              Design Services
            </span>
          </div>

          <div className="relative h-[86vh] w-full px-3 py-3 sm:px-5 sm:py-5">
            <div
              className="grid h-full gap-2.5"
              style={{ gridTemplateColumns: "1.15fr 1fr 1fr 1.15fr", gridTemplateRows: "1fr 1fr" }}
            >
              {SHOWCASE.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[6px]"
                  style={{
                    background: "var(--mk-hr)",
                    gridColumn: i === 0 || i === 5 ? (i === 0 ? "1" : "4") : i <= 2 ? "2" : "3",
                    gridRow: i === 0 || i === 5 ? "1 / span 2" : i % 2 === 1 ? "1" : "2",
                  }}
                >
                  <ProjectMedia
                    media={item.media}
                    label={item.label}
                    sizes="(min-width:1100px) 30vw, 45vw"
                    uploadPath={`/showcase/${item.id}`}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[15]"
                    style={{ background: "linear-gradient(180deg, rgba(0,0,0,.42), rgba(0,0,0,0) 45%)" }}
                  />
                  <div className="absolute top-4 left-4 z-[16] max-w-[78%] font-sans">
                    <div className="text-[17px] font-bold text-white sm:text-[19px]">{item.title}</div>
                    <div className="mt-1.5 text-[12.5px] leading-[1.4] text-white/80">{item.desc}</div>
                    <button
                      type="button"
                      onClick={() => submit(item.title)}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border-none bg-white/90 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#141210] backdrop-blur-md"
                    >
                      Ver servicio <span aria-hidden="true">→</span>
                    </button>
                  </div>
                  <div className="absolute right-2.5 bottom-2.5 z-20 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item.id)}
                      title="Agregar a favoritos"
                      aria-pressed={favorited.has(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-none text-[14px] backdrop-blur-md"
                      style={{
                        background: favorited.has(item.id) ? "#B8623F" : "rgba(0,0,0,.4)",
                        color: "#fff",
                      }}
                    >
                      {favorited.has(item.id) ? "♥" : "♡"}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCart(item.id)}
                      title="Agregar al carro"
                      aria-pressed={inCart.has(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-none text-[16px] backdrop-blur-md"
                      style={{
                        background: inCart.has(item.id) ? "#B8623F" : "rgba(0,0,0,.4)",
                        color: "#fff",
                      }}
                    >
                      {inCart.has(item.id) ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="pointer-events-none absolute bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-2 font-sans text-[12px] uppercase"
              style={{ color: "var(--mk-tx)", letterSpacing: ".18em" }}
            >
              <span>↓</span>
              <span>Scroll to explore</span>
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
