"use client";

import { Search, X } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export default function SearchBar() {
  const { search, setSearch } = useCatalog();

  return (
    <div className="relative flex-1">
      <label htmlFor="buscador-productos" className="sr-only">
        Buscar productos por nombre
      </label>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-ink-muted"
        aria-hidden
      />
      <input
        id="buscador-productos"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar producto..."
        autoComplete="off"
        className="h-12 w-full rounded-xl border border-lila-200 bg-white pl-11 pr-10 text-[15px] text-ink placeholder:text-ink-muted transition-colors hover:border-lila-300 focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-lila-50 hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
