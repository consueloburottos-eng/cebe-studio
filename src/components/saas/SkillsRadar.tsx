"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

// Illustrative, not analytical — these values represent how she'd rank her
// own expertise across disciplines, not a measured metric. Order must match
// i18n's `radarAxes` array (same index = same axis).
const VALUES = [96, 88, 92, 82, 78, 90];

const SIZE = 300;
const CENTER = SIZE / 2;
const MAX_RADIUS = 66;
const LABEL_RADIUS = MAX_RADIUS + 30;
const RINGS = [0.25, 0.5, 0.75, 1];

function axisPoint(index: number, count: number, radius: number): [number, number] {
  const angleDeg = index * (360 / count) - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  return [CENTER + radius * Math.cos(angleRad), CENTER + radius * Math.sin(angleRad)];
}

function polygonPoints(values: number[]): string {
  return values
    .map((v, i) => axisPoint(i, values.length, (v / 100) * MAX_RADIUS))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

// Wraps multi-word labels onto two lines at the most-centered space, so a
// long axis name (e.g. "Conversational UX") takes half the horizontal room
// instead of pushing past the card's edge when anchored left or right.
function splitLabel(label: string): string[] {
  const words = label.split(" ");
  if (words.length < 2 || label.length <= 11) return [label];
  let bestIndex = 0;
  let bestDiff = Infinity;
  let acc = 0;
  for (let i = 0; i < words.length - 1; i++) {
    acc += words[i].length + 1;
    const diff = Math.abs(acc - label.length / 2);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = i;
    }
  }
  return [words.slice(0, bestIndex + 1).join(" "), words.slice(bestIndex + 1).join(" ")];
}

export default function SkillsRadar() {
  const [lang] = useSiteLanguage();
  const ui = t("saas", lang);
  const axes = ui.radarAxes;
  const count = axes.length;

  return (
    <div className="os-glass rounded-2xl px-[18px] py-4">
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--os-mut)" }}>
        {ui.radarTitle}
      </div>

      <div className="mt-3 flex items-center justify-center">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="max-w-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <radialGradient id="radarFill" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stopColor="var(--os-accent)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--os-accent)" stopOpacity="0.04" />
            </radialGradient>
          </defs>

          {/* concentric grid rings */}
          {RINGS.map((r) => (
            <circle
              key={r}
              cx={CENTER}
              cy={CENTER}
              r={MAX_RADIUS * r}
              fill="none"
              stroke="var(--os-hr)"
              strokeWidth={1}
            />
          ))}

          {/* axis spokes */}
          {axes.map((_, i) => {
            const [x, y] = axisPoint(i, count, MAX_RADIUS);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="var(--os-hr)"
                strokeWidth={1}
              />
            );
          })}

          {/* data shape */}
          <g className="radar-shape" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
            <polygon
              points={polygonPoints(VALUES)}
              fill="url(#radarFill)"
              stroke="var(--os-accent)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {VALUES.map((v, i) => {
              const [x, y] = axisPoint(i, count, (v / 100) * MAX_RADIUS);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3.5}
                  fill="var(--os-accent)"
                  stroke="var(--os-win)"
                  strokeWidth={1.5}
                />
              );
            })}
          </g>

          {/* axis labels */}
          {axes.map((label, i) => {
            const [x, y] = axisPoint(i, count, LABEL_RADIUS);
            const anchor = Math.abs(x - CENTER) < 4 ? "middle" : x > CENTER ? "start" : "end";
            const lines = splitLabel(label);
            const lineOffset = lines.length > 1 ? 6 : 0;
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  fill: "var(--os-mut)",
                  fontFamily: "inherit",
                }}
              >
                {lines.map((line, li) => (
                  <tspan key={li} x={x} dy={li === 0 ? -lineOffset : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
