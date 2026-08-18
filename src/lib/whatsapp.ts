import { SITE, WHATSAPP_NUMBER } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { CartItem, Product } from "@/types/product";

/** Suma total estimada del carrito (precio unitario × cantidad). */
export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Arma el mensaje del pedido a partir del contenido REAL del carrito.
 *
 * Ejemplo de salida:
 *   Hola, Martinez Outlet 👋
 *   Quiero realizar el siguiente pedido:
 *
 *   🛍️ Sérum Facial Vitamina C
 *   Cantidad: 2
 *   Precio: S/ 39.90
 *   ...
 *   Total estimado: S/ 98.70
 */
export function buildOrderMessage(items: CartItem[]): string {
  const lines: string[] = [
    `Hola, ${SITE.name} 👋`,
    "Quiero realizar el siguiente pedido:",
    "",
  ];

  for (const { product, quantity } of items) {
    lines.push(`🛍️ ${product.name}`);
    lines.push(`Cantidad: ${quantity}`);
    lines.push(`Precio: ${formatPrice(product.price)}`);
    lines.push("");
  }

  lines.push(`Total estimado: ${formatPrice(cartTotal(items))}`);
  lines.push("");
  lines.push("¿Podrían confirmarme disponibilidad y forma de entrega?");

  return lines.join("\n");
}

/** Consulta por un producto puntual (desde el detalle del producto). */
export function buildProductMessage(product: Product, quantity = 1): string {
  return buildOrderMessage([{ product, quantity }]);
}

/** Mensaje genérico para los CTA de contacto. */
export function buildContactMessage(): string {
  return `Hola, ${SITE.name} 👋 Quisiera hacer una consulta sobre sus productos.`;
}

/** Construye el enlace wa.me con el mensaje ya codificado. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
