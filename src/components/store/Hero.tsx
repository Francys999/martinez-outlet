import Link from "next/link";
import { ArrowRight, BadgePercent, MessageCircle, Truck } from "lucide-react";
import Logo from "@/components/Logo";
import ContactWhatsAppButton from "@/components/store/ContactWhatsAppButton";
import { HERO } from "@/lib/config";

export default function Hero({
  productCount,
  categoryCount,
  averageSaving,
}: {
  productCount: number;
  categoryCount: number;
  averageSaving: number | null;
}) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-lila-100 via-lila-50 to-white"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[420px] rounded-full bg-fucsia-200/35 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[1.1fr_auto] lg:gap-12 lg:px-8 lg:pb-10 lg:pt-14">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-fucsia-200 bg-white/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-fucsia-700 backdrop-blur">
            <BadgePercent className="size-3.5" aria-hidden />
            {averageSaving && averageSaving > 0
              ? `Hasta ${averageSaving}% menos que en tienda`
              : "Precios online más bajos"}
          </span>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
            {HERO.title}
          </h1>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
            {HERO.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/catalogo"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:shadow-card active:scale-[0.98]"
            >
              Ver catálogo
              <ArrowRight className="size-4.5" aria-hidden />
            </Link>

            <ContactWhatsAppButton className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-lila-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-lila-800 transition-all hover:border-lila-400 hover:bg-lila-50 active:scale-[0.98]">
              Comprar por WhatsApp
            </ContactWhatsAppButton>
          </div>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-lila-200 pt-5">
            <div>
              <dt className="sr-only">Productos</dt>
              <dd>
                <span className="block font-display text-lg font-extrabold text-lila-700 sm:text-xl">
                  {productCount}+
                </span>
                <span className="mt-0.5 block text-[11px] text-ink-muted sm:text-sm">
                  Productos
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Categorías</dt>
              <dd>
                <span className="block font-display text-lg font-extrabold text-lila-700 sm:text-xl">
                  {categoryCount}
                </span>
                <span className="mt-0.5 block text-[11px] text-ink-muted sm:text-sm">
                  Categorías
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Modalidad</dt>
              <dd>
                <span className="block font-display text-[15px] font-extrabold leading-tight text-lila-700 sm:text-xl">
                  Mayor y menor
                </span>
                <span className="mt-0.5 block text-[11px] text-ink-muted sm:text-sm">
                  Modalidad de venta
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="animate-fade-up mx-auto hidden w-full max-w-xs lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-lila-200 bg-gradient-to-br from-white via-lila-50 to-lila-100 p-8 shadow-card">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-14 size-48 rounded-full bg-gradient-to-br from-fucsia-200/60 to-transparent blur-2xl"
            />
            <div className="relative grid place-items-center">
              <Logo size={170} priority />
            </div>
            <p className="relative mt-5 flex items-center justify-center gap-2 rounded-xl bg-white/85 px-3 py-2.5 text-center text-xs font-medium text-ink-soft backdrop-blur">
              <Truck className="size-4 shrink-0 text-lila-700" aria-hidden />
              Coordinamos la entrega contigo
            </p>
            <p className="relative mt-2 flex items-center justify-center gap-2 rounded-xl bg-white/85 px-3 py-2.5 text-center text-xs font-medium text-ink-soft backdrop-blur">
              <MessageCircle className="size-4 shrink-0 text-fucsia-600" aria-hidden />
              Pedidos por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
