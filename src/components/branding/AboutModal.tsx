"use client";

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-[120] flex items-center justify-center overflow-auto p-6"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[640px] max-h-[88vh] overflow-auto px-10 pt-11 pb-9"
        style={{ background: "var(--cb-bg)", color: "var(--cb-text)" }}
      >
        <button
          type="button"
          onClick={onClose}
          title="cerrar"
          className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ borderColor: "var(--cb-hair)" }}
        >
          ✕
        </button>
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--cb-muted)]">
          Perfil
        </span>

        <div className="mt-4 flex items-center gap-5">
          <div
            className="h-[76px] w-[76px] flex-none rounded-full"
            style={{ background: "var(--cb-pill)" }}
          />
          <div>
            <h2 className="m-0 font-display text-[30px] font-extrabold lowercase leading-none tracking-[-0.02em]">
              consuelo
            </h2>
            <div className="mt-2 text-[13.5px] text-[var(--cb-muted)]">
              Product Designer · UX/UI
            </div>
          </div>
        </div>

        <p className="mt-[22px] max-w-[52ch] text-[14.5px] leading-[1.65] text-[var(--cb-muted)]">
          Diseño flujos B2B complejos y sistemas de diseño multimarca —
          moviéndome entre research, sistemas y pulido pixel a pixel.
        </p>

        <div className="mt-[26px] grid grid-cols-2 gap-3">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
            <div className="font-sans text-[30px] font-bold leading-none">10+</div>
            <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
              Años de experiencia
            </div>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--cb-hair)" }}>
            <div className="font-sans text-[30px] font-bold leading-none">30+</div>
            <div className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-[var(--cb-muted)]">
              Proyectos entregados
            </div>
          </div>
        </div>

        <div className="mt-[26px]">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--cb-muted)]">
            Certificados
          </span>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <span
              className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
              style={{ borderColor: "var(--cb-hair)" }}
            >
              Foundations of UX Design — Google (Coursera)
            </span>
            <span
              className="rounded-full border px-3.5 py-2 text-[12.5px] text-[var(--cb-muted)]"
              style={{ borderColor: "var(--cb-hair)" }}
            >
              Generative AI: Introduction and Applications — IBM (Coursera)
            </span>
          </div>
        </div>

        <div className="mt-7">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-[22px] py-[13px] font-sans text-[13.5px] font-bold no-underline"
            style={{ background: "var(--cb-cta-bg)", color: "var(--cb-cta-text)" }}
          >
            Download CV <span>↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}
