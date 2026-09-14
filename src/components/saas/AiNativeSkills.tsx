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
      <div className="mt-2 flex flex-wrap gap-1.5">
        {ui.aiSkills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border px-2.5 py-1 text-[10.5px]"
            style={{ borderColor: "rgba(var(--os-sfrgb),.16)", color: "var(--os-tx)" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
