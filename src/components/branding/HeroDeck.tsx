"use client";

import { useRouter } from "next/navigation";
import { Project } from "@/data/projects";
import MediaPlaceholder from "../MediaPlaceholder";

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
          const isFront = sd === 0;
          const scale = Math.max(0.72, 1 - ad * 0.09);
          const ty = sd * 26;
          const z = 100 - ad;
          const opacity = ad <= 3 ? 1 : 0;

          return (
            <div
              key={project.slug}
              onClick={() =>
                isFront ? router.push(`/projects/${project.slug}`) : onAdvance()
              }
              className="absolute inset-0 cursor-pointer overflow-hidden rounded-[20px]"
              style={{
                opacity,
                zIndex: z,
                transform: `translateY(${ty}px) scale(${scale})`,
                transition:
                  "opacity .5s ease, transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s",
                boxShadow: "0 0 4px 1px rgba(0,0,0,.3)",
                pointerEvents: isFront ? "auto" : "none",
              }}
            >
              <MediaPlaceholder label={project.cover} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
