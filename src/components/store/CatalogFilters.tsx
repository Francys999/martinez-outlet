"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Loader2, RotateCcw, Search, SlidersHorizontal, Tag, X } from "lucide-react";
import { PRODUCT_SORTS, PRODUCT_SORT_LABELS } from "@/lib/constants";
import type { CategoryListItem } from "@/types/catalog";

/**
 * Filtros del catálogo. El estado vive en la URL, así el cliente puede
 * compartir o guardar un enlace con sus filtros ya aplicados.
 */
export default function CatalogFilters({
  categories,
  total,
}: {
  categories: CategoryListItem[];
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [sheetOpen, setSheetOpen] = useState(false);

  const queryFromUrl = params.get("q") ?? "";
  const [search, setSearch] = useState(queryFromUrl);

  // Si la URL cambia (atrás/adelante, o al limpiar), el input se sincroniza.
  const [lastQuery, setLastQuery] = useState(queryFromUrl);
  if (lastQuery !== queryFromUrl) {
    setLastQuery(queryFromUrl);
    setSearch(queryFromUrl);
  }

  const category = params.get("categoria") ?? "";
  const sort = params.get("orden") ?? "destacados";
  const onlyOffers = params.get("ofertas") === "1";
  const hasFilters = Boolean(search || category || onlyOffers) || sort !== "destacados";

  const apply = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }
    next.delete("p");

    startTransition(() => {
      router.push(`/catalogo${next.toString() ? `?${next}` : ""}`, {
        scroll: false,
      });
    });
  };

  const controls = (
    <>
      <div className="relative">
        <label htmlFor="filtro-categoria" className="sr-only">
          Filtrar por categoría
        </label>
        <select
          id="filtro-categoria"
          value={category}
          onChange={(event) => apply({ categoria: event.target.value })}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-lila-200 bg-white pl-4 pr-10 text-[15px] font-medium text-ink transition-colors hover:border-lila-300 focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
        >
          <option value="">Todas las categorías</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.productCount})
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
          aria-hidden
        />
      </div>

      <div className="relative">
        <label htmlFor="filtro-orden" className="sr-only">
          Ordenar productos
        </label>
        <select
          id="filtro-orden"
          value={sort}
          onChange={(event) => apply({ orden: event.target.value })}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-lila-200 bg-white pl-4 pr-10 text-[15px] font-medium text-ink transition-colors hover:border-lila-300 focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
        >
          {PRODUCT_SORTS.map((option) => (
            <option key={option} value={option}>
              {PRODUCT_SORT_LABELS[option]}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
          aria-hidden
        />
      </div>

      <button
        type="button"
        onClick={() => apply({ ofertas: onlyOffers ? null : "1" })}
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
    </>
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            apply({ q: search.trim() || null });
          }}
          className="relative flex-1"
          role="search"
        >
          <label htmlFor="buscador-catalogo" className="sr-only">
            Buscar productos
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            id="buscador-catalogo"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar producto..."
            className="h-12 w-full rounded-xl border border-lila-200 bg-white pl-11 pr-14 text-[15px] text-ink placeholder:text-ink-muted transition-colors hover:border-lila-300 focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200 sm:pr-24"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  apply({ q: null });
                }}
                aria-label="Limpiar búsqueda"
                className="grid size-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-lila-50 hover:text-ink"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
            <button
              type="submit"
              aria-label="Buscar"
              className="grid h-8 min-w-8 place-items-center rounded-lg bg-lila-700 px-2 text-xs font-semibold text-white transition-colors hover:bg-lila-800 sm:px-3"
            >
              <Search className="size-4 sm:hidden" aria-hidden />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-lila-200 bg-white px-4 text-[15px] font-semibold text-ink transition-colors hover:border-lila-300 hover:bg-lila-50 sm:hidden"
        >
          <SlidersHorizontal className="size-4.5" aria-hidden />
          Filtros
          {hasFilters && (
            <span className="size-2 rounded-full bg-fucsia-600" aria-hidden />
          )}
        </button>
      </div>

      <div className="hidden gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-center">
        {controls}
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              startTransition(() => router.push("/catalogo", { scroll: false }));
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-lila-50 hover:text-lila-700"
          >
            <RotateCcw className="size-4" aria-hidden />
            Limpiar
          </button>
        )}
      </div>

      <p className="flex items-center gap-2 text-sm text-ink-soft">
        {pending && (
          <Loader2 className="size-4 animate-spin text-lila-600" aria-hidden />
        )}
        <span>
          <strong className="font-semibold text-ink">{total}</strong>{" "}
          {total === 1 ? "producto encontrado" : "productos encontrados"}
        </span>
      </p>

      {sheetOpen && (
        <div className="fixed inset-0 z-[62] sm:hidden">
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

            <div className="grid gap-3">{controls}</div>

            <div className="mt-5 flex gap-3">
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    startTransition(() =>
                      router.push("/catalogo", { scroll: false }),
                    );
                    setSheetOpen(false);
                  }}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-lila-200 text-sm font-semibold text-ink-soft transition-colors hover:bg-lila-50"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="h-12 flex-1 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-sm font-semibold text-white"
              >
                Ver {total} productos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
