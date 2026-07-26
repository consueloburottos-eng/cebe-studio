"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

export default function Roadmap() {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);

  return (
    <div className="os-glass rounded-2xl px-[16px] py-3">
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--os-mut)" }}>
        {ui.roadmapTitle}
      </div>
      <ul className="mt-2 flex list-none flex-col gap-1.5 p-0">
        {ui.roadmap.map((item) => (
          <li key={item.text} className="flex items-start gap-1.5">
            <span
              className="mt-[2px] flex h-[12px] w-[12px] flex-none items-center justify-center rounded-full border text-[7px]"
              style={{ borderColor: "var(--os-accent)", color: "var(--os-accent)" }}
            >
              ✓
            </span>
            <div className="min-w-0">
              <span className="text-[9.5px] font-bold tracking-[0.03em] uppercase" style={{ color: "var(--os-accent)" }}>
                {item.status}:{" "}
              </span>
              <span className="text-[11.5px] leading-[1.3]" style={{ color: "var(--os-tx)" }}>
                {item.text}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
