import { Check } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/ui/Reveal";

const highlights = [
  "Productos de belleza, cuidado personal y aseo",
  "Precios accesibles y variedad para elegir",
  "Atención cercana antes y después de tu pedido",
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="bg-gradient-to-b from-white to-lila-50/70 py-16 sm:py-20 lg:py-24"
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
            En Martinez Outlet buscamos ofrecer productos de belleza, cuidado
            personal y aseo a precios accesibles, brindando variedad y atención
            cercana a nuestros clientes.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
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
                cuidado personal y aseo.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
