import { SITE, WHATSAPP_NUMBER } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { ResolvedCartLine } from "@/types/catalog";

/* --------------------------------------------------------------------------
 * Armado del mensaje de WhatsApp. Funciones puras: reciben las líneas ya
 * resueltas contra el catálogo (nunca datos sueltos del navegador).
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

/** Ahorro total frente al precio de tienda. */
export function cartSaving(lines: ResolvedCartLine[]): number {
  return lines.reduce((sum, line) => {
    if (!line.storePrice || line.storePrice <= line.unitPrice) return sum;
    return sum + (line.storePrice - line.unitPrice) * line.quantity;
  }, 0);
}

export interface OrderMessageParams {
  lines: ResolvedCartLine[];
  /** Código de referencia del pedido. */
  reference?: string | null;
  customerName?: string | null;
  note?: string | null;
}

/**
 * Mensaje del pedido:
 *
 *   Hola, Martinez Outlet 👋
 *   Quiero realizar el siguiente pedido:
 *
 *   🛍️ Aretes Argolla Dorados (Medianas)
 *   Cantidad: 2
 *   Precio: S/ 16.90
 *
 *   Total estimado: S/ 33.80
 */
export function buildOrderMessage({
  lines,
  reference,
  customerName,
  note,
}: OrderMessageParams): string {
  const parts: string[] = [
    `Hola, ${SITE.name} 👋`,
    "Quiero realizar el siguiente pedido:",
    "",
  ];

  for (const line of lines) {
    const name = line.variantLabel
      ? `${line.name} (${line.variantLabel})`
      : line.name;
    parts.push(`🛍️ ${name}`);
    parts.push(`Cantidad: ${line.quantity}`);
    parts.push(`Precio: ${formatPrice(line.unitPrice)}`);
    parts.push("");
  }

  parts.push(`Total estimado: ${formatPrice(cartTotal(lines))}`);

  const saving = cartSaving(lines);
  if (saving > 0) {
    parts.push(`(Ahorro por comprar online: ${formatPrice(saving)})`);
  }

  if (reference) {
    parts.push("");
    parts.push(`Referencia: ${reference}`);
  }
  if (customerName) parts.push(`Mi nombre: ${customerName}`);
  if (note) parts.push(`Nota: ${note}`);

  parts.push("");
  parts.push("¿Podrían confirmarme disponibilidad y forma de entrega?");

  return parts.join("\n");
}

/** Consulta por un producto puntual, desde su página de detalle. */
export function buildProductMessage(line: ResolvedCartLine): string {
  return buildOrderMessage({ lines: [line] });
}

/** Mensaje genérico para los botones de contacto. */
export function buildContactMessage(): string {
  return `Hola, ${SITE.name} 👋 Quisiera hacer una consulta sobre sus productos.`;
}
