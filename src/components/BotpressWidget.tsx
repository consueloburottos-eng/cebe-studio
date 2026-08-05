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

    type BotpressApi = {
      close?: () => void;
      on?: (event: string, cb: () => void) => void;
    };
    const getBotpress = () => (window as unknown as { botpress?: BotpressApi }).botpress;

    // While the chat window is open it should own scrolling and take input
    // priority over the page behind it: lock scroll on both <html> and
    // <body> (browsers disagree on which one is the real scrolling element)
    // AND cancel wheel/touch scroll gestures outside the widget directly —
    // belt-and-suspenders, since overflow:hidden alone doesn't reliably stop
    // touch-scroll on every mobile browser. Also close the widget on any
    // click outside it instead of leaving it floating over the page.
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    let isOpen = false;

    function isInsideWidget(target: EventTarget | null) {
      const fabRoot = document.getElementById("fab-root");
      return Boolean(fabRoot && target instanceof Node && fabRoot.contains(target));
    }

    function handleOpened() {
      isOpen = true;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    function handleClosed() {
      isOpen = false;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    }
    function handleDocumentPointerDown(e: PointerEvent) {
      if (!isOpen || isInsideWidget(e.target)) return;
      getBotpress()?.close?.();
    }
    function handleScrollGesture(e: Event) {
      if (!isOpen || isInsideWidget(e.target)) return;
      // preventDefault alone only blocks the native scroll — the hero deck's
      // own window-level wheel listener (BrandingHome) still runs and shuffles
      // cards regardless, since it doesn't check defaultPrevented. Stop the
      // event outright so no other wheel/touch listener on the page sees it.
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    document.addEventListener("pointerdown", handleDocumentPointerDown, true);
    document.addEventListener("wheel", handleScrollGesture, { passive: false, capture: true });
    document.addEventListener("touchmove", handleScrollGesture, { passive: false, capture: true });

    let eventsBound = false;
    const eventPoll = window.setInterval(() => {
      const bp = getBotpress();
      if (bp?.on && !eventsBound) {
        bp.on("webchat:opened", handleOpened);
        bp.on("webchat:closed", handleClosed);
        eventsBound = true;
        window.clearInterval(eventPoll);
      }
    }, 300);

    return () => {
      window.clearInterval(poll);
      window.clearInterval(eventPoll);
      fabObserver?.disconnect();
      document.removeEventListener("pointerdown", handleDocumentPointerDown, true);
      document.removeEventListener("wheel", handleScrollGesture, true);
      document.removeEventListener("touchmove", handleScrollGesture, true);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      getBotpress()?.close?.();
      document.getElementById(INJECT_ID)?.remove();
      document.getElementById(CONFIG_ID)?.remove();
      document.querySelectorAll(".bpChatContainer").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
