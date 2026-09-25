import Link from "next/link";
import { type Project } from "@/data/projects";
import { type Lang } from "@/hooks/useSiteLanguage";
import { titleCase } from "@/lib/i18n";
import ProjectMedia from "@/components/ProjectMedia";

// One project per section: title + "view case study" sit above a single
// horizontal strip of that project's gallery photos. Every photo in the
// strip shares one fixed height (so the strip reads as one clean line)
// but keeps its own natural width via fit="natural" — a wide screenshot
// stays wide, a portrait phone shot stays narrow, instead of every photo
// being cropped into the same box. The strip is duplicated once and
// animated with a slow CSS translateX loop (see .cb-marquee in
// globals.css) so it scrolls on its own, no interaction required.
export default function WorkProjectRow({ project, lang }: { project: Project; lang: Lang }) {
  const gallery = project.gallery.filter((g) => g.media);
  const items = gallery.length ? gallery : project.coverMedia ? [{ label: project.cover, media: project.coverMedia }] : [];
  const loopItems = items.length > 1 ? [...items, ...items] : items;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h3 className="m-0 flex items-baseline gap-2 font-sans text-xl font-bold sm:text-2xl">
            {titleCase(project.title)}
            {project.pending && (
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: "#015fca" }}>
                {lang === "en" ? "Soon" : "Pronto"}
              </span>
            )}
          </h3>
          <span className="mt-1.5 block font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cb-muted)]">
            {project.category} · {project.year}
          </span>
          <p className="m-0 mt-2 max-w-[60ch] font-sans text-[14px] leading-relaxed text-[var(--cb-muted)]">
            {project.subtitle}
          </p>
        </div>
        <Link
          href={`/portfolio/projects/${project.slug}`}
          className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border-none px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.05em] no-underline"
          style={{ background: "var(--cb-text)", color: "var(--cb-bg)" }}
        >
          {lang === "en" ? "View case study" : "Ver caso"} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {items.length > 0 && (
        <div className="cb-marquee-mask overflow-hidden">
          <div className={`flex w-max gap-4 ${loopItems !== items ? "cb-marquee" : ""}`}>
            {loopItems.map((item, i) => (
              <div
                key={i}
                className="relative flex-none overflow-hidden rounded-[10px]"
                style={{ height: "clamp(200px, 28vw, 360px)", background: "var(--cb-pill)" }}
              >
                <ProjectMedia media={item.media} label={item.label} fit="natural" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
