"use client";

import { getProject, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { localizeProject, t, titleCase } from "@/lib/i18n";

// Independent of last-viewed history — always points at buildwithin (the
// candidate portal), same target as Branding mode's LastProjectWidget.
const TARGET_SLUG = "buildwithin";

export default function RecommendedProject({ onOpen }: { onOpen: (slug: string) => void }) {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const raw = getProject(TARGET_SLUG);
  if (!raw) return null;
  const project = localizeProject(raw, lang);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(TARGET_SLUG)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(TARGET_SLUG);
        }
      }}
      className="os-glass flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl p-0 text-left"
      style={{ color: "var(--os-tx)", fontFamily: "inherit" }}
    >
      <div className="px-[18px] pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--os-mut)" }}>
            {ui.recommendedTitle}
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] uppercase"
            style={{ background: "var(--os-accent)", color: "var(--os-win)" }}
          >
            {ui.recommended}
          </span>
        </div>
      </div>

      <div className="relative mt-3 h-[130px] px-[18px]">
        <div className="h-full w-full overflow-hidden rounded-xl" style={{ background: "rgba(var(--os-sfrgb),.03)" }}>
          <ProjectMedia
            media={project.coverMedia}
            label={project.cover}
            compact
            sizes="340px"
            uploadPath={`/projects/${assetFolder(project)}/cover`}
          />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2 px-[18px] pt-3 pb-4">
        <div>
          <div className="text-[15px] font-bold">{titleCase(project.title)}</div>
          <div className="mt-0.5 text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
            {project.category}
          </div>
        </div>
        <span className="flex-none text-[12px] font-semibold" style={{ color: "var(--os-accent)" }}>
          {ui.viewProject}
        </span>
      </div>
    </div>
  );
}
