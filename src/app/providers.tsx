"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { CatalogProvider } from "@/context/CatalogContext";
import { ToastProvider } from "@/components/ui/Toaster";

/** Estado global del cliente: carrito, filtros del catálogo y avisos. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <CatalogProvider>{children}</CatalogProvider>
      </CartProvider>
    </ToastProvider>
  );
}
