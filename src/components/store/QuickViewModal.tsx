"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Flame, Package, ShoppingBag, X } from "lucide-react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import { discountPercent, formatPrice } from "@/lib/format";
import { MAX_QUANTITY_PER_LINE, VARIANT_TYPE_LABELS } from "@/lib/constants";
import type { ProductDetail, ProductVariant, VariantType } from "@/types/catalog";

/**
 * Vista rápida del producto: se abre sobre el catálogo para elegir color,
 * modelo o talla sin salir de la página.
 */
export default function QuickViewModal({
  product,
  onClose,
}: {
  product: ProductDetail | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [variantId, setVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Al abrir otro producto se reinicia la selección (patrón de reset en render).
  const [openedId, setOpenedId] = useState<string | null>(null);
  if (product && product.id !== openedId) {
    setOpenedId(product.id);
    setVariantId(product.variants[0]?.id ?? null);
    setQuantity(1);
  }

  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [product, onClose]);

  if (!product) return null;

  const variant = product.variants.find((option) => option.id === variantId) ?? null;
  const unitPrice = product.price + (variant?.priceDelta ?? 0);
  const available = variant?.stock ?? product.stock;
  const soldOut = available !== null && available !== undefined && available <= 0;
  const discount = discountPercent(product.price, product.storePrice);
  const maxQuantity = Math.min(
    MAX_QUANTITY_PER_LINE,
    available === null || available === undefined ? MAX_QUANTITY_PER_LINE : available,
  );

  // Las opciones se agrupan por tipo: colores, modelos, tallas...
  const groups = new Map<VariantType, ProductVariant[]>();
  for (const option of product.variants) {
    const list = groups.get(option.type) ?? [];
    list.push(option);
    groups.set(option.type, list);
  }

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="animate-fade-up relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-t-3xl border border-lila-200 bg-white shadow-card sm:max-h-[86vh] sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-xl border border-lila-200 bg-white/90 text-ink transition-colors hover:bg-lila-50"
        >
          <X className="size-5" aria-hidden />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden bg-lila-50 sm:rounded-l-3xl">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 340px"
                className="object-cover"
              />
            ) : (
              <Package
                className="absolute inset-0 m-auto size-12 text-lila-300"
                aria-hidden
              />
            )}
            {discount !== null && (
              <span className="absolute left-0 top-4 rounded-r-lg bg-fucsia-600 py-1.5 pl-3 pr-4 text-sm font-extrabold text-white">
                -{discount}% OFF
              </span>
            )}
          </div>

          <div className="flex flex-col p-5">
            <h2 className="font-display text-xl font-extrabold leading-tight text-balance text-ink">
              {product.name}
            </h2>
            {product.size && (
              <span className="mt-1 text-xs text-ink-muted">{product.size}</span>
            )}

            <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-soft">
              {product.description}
            </p>

            <div className="mt-4">
              {product.storePrice && product.storePrice > unitPrice && (
                <span className="block text-sm text-ink-muted">
                  Precio mercado:{" "}
                  <span className="text-rose-400 line-through">
                    {formatPrice(product.storePrice)}
                  </span>
                </span>
              )}
              <span className="font-display text-3xl font-extrabold text-fucsia-700">
                {formatPrice(unitPrice)}
              </span>
            </div>

            {[...groups.entries()].map(([type, options]) => (
              <div key={type} className="mt-4">
                <p className="text-sm font-semibold text-ink">
                  {VARIANT_TYPE_LABELS[type]}
                  {variant && options.some((o) => o.id === variant.id) && (
                    <span className="ml-1.5 font-normal text-ink-soft">
                      {variant.label}
                    </span>
                  )}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {options.map((option) => {
                    const active = option.id === variantId;
                    const optionSoldOut =
                      option.stock !== undefined && option.stock <= 0;

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
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                          active
                            ? "border-fucsia-600 bg-fucsia-50 text-fucsia-700 ring-2 ring-fucsia-200"
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
                        {optionSoldOut && (
                          <span className="text-[11px] uppercase">agotado</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {available !== null && available !== undefined && available <= 5 && available > 0 && (
              <p className="mt-3 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-800">
                <Flame className="size-3.5" aria-hidden />
                ¡Últimas {available} unidades!
              </p>
            )}

            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm font-medium text-ink-soft">Cantidad</span>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={maxQuantity}
                label={`Cantidad de ${product.name}`}
              />
            </div>

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
                if (!error) onClose();
              }}
              className="mt-5 inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 py-3.5 text-[15px] font-extrabold text-white transition-all hover:shadow-card active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag className="size-4.5" aria-hidden />
              {soldOut ? "Producto agotado" : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
