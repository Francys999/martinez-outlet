"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

/**
 * Barra flotante con el total acumulado. Solo aparece cuando hay algo en el
 * carrito, y es el atajo permanente al checkout.
 */
export default function FloatingCart() {
  const { totalItems, totalPrice, totalSaving, isOpen, openCart } = useCart();

  if (totalItems === 0 || isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:left-auto sm:right-6 sm:w-auto sm:px-0 sm:pb-6">
      <button
        type="button"
        onClick={openCart}
        className="animate-fade-up flex w-full items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-4 py-3 text-white shadow-card transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:gap-6"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-white/15">
            <ShoppingBag className="size-5" aria-hidden />
            <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-ink px-1.5 text-[11px] font-bold leading-5">
              {totalItems}
            </span>
          </span>
          <span className="text-left">
            <span className="block text-[11px] font-medium text-white/80">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
              {totalSaving > 0 && ` · ahorras ${formatPrice(totalSaving)}`}
            </span>
            <span className="block font-display text-lg font-extrabold leading-tight tabular-nums">
              {formatPrice(totalPrice)}
            </span>
          </span>
        </span>

        <span className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-fucsia-700">
          Ver pedido
        </span>
      </button>
    </div>
  );
}
