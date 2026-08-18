"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal, Tag, X } from "lucide-react";
import { CATEGORY_FILTER_OPTIONS } from "@/data/categories";
import { useCatalog } from "@/context/CatalogContext";
import type { CategoryFilter, SortOption } from "@/types/product";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre-asc", label: "Nombre: A - Z" },
  { value: "nombre-desc", label: "Nombre: Z - A" },
];

/** Select con estilo de marca (usa <select> nativo: cómodo en mobile). */
function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-lila-200 bg-white pl-4 pr-10 text-[15px] font-medium text-ink transition-colors hover:border-lila-300 focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
        aria-hidden
      />
    </div>
  );
}

function OffersToggle() {
  const { onlyOffers, setOnlyOffers } = useCatalog();

  return (
    <button
      type="button"
      onClick={() => setOnlyOffers(!onlyOffers)}
      aria-pressed={onlyOffers}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-[15px] font-semibold transition-all ${
        onlyOffers
          ? "border-fucsia-600 bg-fucsia-600 text-white"
          : "border-lila-200 bg-white text-ink-soft hover:border-lila-300 hover:bg-lila-50"
      }`}
    >
      <Tag className="size-4" aria-hidden />
      Solo ofertas
    </button>
  );
}

/** Controles compartidos por desktop y por el panel mobile. */
function FilterControls() {
  const { category, selectCategory, sort, setSort } = useCatalog();

  return (
    <>
      <FilterSelect
        id="filtro-categoria"
        label="Filtrar por categoría"
        value={category}
        onChange={(value) => selectCategory(value as CategoryFilter)}
        options={CATEGORY_FILTER_OPTIONS}
      />
      <FilterSelect
        id="filtro-orden"
        label="Ordenar productos"
        value={sort}
        onChange={(value) => setSort(value as SortOption)}
        options={SORT_OPTIONS}
      />
      <OffersToggle />
    </>
  );
}

export default function Filters() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { hasActiveFilters, resetFilters, filteredProducts } = useCatalog();

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden gap-3 sm:grid sm:grid-cols-[1fr_1fr_auto] lg:w-auto lg:grid-cols-[minmax(0,220px)_minmax(0,220px)_auto_auto]">
        <FilterControls />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-lila-50 hover:text-lila-700"
          >
            <RotateCcw className="size-4" aria-hidden />
            Limpiar
          </button>
        )}
      </div>

      {/* Mobile: botón + bottom sheet */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-lila-200 bg-white px-4 text-[15px] font-semibold text-ink transition-colors hover:border-lila-300 hover:bg-lila-50 sm:hidden"
      >
        <SlidersHorizontal className="size-4.5" aria-hidden />
        Filtros
        {hasActiveFilters && (
          <span className="size-2 rounded-full bg-fucsia-600" aria-hidden />
        )}
      </button>

      {sheetOpen && (
        <div className="fixed inset-0 z-[60] sm:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setSheetOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filtros del catálogo"
            className="animate-fade-up absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-lila-200 bg-white p-5 pb-8 shadow-card"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink">Filtros</h3>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Cerrar filtros"
                className="grid size-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-lila-50"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="grid gap-3">
              <FilterControls />
            </div>

            <div className="mt-5 flex gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-lila-200 text-sm font-semibold text-ink-soft transition-colors hover:bg-lila-50"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="h-12 flex-1 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-sm font-semibold text-white transition-opacity hover:opacity-95"
              >
                Ver {filteredProducts.length} productos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
