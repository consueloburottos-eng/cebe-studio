"use client";

import { useRouter } from "next/navigation";
import { Project, assetFolder } from "@/data/projects";
import ProjectMedia from "../ProjectMedia";

type HeroDeckProps = {
  projects: Project[];
  front: number;
  onAdvance: () => void;
};

export default function HeroDeck({ projects, front, onAdvance }: HeroDeckProps) {
  const router = useRouter();
  const n = projects.length;

  return (
    <div
      className="absolute top-1/2 left-1/2 z-[5] aspect-[1482/798] w-[min(750px,86vw)] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="cb-deck h-full w-full">
        {projects.map((project, i) => {
          let sd = (i - front + n) % n;
          if (sd > n / 2) sd -= n;
          const ad = Math.abs(sd);
          if (ad > 3) return null;
          const isFront = sd === 0;
          const scale = Math.max(0.72, 1 - ad * 0.09);
          const ty = sd * 26;
          const z = 100 - ad;

          return (
            <div
              key={project.slug}
              onClick={() =>
                isFront ? router.push(`/projects/${project.slug}`) : onAdvance()
              }
              className="absolute inset-0 cursor-pointer overflow-hidden rounded-[20px]"
              style={{
                zIndex: z,
                transform: `translateY(${ty}px) scale(${scale})`,
                transition:
                  "opacity .5s ease, transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s",
                boxShadow: "0 0 4px 1px rgba(0,0,0,.3)",
                pointerEvents: isFront ? "auto" : "none",
              }}
            >
              <ProjectMedia
                media={project.coverMedia}
                label={project.cover}
                uploadPath={`/projects/${assetFolder(project)}/cover`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
