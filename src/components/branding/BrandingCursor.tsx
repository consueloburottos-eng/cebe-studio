"use client";

import { useEffect, useRef } from "react";

export default function BrandingCursor({ active }: { active: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    function onMove(e: MouseEvent) {
      const d = dotRef.current;
      if (d) d.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="cb-cursor pointer-events-none fixed top-0 left-0 z-[300] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      style={{ mixBlendMode: "difference", transform: "translate(-100px,-100px)" }}
    />
  );
}
