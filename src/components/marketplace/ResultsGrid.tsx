"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { Project, assetFolder, projects } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

export default function ResultsGrid({ results }: { results: Project[] }) {
  const [favorited, setFavorited] = useState<Set<string>>(new Set());
  const [inCart, setInCart] = useState<Set<string>>(new Set());
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function toggleFavorite(slug: string, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setFavorited((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  function addToCart(slug: string, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setInCart((prev) => new Set(prev).add(slug));
    setQuantities((prev) => ({ ...prev, [slug]: prev[slug] ?? 1 }));
    setActiveSlug(slug);
  }

  function changeQty(slug: string, delta: number) {
    setQuantities((prev) => ({ ...prev, [slug]: Math.max(1, (prev[slug] ?? 1) + delta) }));
  }

  const active = activeSlug ? projects.find((p) => p.slug === activeSlug) ?? null : null;
  const related = active
    ? projects.filter((p) => p.category === active.category && p.slug !== active.slug && !p.pending).slice(0, 8)
    : [];

  return (
    <>
      <div aria-live="polite" className="flex gap-1 overflow-x-auto pb-2">
        {results.map((p, i) => (
          <Link
            key={p.slug}
            href={`/marketplace/${p.slug}`}
            className="mk-blur flex h-[400px] w-[500px] flex-none flex-col text-left"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div
              className="relative min-h-0 flex-1 overflow-hidden rounded-lg"
              style={{ background: "var(--mk-surface)" }}
            >
              <ProjectMedia
                media={p.coverMedia}
                label={p.cover}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                uploadPath={`/projects/${assetFolder(p)}/cover`}
              />
              <div className="absolute right-2.5 bottom-2.5 z-20 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(p.slug, e)}
                  title="Agregar a favoritos"
                  aria-pressed={favorited.has(p.slug)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-none text-[14px] backdrop-blur-md"
                  style={{
                    background: favorited.has(p.slug) ? "#B8623F" : "rgba(0,0,0,.4)",
                    color: "#fff",
                  }}
                >
                  {favorited.has(p.slug) ? "♥" : "♡"}
                </button>
                <button
                  type="button"
                  onClick={(e) => addToCart(p.slug, e)}
                  title="Agregar al carro"
                  aria-pressed={inCart.has(p.slug)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-none text-[16px] backdrop-blur-md"
                  style={{
                    background: inCart.has(p.slug) ? "#B8623F" : "rgba(0,0,0,.4)",
                    color: "#fff",
                  }}
                >
                  {inCart.has(p.slug) ? "✓" : "+"}
                </button>
              </div>
            </div>
            <div className="mt-3.5 text-[17px]" style={{ color: "var(--mk-tx)" }}>
              {p.title}
            </div>
            <div
              className="mt-1 text-xs"
              style={{ color: "var(--mk-mut)", letterSpacing: ".12em", textTransform: "uppercase" }}
            >
              {p.category}
            </div>
          </Link>
        ))}
      </div>

      {active && (
        <div className="fixed inset-x-0 bottom-[104px] z-[140] flex justify-center px-6">
          <div
            className="w-full max-w-[640px] rounded-2xl border p-5 backdrop-blur-2xl"
            style={{ background: "rgba(20,18,16,.92)", borderColor: "rgba(255,255,255,.14)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="relative h-14 w-14 flex-none overflow-hidden rounded-md"
                  style={{ background: "var(--mk-surface)" }}
                >
                  <ProjectMedia
                    media={active.coverMedia}
                    label={active.cover}
                    compact
                    sizes="56px"
                    uploadPath={`/projects/${assetFolder(active)}/cover`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-white">{active.title}</span>
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(active.slug, e)}
                      title="Agregar a favoritos"
                      className="text-[13px]"
                      style={{ color: favorited.has(active.slug) ? "#B8623F" : "rgba(255,255,255,.6)" }}
                    >
                      {favorited.has(active.slug) ? "♥" : "♡"}
                    </button>
                  </div>
                  <div className="text-[12px] text-white/60">Cotización a medida</div>
                  <div className="mt-2 flex items-center gap-2.5">
                    <div className="flex items-center gap-2 rounded-full border" style={{ borderColor: "rgba(255,255,255,.2)" }}>
                      <button
                        type="button"
                        onClick={() => changeQty(active.slug, -1)}
                        title="Restar cantidad"
                        className="flex h-6 w-6 items-center justify-center border-none bg-transparent text-[13px] text-white"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-[12px] text-white">{quantities[active.slug] ?? 1}</span>
                      <button
                        type="button"
                        onClick={() => changeQty(active.slug, 1)}
                        title="Sumar cantidad"
                        className="flex h-6 w-6 items-center justify-center border-none bg-transparent text-[13px] text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-white/50">Agregado al carro ✓</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                title="Cerrar"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-none text-[13px] text-white"
                style={{ background: "rgba(255,255,255,.1)" }}
              >
                ✕
              </button>
            </div>

            {related.length > 0 && (
              <div className="mt-5">
                <div
                  className="mb-2.5 text-[11px] uppercase text-white/50"
                  style={{ letterSpacing: ".18em" }}
                >
                  Más proyectos de {active.category}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1.5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/marketplace/${r.slug}`}
                      className="group relative block h-20 w-32 flex-none overflow-hidden rounded-md"
                      style={{ background: "var(--mk-surface)" }}
                    >
                      <ProjectMedia
                        media={r.coverMedia}
                        label={r.cover}
                        compact
                        sizes="128px"
                        uploadPath={`/projects/${assetFolder(r)}/cover`}
                      />
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(r.slug, e)}
                        title="Agregar a favoritos"
                        className="absolute right-1 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-none text-[11px] backdrop-blur-md"
                        style={{
                          background: favorited.has(r.slug) ? "#B8623F" : "rgba(0,0,0,.45)",
                          color: "#fff",
                        }}
                      >
                        {favorited.has(r.slug) ? "♥" : "♡"}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
