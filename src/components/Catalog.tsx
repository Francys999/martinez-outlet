"use client";

import { useState } from "react";
import { X } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CATEGORY_LABELS } from "@/data/categories";
import { useCatalog } from "@/context/CatalogContext";
import type { Product } from "@/types/product";

export default function Catalog() {
  const [selected, setSelected] = useState<Product | null>(null);
  const {
    filteredProducts,
    totalProducts,
    category,
    onlyOffers,
    search,
    setSearch,
    selectCategory,
    setOnlyOffers,
    resetFilters,
    hasActiveFilters,
  } = useCatalog();

  return (
    <section
      id="productos"
      className="scroll-mt-20 bg-gradient-to-b from-lila-50/70 to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo"
            title="Nuestros productos"
            description="Explora nuestra selección de skincare, maquillaje, cuidado capilar, aseo personal y accesorios."
          />
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 lg:flex-row lg:items-center">
          <div className="flex gap-3">
            <SearchBar />
            <Filters />
          </div>
        </div>

        {/* Filtros activos + contador de resultados */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink-soft">
            <strong className="font-semibold text-ink">
              {filteredProducts.length}
            </strong>{" "}
            de {totalProducts} productos
          </span>

          {category !== "all" && category !== "ofertas" && (
            <button
              type="button"
              onClick={() => selectCategory("all")}
              className="inline-flex items-center gap-1.5 rounded-full border border-lila-200 bg-white py-1 pl-3 pr-2 text-xs font-medium text-lila-700 transition-colors hover:bg-lila-50"
            >
              {CATEGORY_LABELS[category]}
              <X className="size-3.5" aria-hidden />
            </button>
          )}

          {onlyOffers && (
            <button
              type="button"
              onClick={() => setOnlyOffers(false)}
              className="inline-flex items-center gap-1.5 rounded-full border border-fucsia-200 bg-fucsia-100 py-1 pl-3 pr-2 text-xs font-medium text-fucsia-700 transition-colors hover:bg-fucsia-200"
            >
              Solo ofertas
              <X className="size-3.5" aria-hidden />
            </button>
          )}

          {search.trim() !== "" && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="inline-flex items-center gap-1.5 rounded-full border border-lila-200 bg-white py-1 pl-3 pr-2 text-xs font-medium text-lila-700 transition-colors hover:bg-lila-50"
            >
              &ldquo;{search}&rdquo;
              <X className="size-3.5" aria-hidden />
            </button>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-ink-muted underline-offset-4 transition-colors hover:text-fucsia-700 hover:underline"
            >
              Limpiar todo
            </button>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          <ProductGrid
            products={filteredProducts}
            onOpenDetail={setSelected}
            onReset={resetFilters}
          />
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
