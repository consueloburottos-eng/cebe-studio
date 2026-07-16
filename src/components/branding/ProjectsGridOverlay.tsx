"use client";

import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

type ProjectsGridOverlayProps = {
  projects: Project[];
  onClose: () => void;
};

export default function ProjectsGridOverlay({ projects, onClose }: ProjectsGridOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-[100] overflow-y-auto backdrop-blur-2xl"
      style={{ background: "var(--cb-glass)" }}
    >
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
            style={{ background: "var(--cb-glass-pill)" }}
          >
            <ProjectMedia
              media={project.coverMedia}
              label={project.cover}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
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
