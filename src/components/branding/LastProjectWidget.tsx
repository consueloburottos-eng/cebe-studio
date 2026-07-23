"use client";

import Link from "next/link";
import ProjectMedia from "../ProjectMedia";

// Independent of the featured/last-viewed project — always points at
// talent-capital (the candidate portal) with its own dedicated photo slot.
const TARGET_SLUG = "talent-capital";
const UPLOAD_PATH = "/showcase/recommended";
const MEDIA = { type: "video" as const, src: "/showcase/recommended.mp4" };

export default function LastProjectWidget() {
  return (
    <Link
      href={`/projects/${TARGET_SLUG}`}
      className="absolute bottom-4 left-4 z-20 block h-20 w-28 overflow-hidden sm:bottom-[26px] sm:left-[26px] sm:h-[112px] sm:w-[154px]"
      style={{ background: "var(--cb-pill)" }}
    >
      <span
        className="absolute top-2 left-2 z-20 rounded-full px-2 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-black shadow-md sm:top-2.5 sm:left-2.5"
        style={{ background: "#fff" }}
      >
        Recommended
      </span>
      <ProjectMedia
        media={MEDIA}
        label="Talent Capital — candidate portal (Celeste)"
        compact
        uploadPath={UPLOAD_PATH}
      />
    </Link>
  );
}
