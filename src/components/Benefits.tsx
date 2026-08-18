import {
  HeartHandshake,
  LayoutGrid,
  MessageCircle,
  PiggyBank,
  Store,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const benefits = [
  {
    icon: PiggyBank,
    title: "Precios accesibles",
    description: "Productos de belleza y cuidado personal a precios de outlet.",
  },
  {
    icon: Store,
    title: "Venta por mayor y menor",
    description: "Compra una unidad o pide cantidades para revender.",
  },
  {
    icon: LayoutGrid,
    title: "Variedad de productos",
    description: "Skincare, maquillaje, cabello, aseo personal y accesorios.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    description: "Te ayudamos a elegir lo que necesitas, sin apuros.",
  },
  {
    icon: MessageCircle,
    title: "Pedidos fáciles por WhatsApp",
    description: "Arma tu pedido en la web y envíalo con un solo clic.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Beneficios"
            title="¿Por qué comprar en Martinez Outlet?"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 60} className="h-full">
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
