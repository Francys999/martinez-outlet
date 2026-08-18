import { CURRENCY_SYMBOL } from "@/lib/config";

/**
 * Formatea un precio como "S/ 25.00".
 * Se formatea a mano (y no con Intl) para que el resultado sea idéntico en
 * servidor y cliente, y para que el mensaje de WhatsApp no lleve espacios
 * especiales que se codifiquen raro en la URL.
 */
export function formatPrice(value: number): string {
  return `${CURRENCY_SYMBOL} ${value.toFixed(2)}`;
}

/** Porcentaje de descuento redondeado, o null si no aplica. */
export function discountPercent(
  price: number,
  previousPrice?: number,
): number | null {
  if (!previousPrice || previousPrice <= price) return null;
  return Math.round(((previousPrice - price) / previousPrice) * 100);
}
