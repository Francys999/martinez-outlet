"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** Etiqueta accesible, ej. "Cantidad de Sérum Facial". */
  label: string;
  size?: "sm" | "md";
  min?: number;
  max?: number;
}

/** Control + / − reutilizado en el detalle del producto y en el carrito. */
export default function QuantityStepper({
  value,
  onChange,
  label,
  size = "md",
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const buttonSize = size === "sm" ? "size-8" : "size-10";
  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  const valueWidth = size === "sm" ? "w-8 text-sm" : "w-10 text-base";

  return (
    <div
      className="inline-flex items-center rounded-lg border border-lila-200 bg-white"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Disminuir ${label.toLowerCase()}`}
        className={`${buttonSize} grid place-items-center rounded-l-lg text-ink-soft transition-colors hover:bg-lila-50 hover:text-lila-700 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus className={iconSize} aria-hidden />
      </button>
      <span
        aria-live="polite"
        className={`${valueWidth} text-center font-semibold tabular-nums text-ink`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Aumentar ${label.toLowerCase()}`}
        className={`${buttonSize} grid place-items-center rounded-r-lg text-ink-soft transition-colors hover:bg-lila-50 hover:text-lila-700 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className={iconSize} aria-hidden />
      </button>
    </div>
  );
}
