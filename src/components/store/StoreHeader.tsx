"use client";

import { ShoppingBag } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

/**
 * Cabecera mínima: logo + carrito. Nada de menús ni secciones: el objetivo es
 * que el catálogo aparezca de inmediato.
 */
export default function StoreHeader() {
  const { totalItems, totalPrice, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-lila-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#catalogo" className="flex shrink-0 items-center" aria-label="Martinez Outlet">
          <Logo size={40} priority withWordmark />
        </a>

        <button
          type="button"
          onClick={openCart}
          aria-label={`Ver carrito (${totalItems} ${
            totalItems === 1 ? "producto" : "productos"
          })`}
          className="relative inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-3.5 text-sm font-bold text-white transition-all hover:shadow-soft active:scale-95 sm:px-4"
        >
          <ShoppingBag className="size-5" aria-hidden />
          <span className="tabular-nums">{formatPrice(totalPrice)}</span>
          {totalItems > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-ink px-1.5 text-[11px] font-bold leading-5 text-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
