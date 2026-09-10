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

export const SITE = {
  name: "Martinez Outlet",
  tagline: "Belleza, cuidado personal y mucho más.",
  description:
    "Catálogo online de skincare, maquillaje, joyería, aseo personal, mochilas y loncheras. Precios online más bajos y pedidos por WhatsApp.",
  /** Cambia esto por el dominio real cuando publiques la web. */
  url: "https://martinezoutlet.com",
} as const;

/** Textos de la portada. */
export const HERO = {
  title: "Precios de outlet, comprando online",
  subtitle:
    "Skincare, maquillaje, joyería, aseo personal, mochilas y mucho más. Arma tu pedido y te lo confirmamos por WhatsApp.",
} as const;

/** Mensaje de la franja que explica la ventaja de comprar por la web. */
export const ONLINE_DISCOUNT_NOTE =
  "Los precios de esta web son precios online: más bajos que comprando en tienda.";

export const CURRENCY_SYMBOL = "S/";

/**
 * Redes sociales. Deja el valor vacío ("") mientras no exista la cuenta:
 * se muestra como "pronto" y no lleva a ningún lado.
 */
export const SOCIAL_LINKS: { instagram: string; tiktok: string; facebook: string } = {
  instagram: "",
  tiktok: "",
  facebook: "",
};

/** Datos de contacto. Vacíos = no se muestran (no se inventa información). */
export const CONTACT_INFO: { address: string; schedule: string; email: string } = {
  address: "",
  schedule: "",
  email: "",
};

/** Paginación del catálogo. */
export const PRODUCTS_PER_PAGE = 24;
