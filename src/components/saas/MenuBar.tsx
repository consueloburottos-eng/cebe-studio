"use client";

import { useEffect, useState } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

type MenuBarProps = {
  onOverview: () => void;
  onProjects: () => void;
  onSkills: () => void;
  onContact: () => void;
};

export default function MenuBar({ onOverview, onProjects, onSkills, onContact }: MenuBarProps) {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const kickoff = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, []);

  const clock = now
    ? now.toLocaleString(lang === "en" ? "en-US" : "es-ES", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[60] flex h-[34px] items-center justify-between gap-3.5 px-4 backdrop-blur-xl"
      style={{ background: "rgba(var(--os-bgrgb),.72)", borderBottom: "1px solid var(--os-hr)" }}
    >
      <div className="flex items-center gap-4 text-[13px]" style={{ color: "var(--os-tx)" }}>
        <span className="flex items-center gap-2 font-semibold">
          <svg width="14" height="14" viewBox="0 0 104 105" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
            <path d="M35.9993 37.2012C39.8706 33.3299 45.1212 31.155 50.596 31.155V72.4407C45.1212 72.4407 39.8706 70.2659 35.9993 66.3946C32.128 62.5233 29.9531 57.2727 29.9531 51.7979C29.9531 46.3231 32.128 41.0725 35.9993 37.2012Z" fill="currentColor" />
            <path d="M47.0962 0.197074C58.8034 -0.829981 70.5083 2.17874 80.2739 8.72246C90.0387 15.2658 97.2797 24.9504 100.807 36.1697C104.334 47.3887 103.94 59.4787 99.688 70.4432C95.436 81.4081 87.5777 90.5976 77.4058 96.4871L67.8032 102.047L56.6841 82.8416L66.2866 77.282C72.0807 73.9272 76.5676 68.6862 78.9976 62.4197C81.4278 56.1526 81.6528 49.239 79.6363 42.825C77.6198 36.4118 73.4844 30.8864 67.9204 27.158C62.357 23.4301 55.6954 21.7195 49.0366 22.3035C42.3776 22.8878 36.1104 25.7328 31.2739 30.3758C26.4369 35.0194 23.3194 41.1842 22.4439 47.8533C21.5683 54.5225 22.9886 61.29 26.4654 67.0359C29.9419 72.7812 35.2653 77.1592 41.5493 79.4529L51.9722 83.2576L44.3628 104.104L33.94 100.3C22.8996 96.2698 13.5669 88.586 7.47902 78.5252C1.39155 68.4649 -1.08996 56.626 0.440937 44.9647C1.97192 33.3032 7.42509 22.5086 15.9058 14.367C24.387 6.22514 35.3894 1.2243 47.0962 0.197074Z" fill="currentColor" />
            <path d="M51.6323 51.7979V31.155C63.3218 31.155 69.1666 34.7979 69.1666 42.0836C69.1666 48.5598 63.3218 51.7979 51.6323 51.7979C63.3218 51.7979 69.1666 55.4408 69.1666 62.7265C69.1666 69.2027 63.3218 72.4408 51.6323 72.4408V51.7979Z" fill="currentColor" />
          </svg>
          CEBE:STUDIO
        </span>
        <button
          type="button"
          onClick={onOverview}
          className="hidden border-none bg-transparent p-0 font-medium sm:inline"
          style={{ color: "var(--os-mut)" }}
        >
          {ui.menu.overview}
        </button>
        <button
          type="button"
          onClick={onProjects}
          className="hidden border-none bg-transparent p-0 font-medium sm:inline"
          style={{ color: "var(--os-mut)" }}
        >
          {ui.menu.projects}
        </button>
        <button
          type="button"
          onClick={onSkills}
          className="hidden border-none bg-transparent p-0 font-medium sm:inline"
          style={{ color: "var(--os-mut)" }}
        >
          {ui.menu.skills}
        </button>
        <button
          type="button"
          onClick={onContact}
          className="hidden border-none bg-transparent p-0 font-medium md:inline"
          style={{ color: "var(--os-mut)" }}
        >
          {ui.menu.contact}
        </button>
      </div>
      <div className="flex flex-none items-center gap-4 text-[12.5px]" style={{ color: "var(--os-mut)" }}>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#61c554" }} />
          {ui.menu.available}
        </span>
        <span className="font-mono text-[11.5px]">⌒</span>
        <span className="font-medium whitespace-nowrap" style={{ color: "var(--os-tx)" }}>
          {clock}
        </span>
      </div>
    </div>
  );
}
