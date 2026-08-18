"use client";

import { useEffect } from "react";
import { ShoppingBag, Trash2, X } from "lucide-react";
import CartItemRow from "@/components/CartItem";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeCart]);

  return (
    <>
      {/* Fondo */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-white shadow-drawer transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-lila-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-lila-100 to-lila-200">
              <ShoppingBag className="size-5 text-lila-700" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold leading-tight text-ink">
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
              Agrega productos del catálogo y arma tu pedido. Luego lo envías por
              WhatsApp en un solo clic.
            </p>
            <button
              type="button"
              onClick={closeCart}
              tabIndex={isOpen ? 0 : -1}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-xl border border-lila-300 bg-white px-5 text-sm font-semibold text-lila-800 transition-colors hover:bg-lila-50"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-lila-100">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
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

              <WhatsAppButton
                message={buildOrderMessage(items)}
                onBeforeOpen={closeCart}
                className="mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:shadow-card active:scale-[0.99]"
              >
                Finalizar pedido por WhatsApp
              </WhatsAppButton>

              <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
                El precio es referencial. Confirmamos disponibilidad, entrega y
                forma de pago por WhatsApp.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
