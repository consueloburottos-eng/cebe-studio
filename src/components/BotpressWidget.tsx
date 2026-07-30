"use client";

import { useEffect } from "react";

// Consuelo AI (Botpress) — mounted once at the root layout so it's present
// across Corporate, SaaS, and Marketplace alike.
export default function BotpressWidget() {
  useEffect(() => {
    const INJECT_ID = "botpress-inject-script";
    const CONFIG_ID = "botpress-config-script";

    const injectScript = document.createElement("script");
    injectScript.id = INJECT_ID;
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.7/inject.js";
    injectScript.onload = () => {
      const configScript = document.createElement("script");
      configScript.id = CONFIG_ID;
      configScript.src = "https://files.bpcontent.cloud/2026/07/29/19/20260729191218-VJ90R8EB.js";
      configScript.defer = true;
      document.body.appendChild(configScript);
    };
    document.body.appendChild(injectScript);

    return () => {
      const w = window as unknown as { botpress?: { close?: () => void } };
      w.botpress?.close?.();
      document.getElementById(INJECT_ID)?.remove();
      document.getElementById(CONFIG_ID)?.remove();
      document.querySelectorAll(".bpChatContainer").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
