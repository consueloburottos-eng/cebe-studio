// span sequence lifted from the original prototype's projSel.intro grid (indices 0-12)
export const INTRO_SPAN_PATTERN = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1];

// Mobile intro strip: tiles keep the exact pixel size they'd have on desktop
// (computed from the same 9-column / 10px-gap formula as the desktop grid,
// at the page's max content width) instead of shrinking to fit — the strip
// scrolls horizontally in a single row instead.
const DESKTOP_CONTENT_WIDTH = 1130 - 28 * 2; // max-w-[1130px] minus px-7 both sides
const INTRO_GRID_GAP = 10;
const INTRO_UNIT = (DESKTOP_CONTENT_WIDTH - INTRO_GRID_GAP * 8) / 9;
// row height is a single fixed value shared by every tile (as on desktop,
// where grid-auto-rows is one constant) — only width scales with the span,
// so a span-2 tile reads as wide/landscape rather than tall/portrait.
const INTRO_ROW_HEIGHT = Math.round(INTRO_UNIT * 1.4);

export function mobileTileSize(span: number) {
  const width = Math.round(INTRO_UNIT * span + INTRO_GRID_GAP * (span - 1));
  return { width, height: INTRO_ROW_HEIGHT };
}
