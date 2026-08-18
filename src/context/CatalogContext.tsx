"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import type { CategoryFilter, Product, SortOption } from "@/types/product";

interface CatalogContextValue {
  search: string;
  setSearch: (value: string) => void;
  category: CategoryFilter;
  onlyOffers: boolean;
  setOnlyOffers: (value: boolean) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  /** Cambia el filtro de categoría ("ofertas" activa el filtro de ofertas). */
  selectCategory: (category: CategoryFilter) => void;
  resetFilters: () => void;
  filteredProducts: Product[];
  totalProducts: number;
  hasActiveFilters: boolean;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

/** Normaliza texto para buscar sin importar tildes ni mayúsculas. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sort, setSort] = useState<SortOption>("destacados");

  const selectCategory = useCallback((next: CategoryFilter) => {
    if (next === "ofertas") {
      setCategory("all");
      setOnlyOffers(true);
    } else {
      setCategory(next);
      setOnlyOffers(false);
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setCategory("all");
    setOnlyOffers(false);
    setSort("destacados");
  }, []);

  const filteredProducts = useMemo(() => {
    const term = normalize(search.trim());

    const result = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (onlyOffers && !product.offer) return false;
      if (term && !normalize(product.name).includes(term)) return false;
      return true;
    });

    const sorted = [...result];
    switch (sort) {
      case "precio-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "nombre-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
        break;
      case "nombre-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "es"));
        break;
      default:
        // Destacados primero, luego ofertas, luego el resto.
        sorted.sort((a, b) => {
          const score = (p: Product) => (p.featured ? 2 : 0) + (p.offer ? 1 : 0);
          return score(b) - score(a);
        });
    }
    return sorted;
  }, [search, category, onlyOffers, sort]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      search,
      setSearch,
      category,
      onlyOffers,
      setOnlyOffers,
      sort,
      setSort,
      selectCategory,
      resetFilters,
      filteredProducts,
      totalProducts: products.length,
      hasActiveFilters:
        search.trim() !== "" ||
        category !== "all" ||
        onlyOffers ||
        sort !== "destacados",
    }),
    [
      search,
      category,
      onlyOffers,
      sort,
      selectCategory,
      resetFilters,
      filteredProducts,
    ],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog debe usarse dentro de <CatalogProvider>");
  }
  return context;
}
