import { CURRENCY_SYMBOL, DELIVERY_ZONE, SITE, WHATSAPP_NUMBER } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { ResolvedCartLine } from "@/types/catalog";

/* --------------------------------------------------------------------------
 * Armado del mensaje de WhatsApp. Funciones puras: reciben las líneas ya
 * resueltas contra el catálogo, nunca datos sueltos del navegador.
 * ------------------------------------------------------------------------ */

export function isWhatsAppConfigured(): boolean {
  return /^[0-9]{8,15}$/.test(WHATSAPP_NUMBER);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function cartTotal(lines: ResolvedCartLine[]): number {
  return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

export function cartCount(lines: ResolvedCartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

/** Ahorro total frente al precio de mercado. */
export function cartSaving(lines: ResolvedCartLine[]): number {
  return lines.reduce((sum, line) => {
    if (!line.storePrice || line.storePrice <= line.unitPrice) return sum;
    return sum + (line.storePrice - line.unitPrice) * line.quantity;
  }, 0);
}

/**
 * Mensaje del pedido:
 *
 *   ¡Hola Martinez Outlet! Quiero realizar el siguiente pedido:
 *   - Sérum Facial Vitamina C x2 - S/ 79.80
 *   - Aretes Argolla Dorados (Medianas) x1 - S/ 16.90
 *   Total a pagar: S/ 96.70
 *   Ubicación de entrega: Ate - Envío Gratis
 */
export function buildOrderMessage({
  lines,
  zone,
  note,
}: {
  lines: ResolvedCartLine[];
  /** Barrio o zona que escribe el cliente. */
  zone?: string | null;
  note?: string | null;
}): string {
  const parts: string[] = [
    `¡Hola ${SITE.name}! Quiero realizar el siguiente pedido:`,
  ];

  for (const line of lines) {
    const name = line.variantLabel
      ? `${line.name} (${line.variantLabel})`
      : line.name;
    parts.push(`- ${name} x${line.quantity} - ${formatPrice(line.subtotal)}`);
  }

  parts.push(`Total a pagar: ${formatPrice(cartTotal(lines))}`);

  const zoneText = zone?.trim() || DELIVERY_ZONE;
  parts.push(
    zoneText
      ? `Ubicación de entrega: ${zoneText} - Envío Gratis`
      : "Ubicación de entrega: (indicar zona) - Envío Gratis",
  );

  if (note) parts.push(`Nota: ${note}`);

  const saving = cartSaving(lines);
  if (saving > 0) {
    parts.push(`(Ahorro frente al precio de mercado: ${formatPrice(saving)})`);
  }

  return parts.join("\n");
}

/** Consulta por un producto puntual. */
export function buildProductMessage(line: ResolvedCartLine): string {
  const name = line.variantLabel
    ? `${line.name} (${line.variantLabel})`
    : line.name;
  return `¡Hola ${SITE.name}! Quiero consultar por: ${name} (${CURRENCY_SYMBOL} ${line.unitPrice.toFixed(
    2,
  )})`;
}

/** Mensaje genérico para los botones de contacto. */
export function buildContactMessage(): string {
  return `¡Hola ${SITE.name}! Vi su catálogo y quiero hacer una consulta.`;
}
