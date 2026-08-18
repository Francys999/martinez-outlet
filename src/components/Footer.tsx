"use client";

import { Camera, MessageCircle, Music2, ThumbsUp } from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { buildContactMessage } from "@/lib/whatsapp";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/config";
import { categories } from "@/data/categories";
import { useCatalog } from "@/context/CatalogContext";
import type { CategoryFilter } from "@/types/product";

// lucide-react v1 ya no incluye logos de marcas: usamos iconos neutros.
const SOCIAL_ICONS = {
  Instagram: Camera,
  TikTok: Music2,
  Facebook: ThumbsUp,
} as const;

export default function Footer() {
  const { selectCategory } = useCatalog();

  const goToCategory = (id: CategoryFilter) => {
    selectCategory(id);
    document
      .getElementById("productos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo size={52} light withWordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-lila-200/80">
              Productos de belleza, cuidado personal y aseo a precios accesibles.
              Haz tu pedido fácil y rápido por WhatsApp.
            </p>

            <div className="mt-5 flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.name];
                if (!social.url) {
                  return (
                    <span
                      key={social.name}
                      title={`${social.name} — próximamente`}
                      aria-label={`${social.name} — próximamente`}
                      className="grid size-10 cursor-default place-items-center rounded-xl border border-white/10 bg-white/5 text-white/35"
                    >
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                  );
                }
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:border-fucsia-500 hover:bg-fucsia-600"
                  >
                    <Icon className="size-4.5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-lila-200/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Categorías
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => goToCategory(category.id)}
                    className="text-left text-sm text-lila-200/80 transition-colors hover:text-white"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Pedidos
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-lila-200/80">
              Arma tu carrito en la web y envíanos el pedido por WhatsApp. Te
              confirmamos disponibilidad y entrega.
            </p>
            <WhatsAppButton
              message={buildContactMessage()}
              showIcon={false}
              className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-500 to-fucsia-600 px-5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <MessageCircle className="size-4" aria-hidden />
              Escríbenos
            </WhatsAppButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-lila-200/60">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-lila-200/60">
            Catálogo online · Pedidos por WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
}
