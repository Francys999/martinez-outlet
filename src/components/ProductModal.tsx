"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { CATEGORY_LABELS } from "@/data/categories";
import { discountPercent, formatPrice } from "@/lib/format";
import { buildProductMessage } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import QuantityStepper from "@/components/ui/QuantityStepper";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

/** Detalle del producto en modal (sin checkout: solo carrito y WhatsApp). */
export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [openedProductId, setOpenedProductId] = useState<string | null>(null);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const closeButton = useRef<HTMLButtonElement>(null);

  // Al abrir otro producto la cantidad vuelve a 1 (patrón de reset en render).
  if (product && product.id !== openedProductId) {
    setOpenedProductId(product.id);
    setQuantity(1);
  }

  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const discount = discountPercent(product.price, product.previousPrice);

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-producto"
        className="animate-fade-up relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-3xl border border-lila-200 bg-white shadow-card sm:max-h-[86vh] sm:rounded-3xl"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-xl border border-lila-200 bg-white/90 text-ink transition-colors hover:bg-lila-50"
        >
          <X className="size-5" aria-hidden />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden bg-lila-50 sm:rounded-l-3xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover"
              priority
            />
            {product.offer && (
              <span className="absolute left-4 top-4 rounded-md bg-fucsia-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {discount ? `-${discount}% OFF` : "Oferta"}
              </span>
            )}
          </div>

          <div className="flex flex-col p-5 sm:p-7">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-lila-600">
              {CATEGORY_LABELS[product.category]}
              {product.size ? ` · ${product.size}` : ""}
            </span>

            <h2
              id="titulo-producto"
              className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-balance text-ink"
            >
              {product.name}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-soft">
              {product.description}
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-ink">
                {formatPrice(product.price)}
              </span>
              {product.previousPrice && (
                <span className="text-base text-ink-muted line-through">
                  {formatPrice(product.previousPrice)}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm font-medium text-ink-soft">Cantidad</span>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                label={`Cantidad de ${product.name}`}
              />
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  showToast(`${product.name} agregado al carrito`);
                  onClose();
                }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 text-[15px] font-semibold text-white transition-all hover:shadow-soft active:scale-[0.98]"
              >
                <ShoppingBag className="size-4.5" aria-hidden />
                Agregar al carrito
              </button>

              <WhatsAppButton
                message={buildProductMessage(product, quantity)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-lila-300 bg-white px-5 text-[15px] font-semibold text-lila-800 transition-colors hover:border-lila-400 hover:bg-lila-50"
              >
                Comprar por WhatsApp
              </WhatsAppButton>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Coordinamos disponibilidad, forma de entrega y pago directamente por
              WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
