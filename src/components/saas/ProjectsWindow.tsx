"use client";

import { useMemo, useState } from "react";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { localizeProjects, t, titleCase } from "@/lib/i18n";

type ProjectsWindowProps = {
  projects: Project[];
  onClose: () => void;
  initialSlug?: string | null;
};

export default function ProjectsWindow({ projects: rawProjects, onClose, initialSlug }: ProjectsWindowProps) {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const pd = t("projectDetail", lang);
  const projects = localizeProjects(rawProjects, lang);
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => (p.title + " " + p.category).toLowerCase().includes(q));
  }, [projects, query]);

  const selected = selectedSlug ? projects.find((p) => p.slug === selectedSlug) ?? null : null;

  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
      style={{ background: "rgba(6,6,10,.5)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="os-win flex h-[min(660px,84vh)] w-[min(1040px,92vw)] flex-col overflow-hidden rounded-[14px]"
        style={{
          background: "var(--os-win)",
          border: "1px solid var(--os-hr)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,.75)",
        }}
      >
        <div
          className="flex flex-none items-center gap-3.5 px-4 py-3"
          style={{ background: "rgba(var(--os-barrgb),.92)", borderBottom: "1px solid var(--os-hr)" }}
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              title={ui.close}
              className="h-3 w-3 rounded-full border-none p-0"
              style={{ background: "#ED6A5E" }}
            />
            <span className="h-3 w-3 rounded-full" style={{ background: "#F4BF4F" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#61C554" }} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: "rgba(var(--os-txrgb),.85)" }}>
            {ui.projectsWindowTitle} — CEBE:STUDIO
          </span>
          <div className="relative ml-auto hidden sm:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-[210px] rounded-lg py-1.5 pr-3 pl-[30px] font-sans text-[12.5px] outline-none focus:ring-2 focus:ring-[var(--os-accent)]"
              style={{
                background: "rgba(var(--os-sfrgb),.06)",
                border: "1px solid var(--os-hr)",
                color: "var(--os-tx)",
              }}
            />
            <span
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-xs"
              style={{ color: "rgba(var(--os-txrgb),.4)" }}
            >
              ⌕
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <div
            className="w-[160px] flex-none overflow-y-auto px-2.5 py-3.5 sm:w-[212px]"
            style={{ borderRight: "1px solid var(--os-hr)", background: "rgba(var(--os-sfrgb),.02)" }}
          >
            <div
              className="px-2 pb-2.5 text-[10.5px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: "rgba(var(--os-txrgb),.4)" }}
            >
              {ui.projectsWindowTitle}
            </div>
            {projects.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setSelectedSlug(p.slug)}
                className="mb-0.5 flex w-full items-center gap-2.5 rounded-lg border-none px-2.5 py-2 text-left font-sans text-[13px]"
                style={{
                  background: selectedSlug === p.slug ? "rgba(110,124,255,.16)" : "transparent",
                  color:
                    selectedSlug === p.slug ? "var(--os-tx)" : "rgba(var(--os-txrgb),.6)",
                  fontWeight: selectedSlug === p.slug ? 600 : 400,
                }}
              >
                <span
                  className="h-1.5 w-1.5 flex-none rounded-sm"
                  style={{ background: "var(--os-accent)" }}
                />
                {titleCase(p.title)}
              </button>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-y-auto">
            {!selected ? (
              <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3">
                {filtered.map((p) => (
                  <div
                    key={p.slug}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedSlug(p.slug)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedSlug(p.slug);
                      }
                    }}
                    className="cursor-pointer overflow-hidden rounded-xl p-0 text-left font-sans"
                    style={{
                      background: "rgba(var(--os-sfrgb),.04)",
                      border: "1px solid var(--os-hr)",
                      color: "var(--os-tx)",
                    }}
                  >
                    <div className="relative h-[120px]" style={{ background: "rgba(var(--os-sfrgb),.03)" }}>
                      <ProjectMedia
                        media={p.coverMedia}
                        label={p.cover}
                        compact
                        sizes="(min-width:640px) 33vw, 50vw"
                        uploadPath={`/projects/${assetFolder(p)}/cover`}
                      />
                    </div>
                    <div className="px-3.5 pt-3 pb-3.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-bold">{titleCase(p.title)}</span>
                        <span className="font-mono text-[11px]" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                          {p.year}
                        </span>
                      </div>
                      <div className="mt-1 text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                        {p.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-4.5 pb-6.5">
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  className="border-none bg-transparent p-0 pb-3.5 font-sans text-[12.5px]"
                  style={{ color: "rgba(var(--os-txrgb),.6)" }}
                >
                  {ui.allProjects}
                </button>
                <div
                  className="h-[200px] overflow-hidden rounded-xl"
                  style={{ background: "rgba(var(--os-sfrgb),.03)" }}
                >
                  <ProjectMedia
                    media={selected.coverMedia}
                    label={selected.cover}
                    sizes="(min-width:1024px) 900px, 100vw"
                    uploadPath={`/projects/${assetFolder(selected)}/cover`}
                  />
                </div>
                <div className="mt-4.5 flex items-baseline justify-between gap-3">
                  <span className="text-[26px] font-bold tracking-[-0.01em]" style={{ color: "var(--os-tx)" }}>
                    {titleCase(selected.title)}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                    {selected.category}
                  </span>
                </div>
                <div
                  className="mt-4.5 grid grid-cols-2 gap-3.5 border-t border-b py-4 sm:grid-cols-4"
                  style={{ borderColor: "var(--os-hr)" }}
                >
                  <Meta label={ui.client} value={selected.client} />
                  <Meta label={ui.role} value={selected.role} />
                  <Meta label={ui.year} value={selected.year} />
                  <Meta label={ui.result} value={selected.result} accent />
                </div>
                {selected.subtitle && (
                  <div className="mt-4 text-[14px] font-bold" style={{ color: "var(--os-tx)" }}>
                    {selected.subtitle}
                  </div>
                )}

                {selected.brief && (
                  <section className="mt-5 max-w-[70ch]">
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(var(--os-txrgb),.4)" }}
                    >
                      {pd.brief}
                    </div>
                    <p className="mt-2 text-[13.5px] leading-[1.7]" style={{ color: "rgba(var(--os-txrgb),.72)" }}>
                      {selected.brief}
                    </p>
                  </section>
                )}

                {selected.strategy.length > 0 && (
                  <section className="mt-6 max-w-[70ch]">
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(var(--os-txrgb),.4)" }}
                    >
                      {pd.strategy}
                    </div>
                    <div className="mt-2 flex flex-col gap-3">
                      {selected.strategy.map((paragraph, i) => (
                        <p key={i} className="text-[13.5px] leading-[1.7]" style={{ color: "rgba(var(--os-txrgb),.72)" }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                )}

                {selected.services && (
                  <section className="mt-6 max-w-[70ch]">
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(var(--os-txrgb),.4)" }}
                    >
                      {pd.services}
                    </div>
                    <ol className="mt-2 flex flex-col gap-2 p-0">
                      {selected.services
                        .split("·")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((step, i) => (
                          <li key={step} className="flex items-baseline gap-3 text-[13.5px]" style={{ color: "rgba(var(--os-txrgb),.72)" }}>
                            <span className="font-mono text-[11px] font-bold" style={{ color: "rgba(var(--os-txrgb),.4)" }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                    </ol>
                  </section>
                )}

                {selected.skills.length > 0 && (
                  <section className="mt-6 mb-2 max-w-[70ch]">
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(var(--os-txrgb),.4)" }}
                    >
                      {pd.skills}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {selected.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border px-3.5 py-1.5 text-xs font-bold"
                          style={{ borderColor: "var(--os-hr)", background: "transparent", color: "var(--os-tx)" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {selected.features?.map((feature) => (
                  <section key={feature.id} className="mt-6 mb-2 max-w-[70ch]">
                    <div
                      className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(var(--os-txrgb),.4)" }}
                    >
                      {feature.label}
                    </div>
                    <div className="mt-2 flex flex-col gap-3">
                      {feature.body.map((paragraph, i) => (
                        <p key={i} className="text-[13.5px] leading-[1.7]" style={{ color: "rgba(var(--os-txrgb),.72)" }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="flex-none px-4 py-2 font-mono text-[11px]"
          style={{ color: "rgba(var(--os-txrgb),.4)", borderTop: "1px solid var(--os-hr)" }}
        >
          {ui.projectsWindowTitle}
          {selected ? (
            <>
              {" / "}
              {titleCase(selected.title)}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div
        className="text-[10.5px] tracking-[0.12em] uppercase"
        style={{ color: "rgba(var(--os-txrgb),.4)" }}
      >
        {label}
      </div>
      <div className="mt-1.5 text-[13px]" style={{ color: accent ? "var(--os-accent)" : "var(--os-tx)" }}>
        {value}
      </div>
    </div>
  );
}
