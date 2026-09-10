import type { CategoryId } from "@/types/catalog";

/* ==========================================================================
 *  FILTROS RÁPIDOS DEL CATÁLOGO
 *
 *  Son los botones que aparecen encima de los productos. Cada uno agrupa una
 *  o varias categorías de src/data/categories.ts.
 *
 *  Para cambiarlos: edita el nombre, o la lista de categorías que agrupa.
 *  `categories: null` = muestra todos los productos.
 * ========================================================================== */

export interface CatalogTab {
  id: string;
  label: string;
  categories: CategoryId[] | null;
}

export const catalogTabs: CatalogTab[] = [
  { id: "todos", label: "Todos", categories: null },
  { id: "skincare", label: "Skin Care", categories: ["skincare"] },
  {
    id: "belleza",
    label: "Belleza",
    categories: ["maquillaje", "cuidado-capilar", "aseo-personal"],
  },
  {
    id: "accesorios",
    label: "Accesorios",
    categories: ["joyeria", "mochilas-loncheras", "bazar"],
  },
];
