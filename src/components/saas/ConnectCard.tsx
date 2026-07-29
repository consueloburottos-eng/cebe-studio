"use client";

import { useState } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";
import CalendlyModal from "@/components/CalendlyModal";

const CONTACT_EMAIL = "consuelo.burotto.s@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cburotto/";

export default function ConnectCard() {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

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
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={ui.connectLinkedin}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none text-[13px] font-bold"
          style={{ background: "rgba(var(--os-sfrgb),.08)", color: "var(--os-tx)" }}
        >
          in
        </a>
        <button
          type="button"
          onClick={() => setCalendlyOpen(true)}
          title={ui.connectBookCall}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-none"
          style={{ background: "rgba(var(--os-sfrgb),.08)", color: "var(--os-tx)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>

      {calendlyOpen && (
        <CalendlyModal
          onClose={() => setCalendlyOpen(false)}
          closeLabel={lang === "en" ? "close" : "cerrar"}
        />
      )}
    </div>
  );
}
