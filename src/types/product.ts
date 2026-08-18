/**
 * Tipos de dominio del catálogo.
 * Cuando exista un backend, estas mismas interfaces pueden alimentarse
 * desde la API sin tocar los componentes.
 */

export type CategoryId =
  | "skincare"
  | "maquillaje"
  | "cuidado-capilar"
  | "aseo-personal"
  | "accesorios";

/** Filtro activo del catálogo: todas, una categoría real, o el pseudo-filtro "ofertas". */
export type CategoryFilter = CategoryId | "all" | "ofertas";

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  /** Precio actual en soles (S/). */
  price: number;
  /** Precio tachado. Opcional: solo para productos en oferta. */
  previousPrice?: number;
  /** Ruta pública de la imagen, ej. "/products/serum-facial.svg". */
  image: string;
  description: string;
  /** Destacado: aparece primero en el orden por defecto. */
  featured?: boolean;
  /** En oferta: muestra badge y entra en el filtro de ofertas. */
  offer?: boolean;
  /** Presentación / contenido, ej. "30 ml". Opcional. */
  size?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption =
  | "destacados"
  | "precio-asc"
  | "precio-desc"
  | "nombre-asc"
  | "nombre-desc";
