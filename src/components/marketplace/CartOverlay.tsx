"use client";

export type CartItem = {
  id: string;
  title: string;
  priceFrom: number;
  thumbnailSrc: string;
  pages: string[];
  flows: number;
};

type CartOverlayProps = {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
};

export default function CartOverlay({ items, onClose, onRemove }: CartOverlayProps) {
  const total = items.reduce((sum, item) => sum + item.priceFrom, 0);

  return (
    <>
      <div className="fixed inset-0 z-[299]" onClick={onClose} />
      <div
        className="fixed top-20 right-4 z-[300] w-[min(420px,92vw)] rounded-[24px] border p-6 font-sans backdrop-blur-2xl sm:right-8"
        style={{
          background: "rgba(244,241,234,.65)",
          borderColor: "rgba(20,18,16,.14)",
          color: "#141210",
          maxHeight: "75vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px -20px rgba(0,0,0,.35)",
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-[24px]">Mi selección ({items.length})</h3>
          <button
            type="button"
            onClick={onClose}
            title="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full border-none text-[14px]"
            style={{ background: "rgba(20,18,16,.08)" }}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-[14px]" style={{ color: "rgba(20,18,16,.6)" }}>
            Todavía no agregaste ningún servicio.
          </p>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-5" style={{ borderColor: "rgba(20,18,16,.1)" }}>
                <div
                  className="h-20 w-20 flex-none rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.thumbnailSrc})` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-serif text-[17px]">{item.title}</div>
                    <div className="flex-none text-[14px]">Desde ${item.priceFrom.toLocaleString("en-US")}</div>
                  </div>
                  <div className="mt-1.5 text-[12.5px]" style={{ color: "rgba(20,18,16,.6)" }}>
                    {item.pages.length > 0 ? item.pages.join(", ") : "Sin páginas seleccionadas"}
                  </div>
                  <div className="mt-1 text-[12.5px]" style={{ color: "rgba(20,18,16,.6)" }}>
                    Custom Flows: {item.flows}
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="mt-2 border-none bg-transparent text-[12px] underline underline-offset-4"
                    style={{ color: "rgba(20,18,16,.7)" }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between text-[15px] font-semibold">
              <span>Total estimado</span>
              <span>Desde ${total.toLocaleString("en-US")}</span>
            </div>

            <button
              type="button"
              className="mt-1 w-full rounded-full border-none py-3.5 text-[13px] font-semibold uppercase text-white"
              style={{ background: "#141210", letterSpacing: ".06em" }}
            >
              Enviar solicitud
            </button>
            <p className="text-center text-[11.5px]" style={{ color: "rgba(20,18,16,.5)" }}>
              Te contactamos para afinar el alcance y coordinar el proyecto.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
