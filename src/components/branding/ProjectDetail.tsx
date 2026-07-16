"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import MediaPlaceholder from "../MediaPlaceholder";

const SIZE_CLASS: Record<Project["gallery"][number]["size"], string> = {
  normal: "col-span-1 row-span-1",
  ancha: "col-span-2 row-span-1",
  alta: "col-span-1 row-span-2",
  grande: "col-span-2 row-span-2",
};

type ProjectDetailProps = {
  project: Project;
  others: Project[];
};

export default function ProjectDetail({ project, others }: ProjectDetailProps) {
  const [readMore, setReadMore] = useState(false);

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
          <Link
            href="/"
            title="volver"
            className="flex h-10 w-10 items-center justify-center rounded-full border text-[15px]"
            style={{ borderColor: "var(--cb-hair)" }}
          >
            ✕
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-7 py-10 pb-[90px]">
        <div
          className="relative mb-20 aspect-[1482/798] overflow-hidden rounded-[18px]"
          style={{ background: "var(--cb-pill)" }}
        >
          <MediaPlaceholder label={project.cover} />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
          <div className="flex flex-col gap-3 font-sans">
            <a
              href="#project-copy"
              className="text-xs tracking-[0.06em] underline underline-offset-4"
            >
              brief
            </a>
            <a
              href="#project-copy"
              className="text-xs tracking-[0.06em] underline underline-offset-4"
            >
              strategy
            </a>
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

            <div id="project-copy" className="mt-3.5 max-w-[60ch] text-[15.5px] leading-[1.75]">
              <span>{project.brief}</span>
              {readMore && (
                <span> {project.strategy.join(" ")}</span>
              )}
              <button
                type="button"
                onClick={() => setReadMore((r) => !r)}
                className="mt-2.5 block cursor-pointer border-none bg-transparent p-0 text-[15px] underline underline-offset-4"
                style={{ color: "inherit" }}
              >
                {readMore ? "leer menos" : "seguir leyendo"}
              </button>
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
          <MediaPlaceholder label="imagen destacada" />
        </div>

        <div className="mt-4 grid auto-rows-[210px] grid-cols-2 gap-4 sm:grid-cols-6">
          {project.gallery.map((g, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl ${SIZE_CLASS[g.size]}`}
              style={{ background: "var(--cb-pill)" }}
            >
              <MediaPlaceholder label={g.label} />
            </div>
          ))}
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
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/projects/${other.slug}`}
                    className="block w-[260px] flex-none text-inherit no-underline"
                  >
                    <div
                      className="h-[150px] w-[260px] overflow-hidden rounded-xl"
                      style={{ background: "var(--cb-pill)" }}
                    >
                      <MediaPlaceholder label={other.title} compact />
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
