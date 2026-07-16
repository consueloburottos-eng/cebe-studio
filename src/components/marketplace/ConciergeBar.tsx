"use client";

type ConciergeBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
  placeholder: string;
  label: string;
  id: string;
  className?: string;
};

export default function ConciergeBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder,
  label,
  id,
  className = "",
}: ConciergeBarProps) {
  return (
    <div className={className}>
      <div
        className="flex items-center gap-3 rounded-full py-2 pr-2 pl-5 backdrop-blur-2xl"
        style={{ background: "rgba(20,18,16,.7)", border: "1px solid rgba(255,255,255,.15)" }}
      >
        <span className="cursor-pointer text-lg" style={{ color: "rgba(242,237,230,.6)" }} aria-hidden="true">
          +
        </span>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent py-2 font-serif text-[15px] outline-none"
          style={{ color: "var(--mk-tx)" }}
        />
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            title="Limpiar"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border text-sm"
            style={{ borderColor: "rgba(255,255,255,.25)", background: "transparent", color: "var(--mk-tx)" }}
          >
            ✕
          </button>
        )}
        <button
          type="button"
          onClick={onSubmit}
          title="Enviar"
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-none text-base"
          style={{ background: "var(--mk-amber)", color: "#141210" }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
