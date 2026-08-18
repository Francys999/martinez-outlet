"use client";

import Image from "next/image";
import { Eye, Plus } from "lucide-react";
import { CATEGORY_LABELS } from "@/data/categories";
import { discountPercent, formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const discount = discountPercent(product.price, product.previousPrice);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-lila-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-lila-300 hover:shadow-card">
      {/* Toda la tarjeta abre el detalle */}
      <button
        type="button"
        onClick={() => onOpenDetail(product)}
        className="relative aspect-square w-full overflow-hidden bg-lila-50"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1.5 bg-ink/70 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
          <Eye className="size-3.5" aria-hidden />
          Ver detalle
        </span>
      </button>

      <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
        {product.offer && (
          <span className="rounded-md bg-fucsia-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {discount ? `-${discount}%` : "Oferta"}
          </span>
        )}
        {product.featured && !product.offer && (
          <span className="rounded-md bg-lila-700 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-lila-600">
          {CATEGORY_LABELS[product.category]}
        </span>

        <h3 className="mt-1 line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink">
          {product.name}
        </h3>

        {product.size && (
          <span className="mt-0.5 text-xs text-ink-muted">{product.size}</span>
        )}

        <div className="mt-3 flex flex-1 items-end justify-between gap-2">
          <div>
            <span className="block font-display text-lg font-extrabold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.previousPrice && (
              <span className="block text-xs text-ink-muted line-through">
                {formatPrice(product.previousPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              addItem(product);
              showToast(`${product.name} agregado al carrito`);
            }}
            aria-label={`Agregar ${product.name} al carrito`}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-3 text-sm font-semibold text-white transition-all hover:shadow-soft active:scale-95"
          >
            <Plus className="size-4" aria-hidden />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
