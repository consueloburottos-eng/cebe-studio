"use client";

import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

export default function ResultsGrid({ results }: { results: Project[] }) {
  return (
    <div aria-live="polite" className="flex gap-1 overflow-x-auto pb-2" style={{ margin: "5px" }}>
      {results.map((p, i) => (
        <Link
          key={p.slug}
          href={`/marketplace/${p.slug}`}
          className="mk-blur flex h-[500px] w-[500px] flex-none flex-col text-left"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <div
            className="relative min-h-0 flex-1 overflow-hidden"
            style={{ background: "var(--mk-surface)" }}
          >
            <ProjectMedia
              media={p.coverMedia}
              label={p.cover}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              uploadPath={`/projects/${assetFolder(p)}/cover`}
            />
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
  );
}
