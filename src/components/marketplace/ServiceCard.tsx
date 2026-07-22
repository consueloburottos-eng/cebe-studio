"use client";

import { useState } from "react";
import ServiceConfigPopover, { type ServiceCardConfig } from "./ServiceConfigPopover";

export type { ServiceCardConfig };

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
  const [configuring, setConfiguring] = useState(false);
  const configured = Boolean(initial);

  return (
    <>
      <div
        className="absolute bottom-9 left-1/2 z-[25] w-[min(400px,88vw)] -translate-x-1/2 rounded-[28px] border p-5 backdrop-blur-2xl"
        style={{
          background: "rgba(20,18,16,.5)",
          borderColor: "rgba(255,255,255,.16)",
          boxShadow: "0 25px 60px -20px rgba(0,0,0,.6)",
        }}
      >
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

        <button
          type="button"
          onClick={() => setConfiguring(true)}
          className="mt-4 w-full rounded-full border-none py-2.5 text-[13px] font-semibold text-[#141210]"
          style={{ background: "#fff" }}
        >
          {configured ? "Configurado ✓ — Editar" : "Add to Cart"}
        </button>
      </div>

      {configuring && (
        <ServiceConfigPopover
          title={title}
          initial={initial}
          onClose={() => setConfiguring(false)}
          onConfirm={(config) => {
            onConfirm(config);
            setConfiguring(false);
          }}
        />
      )}
    </>
  );
}
