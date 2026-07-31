"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { t } from "@/lib/i18n";

export type FavoriteItem = {
  id: string;
  title: string;
  desc: string;
  thumbnailSrc: string;
};

type FavoritesOverlayProps = {
  items: FavoriteItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onView: (id: string) => void;
};

export default function FavoritesOverlay({ items, onClose, onRemove, onView }: FavoritesOverlayProps) {
  const [lang] = useSiteLanguage();
  const ui = t("marketplace", lang);

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
          <h3 className="font-serif text-[24px]">{ui.saved} ({items.length})</h3>
          <button
            type="button"
            onClick={onClose}
            title={ui.close}
            className="flex h-9 w-9 items-center justify-center rounded-full border-none text-[14px]"
            style={{ background: "rgba(20,18,16,.08)" }}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-[14px]" style={{ color: "rgba(20,18,16,.6)" }}>
            {ui.noFavoritesYet}
          </p>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-5" style={{ borderColor: "rgba(20,18,16,.1)" }}>
                <button
                  type="button"
                  onClick={() => onView(item.id)}
                  className="h-20 w-20 flex-none rounded-xl border-none bg-cover bg-center p-0"
                  style={{ backgroundImage: `url(${item.thumbnailSrc})` }}
                  aria-label={item.title}
                />
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => onView(item.id)}
                    className="border-none bg-transparent p-0 text-left font-serif text-[17px]"
                    style={{ color: "inherit" }}
                  >
                    {item.title}
                  </button>
                  <div className="mt-1.5 text-[12.5px] leading-[1.4]" style={{ color: "rgba(20,18,16,.6)" }}>
                    {item.desc}
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="mt-2 border-none bg-transparent text-[12px] underline underline-offset-4"
                    style={{ color: "rgba(20,18,16,.7)" }}
                  >
                    {ui.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
