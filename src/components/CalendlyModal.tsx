"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CALENDLY_URL = "https://calendly.com/consuelo-burotto-s/30min";

export default function CalendlyModal({
  onClose,
  closeLabel = "close",
}: {
  onClose: () => void;
  closeLabel?: string;
}) {
  // portals to document.body — some callers mount this from inside a
  // transformed ancestor (e.g. the hero card-deck stack), which would
  // otherwise turn this "fixed" overlay into one scoped to that ancestor
  // instead of the viewport.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[85vh] w-full max-w-[900px] flex-col overflow-hidden rounded-2xl"
        style={{ background: "#fff", boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)" }}
      >
        <button
          type="button"
          onClick={onClose}
          title={closeLabel}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ borderColor: "rgba(0,0,0,.12)", background: "#fff", color: "#111" }}
        >
          ✕
        </button>
        <iframe
          src={CALENDLY_URL}
          title="Calendly"
          className="h-full w-full flex-1 border-none"
        />
      </div>
    </div>,
    document.body
  );
}
