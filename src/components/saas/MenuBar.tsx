"use client";

import { useEffect, useState } from "react";

export default function MenuBar() {
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
    ? now.toLocaleString("es-ES", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[60] flex h-[34px] items-center justify-between gap-3.5 px-4 backdrop-blur-xl"
      style={{ background: "rgba(11,11,16,.72)", borderBottom: "1px solid var(--os-hr)" }}
    >
      <div className="flex items-center gap-4 text-[13px]" style={{ color: "var(--os-tx)" }}>
        <span className="flex items-center gap-2 font-semibold">
          <span style={{ color: "var(--os-accent)", fontSize: 11 }}>◆</span> CEBE:STUDIO
        </span>
        <span className="hidden font-medium sm:inline" style={{ color: "var(--os-mut)" }}>
          Archivo
        </span>
        <span className="hidden font-medium sm:inline" style={{ color: "var(--os-mut)" }}>
          Edición
        </span>
        <span className="hidden font-medium sm:inline" style={{ color: "var(--os-mut)" }}>
          Ir
        </span>
        <span className="hidden font-medium md:inline" style={{ color: "var(--os-mut)" }}>
          Ventana
        </span>
        <span className="hidden font-medium md:inline" style={{ color: "var(--os-mut)" }}>
          Ayuda
        </span>
      </div>
      <div className="flex flex-none items-center gap-4 text-[12.5px]" style={{ color: "var(--os-mut)" }}>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#61c554" }} />
          Disponible
        </span>
        <span className="font-mono text-[11.5px]">⌒</span>
        <span className="font-medium whitespace-nowrap" style={{ color: "var(--os-tx)" }}>
          {clock}
        </span>
      </div>
    </div>
  );
}
