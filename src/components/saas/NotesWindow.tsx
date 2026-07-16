"use client";

import Link from "next/link";
import { Project } from "@/data/projects";

export type NoteId = "about" | "experiencia" | "servicios" | "contacto";

const NOTES: { id: NoteId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experiencia", label: "Experiencia" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

const SERVICES = [
  {
    name: "Product Design & UX/UI",
    desc: "Diseño de producto end-to-end: research, flujos, sistemas y pulido de interfaz.",
  },
  {
    name: "Diseño de experiencia agéntica",
    desc: "Conversational UX para agentes de IA — puertas de entrada conversacionales, no formularios con filtros.",
  },
  {
    name: "Dirección de arte & fotografía conceptual",
    desc: "De la idea al concepto visual completo: dirección de arte, styling y fotografía.",
  },
  {
    name: "Dirección editorial",
    desc: "Estructura narrativa y sistemas editoriales para publicaciones impresas.",
  },
];

type NotesWindowProps = {
  projects: Project[];
  note: NoteId;
  onNoteChange: (note: NoteId) => void;
  onClose: () => void;
  onOpenBook: () => void;
};

export default function NotesWindow({
  projects,
  note,
  onNoteChange,
  onClose,
  onOpenBook,
}: NotesWindowProps) {
  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
      style={{ background: "rgba(6,6,10,.5)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="os-win flex h-[min(600px,84vh)] w-[min(820px,92vw)] flex-col overflow-hidden rounded-[14px]"
        style={{
          background: "var(--os-win)",
          border: "1px solid var(--os-hr)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,.75)",
        }}
      >
        <div
          className="flex flex-none items-center gap-3.5 px-4 py-3"
          style={{ background: "rgba(var(--os-barrgb),.92)", borderBottom: "1px solid var(--os-hr)" }}
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              title="Cerrar"
              className="h-3 w-3 rounded-full border-none p-0"
              style={{ background: "#ED6A5E" }}
            />
            <span className="h-3 w-3 rounded-full" style={{ background: "#F4BF4F" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#61C554" }} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: "rgba(var(--os-txrgb),.85)" }}>
            {NOTES.find((n) => n.id === note)?.label} — CEBE:STUDIO
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          <div
            className="w-[150px] flex-none overflow-y-auto px-2.5 py-3.5 sm:w-[190px]"
            style={{ borderRight: "1px solid var(--os-hr)", background: "rgba(var(--os-sfrgb),.02)" }}
          >
            {NOTES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => onNoteChange(n.id)}
                className="mb-0.5 w-full rounded-lg border-none px-2.5 py-2 text-left font-sans text-[13px]"
                style={{
                  background: note === n.id ? "rgba(110,124,255,.16)" : "transparent",
                  color: note === n.id ? "var(--os-tx)" : "rgba(var(--os-txrgb),.6)",
                  fontWeight: note === n.id ? 600 : 400,
                }}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-y-auto px-6 py-5" style={{ color: "var(--os-tx)" }}>
            {note === "about" && (
              <div>
                <div className="flex items-center gap-4">
                  <div
                    className="h-[64px] w-[64px] flex-none rounded-full"
                    style={{ background: "rgba(var(--os-sfrgb),.06)" }}
                  />
                  <div>
                    <div className="text-xl font-bold">consuelo</div>
                    <div className="text-[13px]" style={{ color: "rgba(var(--os-txrgb),.6)" }}>
                      Product Designer · UX/UI
                    </div>
                  </div>
                </div>
                <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.65]" style={{ color: "rgba(var(--os-txrgb),.75)" }}>
                  Diseño flujos B2B complejos y sistemas de diseño multimarca — moviéndome
                  entre research, sistemas y pulido pixel a pixel.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-3.5" style={{ border: "1px solid var(--os-hr)" }}>
                    <div className="font-mono text-[26px] font-bold leading-none">10+</div>
                    <div className="mt-1 text-[11px] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                      años de experiencia
                    </div>
                  </div>
                  <div className="rounded-xl p-3.5" style={{ border: "1px solid var(--os-hr)" }}>
                    <div className="font-mono text-[26px] font-bold leading-none">30+</div>
                    <div className="mt-1 text-[11px] uppercase" style={{ color: "rgba(var(--os-txrgb),.5)" }}>
                      proyectos entregados
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="text-[11px] font-semibold uppercase" style={{ color: "rgba(var(--os-txrgb),.4)" }}>
                    Certificados
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span
                      className="rounded-full px-3 py-1.5 text-[12px]"
                      style={{ border: "1px solid var(--os-hr)", color: "rgba(var(--os-txrgb),.7)" }}
                    >
                      Foundations of UX Design — Google (Coursera)
                    </span>
                    <span
                      className="rounded-full px-3 py-1.5 text-[12px]"
                      style={{ border: "1px solid var(--os-hr)", color: "rgba(var(--os-txrgb),.7)" }}
                    >
                      Generative AI: Introduction and Applications — IBM (Coursera)
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold no-underline"
                  style={{ background: "var(--os-tx)", color: "var(--os-win)" }}
                >
                  Download CV <span>↓</span>
                </a>
              </div>
            )}

            {note === "experiencia" && (
              <div className="flex flex-col gap-4">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="block rounded-xl p-4 no-underline"
                    style={{ border: "1px solid var(--os-hr)", color: "inherit" }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-base font-bold">{p.title}</span>
                      <span className="font-mono text-xs" style={{ color: "rgba(var(--os-txrgb),.45)" }}>
                        {p.year}
                      </span>
                    </div>
                    <div className="mt-1 text-[12.5px]" style={{ color: "rgba(var(--os-txrgb),.55)" }}>
                      {p.role} · {p.client}
                    </div>
                    <div className="mt-2 text-[12.5px] font-semibold" style={{ color: "var(--os-accent)" }}>
                      {p.result}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {note === "servicios" && (
              <div className="flex flex-col gap-4">
                {SERVICES.map((s) => (
                  <div key={s.name}>
                    <div className="text-[14.5px] font-bold">{s.name}</div>
                    <div className="mt-1 text-[13px] leading-[1.5]" style={{ color: "rgba(var(--os-txrgb),.65)" }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {note === "contacto" && (
              <div>
                <p className="max-w-[46ch] text-[14px] leading-[1.6]" style={{ color: "rgba(var(--os-txrgb),.75)" }}>
                  Cuéntame sobre tu proyecto de identidad, producto o experiencia. Respondo
                  en 24–48 h.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href="mailto:consuelo.burotto.s@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold no-underline"
                    style={{ background: "var(--os-tx)", color: "var(--os-win)" }}
                  >
                    consuelo.burotto.s@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={onOpenBook}
                    className="rounded-full px-5 py-2.5 text-[13px] font-semibold"
                    style={{ border: "1px solid var(--os-hr)", background: "transparent", color: "inherit" }}
                  >
                    Reservar llamada
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
