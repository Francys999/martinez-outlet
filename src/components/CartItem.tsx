"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CATEGORY_LABELS } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import QuantityStepper from "@/components/ui/QuantityStepper";
import type { CartItem as CartItemType } from "@/types/product";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <li className="flex gap-3 py-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-lila-200 bg-lila-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-lila-600">
              {CATEGORY_LABELS[product.category]}
            </span>
            <h3 className="truncate font-display text-sm font-bold text-ink">
              {product.name}
            </h3>
            <span className="text-xs text-ink-soft">
              {formatPrice(product.price)} c/u
            </span>
          </div>

          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Eliminar ${product.name} del carrito`}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-fucsia-100 hover:text-fucsia-700"
          >
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <QuantityStepper
            value={quantity}
            size="sm"
            onChange={(value) => updateQuantity(product.id, value)}
            label={`Cantidad de ${product.name}`}
            min={0}
          />
          <span className="font-display text-sm font-extrabold text-ink">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
