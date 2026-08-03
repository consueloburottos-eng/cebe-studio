"use client";

import { useEffect } from "react";

const FAB_STYLE_ID = "botpress-fab-position-override";
const FAB_OVERRIDE_CSS = `
  .bpFabWrapper {
    top: auto !important;
    bottom: 24px !important;
    right: auto !important;
    left: 24px !important;
    transform: none !important;
    width: 48px !important;
    height: 48px !important;
  }
  .bpFab,
  .bpFabIcon,
  .bpFabContainer {
    width: 48px !important;
    height: 48px !important;
  }
  .bpFABMessagePreview {
    top: auto !important;
    bottom: 88px !important;
    right: auto !important;
    left: 24px !important;
    transform: none !important;
  }
`;

function injectFabOverride(shadowRoot: ShadowRoot) {
  if (shadowRoot.getElementById(FAB_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = FAB_STYLE_ID;
  style.textContent = FAB_OVERRIDE_CSS;
  shadowRoot.appendChild(style);
}

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

    let fabObserver: MutationObserver | null = null;
    const poll = window.setInterval(() => {
      const fabRoot = document.getElementById("fab-root");
      if (fabRoot?.shadowRoot) {
        injectFabOverride(fabRoot.shadowRoot);
        fabObserver = new MutationObserver(() => injectFabOverride(fabRoot.shadowRoot!));
        fabObserver.observe(fabRoot.shadowRoot, { childList: true, subtree: true });
        window.clearInterval(poll);
      }
    }, 300);

    return () => {
      window.clearInterval(poll);
      fabObserver?.disconnect();
      const w = window as unknown as { botpress?: { close?: () => void } };
      w.botpress?.close?.();
      document.getElementById(INJECT_ID)?.remove();
      document.getElementById(CONFIG_ID)?.remove();
      document.querySelectorAll(".bpChatContainer").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
