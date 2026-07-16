"use client";

type FullscreenMenuProps = {
  categories: string[];
  onPick: (category: string) => void;
  onClose: () => void;
};

export default function FullscreenMenu({ categories, onPick, onClose }: FullscreenMenuProps) {
  return (
    <div
      className="absolute inset-0 z-[200] flex overflow-hidden"
      style={{ background: "#F4F1EA", color: "#141210" }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 left-8 border-none bg-transparent text-2xl"
        style={{ color: "#141210" }}
      >
        ✕
      </button>
      <span
        className="absolute top-[30px] left-1/2 -translate-x-1/2 font-serif text-[15px]"
        style={{ letterSpacing: ".22em", fontVariant: "small-caps" }}
      >
        Cebe:Studio
      </span>
      <div className="relative m-auto flex flex-col items-center gap-2 text-center">
        {categories.map((cat, i) => (
          <button
            key={cat}
            type="button"
            onClick={() => onPick(cat)}
            className="mk-blur cursor-pointer border-none bg-transparent px-6 py-1.5 font-serif italic"
            style={{
              fontSize: "clamp(28px,5vw,50px)",
              color: "#141210",
              animationDelay: `${i * 90}ms`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
