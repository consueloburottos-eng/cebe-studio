"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";
import ProgressiveBlur from "../ProgressiveBlur";
import AboutModal from "./AboutModal";
import BookModal from "./BookModal";
import NavPill from "./NavPill";
import TopRight from "./TopRight";

// span sequence lifted from the original prototype's projSel.intro grid (indices 0-12)
const INTRO_SPAN_PATTERN = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1];

type ProjectDetailProps = {
  project: Project;
  others: Project[];
};

type Tab = "brief" | "strategy" | "services" | "skills";

export default function ProjectDetail({ project, others }: ProjectDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("brief");
  // services is stored as a single " · "-joined string (see data/projects.ts)
  // in roughly the order the work happened — split back out for the tab's
  // numbered list instead of showing it as one run-on line.
  const serviceSteps = project.services
    ? project.services.split("·").map((s) => s.trim()).filter(Boolean)
    : [];
  const [aboutOpen, setAboutOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const folder = assetFolder(project);

  // In production the grid is adaptive — only tiles that actually have media
  // render, so a project with 6 photos shows a clean full row instead of
  // trailing placeholders. In dev we still pad to the full 13-slot grid so the
  // click-to-upload overlay has empty target slots to upload into.
  const isDev = process.env.NODE_ENV === "development";
  const slotCount = isDev
    ? INTRO_SPAN_PATTERN.length
    : Math.min(project.gallery.length, INTRO_SPAN_PATTERN.length);
  const introItems = Array.from(
    { length: slotCount },
    (_, i) => project.gallery[i] ?? { label: "Imagen próximamente" }
  );

  return (
    <div className="min-h-dvh" style={{ color: "var(--cb-text)" }} data-cb-theme="light">
      {/* premium fullscreen frosted-glass backdrop — built from the project's
          own cover photo. Filter lives on this fixed leaf layer, not the
          root, so it never becomes a containing block for the fixed bottom
          bar below (see ProjectMedia CSS bug notes). Layered so it still
          looks intentional (not just empty) on projects whose cover is a
          video, which can't be blurred the same way. */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #efe9df 0%, #e4dccd 55%, #d8ceba 100%)" }}
      >
        {project.coverMedia?.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverMedia.src}
            alt=""
            className="h-full w-full scale-125 object-cover"
            style={{ filter: "blur(90px) saturate(1.6) brightness(1.04)" }}
          />
        )}
        {/* soft light glow, upper-left, for a sense of depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 12% -10%, rgba(255,255,255,.6), rgba(255,255,255,0) 55%)",
          }}
        />
        {/* frosted wash — keeps foreground text legible over any photo */}
        <div className="absolute inset-0" style={{ background: "rgba(244,241,234,.6)" }} />
        {/* gentle vignette for premium edge falloff */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 12%, transparent 45%, rgba(20,18,16,.12) 100%)",
          }}
        />
      </div>

      <div className="sticky top-0 z-10">
        <ProgressiveBlur side="top" height={110} />
        <div className="relative z-[1] flex h-[60px] items-center justify-between px-4 sm:px-[26px]">
          <NavPill
            open={navOpen}
            onToggle={() => setNavOpen((o) => !o)}
            onOpenAbout={() => {
              setNavOpen(false);
              setAboutOpen(true);
            }}
            onOpenGrid={() => {
              setNavOpen(false);
              router.push("/");
            }}
            onOpenBook={() => {
              setNavOpen(false);
              setBookOpen(true);
            }}
          />

          <TopRight
            audioOn={audioOn}
            onToggleAudio={() => setAudioOn((a) => !a)}
            onOpenBook={() => setBookOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
          />
        </div>
      </div>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}

      <div className="fixed inset-x-0 bottom-0 z-[110]">
        <ProgressiveBlur side="bottom" height={110} />
        <div className="relative z-[1] flex h-[60px] items-center justify-end gap-2.5 px-7">
          <button
            type="button"
            onClick={() => router.push("/?grid=1")}
            title="ver todos los proyectos"
            className="flex h-10 w-10 items-center justify-center rounded-full border-none text-base leading-none"
            style={{ background: "var(--cb-pill)", color: "var(--cb-text)" }}
          >
            ⊞
          </button>
          <Link
            href="/"
            title="volver"
            className="flex h-10 w-10 items-center justify-center rounded-full border text-[15px]"
            style={{ borderColor: "var(--cb-hair)", color: "var(--cb-text)" }}
          >
            ✕
          </Link>
        </div>
      </div>

      <div
        className="mx-auto max-w-[1200px] rounded-[24px] px-7 py-10 pb-[90px] backdrop-blur-2xl"
        style={{ background: "var(--cb-glass)" }}
      >
        <div
          className="relative mb-10 aspect-[1482/798] overflow-hidden rounded-[18px]"
          style={{ background: "var(--cb-pill)" }}
        >
          <ProjectMedia
            media={project.coverMedia}
            label={project.cover}
            sizes="(min-width:1200px) 1200px, 100vw"
            uploadPath={`/projects/${folder}/cover`}
          />
        </div>

        <div className="mb-14" style={{ containerType: "inline-size" }}>
          <div
            className="grid gap-[10px]"
            style={{
              gridTemplateColumns: "repeat(9, 1fr)",
              // row height follows the fluid column width, keeping the
              // original 120:168 (1:1.4) tile proportions at any viewport
              gridAutoRows: "calc((100cqw - 80px) / 9 * 1.4)",
              gridAutoFlow: "row dense",
            }}
          >
            {introItems.map((g, i) => {
              const span = INTRO_SPAN_PATTERN[i];
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-[10px]"
                  style={{ background: "var(--cb-pill)", gridColumn: `span ${span}` }}
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

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
          <div className="flex flex-col gap-3 font-sans">
            <button
              type="button"
              onClick={() => setActiveTab("brief")}
              className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
              style={{ opacity: activeTab === "brief" ? 1 : 0.45 }}
            >
              brief
            </button>
            {project.strategy.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("strategy")}
                className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                style={{ opacity: activeTab === "strategy" ? 1 : 0.45 }}
              >
                strategy
              </button>
            )}
            {serviceSteps.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                style={{ opacity: activeTab === "services" ? 1 : 0.45 }}
              >
                services
              </button>
            )}
            {project.skills.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className="text-left text-xs font-bold tracking-[0.06em] underline underline-offset-4"
                style={{ opacity: activeTab === "skills" ? 1 : 0.45 }}
              >
                skills
              </button>
            )}
          </div>
          <div>
            <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--cb-muted)]">
              {project.tag}
            </div>
            <h1 className="mt-2.5 font-display font-extrabold lowercase leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(34px,4.6vw,54px)" }}
            >
              {project.title}
            </h1>
            <div className="mt-4 text-base font-bold">{project.subtitle}</div>

            <div id="project-copy" className="mt-3.5 flex max-w-[60ch] flex-col gap-4 text-[15.5px] font-medium leading-[1.75]">
              {activeTab === "brief" && <p>{project.brief}</p>}

              {activeTab === "strategy" &&
                project.strategy.map((paragraph, i) => <p key={i}>{paragraph}</p>)}

              {activeTab === "services" && (
                <ol className="flex flex-col gap-3">
                  {serviceSteps.map((step, i) => (
                    <li key={step} className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-[12px] font-bold"
                        style={{ color: "var(--cb-muted)" }}
                      >
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
                      className="rounded-full border px-3.5 py-1.5 text-xs font-bold"
                      style={{ borderColor: "var(--cb-hair)", background: "transparent", color: "var(--cb-text)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3.5 border-t border-b py-4 sm:grid-cols-4"
              style={{ borderColor: "var(--cb-hair)" }}
            >
              <Meta label="Cliente" value={project.client} />
              <Meta label="Rol" value={project.role} />
              <Meta label="Año" value={project.year} />
              <Meta label="Resultado" value={project.result} accent />
            </div>
          </div>
        </div>

        <div className="my-[72px] text-center font-display font-extrabold uppercase leading-none tracking-[-0.01em]"
          style={{ fontSize: "clamp(30px,5.5vw,68px)" }}
        >
          {project.headline}
        </div>

        <div className="mt-16 border-t pt-[34px]" style={{ borderColor: "var(--cb-hair)" }}>
          <div className="flex flex-wrap gap-6 text-[13px] text-[var(--cb-muted)]">
            <Link href="/" className="text-inherit no-underline">
              home
            </Link>
            <a href={`mailto:consuelo.burotto.s@gmail.com`} className="text-inherit no-underline">
              email
            </a>
          </div>

          {others.length > 0 && (
            <>
              <div className="mt-7 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--cb-muted)]">
                Más proyectos
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
                {others.slice(0, 6).map((other) => (
                  <Link
                    key={other.slug}
                    href={`/projects/${other.slug}`}
                    className="block w-[260px] flex-none text-inherit no-underline"
                  >
                    <div
                      className="h-[150px] w-[260px] overflow-hidden rounded-xl"
                      style={{ background: "var(--cb-pill)" }}
                    >
                      <ProjectMedia
                        media={other.coverMedia}
                        label={other.cover}
                        compact
                        sizes="260px"
                        uploadPath={`/projects/${assetFolder(other)}/cover`}
                      />
                    </div>
                    <div className="mt-2.5 text-[15px] font-bold lowercase">
                      {other.title}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Meta({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
        {label}
      </div>
      <div
        className="mt-1.5 text-sm"
        style={accent ? { color: "#B8623F" } : undefined}
      >
        {value}
      </div>
    </div>
  );
}
