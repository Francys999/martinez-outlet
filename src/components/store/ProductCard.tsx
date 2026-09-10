"use client";

import Image from "next/image";
import { Flame, Package, Plus, Settings2 } from "lucide-react";
import { discountPercent, formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import type { ProductDetail } from "@/types/catalog";

/** A partir de cuántas unidades se muestra el aviso de escasez. */
const LOW_STOCK = 5;

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: ProductDetail;
  onQuickView: (product: ProductDetail) => void;
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const discount = discountPercent(product.price, product.storePrice);
  const soldOut = product.stock !== null && product.stock <= 0;
  const lowStock =
    product.stock !== null && product.stock > 0 && product.stock <= LOW_STOCK;
  const hasOptions = product.variants.length > 0;
  const saving =
    product.storePrice && product.storePrice > product.price
      ? product.storePrice - product.price
      : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-lila-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-fucsia-300 hover:shadow-card">
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`Ver ${product.name}`}
        className="relative aspect-square w-full overflow-hidden bg-lila-50"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <Package
            className="absolute inset-0 m-auto size-10 text-lila-300"
            aria-hidden
          />
        )}

        {/* Badge de descuento: la información más importante de la tarjeta. */}
        {discount !== null && (
          <span className="absolute left-0 top-3 rounded-r-lg bg-fucsia-600 py-1 pl-2.5 pr-3 text-[13px] font-extrabold leading-none tracking-tight text-white shadow-soft">
            -{discount}%
            <span className="ml-1 text-[10px] font-bold uppercase">OFF</span>
          </span>
        )}

        {soldOut && (
          <span className="absolute inset-0 grid place-items-center bg-white/75 text-sm font-extrabold uppercase tracking-wide text-ink">
            Agotado
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-[14px] font-bold leading-tight text-ink sm:text-[15px]">
          {product.name}
        </h3>

        {product.size && (
          <span className="mt-0.5 text-[11px] text-ink-muted">{product.size}</span>
        )}

        {/* Comparativa de precios */}
        <div className="mt-2">
          {product.storePrice && product.storePrice > product.price && (
            <span className="block text-[12px] text-ink-muted">
              Precio mercado:{" "}
              <span className="text-rose-400 line-through">
                {formatPrice(product.storePrice)}
              </span>
            </span>
          )}

          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-[22px] font-extrabold leading-tight tracking-tight text-fucsia-700 sm:text-2xl">
              {formatPrice(product.price)}
            </span>
            {saving > 0 && (
              <span className="text-[11px] font-bold text-emerald-700">
                ahorras {formatPrice(saving)}
              </span>
            )}
          </div>
        </div>

        {/* Escasez real: sale del stock del producto, no es un número inventado */}
        {lowStock && (
          <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-800">
            <Flame className="size-3.5 shrink-0" aria-hidden />
            ¡Últimas {product.stock} unidades!
          </p>
        )}

        <div className="mt-auto pt-3">
          {soldOut ? (
            <span className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-lila-200 text-sm font-bold text-ink-muted">
              Sin stock
            </span>
          ) : hasOptions ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-fucsia-600 bg-white text-sm font-extrabold text-fucsia-700 transition-all hover:bg-fucsia-50 active:scale-[0.98]"
            >
              <Settings2 className="size-4" aria-hidden />
              Elegir opciones
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                const error = addItem({ productId: product.id });
                showToast(
                  error ?? `${product.name} agregado al carrito`,
                  error ? "info" : "success",
                );
              }}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-sm font-extrabold text-white transition-all hover:shadow-soft active:scale-[0.98]"
            >
              <Plus className="size-4" aria-hidden />
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
