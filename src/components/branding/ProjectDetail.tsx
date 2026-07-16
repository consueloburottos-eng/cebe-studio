"use client";

import { useState } from "react";
import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

// span sequence lifted from the original prototype's projSel.intro grid (indices 0-12)
const INTRO_SPAN_PATTERN = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1];

type ProjectDetailProps = {
  project: Project;
  others: Project[];
};

export default function ProjectDetail({ project, others }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<"brief" | "strategy">("brief");
  const folder = assetFolder(project);

  // always render the full 13-slot intro grid; projects with fewer real images
  // fall back to placeholders for the remaining slots (edit project.gallery in
  // src/data/projects.ts to add real media to any of these 13 slots directly)
  const introItems = Array.from(
    { length: INTRO_SPAN_PATTERN.length },
    (_, i) => project.gallery[i] ?? { label: "Imagen próximamente" }
  );

  return (
    <div
      className="min-h-dvh"
      style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
      data-cb-theme="light"
    >
      <div
        className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-7 py-[15px] backdrop-blur-xl"
        style={{ background: "var(--cb-glass-pill)", borderColor: "var(--cb-hair)" }}
      >
        <span className="font-sans text-[13px] font-extrabold uppercase tracking-[0.12em]">
          CEBE:STUDIO
        </span>
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="rounded-full border-none px-5 py-2.5 font-sans text-xs font-extrabold uppercase tracking-[0.07em]"
            style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
          >
            Book me
          </Link>
        </div>
      </div>

      <Link
        href="/"
        title="volver"
        className="fixed bottom-[26px] right-[26px] z-[110] flex h-[54px] w-[54px] items-center justify-center rounded-full border-none text-xl backdrop-blur-xl"
        style={{ background: "var(--cb-glass-pill)", color: "var(--cb-text)" }}
      >
        ✕
      </Link>

      <div className="mx-auto max-w-[1200px] px-7 py-10 pb-[90px]">
        <div
          className="relative mb-10 aspect-[1482/798] overflow-hidden rounded-[18px]"
          style={{ background: "var(--cb-pill)" }}
        >
          <ProjectMedia
            media={project.coverMedia}
            label={project.cover}
            sizes="(min-width:1200px) 1200px, 100vw"
            uploadPath={`/projects/${folder}/cover`}
          />
        </div>

        <div className="mb-14" style={{ containerType: "inline-size" }}>
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
              className="text-left text-xs tracking-[0.06em] underline underline-offset-4"
              style={{ opacity: activeTab === "brief" ? 1 : 0.45 }}
            >
              brief
            </button>
            {project.strategy.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("strategy")}
                className="text-left text-xs tracking-[0.06em] underline underline-offset-4"
                style={{ opacity: activeTab === "strategy" ? 1 : 0.45 }}
              >
                strategy
              </button>
            )}
          </div>
          <div>
            <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--cb-muted)]">
              {project.tag}
            </div>
            <h1 className="mt-2.5 font-display font-extrabold lowercase leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px,4.6vw,54px)" }}
            >
              {project.title}
            </h1>
            <div className="mt-4 text-base font-bold">{project.subtitle}</div>

            {project.services && (
              <div className="mt-2.5 text-[13.5px] text-[var(--cb-muted)]">
                {project.services}
              </div>
            )}

            {project.skills.length > 0 && (
              <div className="mt-4 flex max-w-[60ch] flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3.5 py-1.5 text-xs text-[var(--cb-muted)]"
                    style={{ borderColor: "var(--cb-hair)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div id="project-copy" className="mt-3.5 flex max-w-[60ch] flex-col gap-4 text-[15.5px] leading-[1.75]">
              {activeTab === "brief"
                ? <p>{project.brief}</p>
                : project.strategy.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3.5 border-t border-b py-4 sm:grid-cols-4"
              style={{ borderColor: "var(--cb-hair)" }}
            >
              <Meta label="Cliente" value={project.client} />
              <Meta label="Rol" value={project.role} />
              <Meta label="Año" value={project.year} />
              <Meta label="Resultado" value={project.result} accent />
            </div>
          </div>
        </div>

        <div
          className="relative mt-12 h-[56vh] overflow-hidden rounded-[18px]"
          style={{ background: "var(--cb-pill)" }}
        >
          <ProjectMedia
            media={project.gallery[0]?.media}
            label={project.gallery[0]?.label ?? "imagen destacada"}
            sizes="(min-width:1200px) 1200px, 100vw"
            uploadPath={`/projects/${folder}/feature`}
          />
        </div>

        <div className="my-[72px] text-center font-display font-extrabold uppercase leading-none tracking-[-0.01em]"
          style={{ fontSize: "clamp(30px,5.5vw,68px)" }}
        >
          {project.headline}
        </div>

        <div className="mt-16 border-t pt-[34px]" style={{ borderColor: "var(--cb-hair)" }}>
          <div className="flex flex-wrap gap-6 text-[13px] text-[var(--cb-muted)]">
            <Link href="/" className="text-inherit no-underline">
              home
            </Link>
            <a href={`mailto:consuelo.burotto.s@gmail.com`} className="text-inherit no-underline">
              email
            </a>
          </div>

          {others.length > 0 && (
            <>
              <div className="mt-7 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--cb-muted)]">
                Más proyectos
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
                {others.slice(0, 6).map((other) => (
                  <Link
                    key={other.slug}
                    href={`/projects/${other.slug}`}
                    className="block w-[260px] flex-none text-inherit no-underline"
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
                    <div className="mt-2.5 text-[15px] font-bold lowercase">
                      {other.title}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
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
      <div className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
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
