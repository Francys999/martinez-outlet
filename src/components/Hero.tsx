"use client";

import { ArrowRight, Droplets, Sparkles, Tag } from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { buildContactMessage } from "@/lib/whatsapp";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const stats = [
  { value: `${products.length}+`, label: "Productos" },
  { value: `${categories.length - 1}`, label: "Categorías" },
  { value: "Mayor y menor", label: "Modalidad de venta" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-24 sm:pt-28">
      {/* Fondo: degradado muy suave lila → blanco */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-lila-100 via-lila-50 to-white"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[420px] rounded-full bg-fucsia-200/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 -z-10 size-[380px] rounded-full bg-lila-300/35 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-lila-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-lila-700 backdrop-blur">
            <Sparkles className="size-3.5" aria-hidden />
            Belleza y cuidado personal
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            MARTINEZ
            <span className="block bg-gradient-to-r from-lila-700 via-lila-500 to-fucsia-500 bg-clip-text text-transparent">
              OUTLET
            </span>
          </h1>

          <p className="mt-4 max-w-xl font-display text-xl font-semibold text-pretty text-ink sm:text-2xl">
            Belleza, cuidado personal y mucho más.
          </p>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
            Encuentra tus productos favoritos de skincare, maquillaje, cuidado
            personal y aseo a precios increíbles.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#productos"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-6 text-[15px] font-semibold text-white shadow-soft transition-all hover:from-fucsia-700 hover:to-fucsia-700 hover:shadow-card active:scale-[0.98]"
            >
              Ver productos
              <ArrowRight className="size-4.5" aria-hidden />
            </a>
            <WhatsAppButton
              message={buildContactMessage()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-lila-300 bg-white px-6 text-[15px] font-semibold text-lila-800 transition-all hover:border-lila-400 hover:bg-lila-50 active:scale-[0.98]"
            >
              Comprar por WhatsApp
            </WhatsAppButton>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-lila-200 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[15px] font-extrabold leading-tight text-lila-700 sm:text-xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-ink-muted sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Showcase del logo */}
        <div className="animate-fade-up relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-3xl border border-lila-200 bg-gradient-to-br from-white via-lila-50 to-lila-100 p-8 shadow-card sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-fucsia-200/60 to-transparent blur-2xl"
            />
            <div className="relative grid place-items-center py-2">
              <Logo size={200} priority />
            </div>

            <div className="relative mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Droplets, label: "Skincare" },
                { icon: Sparkles, label: "Maquillaje" },
                { icon: Tag, label: "Ofertas" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-lila-200/80 bg-white/80 px-2 py-3 backdrop-blur"
                >
                  <Icon className="mx-auto size-5 text-lila-700" aria-hidden />
                  <span className="mt-1.5 block text-xs font-medium text-ink-soft">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden
            className="animate-float absolute -left-4 top-10 hidden rounded-2xl border border-lila-200 bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:block"
          >
            <span className="block text-xs font-medium text-ink-muted">
              Envíos y pedidos
            </span>
            <span className="block font-display text-sm font-bold text-lila-700">
              por WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
