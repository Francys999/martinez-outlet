"use client";

import { useMemo, useState } from "react";
import { PackageSearch, Search, X } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import QuickViewModal from "@/components/store/QuickViewModal";
import { catalogTabs } from "@/data/tabs";
import { normalize } from "@/lib/catalog";
import type { ProductDetail } from "@/types/catalog";

/**
 * El catálogo completo, filtrado en el navegador: los botones responden al
 * instante, sin recargar ni ir al servidor.
 */
export default function CatalogSection({
  products,
}: {
  products: ProductDetail[];
}) {
  const [tabId, setTabId] = useState(catalogTabs[0]!.id);
  const [search, setSearch] = useState("");
  const [quickView, setQuickView] = useState<ProductDetail | null>(null);

  const visible = useMemo(() => {
    const tab = catalogTabs.find((item) => item.id === tabId) ?? catalogTabs[0]!;
    const term = normalize(search.trim());

    return products.filter((product) => {
      if (tab.categories && !tab.categories.includes(product.categoryId)) {
        return false;
      }
      if (term) {
        const haystack = normalize(`${product.name} ${product.description}`);
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [products, tabId, search]);

  /** Cuántos productos tiene cada pestaña, para mostrarlo en el botón. */
  const countFor = (categories: string[] | null) =>
    categories
      ? products.filter((product) => categories.includes(product.categoryId)).length
      : products.length;

  return (
    <section id="catalogo" className="scroll-mt-16 bg-white pb-24 pt-5 sm:pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Filtros rápidos */}
        <div
          role="tablist"
          aria-label="Categorías"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {catalogTabs.map((tab) => {
            const active = tab.id === tabId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTabId(tab.id)}
                className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-extrabold transition-all ${
                  active
                    ? "bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-white shadow-soft"
                    : "border border-lila-200 bg-white text-ink-soft hover:border-lila-300 hover:text-ink"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[11px] font-bold ${
                    active ? "text-white/75" : "text-ink-muted"
                  }`}
                >
                  {countFor(tab.categories)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Buscador */}
        <div className="relative mt-3">
          <label htmlFor="buscador" className="sr-only">
            Buscar producto
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            id="buscador"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value.slice(0, 60))}
            placeholder="Buscar producto..."
            className="h-12 w-full rounded-xl border border-lila-200 bg-white pl-11 pr-11 text-[15px] text-ink placeholder:text-ink-muted transition-colors hover:border-lila-300 focus:border-fucsia-400 focus:outline-none focus:ring-2 focus:ring-fucsia-200"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-2.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-lila-50 hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>

        <p className="mt-2.5 text-xs text-ink-muted">
          <strong className="font-bold text-ink">{visible.length}</strong>{" "}
          {visible.length === 1 ? "producto" : "productos"} · precios de outlet
        </p>

        {/* Vitrina */}
        {visible.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-lila-300 bg-lila-50/60 px-6 py-14 text-center">
            <PackageSearch className="mx-auto size-9 text-lila-500" aria-hidden />
            <h2 className="mt-3 font-display text-lg font-bold text-ink">
              No encontramos ese producto
            </h2>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTabId(catalogTabs[0]!.id);
              }}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-lila-300 bg-white px-5 text-sm font-bold text-lila-800 transition-colors hover:bg-lila-50"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickView}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
