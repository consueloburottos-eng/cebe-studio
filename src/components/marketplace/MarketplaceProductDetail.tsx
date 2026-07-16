import Link from "next/link";
import { Project } from "@/data/projects";
import MediaPlaceholder from "../MediaPlaceholder";

type MarketplaceProductDetailProps = {
  project: Project;
  suggestions: Project[];
};

export default function MarketplaceProductDetail({ project, suggestions }: MarketplaceProductDetailProps) {
  return (
    <div className="min-h-dvh" style={{ background: "var(--mk-bg)", color: "var(--mk-tx)" }}>
      <div className="flex items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/marketplace"
          className="font-sans text-[13px] no-underline"
          style={{ color: "var(--mk-tx)" }}
        >
          ✕ Cerrar
        </Link>
        <span
          className="font-serif text-[15px]"
          style={{ color: "var(--mk-tx)", letterSpacing: ".22em", fontVariant: "small-caps" }}
        >
          Cebe:Studio
        </span>
        <span className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-8">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-md sm:aspect-[21/9]"
          style={{ background: "#1c1a17" }}
        >
          <MediaPlaceholder label={project.cover} tone="dark" />
        </div>

        <div className="mt-9 max-w-[70ch]">
          <div className="font-serif text-[clamp(32px,5vw,52px)] italic" style={{ color: "var(--mk-tx)" }}>
            {project.title}
          </div>
          <div
            className="mt-2.5 text-[12.5px]"
            style={{ color: "var(--mk-mut)", letterSpacing: ".18em", textTransform: "uppercase" }}
          >
            {project.tag}
          </div>
          <p className="mt-4 text-[16px] leading-[1.6]" style={{ color: "rgba(242,237,230,.82)" }}>
            {project.brief}
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-8 border-t border-b py-6"
          style={{ borderColor: "var(--mk-hr)" }}
        >
          <Meta label="Categoría" value={project.category} />
          <Meta label="Cliente" value={project.client} />
          <Meta label="Rol" value={project.role} />
          <Meta label="Año" value={project.year} />
          <Meta label="Resultado" value={project.result} accent />
        </div>

        {suggestions.length > 0 && (
          <div className="mt-16">
            <div
              className="font-serif text-[19px] italic"
              style={{ color: "var(--mk-tx)" }}
            >
              También te puede interesar…
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {suggestions.map((s) => (
                <Link key={s.slug} href={`/marketplace/${s.slug}`} className="block">
                  <div
                    className="aspect-[16/10] overflow-hidden rounded-lg"
                    style={{ background: "#1c1a17" }}
                  >
                    <MediaPlaceholder label={s.title} tone="dark" />
                  </div>
                  <div className="mt-3 font-serif text-[17px] italic" style={{ color: "var(--mk-tx)" }}>
                    {s.title}
                  </div>
                  <div
                    className="mt-1 text-[11px]"
                    style={{ color: "var(--mk-mut)", letterSpacing: ".12em", textTransform: "uppercase" }}
                  >
                    {s.category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Meta({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div
        className="text-[10.5px]"
        style={{ color: "var(--mk-mut)", letterSpacing: ".1em", textTransform: "uppercase" }}
      >
        {label}
      </div>
      <div
        className="mt-1.5 text-[14px]"
        style={{ color: accent ? "var(--mk-amber)" : "var(--mk-tx)" }}
      >
        {value}
      </div>
    </div>
  );
}
