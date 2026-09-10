import { BadgePercent, ShieldCheck, Truck, Wallet } from "lucide-react";
import { DELIVERY_ZONE_LABEL, HERO } from "@/lib/config";

/**
 * Cabecera de impacto: una sola franja compacta con la propuesta de valor y
 * los sellos de confianza. Ocupa poco para que el catálogo entre en pantalla
 * casi de inmediato.
 */
export default function HeroStrip({
  productCount,
  maxDiscount,
}: {
  productCount: number;
  maxDiscount: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-lila-100 bg-gradient-to-br from-lila-100 via-lila-50 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-fucsia-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {maxDiscount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fucsia-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
            <BadgePercent className="size-3.5" aria-hidden />
            Hasta -{maxDiscount}% OFF
          </span>
        )}

        <h1 className="mt-3 font-display text-[26px] font-extrabold leading-[1.1] tracking-tight text-balance text-ink sm:text-4xl">
          {HERO.title}
          <span className="mt-1 block bg-gradient-to-r from-fucsia-600 to-lila-700 bg-clip-text text-transparent">
            Envíos GRATIS {DELIVERY_ZONE_LABEL}
          </span>
        </h1>

        <p className="mt-2 max-w-xl text-sm text-pretty text-ink-soft sm:text-base">
          {productCount} productos de belleza y accesorios a precio de outlet.
          Pide por WhatsApp y paga al recibir.
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            { icon: Truck, label: "Entrega local garantizada" },
            { icon: Wallet, label: "Pago contra entrega · Yape / Plin" },
            { icon: ShieldCheck, label: "Precio más bajo del mercado" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-lila-200 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink-soft backdrop-blur sm:text-xs"
            >
              <Icon className="size-3.5 shrink-0 text-fucsia-600" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
