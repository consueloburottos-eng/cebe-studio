"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { localizeProject, localizeProjects, t, titleCase } from "@/lib/i18n";

type MarketplaceProductDetailProps = {
  project: Project;
  suggestions: Project[];
};

// same dense span pattern as the Corporate project detail's gallery grid,
// so tile proportions (2-unit vs 1-unit tiles) stay consistent across modes.
const INTRO_SPAN_PATTERN = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1];

// mobile fallback — same fixed-pixel horizontal strip as the Corporate page,
// since the dense 9-column grid isn't usable at narrow widths.
const INTRO_GRID_GAP = 10;
const INTRO_CONTENT_WIDTH = 1130 - 28 * 2;
const INTRO_UNIT = (INTRO_CONTENT_WIDTH - INTRO_GRID_GAP * 8) / 9;
const INTRO_ROW_HEIGHT = Math.round(INTRO_UNIT * 1.4);
function mobileTileSize(span: number) {
  const width = Math.round(INTRO_UNIT * span + INTRO_GRID_GAP * (span - 1));
  return { width, height: INTRO_ROW_HEIGHT };
}

type Tab = "brief" | "strategy" | "services" | "skills" | (string & {});

export default function MarketplaceProductDetail({ project: rawProject, suggestions: rawSuggestions }: MarketplaceProductDetailProps) {
  const [dark, setDark] = useSiteTheme();
  const [lang, setLang] = useSiteLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("brief");
  const ui = t("saas", lang);
  const mk = t("marketplace", lang);
  const pd = t("projectDetail", lang);
  const project = localizeProject(rawProject, lang);
  const suggestions = localizeProjects(rawSuggestions, lang);
  const folder = assetFolder(project);
  // services is a single " · "-joined string (see data/projects.ts) — split
  // back out into a numbered list, same convention as the Corporate detail page.
  const serviceSteps = project.services
    ? project.services.split("·").map((s) => s.trim()).filter(Boolean)
    : [];
  const activeFeature = project.features?.find((f) => f.id === activeTab);
  return (
    <div
      data-mk-theme={dark ? "dark" : "light"}
      className="min-h-dvh"
      style={{ background: "var(--mk-bg)", color: "var(--mk-tx)" }}
    >
      <ModeSwitcher
        mode="marketplace"
        variant={dark ? "dark" : "light"}
        dark={dark}
        onSetLight={() => setDark(false)}
        onSetDark={() => setDark(true)}
        lang={lang}
        onSetLang={setLang}
      />

      <div className="flex items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/marketplace"
          className="font-sans text-[13px] no-underline"
          style={{ color: "var(--mk-tx)" }}
        >
          {mk.closeX}
        </Link>
        <Image
          src="/marketplace/logo.png"
          alt="Cebe:Studio"
          width={94}
          height={40}
          className="h-7 w-auto object-contain"
          style={{ filter: dark ? "none" : "brightness(0)" }}
        />
        <span className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-8">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-md sm:aspect-[21/9]"
          style={{ background: "var(--mk-surface)" }}
        >
          <ProjectMedia
            media={project.coverMedia}
            label={project.cover}
            sizes="(min-width:1100px) 1100px, 100vw"
            uploadPath={`/projects/${assetFolder(project)}/cover`}
          />
        </div>

        {project.gallery.some((g) => g.media) && (
          <div className="mt-6 flex gap-[10px] overflow-x-auto pb-1 sm:hidden">
            {project.gallery
              .filter((g) => g.media)
              .map((g, i) => {
                const span = INTRO_SPAN_PATTERN[i % INTRO_SPAN_PATTERN.length];
                const { width, height } = mobileTileSize(span);
                return (
                  <div
                    key={i}
                    className="flex-none overflow-hidden rounded-[10px]"
                    style={{ width, height, background: "var(--mk-surface)" }}
                  >
                    <ProjectMedia
                      media={g.media}
                      label={g.label}
                      sizes={`${width}px`}
                      uploadPath={`/projects/${folder}/intro-${String(i + 1).padStart(2, "0")}`}
                    />
                  </div>
                );
              })}
          </div>
        )}

        {project.gallery.some((g) => g.media) && (
          <div className="mt-6 hidden sm:block" style={{ containerType: "inline-size" }}>
            <div
              className="grid gap-[10px]"
              style={{
                gridTemplateColumns: "repeat(9, 1fr)",
                // row height follows the fluid column width, keeping the
                // same 1:1.4 tile proportions as the Corporate grid, at any viewport
                gridAutoRows: "calc((100cqw - 80px) / 9 * 1.4)",
                gridAutoFlow: "row dense",
              }}
            >
              {project.gallery
                .filter((g) => g.media)
                .map((g, i) => {
                  const span = INTRO_SPAN_PATTERN[i % INTRO_SPAN_PATTERN.length];
                  return (
                    <div
                      key={i}
                      className="overflow-hidden rounded-[10px]"
                      style={{ background: "var(--mk-surface)", gridColumn: `span ${span}` }}
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
        )}

        <div className="mt-9 max-w-[70ch]">
          <div className="font-serif text-[clamp(32px,5vw,52px)] italic" style={{ color: "var(--mk-tx)" }}>
            {titleCase(project.title)}
          </div>
          <div
            className="mt-2.5 text-[12.5px]"
            style={{ color: "var(--mk-mut)", letterSpacing: ".18em", textTransform: "uppercase" }}
          >
            {project.tag}
          </div>

          <div className="mt-6 flex flex-wrap gap-5 font-sans">
            <button
              type="button"
              onClick={() => setActiveTab("brief")}
              className="border-none bg-transparent p-0 text-[12px] font-bold tracking-[0.1em] uppercase underline underline-offset-4"
              style={{ color: "var(--mk-tx)", opacity: activeTab === "brief" ? 1 : 0.45 }}
            >
              {pd.brief}
            </button>
            {project.strategy.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("strategy")}
                className="border-none bg-transparent p-0 text-[12px] font-bold tracking-[0.1em] uppercase underline underline-offset-4"
                style={{ color: "var(--mk-tx)", opacity: activeTab === "strategy" ? 1 : 0.45 }}
              >
                {pd.strategy}
              </button>
            )}
            {serviceSteps.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className="border-none bg-transparent p-0 text-[12px] font-bold tracking-[0.1em] uppercase underline underline-offset-4"
                style={{ color: "var(--mk-tx)", opacity: activeTab === "services" ? 1 : 0.45 }}
              >
                {pd.services}
              </button>
            )}
            {project.skills.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className="border-none bg-transparent p-0 text-[12px] font-bold tracking-[0.1em] uppercase underline underline-offset-4"
                style={{ color: "var(--mk-tx)", opacity: activeTab === "skills" ? 1 : 0.45 }}
              >
                {pd.skills}
              </button>
            )}
            {project.features?.map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setActiveTab(feature.id)}
                className="border-none bg-transparent p-0 text-[12px] font-bold tracking-[0.1em] uppercase underline underline-offset-4"
                style={{ color: "var(--mk-tx)", opacity: activeTab === feature.id ? 1 : 0.45 }}
              >
                {feature.label}
              </button>
            ))}
          </div>

          <div className="mt-4 text-[16px] leading-[1.6]" style={{ color: "rgba(var(--mk-txrgb),.82)" }}>
            {activeTab === "brief" && <p>{project.brief}</p>}

            {activeTab === "strategy" && (
              <div className="flex flex-col gap-4">
                {project.strategy.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {activeTab === "services" && (
              <ol className="flex flex-col gap-3">
                {serviceSteps.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] font-bold" style={{ color: "var(--mk-mut)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {activeTab === "skills" && (
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold"
                    style={{ borderColor: "var(--mk-hr)", color: "var(--mk-tx)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {activeFeature && (
              <div className="flex flex-col gap-4">
                {activeFeature.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-8 border-t border-b py-6"
          style={{ borderColor: "var(--mk-hr)" }}
        >
          <Meta label={mk.category} value={project.category} />
          <Meta label={ui.client} value={project.client} />
          <Meta label={ui.role} value={project.role} />
          <Meta label={ui.result} value={project.result} accent />
        </div>

        {suggestions.length > 0 && (
          <div className="mt-16">
            <div
              className="font-serif text-[19px] italic"
              style={{ color: "var(--mk-tx)" }}
            >
              {mk.alsoInterested}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {suggestions.map((s) => (
                <Link key={s.slug} href={`/marketplace/${s.slug}`} className="block">
                  <div
                    className="aspect-[16/10] overflow-hidden rounded-lg"
                    style={{ background: "var(--mk-surface)" }}
                  >
                    <ProjectMedia
                    media={s.coverMedia}
                    label={s.cover}
                    sizes="(min-width:640px) 50vw, 100vw"
                    uploadPath={`/projects/${assetFolder(s)}/cover`}
                  />
                  </div>
                  <div className="mt-3 font-serif text-[17px] italic" style={{ color: "var(--mk-tx)" }}>
                    {titleCase(s.title)}
                  </div>
                  <div
                    className="mt-1 text-[11px]"
                    style={{ color: "var(--mk-mut)", letterSpacing: ".12em", textTransform: "uppercase" }}
                  >
                    {s.category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Meta({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div
        className="text-[10.5px]"
        style={{ color: "var(--mk-mut)", letterSpacing: ".1em", textTransform: "uppercase" }}
      >
        {label}
      </div>
      <div
        className="mt-1.5 text-[14px]"
        style={{ color: accent ? "var(--mk-amber)" : "var(--mk-tx)" }}
      >
        {value}
      </div>
    </div>
  );
}
