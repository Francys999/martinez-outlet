import type { Banner } from "@/types/catalog";

/* ==========================================================================
 *  ANUNCIOS DEL SLIDER DE LA PORTADA
 *
 *  Para una campaña de temporada (Navidad, Día de la Madre, campaña escolar)
 *  agrega un bloque con sus fechas:
 *
 *    startsAt: "2026-12-01",   // desde cuándo se muestra (opcional)
 *    endsAt:   "2026-12-26",   // hasta cuándo (opcional)
 *
 *  Fuera de esas fechas el anuncio desaparece solo, sin tocar nada.
 *  También puedes ocultarlo con `active: false`.
 *
 *  `link` define a dónde va el botón:
 *    { type: "catalogo" }                          → todo el catálogo
 *    { type: "ofertas" }                           → solo ofertas
 *    { type: "categoria", value: "joyeria" }       → una categoría
 *    { type: "producto", value: "collar-dije-corazon" } → un producto
 *    { type: "whatsapp" }                          → abre WhatsApp
 * ========================================================================== */

export const banners: Banner[] = [
  {
    id: "precio-online",
    title: "Precios online más bajos que en tienda",
    subtitle:
      "Arma tu pedido desde la web y paga menos. Te confirmamos todo por WhatsApp.",
    badge: "Compra online",
    ctaLabel: "Ver catálogo",
    link: { type: "catalogo" },
    theme: "lila",
  },
  {
    id: "joyeria",
    title: "Joyería y accesorios desde S/ 11.90",
    subtitle: "Aretes, collares, anillos y pulseras para regalar o regalarte.",
    badge: "Nuevo",
    ctaLabel: "Ver joyería",
    link: { type: "categoria", value: "joyeria" },
    theme: "fucsia",
  },
  {
    id: "escolar",
    title: "Campaña escolar: mochilas y loncheras",
    subtitle: "Mochilas, loncheras térmicas, cartucheras y termos.",
    badge: "Temporada",
    ctaLabel: "Ver la sección",
    link: { type: "categoria", value: "mochilas-loncheras" },
    theme: "oscuro",
  },
];
