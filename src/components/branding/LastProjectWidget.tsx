"use client";

import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

export default function LastProjectWidget({ project }: { project: Project }) {
  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 sm:bottom-[26px] sm:left-[26px]">
      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--cb-muted)]">
        Destacado
      </span>
      <Link
        href={`/projects/${project.slug}`}
        className="block h-20 w-28 overflow-hidden sm:h-[112px] sm:w-[154px]"
        style={{ background: "var(--cb-pill)" }}
      >
        <ProjectMedia
          media={project.coverMedia}
          label={project.cover}
          compact
          uploadPath={`/projects/${assetFolder(project)}/cover`}
        />
      </Link>
    </div>
  );
}
