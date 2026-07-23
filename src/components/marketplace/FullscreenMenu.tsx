"use client";

type MenuService = { id: string; title: string };

type FullscreenMenuProps = {
  services: MenuService[];
  onPick: (id: string) => void;
  onClose: () => void;
};

export default function FullscreenMenu({ services, onPick, onClose }: FullscreenMenuProps) {
  return (
    <div className="absolute inset-0 z-[200] flex">
      {/* dim/blurred backdrop over the rest of the page — click to close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
        className="absolute inset-0 cursor-default border-none bg-black/35 backdrop-blur-sm"
      />

      {/* left-anchored panel — not fullscreen */}
      <div
        className="relative m-6 flex h-[calc(100%-48px)] w-[380px] max-w-[85vw] flex-col overflow-y-auto rounded-[28px] p-8 shadow-2xl"
        style={{ background: "#F4F1EA", color: "#141210" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="mb-10 self-start border-none bg-transparent text-2xl"
          style={{ color: "#141210" }}
        >
          ✕
        </button>

        <nav className="flex flex-1 flex-col items-start gap-3">
          {services.map((service, i) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onPick(service.id)}
              className="mk-blur cursor-pointer border-none bg-transparent py-1.5 text-left font-serif"
              style={{
                fontSize: "clamp(24px,4vw,34px)",
                color: "#141210",
                animationDelay: `${i * 90}ms`,
              }}
            >
              {service.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
