/* ==========================================================================
 *  CONFIGURACIÓN DEL NEGOCIO — Martinez Outlet
 *  Este es el único archivo que necesitas tocar para poner la web en producción.
 * ========================================================================== */

/**
 * ⚠️  COLOCA AQUÍ EL NÚMERO REAL DE WHATSAPP  ⚠️
 *
 * Formato internacional, solo dígitos: sin "+", sin espacios y sin guiones.
 * Perú → código de país 51 + los 9 dígitos del celular.
 *   Ejemplo: el celular 987 654 321 se escribe "51987654321".
 *
 * Mientras el valor contenga "X", los botones de WhatsApp avisarán que
 * el número aún no está configurado en lugar de abrir un enlace inválido.
 */
export const WHATSAPP_NUMBER = "519XXXXXXXXX";

/** true cuando WHATSAPP_NUMBER ya es un número real (solo dígitos). */
export const isWhatsAppConfigured = /^[0-9]{8,15}$/.test(WHATSAPP_NUMBER);

/** Moneda usada en el catálogo y en el mensaje de WhatsApp. */
export const CURRENCY_SYMBOL = "S/";

export const SITE = {
  name: "Martinez Outlet",
  tagline: "Belleza, cuidado personal y mucho más.",
  description:
    "Descubre productos de skincare, maquillaje, cuidado personal y aseo a precios accesibles. Compra fácilmente por WhatsApp en Martinez Outlet.",
  /** Cambia esto por el dominio real cuando publiques la web. */
  url: "https://martinezoutlet.com",
} as const;

/**
 * Redes sociales. Deja `url: null` mientras no exista la cuenta:
 * el enlace se muestra como "próximamente" y no lleva a ningún lado.
 * Cuando tengas el perfil, solo reemplaza null por la URL.
 */
export const SOCIAL_LINKS: {
  name: "Instagram" | "TikTok" | "Facebook";
  url: string | null;
}[] = [
  { name: "Instagram", url: null },
  { name: "TikTok", url: null },
  { name: "Facebook", url: null },
];

/**
 * Datos de contacto. Se muestran solo cuando dejan de ser null,
 * para no publicar información inventada.
 */
export const CONTACT_INFO: {
  address: string | null;
  schedule: string | null;
  email: string | null;
} = {
  address: null,
  schedule: null,
  email: null,
};

/** Secciones de la landing (navbar + footer). */
export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Categorías", href: "#categorias" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;
