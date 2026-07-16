"use client";

import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

export default function ResultsGrid({ results }: { results: Project[] }) {
  return (
    <div
      aria-live="polite"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {results.map((p, i) => (
        <Link
          key={p.slug}
          href={`/marketplace/${p.slug}`}
          className="mk-blur block text-left"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <div
            className="aspect-[16/10] overflow-hidden rounded-lg"
            style={{ background: "var(--mk-surface)" }}
          >
            <ProjectMedia
              media={p.coverMedia}
              label={p.cover}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              uploadPath={`/projects/${assetFolder(p)}/cover`}
            />
          </div>
          <div className="mt-3.5 font-serif text-[19px] italic" style={{ color: "var(--mk-tx)" }}>
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
