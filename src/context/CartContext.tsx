"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { resolveCartLines } from "@/lib/catalog";
import { cartCount, cartSaving, cartTotal } from "@/lib/whatsapp";
import {
  MAX_CART_LINES,
  MAX_CART_UNITS,
  MAX_QUANTITY_PER_LINE,
} from "@/lib/constants";
import type { CartLine, ResolvedCartLine } from "@/types/catalog";

const STORAGE_KEY = "martinez-outlet:carrito";

/* --------------------------------------------------------------------------
 * El carrito vive solo en el navegador y guarda únicamente identificadores y
 * cantidades. Los nombres y precios se resuelven en cada render contra el
 * catálogo (src/lib/catalog.ts), así que editar el almacenamiento local no
 * permite fabricar precios ni productos inventados.
 * ------------------------------------------------------------------------ */

const EMPTY: CartLine[] = [];
let cartState: CartLine[] | null = null;
const listeners = new Set<() => void>();

function lineKey(productId: string, variantId: string | null): string {
  return `${productId}::${variantId ?? ""}`;
}

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;

    const clean: CartLine[] = [];
    for (const item of parsed.slice(0, MAX_CART_LINES)) {
      if (typeof item !== "object" || item === null) continue;
      const line = item as Partial<CartLine>;
      if (typeof line.productId !== "string") continue;

      clean.push({
        productId: line.productId.slice(0, 80),
        variantId: typeof line.variantId === "string" ? line.variantId.slice(0, 80) : null,
        quantity: Math.min(
          Math.max(1, Math.floor(Number(line.quantity) || 1)),
          MAX_QUANTITY_PER_LINE,
        ),
      });
    }
    return clean;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartLine[] {
  cartState ??= readStorage();
  return cartState;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setCart(updater: (current: CartLine[]) => CartLine[]): void {
  const next = updater(getSnapshot());
  if (next === cartState) return;

  cartState = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Modo privado o almacenamiento lleno: el carrito sigue en memoria.
  }
  for (const listener of listeners) listener();
}

interface AddItemInput {
  productId: string;
  variantId?: string | null;
  quantity?: number;
}

interface CartContextValue {
  /** Líneas ya resueltas contra el catálogo, listas para mostrar. */
  items: ResolvedCartLine[];
  totalItems: number;
  totalPrice: number;
  totalSaving: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** Devuelve un mensaje de error si no se pudo agregar. */
  addItem: (input: AddItemInput) => string | null;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const rawItems = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const items = useMemo(() => resolveCartLines(rawItems), [rawItems]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const addItem = useCallback(
    ({ productId, variantId = null, quantity = 1 }: AddItemInput): string | null => {
      const current = getSnapshot();
      const key = lineKey(productId, variantId);
      const existing = current.find(
        (item) => lineKey(item.productId, item.variantId) === key,
      );

      // Topes de pedido: evitan carritos absurdos (y pedidos automatizados).
      if (!existing && current.length >= MAX_CART_LINES) {
        return `Puedes llevar hasta ${MAX_CART_LINES} productos distintos por pedido.`;
      }

      const units = resolveCartLines(current).reduce(
        (sum, line) => sum + line.quantity,
        0,
      );
      if (units + quantity > MAX_CART_UNITS) {
        return `El pedido llegó a ${MAX_CART_UNITS} unidades. Para compras al por mayor, escríbenos por WhatsApp.`;
      }

      let message: string | null = null;

      setCart((lines) => {
        if (!existing) {
          return [...lines, { productId, variantId, quantity }];
        }
        const total = existing.quantity + quantity;
        if (total > MAX_QUANTITY_PER_LINE) {
          message = `Máximo ${MAX_QUANTITY_PER_LINE} unidades de un mismo producto.`;
        }
        return lines.map((item) =>
          lineKey(item.productId, item.variantId) === key
            ? { ...item, quantity: Math.min(total, MAX_QUANTITY_PER_LINE) }
            : item,
        );
      });

      // No se abre el carrito al agregar: el cliente sigue comprando y ve el
      // total actualizado en la barra flotante.
      return message;
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantId: string | null) => {
    const key = lineKey(productId, variantId);
    setCart((lines) =>
      lines.filter((item) => lineKey(item.productId, item.variantId) !== key),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantId: string | null, quantity: number) => {
      const key = lineKey(productId, variantId);
      setCart((lines) => {
        if (quantity < 1) {
          return lines.filter(
            (item) => lineKey(item.productId, item.variantId) !== key,
          );
        }
        return lines.map((item) =>
          lineKey(item.productId, item.variantId) === key
            ? {
                ...item,
                quantity: Math.min(quantity, MAX_QUANTITY_PER_LINE),
              }
            : item,
        );
      });
    },
    [],
  );

  const clearCart = useCallback(() => setCart(() => EMPTY), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: cartCount(items),
      totalPrice: cartTotal(items),
      totalSaving: cartSaving(items),
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}
