// Tool name -> app-icon tile in public/tools/<file>.svg (rounded square, brand
// color, glyph). Matching is by the tool's display name, so a project only
// needs `tools: [{ name: "Figma" }]` to get its icon.
const ICONS: { match: RegExp; file: string }[] = [
  { match: /^figma make$/i, file: "figma-make" },
  { match: /^figma$/i, file: "figma" },
  { match: /adobe\s*xd/i, file: "adobe-xd" },
  { match: /illustrator/i, file: "adobe-illustrator" },
  { match: /photoshop/i, file: "adobe-photoshop" },
  { match: /^maze$/i, file: "maze" },
  { match: /posthog/i, file: "posthog" },
  { match: /zendesk/i, file: "zendesk" },
  { match: /google analytics/i, file: "google-analytics" },
  { match: /untitled ui/i, file: "untitled-ui" },
  { match: /ant design/i, file: "ant-design" },
  { match: /^react$/i, file: "react" },
  { match: /storybook/i, file: "storybook" },
  { match: /font awesome/i, file: "font-awesome" },
  { match: /magento/i, file: "magento" },
  { match: /^claude code$/i, file: "claude-code" },
];

export function toolIconSrc(name: string): string | null {
  const hit = ICONS.find((icon) => icon.match.test(name.trim()));
  return hit ? `/tools/${hit.file}.svg` : null;
}
