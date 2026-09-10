import {
  BadgePercent,
  Camera,
  Check,
  Clock,
  HeartHandshake,
  LayoutGrid,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Store,
  ThumbsUp,
} from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactWhatsAppButton from "@/components/store/ContactWhatsAppButton";
import { CONTACT_INFO, SITE, SOCIAL_LINKS } from "@/lib/config";

/* ------------------------------- Beneficios ------------------------------- */

const BENEFITS = [
  {
    icon: BadgePercent,
    title: "Precio online más bajo",
    description: "Comprando por la web pagas menos que en tienda física.",
  },
  {
    icon: Store,
    title: "Venta por mayor y menor",
    description: "Compra una unidad o pide cantidades para revender.",
  },
  {
    icon: LayoutGrid,
    title: "Variedad de productos",
    description: "Belleza, skincare, joyería, aseo, mochilas y más.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    description: "Te ayudamos a elegir lo que necesitas, sin apuros.",
  },
  {
    icon: MessageCircle,
    title: "Pedidos fáciles por WhatsApp",
    description: "Arma tu carrito y envíalo con un solo clic.",
  },
];

export function Benefits() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Beneficios"
            title="¿Por qué comprar en Martinez Outlet?"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 50} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-lila-200 bg-gradient-to-b from-white to-lila-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <span className="grid size-11 place-items-center rounded-xl bg-white shadow-soft">
                    <Icon className="size-5 text-fucsia-600" aria-hidden />
                  </span>
                  <h3 className="font-display text-base font-bold leading-snug text-ink">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Sobre nosotros ---------------------------- */

const HIGHLIGHTS = [
  "Belleza, skincare, joyería, aseo personal y más",
  "Precios accesibles comprando online",
  "Atención cercana antes y después de tu pedido",
];

export function About() {
  return (
    <section
      id="nosotros"
      className="bg-gradient-to-b from-white to-lila-50/70 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-lila-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-lila-700">
            Sobre nosotros
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl">
            Belleza accesible, atención cercana
          </h2>

          <p className="mt-4 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
            En {SITE.name} buscamos ofrecer productos de belleza, cuidado
            personal y aseo a precios accesibles, brindando variedad y atención
            cercana a nuestros clientes.
          </p>

          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lila-100">
                  <Check className="size-3 text-lila-700" aria-hidden />
                </span>
                <span className="text-[15px] text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl border border-lila-200 bg-white p-8 shadow-soft sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 size-52 rounded-full bg-lila-100 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-10 size-56 rounded-full bg-fucsia-100 blur-2xl"
            />
            <div className="relative grid place-items-center gap-6 text-center">
              <Logo size={150} />
              <p className="max-w-sm font-display text-lg font-semibold text-balance text-ink">
                Un negocio familiar dedicado a la venta de productos de belleza,
                cuidado personal y variedades.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Contacto -------------------------------- */

const SOCIALS = [
  { name: "Instagram", icon: Camera, url: SOCIAL_LINKS.instagram },
  { name: "TikTok", icon: Music2, url: SOCIAL_LINKS.tiktok },
  { name: "Facebook", icon: ThumbsUp, url: SOCIAL_LINKS.facebook },
];

export function Contact() {
  const details = [
    CONTACT_INFO.address && { icon: MapPin, label: "Dirección", value: CONTACT_INFO.address },
    CONTACT_INFO.schedule && { icon: Clock, label: "Horarios", value: CONTACT_INFO.schedule },
    CONTACT_INFO.email && { icon: Mail, label: "Correo", value: CONTACT_INFO.email },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <section id="contacto" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-lila-200 bg-gradient-to-br from-lila-50 via-white to-fucsia-100/40 p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-fucsia-200/40 blur-3xl"
            />

            <div className="relative">
              <SectionHeading
                eyebrow="Contacto"
                title="¿Tienes alguna consulta?"
                description="Escríbenos y te ayudamos con tu pedido."
              />

              <div className="mt-7 flex justify-center">
                <ContactWhatsAppButton className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:shadow-card active:scale-[0.98]">
                  Hablar por WhatsApp
                </ContactWhatsAppButton>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                {SOCIALS.map((social) => {
                  const url = social.url;
                  const Icon = social.icon;
                  const classes =
                    "inline-flex items-center gap-2 rounded-xl border border-lila-200 bg-white/80 px-3.5 py-2 text-sm font-medium backdrop-blur transition-colors";

                  if (!url) {
                    return (
                      <span
                        key={social.name}
                        className={`${classes} cursor-default text-ink-muted`}
                        title="Próximamente"
                      >
                        <Icon className="size-4" aria-hidden />
                        {social.name}
                        <span className="text-[11px] uppercase tracking-wide text-lila-500">
                          pronto
                        </span>
                      </span>
                    );
                  }

                  return (
                    <a
                      key={social.name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${classes} text-ink hover:border-lila-300 hover:bg-lila-50`}
                    >
                      <Icon className="size-4" aria-hidden />
                      {social.name}
                    </a>
                  );
                })}
              </div>

              {details.length > 0 && (
                <dl className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                  {details.map((detail) => {
                    const Icon = detail.icon;
                    return (
                      <div
                        key={detail.label}
                        className="flex items-start gap-2.5 rounded-xl border border-lila-200 bg-white/80 p-3.5"
                      >
                        <Icon
                          className="mt-0.5 size-4 shrink-0 text-lila-700"
                          aria-hidden
                        />
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                            {detail.label}
                          </dt>
                          <dd className="text-sm text-ink">{detail.value}</dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------- Franja de precio online ------------------------ */

export function OnlinePriceStrip({ note }: { note: string }) {
  return (
    <section className="bg-ink py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 text-center sm:px-6 lg:px-8">
        <BadgePercent className="size-5 shrink-0 text-fucsia-300" aria-hidden />
        <p className="text-sm font-medium text-white sm:text-[15px]">{note}</p>
      </div>
    </section>
  );
}
