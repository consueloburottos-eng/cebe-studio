"use client";

const SIZE = 220;
const CENTER = SIZE / 2;
const MAX_RADIUS = 78;
const LABEL_RADIUS = MAX_RADIUS + 30;
const RINGS = [0.25, 0.5, 0.75, 1];
const ACCENT = "#4c56d6";

function axisPoint(index: number, count: number, radius: number): [number, number] {
  const angleDeg = index * (360 / count) - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  return [CENTER + radius * Math.cos(angleRad), CENTER + radius * Math.sin(angleRad)];
}

function polygonPoints(values: number[], max: number): string {
  return values
    .map((v, i) => axisPoint(i, values.length, (v / max) * MAX_RADIUS))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

export default function TalentRadar({
  axes,
  values,
  max = 5,
}: {
  axes: string[];
  values: number[];
  max?: number;
}) {
  const count = axes.length;

  return (
    <div className="flex items-center justify-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="max-w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="talentRadarFill" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.32" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {RINGS.map((r) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={MAX_RADIUS * r}
            fill="none"
            stroke="var(--cb-hair)"
            strokeWidth={1}
          />
        ))}

        {axes.map((_, i) => {
          const [x, y] = axisPoint(i, count, MAX_RADIUS);
          return (
            <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="var(--cb-hair)" strokeWidth={1} />
          );
        })}

        <polygon
          points={polygonPoints(values, max)}
          fill="url(#talentRadarFill)"
          stroke={ACCENT}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {values.map((v, i) => {
          const [x, y] = axisPoint(i, count, (v / max) * MAX_RADIUS);
          return <circle key={i} cx={x} cy={y} r={4} fill={ACCENT} stroke="var(--cb-bg)" strokeWidth={1.5} />;
        })}

        {axes.map((label, i) => {
          const [x, y] = axisPoint(i, count, LABEL_RADIUS);
          const anchor = Math.abs(x - CENTER) < 4 ? "middle" : x > CENTER ? "start" : "end";
          return (
            <text
              key={label}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.01em",
                fill: "var(--cb-muted)",
                fontFamily: "inherit",
              }}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
