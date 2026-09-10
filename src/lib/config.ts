/* ==========================================================================
 *  CONFIGURACIÓN DEL NEGOCIO
 *  Todo lo editable de la web (salvo los productos) está en este archivo.
 * ========================================================================== */

/**
 * Número de WhatsApp al que llegan los pedidos.
 * Formato internacional, solo dígitos: sin "+", espacios ni guiones.
 * Perú: 51 + los 9 dígitos del celular.
 */
export const WHATSAPP_NUMBER = "51996112905";

/**
 * 👉 ZONA DE ENTREGA con envío gratis.
 * Escribe aquí tu distrito o barrio, ej. "Ate" o "San Juan de Lurigancho".
 * Si lo dejas vacío, los textos dicen "tu zona" en vez del nombre.
 */
export const DELIVERY_ZONE = "";

/** Texto listo para usar: "a todo Ate" o "en tu zona". */
export const DELIVERY_ZONE_LABEL = DELIVERY_ZONE
  ? `a todo ${DELIVERY_ZONE}`
  : "en tu zona";

export const SITE = {
  name: "Martinez Outlet",
  description:
    "Outlet de skincare, belleza y accesorios a precio de importación. Hasta 30% menos que en tienda y pedidos directos por WhatsApp.",
  /** Cambia esto por el dominio real cuando publiques la web. */
  url: "https://martinezoutlet.com",
} as const;

/** Frase de impacto de la cabecera. */
export const HERO = {
  title: "Precios directos de importación",
  subtitle: `Envíos GRATIS ${DELIVERY_ZONE_LABEL} · Paga al recibir`,
} as const;

/** Cintillo superior de urgencia. */
export const TOP_BAR = {
  message: `🔥 Promoción de hoy: envío GRATIS ${DELIVERY_ZONE_LABEL}`,
  /** Texto que acompaña al contador. */
  countdownLabel: "Termina en",
} as const;

/** Sellos de confianza que se muestran bajo la cabecera y en el pie. */
export const TRUST_BADGES = [
  "Garantía de entrega local",
  "Pago contra entrega · Yape / Plin",
  "Garantía de precio más bajo del mercado",
] as const;

export const CURRENCY_SYMBOL = "S/";

/**
 * Redes sociales. Deja el valor vacío ("") mientras no exista la cuenta:
 * simplemente no se muestra.
 */
export const SOCIAL_LINKS: { instagram: string; tiktok: string; facebook: string } = {
  instagram: "",
  tiktok: "",
  facebook: "",
};
