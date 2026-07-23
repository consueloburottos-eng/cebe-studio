"use client";

import { useState } from "react";

// Fallback list only — real per-service options come from SERVICE_PAGE_OPTIONS
// in MarketplaceHome.tsx and are passed in via the `pages` prop. This default
// only fires if a service is ever rendered without an explicit list.
const DEFAULT_PAGES = [
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

type ServiceConfigPopoverProps = {
  title: string;
  pageOptions?: string[];
  initial?: ServiceCardConfig;
  onConfirm: (config: ServiceCardConfig) => void;
  onClose: () => void;
};

export default function ServiceConfigPopover({
  title,
  pageOptions,
  initial,
  onConfirm,
  onClose,
}: ServiceConfigPopoverProps) {
  const basicPages = pageOptions ?? DEFAULT_PAGES;
  const [pages, setPages] = useState<Set<string>>(new Set(initial?.pages ?? []));
  const [flows, setFlows] = useState(initial?.flows ?? 0);

  function togglePage(p: string) {
    setPages((prev) => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  }

  return (
    <>
      <div className="fixed inset-0 z-[249]" onClick={onClose} />
      <div
        className="fixed bottom-9 left-1/2 z-[250] w-[min(400px,88vw)] -translate-x-1/2 rounded-[28px] border p-5 backdrop-blur-2xl"
        style={{
          background: "rgba(20,18,16,.85)",
          borderColor: "rgba(255,255,255,.16)",
          boxShadow: "0 25px 60px -20px rgba(0,0,0,.6)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="font-serif text-[17px] text-white">{title}</div>
          <button
            type="button"
            onClick={onClose}
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
          {basicPages.map((p) => (
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

        <button
          type="button"
          disabled={pages.size === 0}
          onClick={() => onConfirm({ pages: [...pages], flows })}
          className="mt-4 w-full rounded-full border-none py-2.5 text-[13px] font-semibold text-[#141210]"
          style={{ background: "#fff", opacity: pages.size === 0 ? 0.5 : 1 }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
