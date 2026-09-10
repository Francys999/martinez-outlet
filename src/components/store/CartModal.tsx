"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { DELIVERY_ZONE, DELIVERY_ZONE_LABEL } from "@/lib/config";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/whatsapp";
import {
  checkCartLimits,
  checkSendRate,
  looksAutomated,
  looksLikeSpam,
  registerSend,
  sanitizeText,
} from "@/lib/antispam";
import { MAX_QUANTITY_PER_LINE } from "@/lib/constants";

export default function CartModal() {
  const {
    items,
    totalItems,
    totalPrice,
    totalSaving,
    isOpen,
    closeCart,
    clearCart,
    removeItem,
    updateQuantity,
  } = useCart();
  const { showToast } = useToast();

  const [sending, setSending] = useState(false);
  const [zone, setZone] = useState(DELIVERY_ZONE);
  /** Campo trampa: invisible para las personas, tentador para los bots. */
  const [website, setWebsite] = useState("");
  /** Momento en que se abrió el carrito, para descartar envíos instantáneos. */
  const openedAt = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // Momento de apertura: sirve para descartar envíos instantáneos de bots.
    openedAt.current = Date.now();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const submitOrder = () => {
    if (sending) return;

    if (!isWhatsAppConfigured()) {
      showToast("Falta configurar el número de WhatsApp en src/lib/config.ts", "info");
      return;
    }

    // 1) Bots: campo trampa y carrito abierto hace menos de 3 segundos.
    if (looksAutomated({ honeypot: website, openedAt: openedAt.current })) {
      showToast("No pudimos validar el pedido. Inténtalo otra vez.", "info");
      return;
    }

    // 2) Frecuencia de envíos desde este navegador.
    const rate = checkSendRate();
    if (!rate.allowed) {
      showToast(rate.message ?? "Espera un momento antes de enviar otro pedido.", "info");
      return;
    }

    // 3) Tamaño del pedido.
    const limits = checkCartLimits(items);
    if (!limits.ok) {
      showToast(limits.message ?? "Revisa tu pedido.", "info");
      return;
    }

    // 4) Contenido: se revisa el texto original para poder avisar al cliente.
    if (looksLikeSpam(zone)) {
      showToast("No se permiten enlaces en la zona de entrega.", "info");
      return;
    }

    setSending(true);
    try {
      const message = buildOrderMessage({
        lines: items,
        zone: sanitizeText(zone, 60),
      });

      registerSend();
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");

      clearCart();
      closeCart();
      showToast("¡Pedido enviado! Te respondemos por WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-ink/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-[61] flex justify-center transition-transform duration-300 ease-out sm:inset-0 sm:items-center sm:p-6 ${
          isOpen ? "translate-y-0" : "pointer-events-none translate-y-full sm:translate-y-6"
        } ${isOpen ? "" : "sm:opacity-0"}`}
      >
        <div
          role="dialog"
          aria-modal={isOpen}
          aria-label="Tu pedido"
          aria-hidden={!isOpen}
          className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-lila-200 bg-white shadow-card sm:max-h-[86vh] sm:rounded-3xl"
        >
          <header className="flex items-center justify-between gap-3 border-b border-lila-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-fucsia-100 to-lila-100">
                <ShoppingBag className="size-5 text-fucsia-700" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-lg font-extrabold leading-tight text-ink">
                  Tu pedido
                </h2>
                <span className="text-xs text-ink-soft">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Cerrar"
              tabIndex={isOpen ? 0 : -1}
              className="grid size-10 place-items-center rounded-xl border border-lila-200 text-ink transition-colors hover:bg-lila-50"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-8 py-14 text-center">
              <span className="grid size-16 place-items-center rounded-2xl bg-lila-50">
                <ShoppingBag className="size-7 text-lila-400" aria-hidden />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                Tu carrito está vacío
              </h3>
              <p className="max-w-xs text-sm text-ink-soft">
                Agrega productos del catálogo y envía tu pedido por WhatsApp.
              </p>
              <button
                type="button"
                onClick={closeCart}
                tabIndex={isOpen ? 0 : -1}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 text-sm font-extrabold text-white"
              >
                Ver el catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5">
                <ul className="divide-y divide-lila-100">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.variantId ?? ""}`}
                      className="flex gap-3 py-3.5"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-lila-200 bg-lila-50">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <Package
                            className="absolute inset-0 m-auto size-5 text-lila-300"
                            aria-hidden
                          />
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate font-display text-sm font-bold text-ink">
                              {item.name}
                            </h3>
                            {item.variantLabel && (
                              <span className="text-xs font-medium text-fucsia-700">
                                {item.variantLabel}
                              </span>
                            )}
                            <span className="block text-xs text-ink-soft">
                              {formatPrice(item.unitPrice)} c/u
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.productId, item.variantId)}
                            aria-label={`Eliminar ${item.name}`}
                            className="grid size-8 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-fucsia-100 hover:text-fucsia-700"
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </button>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <QuantityStepper
                            value={item.quantity}
                            size="sm"
                            min={0}
                            max={Math.min(
                              MAX_QUANTITY_PER_LINE,
                              item.maxStock ?? MAX_QUANTITY_PER_LINE,
                            )}
                            onChange={(value) =>
                              updateQuantity(item.productId, item.variantId, value)
                            }
                            label={`Cantidad de ${item.name}`}
                          />
                          <span className="font-display text-sm font-extrabold text-ink">
                            {formatPrice(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Zona de entrega: va en el mensaje de WhatsApp */}
                <div className="py-3">
                  <label
                    htmlFor="zona-entrega"
                    className="flex items-center gap-1.5 text-sm font-semibold text-ink"
                  >
                    <MapPin className="size-4 text-fucsia-600" aria-hidden />
                    ¿A qué zona lo enviamos?
                  </label>
                  <input
                    id="zona-entrega"
                    value={zone}
                    maxLength={60}
                    onChange={(event) => setZone(event.target.value.slice(0, 60))}
                    placeholder="Tu distrito o barrio"
                    tabIndex={isOpen ? 0 : -1}
                    className="mt-1.5 h-11 w-full rounded-xl border border-lila-200 bg-white px-3.5 text-[15px] text-ink placeholder:text-ink-muted focus:border-fucsia-400 focus:outline-none focus:ring-2 focus:ring-fucsia-200"
                  />
                  <p className="mt-1 text-xs text-ink-muted">
                    Envío GRATIS {DELIVERY_ZONE_LABEL}. Otras zonas se coordinan por
                    WhatsApp.
                  </p>

                  {/* Campo trampa antispam: oculto a la vista y al teclado. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="sitio-web">No completar</label>
                    <input
                      id="sitio-web"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <footer className="border-t border-lila-100 bg-lila-50/60 px-5 py-4">
                {totalSaving > 0 && (
                  <p className="mb-2 rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-800">
                    Estás ahorrando {formatPrice(totalSaving)} frente al precio de
                    mercado
                  </p>
                )}

                <div className="flex items-baseline justify-between">
                  <span className="font-display text-base font-bold text-ink">
                    Total a pagar
                  </span>
                  <span className="font-display text-2xl font-extrabold tabular-nums text-fucsia-700">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={sending}
                  tabIndex={isOpen ? 0 : -1}
                  className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-[15px] font-extrabold text-white transition-all hover:shadow-card active:scale-[0.99] disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" aria-hidden />
                      Preparando tu pedido...
                    </>
                  ) : (
                    <>Finalizar pedido por WhatsApp 📲</>
                  )}
                </button>

                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium text-ink-muted">
                  <span className="inline-flex items-center gap-1">
                    <Truck className="size-3.5" aria-hidden />
                    Entrega local garantizada
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="size-3.5" aria-hidden />
                    Pago contra entrega · Yape / Plin
                  </span>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
}
