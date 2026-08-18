"use client";

import { Camera, Clock, Mail, MapPin, Music2, ThumbsUp } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { buildContactMessage } from "@/lib/whatsapp";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/config";

// lucide-react v1 ya no incluye logos de marcas: usamos iconos neutros.
const SOCIAL_ICONS = {
  Instagram: Camera,
  TikTok: Music2,
  Facebook: ThumbsUp,
} as const;

export default function Contact() {
  return (
    <section id="contacto" className="bg-white py-16 sm:py-20 lg:py-24">
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
                <WhatsAppButton
                  message={buildContactMessage()}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:shadow-card active:scale-[0.98]"
                >
                  Hablar por WhatsApp
                </WhatsAppButton>
              </div>

              {/* Redes: se activan cuando tengan URL en src/lib/config.ts */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.name];
                  const classes =
                    "inline-flex items-center gap-2 rounded-xl border border-lila-200 bg-white/80 px-3.5 py-2 text-sm font-medium backdrop-blur transition-colors";

                  if (!social.url) {
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
                      href={social.url}
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

              {/* Datos que se mostrarán cuando se completen en config.ts */}
              {(CONTACT_INFO.address ||
                CONTACT_INFO.schedule ||
                CONTACT_INFO.email) && (
                <dl className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                  {CONTACT_INFO.address && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-lila-200 bg-white/80 p-3.5">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-lila-700"
                        aria-hidden
                      />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          Dirección
                        </dt>
                        <dd className="text-sm text-ink">{CONTACT_INFO.address}</dd>
                      </div>
                    </div>
                  )}
                  {CONTACT_INFO.schedule && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-lila-200 bg-white/80 p-3.5">
                      <Clock
                        className="mt-0.5 size-4 shrink-0 text-lila-700"
                        aria-hidden
                      />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          Horarios
                        </dt>
                        <dd className="text-sm text-ink">{CONTACT_INFO.schedule}</dd>
                      </div>
                    </div>
                  )}
                  {CONTACT_INFO.email && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-lila-200 bg-white/80 p-3.5">
                      <Mail
                        className="mt-0.5 size-4 shrink-0 text-lila-700"
                        aria-hidden
                      />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          Correo
                        </dt>
                        <dd className="text-sm text-ink">{CONTACT_INFO.email}</dd>
                      </div>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
