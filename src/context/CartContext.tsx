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
import type { CartItem, Product } from "@/types/product";
import { cartTotal } from "@/lib/whatsapp";

const STORAGE_KEY = "martinez-outlet:cart";
const MAX_QUANTITY = 99;

/* --------------------------------------------------------------------------
 * Store del carrito (solo frontend, persistido en localStorage).
 * Se usa un store externo + useSyncExternalStore para que el HTML del
 * servidor (carrito vacío) y el del cliente (carrito guardado) no choquen
 * durante la hidratación.
 * ------------------------------------------------------------------------ */

const EMPTY: CartItem[] = [];
let cartState: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    // Se descartan entradas corruptas de versiones anteriores.
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        "product" in item &&
        "quantity" in item,
    );
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartItem[] {
  cartState ??= readStorage();
  return cartState;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setCart(updater: (current: CartItem[]) => CartItem[]): void {
  const next = updater(getSnapshot());
  if (next === cartState) return;

  cartState = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage puede no estar disponible (modo privado): no es crítico.
  }
  for (const listener of listeners) listener();
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  // Bloquea el scroll del fondo mientras el drawer está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity }];
      return current.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, MAX_QUANTITY),
            }
          : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) => {
      if (quantity < 1) {
        return current.filter((item) => item.product.id !== productId);
      }
      return current.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
          : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => setCart(() => EMPTY), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cartTotal(items),
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
