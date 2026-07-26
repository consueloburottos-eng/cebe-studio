"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

export default function AiNativeSkills() {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);

  return (
    <div className="os-glass rounded-2xl px-[16px] py-3">
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--os-mut)" }}>
        {ui.aiSkillsTitle}
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {ui.aiSkills.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[10.5px] font-semibold" style={{ color: "var(--os-tx)" }}>
                {skill.name}
              </span>
              <span className="flex-none font-mono text-[10px]" style={{ color: "var(--os-mut)" }}>
                {skill.pct}%
              </span>
            </div>
            <div className="mt-0.5 h-[4px] overflow-hidden rounded-full" style={{ background: "rgba(var(--os-sfrgb),.08)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${skill.pct}%`, background: "var(--os-accent)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
