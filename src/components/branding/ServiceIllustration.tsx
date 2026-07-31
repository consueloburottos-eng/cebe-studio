import type { CSSProperties } from "react";

// Small monochrome, looping illustration per Servicios card — same spirit as
// the reference (line-art scene under the title/description) but restyled
// to the site's own black/cream palette instead of the reference's blue.
export default function ServiceIllustration({ index, bgColor = "var(--cb-bg)" }: { index: number; bgColor?: string }) {
  const common = { width: "100%", height: 96, viewBox: "0 0 200 96", fill: "none" } as const;

  if (index === 0) {
    // UX/UI Development — flowing wave lines
    const lines = Array.from({ length: 6 }, (_, i) => i);
    return (
      <svg {...common}>
        {lines.map((i) => (
          <path
            key={i}
            className="cb-svc-wave-line"
            style={{ "--i": i } as CSSProperties}
            d={`M0 ${16 + i * 13} Q 25 ${8 + i * 13} 50 ${16 + i * 13} T 100 ${16 + i * 13} T 150 ${16 + i * 13} T 200 ${16 + i * 13}`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.75 - i * 0.07}
          />
        ))}
      </svg>
    );
  }

  if (index === 1) {
    // Websites & Landing Pages — globe with an orbiting dot
    return (
      <svg {...common}>
        <g transform="translate(50 48)">
          <circle r="30" cx="0" cy="0" stroke="currentColor" strokeWidth="1.4" opacity={0.85} />
          <ellipse rx="30" ry="12" cx="0" cy="0" stroke="currentColor" strokeWidth="1.2" opacity={0.55} />
          <path d="M-30 0h60M0 -30v60" stroke="currentColor" strokeWidth="1.2" opacity={0.4} />
          <g className="cb-svc-orbit-dot" style={{ transformOrigin: "50px 48px" } as CSSProperties}>
            <circle r="3.4" cx="0" cy="-38" fill="currentColor" />
          </g>
        </g>
        <rect x="110" y="18" width="72" height="52" rx="6" stroke="currentColor" strokeWidth="1.4" opacity={0.7} />
        <path d="M110 32h72" stroke="currentColor" strokeWidth="1.2" opacity={0.5} />
        <circle cx="118" cy="25" r="1.6" fill="currentColor" opacity={0.6} />
        <path d="M122 48h48M122 56h32" stroke="currentColor" strokeWidth="1.2" opacity={0.35} />
      </svg>
    );
  }

  if (index === 2) {
    // Responsive Design — device duo with a scanning highlight
    return (
      <svg {...common}>
        <g clipPath="url(#cb-svc-clip)">
          <rect x="18" y="14" width="100" height="68" rx="6" stroke="currentColor" strokeWidth="1.4" opacity={0.75} />
          <rect className="cb-svc-scan-line" x="18" y="14" width="100" height="10" fill="currentColor" opacity={0.18} />
        </g>
        <defs>
          <clipPath id="cb-svc-clip">
            <rect x="18" y="14" width="100" height="68" rx="6" />
          </clipPath>
        </defs>
        <rect x="132" y="30" width="46" height="52" rx="7" stroke="currentColor" strokeWidth="1.4" opacity={0.85} />
        <path d="M148 76h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity={0.6} />
      </svg>
    );
  }

  if (index === 3) {
    // Security & Trust — shield with soft pulsing rings
    return (
      <svg {...common}>
        <g transform="translate(100 48)">
          <circle className="cb-svc-pulse-ring" r="20" stroke="currentColor" strokeWidth="1.2" />
          <circle className="cb-svc-pulse-ring" r="20" stroke="currentColor" strokeWidth="1.2" style={{ animationDelay: "1.1s" } as CSSProperties} />
          <path
            d="M0 -22l16 7v12.5c0 10.5-6.8 19-16 21.5C-9.2 16.5-16 8-16 -2.5V-15l16-7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill={bgColor}
          />
          <path d="M-6 -1.5l4.5 4.5 9-9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }

  // AI & Data-Driven Flows — animated bar chart with a sparkle
  const bars = [22, 34, 26, 42, 30, 46];
  return (
    <svg {...common}>
      <path d="M158 20l2.4 6.2 6.2 2.4-6.2 2.4-2.4 6.2-2.4-6.2-6.2-2.4 6.2-2.4 2.4-6.2Z" fill="currentColor" opacity={0.7} />
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            className="cb-svc-bar"
            style={{ "--i": i } as CSSProperties}
            x={20 + i * 16}
            y={80 - h}
            width="10"
            height={h}
            rx="2"
            fill="currentColor"
            opacity={0.35 + i * 0.1}
          />
        ))}
      </g>
    </svg>
  );
}
