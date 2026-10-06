import type { ProjectDecision } from "@/data/projects/helpers";
import type { Lang } from "@/hooks/useSiteLanguage";

// Compact "decision → why → result" summary shown above a case study's
// brief. Uses currentColor + opacity (no mode-specific CSS variables) so it
// renders correctly in every site mode (portfolio, corporate, SaaS, store).
export default function ProjectDecisionBlock({
  decision,
  lang,
}: {
  decision?: ProjectDecision;
  lang: Lang;
}) {
  if (!decision) return null;

  const rows = [
    { label: lang === "en" ? "Decision" : "Decisión", text: decision.decision },
    { label: lang === "en" ? "Why" : "Porque", text: decision.why },
    { label: lang === "en" ? "Result" : "Resultado", text: decision.result },
  ];

  return (
    <dl
      className="m-0 mb-6 flex flex-col gap-3 border-l-2 pl-4 font-sans"
      style={{ borderColor: "currentColor" }}
    >
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="m-0 text-[10px] font-bold uppercase tracking-[0.12em] opacity-55">{row.label}</dt>
          <dd className="m-0 mt-1 text-[14px] font-semibold leading-snug">{row.text}</dd>
        </div>
      ))}
    </dl>
  );
}
