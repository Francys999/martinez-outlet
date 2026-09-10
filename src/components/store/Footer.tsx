"use client";

import Link from "next/link";
import {
  Camera,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  ThumbsUp,
} from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppLink from "@/components/store/WhatsAppLink";
import { buildContactMessage } from "@/lib/whatsapp";
import { CONTACT_INFO, ONLINE_DISCOUNT_NOTE, SITE, SOCIAL_LINKS } from "@/lib/config";
import type { CategoryListItem } from "@/types/catalog";

// lucide-react v1 ya no incluye logos de marcas: usamos iconos neutros.
const SOCIALS = [
  { name: "Instagram", icon: Camera, url: SOCIAL_LINKS.instagram },
  { name: "TikTok", icon: Music2, url: SOCIAL_LINKS.tiktok },
  { name: "Facebook", icon: ThumbsUp, url: SOCIAL_LINKS.facebook },
];

export default function Footer({
  categories,
}: {
  categories: CategoryListItem[];
}) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo size={52} light withWordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-lila-200/80">
              {ONLINE_DISCOUNT_NOTE}
            </p>

            <div className="mt-5 flex gap-2">
              {SOCIALS.map((social) => {
                const Icon = social.icon;

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
              Tienda
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-lila-200/80 transition-colors hover:text-white"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-lila-200/80 transition-colors hover:text-white"
                >
                  Catálogo completo
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?ofertas=1"
                  className="text-lila-200/80 transition-colors hover:text-white"
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/#nosotros"
                  className="text-lila-200/80 transition-colors hover:text-white"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/#contacto"
                  className="text-lila-200/80 transition-colors hover:text-white"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Categorías
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/catalogo?categoria=${category.id}`}
                    className="text-lila-200/80 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
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

            <WhatsAppLink
              message={buildContactMessage()}
              showIcon={false}
              className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-500 to-fucsia-600 px-5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            >
              <MessageCircle className="size-4" aria-hidden />
              Escríbenos
            </WhatsAppLink>

            <ul className="mt-4 space-y-2 text-sm text-lila-200/80">
              {CONTACT_INFO.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {CONTACT_INFO.address}
                </li>
              )}
              {CONTACT_INFO.schedule && (
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {CONTACT_INFO.schedule}
                </li>
              )}
              {CONTACT_INFO.email && (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {CONTACT_INFO.email}
                </li>
              )}
            </ul>
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
