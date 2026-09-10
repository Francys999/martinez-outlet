"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Plus, Settings2 } from "lucide-react";
import { discountPercent, formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import type { ProductListItem } from "@/types/catalog";

export default function ProductCard({ product }: { product: ProductListItem }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const discount = discountPercent(product.price, product.storePrice);
  const soldOut = product.stock !== null && product.stock <= 0;
  const hasOptions = product.variantCount > 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-lila-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-lila-300 hover:shadow-card">
      <Link
        href={`/producto/${product.id}`}
        className="relative aspect-square w-full overflow-hidden bg-lila-50"
        aria-label={`Ver ${product.name}`}
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

        {soldOut && (
          <span className="absolute inset-0 grid place-items-center bg-white/70 text-sm font-bold uppercase tracking-wide text-ink">
            Agotado
          </span>
        )}
      </Link>

      <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
        {discount !== null && (
          <span className="rounded-md bg-fucsia-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            -{discount}% online
          </span>
        )}
        {product.offer && discount === null && (
          <span className="rounded-md bg-fucsia-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Oferta
          </span>
        )}
        {product.featured && !product.offer && discount === null && (
          <span className="rounded-md bg-lila-700 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <Link
          href={`/catalogo?categoria=${product.categoryId}`}
          className="text-[11px] font-semibold uppercase tracking-wider text-lila-600 hover:text-lila-800"
        >
          {product.categoryName}
        </Link>

        <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-ink">
          <Link href={`/producto/${product.id}`} className="line-clamp-2">
            {product.name}
          </Link>
        </h3>

        {product.size && (
          <span className="mt-0.5 text-xs text-ink-muted">{product.size}</span>
        )}

        <div className="mt-3 flex flex-1 items-end justify-between gap-2">
          <div>
            <span className="block font-display text-lg font-extrabold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.storePrice && product.storePrice > product.price && (
              <span className="block text-xs text-ink-muted">
                <span className="line-through">
                  {formatPrice(product.storePrice)}
                </span>{" "}
                en tienda
              </span>
            )}
          </div>

          {soldOut ? (
            <span className="inline-flex h-10 items-center rounded-xl border border-lila-200 px-3 text-xs font-semibold text-ink-muted">
              Sin stock
            </span>
          ) : hasOptions ? (
            <Link
              href={`/producto/${product.id}`}
              aria-label={`Elegir opciones de ${product.name}`}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-lila-300 bg-white px-3 text-sm font-semibold text-lila-800 transition-colors hover:bg-lila-50"
            >
              <Settings2 className="size-4" aria-hidden />
              <span className="hidden sm:inline">Elegir</span>
            </Link>
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
              aria-label={`Agregar ${product.name} al carrito`}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-3 text-sm font-semibold text-white transition-all hover:shadow-soft active:scale-95"
            >
              <Plus className="size-4" aria-hidden />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
