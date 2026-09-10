import { CURRENCY_SYMBOL } from "@/lib/config";

/**
 * Formatea un precio como "S/ 25.00".
 * Se formatea a mano (no con Intl) para que el resultado sea idéntico en
 * servidor y cliente, y para que el mensaje de WhatsApp no lleve espacios
 * especiales que se codifiquen raro en la URL.
 */
export function formatPrice(value: number): string {
  return `${CURRENCY_SYMBOL} ${value.toFixed(2)}`;
}

/** Porcentaje de descuento redondeado, o null si no aplica. */
export function discountPercent(
  price: number,
  previousPrice?: number | null,
): number | null {
  if (!previousPrice || previousPrice <= price) return null;
  return Math.round(((previousPrice - price) / previousPrice) * 100);
}

/** Fecha corta: "18 ago 2026". */
export function formatDate(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(value);
}

/** Fecha con hora: "18 ago 2026, 14:35". */
export function formatDateTime(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

/** Para inputs datetime-local (YYYY-MM-DDTHH:mm) en hora local. */
export function toDateTimeInput(date: Date | null | undefined): string {
  if (!date) return "";
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

/** Número compacto para tarjetas de métricas: 1250 → "1.25 k". */
export function formatCompact(value: number): string {
  if (Math.abs(value) < 1000) return String(value);
  return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)} k`;
}
