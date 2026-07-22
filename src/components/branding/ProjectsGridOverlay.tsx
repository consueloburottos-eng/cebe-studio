"use client";

import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

type ProjectsGridOverlayProps = {
  projects: Project[];
  onClose: () => void;
};

const COLUMN_COUNT = 5;
const SECONDS_PER_CARD = 6;

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[1482/798] overflow-hidden rounded-2xl"
      style={{ background: "var(--cb-glass-pill)" }}
    >
      <ProjectMedia
        media={project.coverMedia}
        label={project.cover}
        sizes="20vw"
        uploadPath={`/projects/${assetFolder(project)}/cover`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <span className="font-display text-lg font-extrabold lowercase text-white">
          {project.title}
        </span>
        <span className="block font-sans text-[11px] uppercase tracking-[0.12em] text-white/70">
          {project.tag}
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsGridOverlay({ projects, onClose }: ProjectsGridOverlayProps) {
  const columns: Project[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  projects.forEach((project, i) => {
    columns[i % COLUMN_COUNT].push(project);
  });

  return (
    <div
      className="absolute inset-0 z-[100] overflow-hidden backdrop-blur-2xl"
      style={{ background: "var(--cb-glass)" }}
    >
      <div className="grid h-full grid-cols-5 gap-3 p-3">
        {columns.map((col, i) => (
          <div key={i} className="relative h-full overflow-hidden">
            <div
              className="cb-col flex flex-col gap-3"
              style={{
                animationDirection: i % 2 === 1 ? "reverse" : "normal",
                animationDuration: `${col.length * SECONDS_PER_CARD}s`,
              }}
            >
              {[...col, ...col].map((project, j) => (
                <ProjectCard key={`${project.slug}-${j}`} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onClose}
        title="cerrar"
        className="fixed bottom-[26px] right-[26px] z-[110] flex h-[54px] w-[54px] items-center justify-center rounded-full border-none text-xl backdrop-blur-xl"
        style={{ background: "var(--cb-glass-pill)", color: "var(--cb-text)" }}
      >
        ✕
      </button>
    </div>
  );
}
