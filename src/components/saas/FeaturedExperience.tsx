"use client";

import { EXPERIENCE, EXPERIENCE_EN } from "@/data/experience";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

// Condensed to the three most recent roles that read cleanly as a career
// timeline — same source data as Branding's AboutModal, just trimmed to
// keep this glanceable.
function pickTimeline(entries: typeof EXPERIENCE) {
  return entries.slice(0, 3);
}

export default function FeaturedExperience() {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const entries = pickTimeline(lang === "en" ? EXPERIENCE_EN : EXPERIENCE);

  return (
    <div className="os-glass rounded-2xl px-[16px] py-3">
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--os-mut)" }}>
        {ui.experienceTitle}
      </div>

      <div className="relative mt-3">
        <div
          className="absolute top-[5px] bottom-[5px] left-[5px] w-px"
          style={{ background: "var(--os-hr)" }}
        />
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => {
            const isCurrent = i === 0;
            return (
              <div key={entry.company} className="relative flex gap-2.5">
                <span
                  className="relative z-[1] mt-[3px] h-[10px] w-[10px] flex-none rounded-full"
                  style={{ background: isCurrent ? "#61c554" : "var(--os-accent)" }}
                />
                <div className="min-w-0">
                  <div className="text-[12.5px] font-bold" style={{ color: "var(--os-tx)" }}>
                    {entry.company}
                  </div>
                  <div className="text-[11.5px]" style={{ color: "rgba(var(--os-txrgb),.7)" }}>
                    {entry.role}
                  </div>
                  <div className="mt-0.5 font-mono text-[10.5px]" style={{ color: "var(--os-mut)" }}>
                    {entry.period} · {entry.place}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
