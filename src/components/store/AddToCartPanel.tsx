"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import WhatsAppLink from "@/components/store/WhatsAppLink";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import { formatPrice } from "@/lib/format";
import { buildProductMessage } from "@/lib/whatsapp";
import { MAX_QUANTITY_PER_LINE, VARIANT_TYPE_LABELS } from "@/lib/constants";
import type {
  ProductDetail,
  ProductVariant,
  ResolvedCartLine,
  VariantType,
} from "@/types/catalog";

export default function AddToCartPanel({ product }: { product: ProductDetail }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [variantId, setVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null,
  );
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find((option) => option.id === variantId) ?? null;
  const unitPrice = product.price + (variant?.priceDelta ?? 0);
  const available = variant?.stock ?? product.stock;
  const soldOut = available !== null && available !== undefined && available <= 0;

  // Las opciones se agrupan por tipo: colores, modelos, tallas...
  const groups = new Map<VariantType, ProductVariant[]>();
  for (const option of product.variants) {
    const list = groups.get(option.type) ?? [];
    list.push(option);
    groups.set(option.type, list);
  }

  const maxQuantity = Math.min(
    MAX_QUANTITY_PER_LINE,
    available === null || available === undefined ? MAX_QUANTITY_PER_LINE : available,
  );

  /** Línea equivalente, solo para armar el mensaje de consulta. */
  const line: ResolvedCartLine = {
    productId: product.id,
    variantId: variant?.id ?? null,
    name: product.name,
    variantLabel: variant?.label ?? null,
    unitPrice,
    storePrice: product.storePrice,
    image: product.image,
    quantity,
    maxStock: available ?? null,
    subtotal: unitPrice * quantity,
  };

  return (
    <div className="space-y-5">
      {[...groups.entries()].map(([type, options]) => (
        <div key={type}>
          <p className="text-sm font-medium text-ink">
            {VARIANT_TYPE_LABELS[type]}
            {variant && options.some((option) => option.id === variant.id) && (
              <span className="ml-1.5 font-normal text-ink-soft">
                {variant.label}
              </span>
            )}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {options.map((option) => {
              const active = option.id === variantId;
              const optionSoldOut = option.stock !== undefined && option.stock <= 0;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={optionSoldOut}
                  onClick={() => {
                    setVariantId(option.id);
                    setQuantity(1);
                  }}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                    active
                      ? "border-lila-600 bg-lila-50 text-lila-800 ring-2 ring-lila-200"
                      : "border-lila-200 bg-white text-ink-soft hover:border-lila-300 hover:text-ink"
                  }`}
                >
                  {option.colorHex && (
                    <span
                      className="size-4 rounded-full border border-ink/10"
                      style={{ backgroundColor: option.colorHex }}
                      aria-hidden
                    />
                  )}
                  {option.label}
                  {option.priceDelta ? (
                    <span className="text-xs text-ink-muted">
                      {option.priceDelta > 0 ? "+" : ""}
                      {formatPrice(option.priceDelta)}
                    </span>
                  ) : null}
                  {optionSoldOut && (
                    <span className="text-[11px] uppercase">agotado</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-ink-soft">Cantidad</span>
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={maxQuantity}
          label={`Cantidad de ${product.name}`}
        />
        {available !== null && available !== undefined && (
          <span className="text-xs text-ink-muted">
            {available > 0 ? `${available} disponibles` : "Sin stock"}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          disabled={soldOut}
          onClick={() => {
            const error = addItem({
              productId: product.id,
              variantId: variant?.id ?? null,
              quantity,
            });
            showToast(
              error ?? `${product.name} agregado al carrito`,
              error ? "info" : "success",
            );
          }}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:shadow-card active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="size-4.5" aria-hidden />
          {soldOut ? "Producto agotado" : "Agregar al carrito"}
        </button>

        <WhatsAppLink
          message={buildProductMessage(line)}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-lila-300 bg-white px-5 py-3.5 text-[15px] font-semibold text-lila-800 transition-colors hover:border-lila-400 hover:bg-lila-50"
        >
          Consultar por WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
