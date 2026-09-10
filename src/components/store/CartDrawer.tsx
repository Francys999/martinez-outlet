"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  MessageCircle,
  Package,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toaster";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/config";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/whatsapp";
import {
  buildOrderReference,
  checkCartLimits,
  checkSendRate,
  looksAutomated,
  looksLikeSpam,
  registerSend,
  sanitizePhone,
  sanitizeText,
} from "@/lib/antispam";
import { MAX_QUANTITY_PER_LINE } from "@/lib/constants";

export default function CartDrawer() {
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

  const [step, setStep] = useState<"carrito" | "datos">("carrito");
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  /** Campo trampa: invisible para las personas, tentador para los bots. */
  const [website, setWebsite] = useState("");
  /** Momento en que se abrió el formulario, para descartar envíos instantáneos. */
  const formOpenedAt = useRef(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeCart]);

  // Al cerrarse el carrito vuelve al primer paso (reinicio durante el render).
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setStep("carrito");
  }

  const goToDatos = () => {
    formOpenedAt.current = Date.now();
    setStep("datos");
  };

  const submitOrder = () => {
    if (sending) return;

    if (!isWhatsAppConfigured()) {
      showToast("Falta configurar el número de WhatsApp del negocio.", "info");
      return;
    }

    // 1) Bots: campo trampa y formulario enviado demasiado rápido.
    if (looksAutomated({ honeypot: website, openedAt: formOpenedAt.current })) {
      showToast(
        "No pudimos validar el pedido. Revisa los datos e inténtalo otra vez.",
        "info",
      );
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

    // 4) Contenido: se revisa el texto original, antes de limpiarlo, para
    //    poder avisar al cliente en vez de borrarle cosas en silencio.
    if (looksLikeSpam(note) || looksLikeSpam(name)) {
      showToast(
        "No se permiten enlaces en el pedido. Quítalos e inténtalo de nuevo.",
        "info",
      );
      return;
    }

    // 5) Limpieza de lo que escribió el cliente.
    const cleanName = sanitizeText(name, 60);
    const cleanPhone = sanitizePhone(phone);
    const cleanNote = sanitizeText(note, 300);

    setSending(true);
    try {
      const reference = buildOrderReference();
      const message = buildOrderMessage({
        lines: items,
        reference,
        customerName: cleanName || null,
        note: cleanNote ? `${cleanNote}${cleanPhone ? ` · Tel: ${cleanPhone}` : ""}` : cleanPhone ? `Tel: ${cleanPhone}` : null,
      });

      registerSend();
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");

      clearCart();
      closeCart();
      setName("");
      setPhone("");
      setNote("");
      showToast(`Pedido ${reference} enviado por WhatsApp`);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="Tu pedido"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-white shadow-drawer transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-lila-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            {step === "datos" ? (
              <button
                type="button"
                onClick={() => setStep("carrito")}
                aria-label="Volver al carrito"
                className="grid size-10 place-items-center rounded-xl border border-lila-200 text-ink"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
            ) : (
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-lila-100 to-lila-200">
                <ShoppingBag className="size-5 text-lila-700" aria-hidden />
              </span>
            )}
            <div>
              <h2 className="font-display text-lg font-bold leading-tight text-ink">
                {step === "datos" ? "Tus datos" : "Tu pedido"}
              </h2>
              <span className="text-xs text-ink-soft">
                {totalItems} {totalItems === 1 ? "producto" : "productos"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            tabIndex={isOpen ? 0 : -1}
            className="grid size-10 place-items-center rounded-xl border border-lila-200 text-ink transition-colors hover:bg-lila-50"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-lila-50">
              <ShoppingBag className="size-7 text-lila-400" aria-hidden />
            </span>
            <h3 className="font-display text-lg font-bold text-ink">
              Tu carrito está vacío
            </h3>
            <p className="max-w-xs text-sm text-ink-soft">
              Agrega productos del catálogo y arma tu pedido. Lo envías por
              WhatsApp en un solo paso.
            </p>
            <Link
              href="/catalogo"
              onClick={closeCart}
              tabIndex={isOpen ? 0 : -1}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-xl border border-lila-300 bg-white px-5 text-sm font-semibold text-lila-800 transition-colors hover:bg-lila-50"
            >
              Ver catálogo
            </Link>
          </div>
        ) : step === "carrito" ? (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-lila-100">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId ?? ""}`}
                    className="flex gap-3 py-4"
                  >
                    <Link
                      href={`/producto/${item.productId}`}
                      onClick={closeCart}
                      className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-lila-200 bg-lila-50"
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <Package
                          className="absolute inset-0 m-auto size-6 text-lila-300"
                          aria-hidden
                        />
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-display text-sm font-bold text-ink">
                            {item.name}
                          </h3>
                          {item.variantLabel && (
                            <span className="text-xs text-lila-700">
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

                      <div className="mt-2 flex items-center justify-between gap-2">
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

              <button
                type="button"
                onClick={clearCart}
                tabIndex={isOpen ? 0 : -1}
                className="mb-4 mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-fucsia-700"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Vaciar carrito
              </button>
            </div>

            <footer className="border-t border-lila-100 bg-lila-50/60 px-5 py-4">
              {totalSaving > 0 && (
                <p className="mb-2 rounded-xl bg-fucsia-100 px-3 py-2 text-center text-xs font-semibold text-fucsia-700">
                  Estás ahorrando {formatPrice(totalSaving)} comprando online
                </p>
              )}

              <dl className="space-y-1.5">
                <div className="flex items-center justify-between text-sm text-ink-soft">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(totalPrice)}</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="font-display text-base font-bold text-ink">
                    Total estimado
                  </dt>
                  <dd className="font-display text-2xl font-extrabold tabular-nums text-ink">
                    {formatPrice(totalPrice)}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={goToDatos}
                tabIndex={isOpen ? 0 : -1}
                className="mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:shadow-card active:scale-[0.99]"
              >
                <MessageCircle className="size-4.5" aria-hidden />
                Continuar con el pedido
              </button>

              <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
                Sin pagos en la web: coordinamos entrega y pago por WhatsApp.
              </p>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
            <p className="mb-4 rounded-xl border border-lila-200 bg-lila-50 px-3.5 py-3 text-sm text-ink-soft">
              Déjanos tus datos y te confirmamos disponibilidad y entrega por
              WhatsApp. Son opcionales, pero ayudan a atenderte más rápido.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cliente-nombre"
                  className="block text-sm font-medium text-ink"
                >
                  Tu nombre
                </label>
                <input
                  id="cliente-nombre"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={60}
                  autoComplete="name"
                  tabIndex={isOpen ? 0 : -1}
                  className="mt-1.5 h-11 w-full rounded-xl border border-lila-200 bg-white px-3.5 text-[15px] text-ink focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
                />
              </div>

              <div>
                <label
                  htmlFor="cliente-telefono"
                  className="block text-sm font-medium text-ink"
                >
                  Tu teléfono
                </label>
                <input
                  id="cliente-telefono"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={20}
                  inputMode="tel"
                  autoComplete="tel"
                  tabIndex={isOpen ? 0 : -1}
                  className="mt-1.5 h-11 w-full rounded-xl border border-lila-200 bg-white px-3.5 text-[15px] text-ink focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
                />
              </div>

              <div>
                <label
                  htmlFor="cliente-nota"
                  className="block text-sm font-medium text-ink"
                >
                  ¿Algo que debamos saber?
                </label>
                <textarea
                  id="cliente-nota"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="Ej. distrito de entrega, color preferido, para regalo..."
                  tabIndex={isOpen ? 0 : -1}
                  className="mt-1.5 w-full rounded-xl border border-lila-200 bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
                />
              </div>

              {/* Campo trampa antispam: oculto a la vista y a lectores de pantalla. */}
              <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="sitio-web">No completar este campo</label>
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

            <div className="mt-auto pt-5">
              <dl className="mb-3 flex items-baseline justify-between">
                <dt className="font-display text-base font-bold text-ink">
                  Total estimado
                </dt>
                <dd className="font-display text-2xl font-extrabold tabular-nums text-ink">
                  {formatPrice(totalPrice)}
                </dd>
              </dl>

              <button
                type="button"
                onClick={submitOrder}
                disabled={sending}
                tabIndex={isOpen ? 0 : -1}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:shadow-card active:scale-[0.99] disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 className="size-4.5 animate-spin" aria-hidden />
                    Preparando tu pedido...
                  </>
                ) : (
                  <>
                    <MessageCircle className="size-4.5" aria-hidden />
                    Enviar pedido por WhatsApp
                  </>
                )}
              </button>

              <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-ink-muted">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                Se abrirá WhatsApp con tu pedido escrito para {SITE.name}. No
                pedimos datos de pago ni tarjetas.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
