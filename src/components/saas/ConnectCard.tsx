"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";

export default function ConnectCard({ onBookCall }: { onBookCall: () => void }) {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);

  return (
    <div className="os-glass rounded-2xl px-[16px] py-3">
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--os-mut)" }}>
        {ui.connectTitle}
      </div>
      <div className="mt-2.5 flex gap-2">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          title={ui.connectEmail}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none text-[13px]"
          style={{ background: "rgba(var(--os-sfrgb),.08)", color: "var(--os-tx)" }}
        >
          ✉
        </a>
        <button
          type="button"
          onClick={onBookCall}
          title={ui.connectBookCall}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none text-[13px]"
          style={{ background: "rgba(var(--os-sfrgb),.08)", color: "var(--os-tx)" }}
        >
          🗓
        </button>
      </div>
    </div>
  );
}
