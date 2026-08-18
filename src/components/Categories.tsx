"use client";

import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useCatalog } from "@/context/CatalogContext";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { CategoryFilter } from "@/types/product";

/** Cantidad de productos por categoría (o de ofertas). */
function countFor(id: CategoryFilter): number {
  if (id === "ofertas") return products.filter((p) => p.offer).length;
  if (id === "all") return products.length;
  return products.filter((p) => p.category === id).length;
}

export default function Categories() {
  const { selectCategory } = useCatalog();

  const handleSelect = (id: CategoryFilter) => {
    selectCategory(id);
    document
      .getElementById("productos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="categorias" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Categorías"
            title="Explora nuestras categorías"
            description="Encuentra rápido lo que buscas: cuidado de la piel, maquillaje, cabello, aseo diario y accesorios."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.id} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => handleSelect(category.id)}
                  className="group flex h-full w-full flex-col items-start gap-3 rounded-2xl border border-lila-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-lila-300 hover:shadow-card sm:p-5"
                >
                  <span
                    className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${category.tint} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className={`size-5 ${category.iconClass}`} aria-hidden />
                  </span>

                  <span className="flex-1">
                    <span className="flex items-center gap-1 font-display text-[15px] font-bold text-ink">
                      {category.name}
                      <ArrowUpRight
                        className="size-4 text-lila-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                      {category.description}
                    </span>
                  </span>

                  <span className="text-xs font-semibold text-lila-700">
                    {countFor(category.id)} productos
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
