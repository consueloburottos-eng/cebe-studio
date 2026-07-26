"use client";

// Small stylized glyphs (not traced brand vectors) that read as each tool
// via color + shape convention — enough to recognize at a glance in the
// Design Stack card without reproducing exact logo artwork.
const ICONS: Record<string, { bg: string; render: React.ReactNode }> = {
  Figma: {
    bg: "#1E1E1E",
    render: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="4" r="2.6" fill="#F24E1E" />
        <circle cx="8" cy="11.4" r="2.6" fill="#A259FF" />
        <path d="M5.4 8a2.6 2.6 0 1 1 0-5.2h2.6V8H5.4Z" fill="#0ACF83" />
        <path d="M5.4 13.2a2.6 2.6 0 1 1 0-5.2h2.6v2.6a2.6 2.6 0 0 1-2.6 2.6Z" fill="#FF7262" />
        <path d="M8 2.8h2.6a2.6 2.6 0 1 1 0 5.2H8V2.8Z" fill="#1ABCFE" />
      </svg>
    ),
  },
  FigJam: {
    bg: "#1E1E1E",
    render: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M8 1.5 14 6l-6 8.5L2 6Z" fill="#A259FF" />
        <circle cx="8" cy="6.6" r="2.1" fill="#FFCD00" />
      </svg>
    ),
  },
  Notion: {
    bg: "#000000",
    render: (
      <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, fontFamily: "Georgia, serif" }}>N</span>
    ),
  },
  Slack: {
    bg: "#FFFFFF",
    render: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect x="6.3" y="1" width="2" height="6" rx="1" fill="#36C5F0" />
        <rect x="9" y="6.3" width="6" height="2" rx="1" fill="#2EB67D" />
        <rect x="7.7" y="9" width="2" height="6" rx="1" fill="#ECB22E" />
        <rect x="1" y="7.7" width="6" height="2" rx="1" fill="#E01E5A" />
      </svg>
    ),
  },
  Maze: {
    bg: "#7B6EF6",
    render: <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>M</span>,
  },
  Miro: {
    bg: "#FFD02F",
    render: <span style={{ color: "#050038", fontSize: 10, fontWeight: 800 }}>M</span>,
  },
  Zeplin: {
    bg: "#FDBD39",
    render: <span style={{ color: "#1B1B1B", fontSize: 10, fontWeight: 800 }}>Z</span>,
  },
  Claude: {
    bg: "#D97757",
    render: (
      <svg width="14" height="14" viewBox="0 0 16 16">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="7.1"
            y="1"
            width="1.8"
            height="5.2"
            rx="0.9"
            fill="#fff"
            transform={`rotate(${i * 45} 8 8)`}
          />
        ))}
      </svg>
    ),
  },
};

export default function ToolIcon({ name }: { name: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <span
      className="flex h-6 w-6 flex-none items-center justify-center rounded-md"
      style={{ background: icon.bg }}
    >
      {icon.render}
    </span>
  );
}
