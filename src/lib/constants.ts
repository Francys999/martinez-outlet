import type { VariantType } from "@/types/catalog";

export const VARIANT_TYPE_LABELS: Record<VariantType, string> = {
  color: "Color",
  modelo: "Modelo",
  talla: "Talla",
  otro: "Opción",
};

/* ------------------------- Límites del carrito ----------------------------
 * Frenan pedidos absurdos y los intentos automatizados de saturar el
 * WhatsApp del negocio.
 * ------------------------------------------------------------------------ */

/** Máximo de unidades de un mismo producto. */
export const MAX_QUANTITY_PER_LINE = 20;

/** Máximo de productos distintos en un pedido. */
export const MAX_CART_LINES = 30;

/** Máximo de unidades sumando todo el pedido. */
export const MAX_CART_UNITS = 120;
