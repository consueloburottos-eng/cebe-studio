type ProgressiveBlurProps = {
  side: "top" | "bottom";
  height?: number;
  className?: string;
};

// Layered backdrop-blur with shrinking mask stops: near the edge every layer
// overlaps (strong cumulative blur), further away only the lightest layers
// reach, fading to fully sharp — a single backdrop-blur can't vary its own
// radius across an element, so the falloff has to be faked by stacking several.
const LAYERS = [
  { blur: 3, fade: 100 },
  { blur: 8, fade: 70 },
  { blur: 16, fade: 45 },
  { blur: 30, fade: 22 },
];

export default function ProgressiveBlur({ side, height = 260, className = "" }: ProgressiveBlurProps) {
  const dir = side === "top" ? "to bottom" : "to top";
  const gradientAngle = side === "top" ? "180deg" : "0deg";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${side === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ height }}
    >
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: `linear-gradient(${dir}, black 0%, transparent ${layer.fade}%)`,
            WebkitMaskImage: `linear-gradient(${dir}, black 0%, transparent ${layer.fade}%)`,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${gradientAngle}, var(--cb-glass-hdr), var(--cb-glass-hdr-0))` }}
      />
    </div>
  );
}
