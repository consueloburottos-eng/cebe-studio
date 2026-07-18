"use client";

import { useState } from "react";

const BASIC_PAGES = [
  "User Profile",
  "Dashboard",
  "Login",
  "CRM",
  "FAQ",
  "Authentication",
  "Settings",
  "Notifications",
  "Billing",
  "Analytics",
];

const FLOW_OPTIONS = [0, 1, 2, 3, 4];

export type ServiceCardConfig = { pages: string[]; flows: number };

type ServiceCardProps = {
  title: string;
  priceFrom: number;
  thumbnailSrc?: string;
  initial?: ServiceCardConfig;
  onConfirm: (config: ServiceCardConfig) => void;
};

export default function ServiceCard({
  title,
  priceFrom,
  thumbnailSrc,
  initial,
  onConfirm,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [pages, setPages] = useState<Set<string>>(new Set(initial?.pages ?? []));
  const [flows, setFlows] = useState(initial?.flows ?? 0);
  const configured = Boolean(initial);

  function togglePage(p: string) {
    setPages((prev) => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  }

  function confirm() {
    onConfirm({ pages: [...pages], flows });
    setExpanded(false);
  }

  return (
    <div
      className="absolute bottom-9 left-8 z-[25] w-[min(400px,88vw)] rounded-[28px] border p-5 backdrop-blur-2xl"
      style={{
        background: "rgba(20,18,16,.5)",
        borderColor: "rgba(255,255,255,.16)",
        boxShadow: "0 25px 60px -20px rgba(0,0,0,.6)",
      }}
    >
      {!expanded ? (
        <div className="flex items-center gap-4">
          {thumbnailSrc && (
            <div
              className="h-14 w-14 flex-none overflow-hidden rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailSrc})` }}
            />
          )}
          <div className="min-w-0 flex-1 text-left">
            <div className="text-[11px] uppercase text-white/50" style={{ letterSpacing: ".16em" }}>
              Servicio
            </div>
            <div className="mt-0.5 truncate font-serif text-[19px] text-white">{title}</div>
            <div className="mt-0.5 text-[12.5px] text-white/70">
              Desde ${priceFrom.toLocaleString("en-US")}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="font-serif text-[17px] text-white">{title}</div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              title="Cerrar"
              className="flex h-7 w-7 flex-none items-center justify-center rounded-full border-none text-[12px] text-white"
              style={{ background: "rgba(255,255,255,.12)" }}
            >
              ✕
            </button>
          </div>

          <div className="mt-4 text-[11px] uppercase text-white/50" style={{ letterSpacing: ".16em" }}>
            Basic Template Pages
          </div>
          <div className="mt-2.5 flex max-h-[140px] flex-wrap gap-1.5 overflow-y-auto">
            {BASIC_PAGES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePage(p)}
                aria-pressed={pages.has(p)}
                className="rounded-full border-none px-3 py-1.5 text-[11.5px]"
                style={{
                  background: pages.has(p) ? "#B8623F" : "rgba(255,255,255,.1)",
                  color: "#fff",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-4 text-[11px] uppercase text-white/50" style={{ letterSpacing: ".16em" }}>
            Custom Flows
          </div>
          <div className="mt-2.5 flex gap-2">
            {FLOW_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFlows(n)}
                aria-pressed={flows === n}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-[13px]"
                style={{
                  background: flows === n ? "#B8623F" : "transparent",
                  borderColor: "rgba(255,255,255,.28)",
                  color: "#fff",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => (expanded ? confirm() : setExpanded(true))}
        disabled={expanded && pages.size === 0}
        className="mt-4 w-full rounded-full border-none py-2.5 text-[13px] font-semibold text-[#141210]"
        style={{ background: "#fff", opacity: expanded && pages.size === 0 ? 0.5 : 1 }}
      >
        {expanded ? "Add to Cart" : configured ? "Configurado ✓ — Editar" : "Add to Cart"}
      </button>
    </div>
  );
}
