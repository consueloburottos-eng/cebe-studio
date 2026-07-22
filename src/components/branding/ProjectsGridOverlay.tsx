"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";
import ProgressiveBlur from "../ProgressiveBlur";

type ProjectsGridOverlayProps = {
  projects: Project[];
  onClose: () => void;
};

const COLUMN_COUNT = 5;

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
    </Link>
  );
}

export default function ProjectsGridOverlay({ projects, onClose }: ProjectsGridOverlayProps) {
  const columns: Project[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  projects.forEach((project, i) => {
    columns[i % COLUMN_COUNT].push(project);
  });

  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loopLengths = useRef<number[]>(Array(COLUMN_COUNT).fill(0));
  const positions = useRef<number[]>(Array(COLUMN_COUNT).fill(0));

  useEffect(() => {
    function measure() {
      trackRefs.current.forEach((el, i) => {
        if (el) loopLengths.current[i] = el.scrollHeight / 2;
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    trackRefs.current.forEach((el, i) => {
      if (!el) return;
      const loop = loopLengths.current[i] || 1;
      const vSign = i % 2 === 0 ? 1 : -1;
      const hSign = i % 2 === 0 ? -1 : 1;
      let pos = positions.current[i] + vSign * e.deltaY + hSign * e.deltaX;
      pos = ((pos % loop) + loop) % loop;
      positions.current[i] = pos;
      el.style.transform = `translateY(${-pos}px)`;
    });
  }

  return (
    <div
      className="absolute inset-0 z-[100] overflow-hidden backdrop-blur-2xl"
      style={{ background: "var(--cb-glass)" }}
      onWheel={handleWheel}
    >
      <div className="grid h-full grid-cols-5 gap-3 p-3">
        {columns.map((col, i) => (
          <div key={i} className="relative h-full overflow-hidden">
            <div
              ref={(el) => {
                trackRefs.current[i] = el;
              }}
              className="flex flex-col gap-3"
            >
              {[...col, ...col].map((project, j) => (
                <ProjectCard key={`${project.slug}-${j}`} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-[110]">
        <ProgressiveBlur side="bottom" height={110} />
        <div className="relative z-[1] flex h-[60px] items-center justify-end px-7">
          <button
            type="button"
            onClick={onClose}
            title="cerrar"
            className="flex h-10 w-10 items-center justify-center rounded-full border text-[15px]"
            style={{ borderColor: "var(--cb-hair)", color: "var(--cb-text)" }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
