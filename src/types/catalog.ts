/* ==========================================================================
 *  Tipos del catálogo.
 *  Todo el contenido vive en archivos de datos (src/data). No hay base de
 *  datos ni backend: el catálogo se compila junto con la web.
 * ========================================================================== */

export type CategoryId =
  | "skincare"
  | "maquillaje"
  | "joyeria"
  | "aseo-personal"
  | "cuidado-capilar"
  | "mochilas-loncheras"
  | "bazar";

export type VariantType = "color" | "modelo" | "talla" | "otro";

/** Opción de un producto: color, modelo o talla. */
export interface ProductVariant {
  /** Único dentro del producto, ej. "dorado". */
  id: string;
  type: VariantType;
  label: string;
  /** Muestra de color, solo para type: "color". */
  colorHex?: string;
  /** Unidades disponibles. Si se omite, no se controla stock. */
  stock?: number;
  /** Diferencia de precio respecto al precio base. */
  priceDelta?: number;
}

/** Producto tal como se escribe en src/data/products.ts. */
export interface Product {
  /** Identificador único y estable; también es la URL: /producto/{id}. */
  id: string;
  name: string;
  category: CategoryId;
  /** Precio online: el que paga el cliente comprando por la web. */
  price: number;
  /** Precio en tienda. Si es mayor que `price`, se muestra tachado. */
  storePrice?: number;
  images: string[];
  description: string;
  /** Presentación: "30 ml", "Pack x2"... */
  size?: string;
  brand?: string;
  /** Unidades disponibles. Si se omite, no se controla stock. */
  stock?: number;
  /** Aparece primero y en la portada. */
  featured?: boolean;
  /** Muestra la etiqueta de oferta y entra en el filtro "Ofertas". */
  offer?: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  /** Nombre del icono de lucide-react. */
  icon: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  /** Etiqueta corta: "Navidad", "-30%", "Nuevo". */
  badge?: string;
  ctaLabel?: string;
  /** A dónde lleva el botón. */
  link:
    | { type: "catalogo" }
    | { type: "ofertas" }
    | { type: "categoria"; value: CategoryId }
    | { type: "producto"; value: string }
    | { type: "whatsapp" };
  theme: "lila" | "fucsia" | "oscuro" | "claro";
  /** Fechas opcionales de campaña, en formato "2026-12-01". */
  startsAt?: string;
  endsAt?: string;
  active?: boolean;
}

/* ----------------------------- Vistas del UI ------------------------------ */

/** Producto listo para pintar en una tarjeta. */
export interface ProductListItem {
  id: string;
  name: string;
  price: number;
  storePrice: number | null;
  image: string | null;
  categoryId: CategoryId;
  categoryName: string;
  size: string | null;
  brand: string | null;
  offer: boolean;
  featured: boolean;
  /** Unidades disponibles; null cuando no se controla stock. */
  stock: number | null;
  variantCount: number;
}

export interface ProductDetail extends ProductListItem {
  description: string;
  images: string[];
  variants: ProductVariant[];
}

export interface CategoryListItem extends Category {
  productCount: number;
}

/** Línea del carrito (se guarda en el navegador). */
export interface CartLine {
  productId: string;
  variantId: string | null;
  quantity: number;
}

/** Línea del carrito ya resuelta contra el catálogo, lista para mostrar. */
export interface ResolvedCartLine {
  productId: string;
  variantId: string | null;
  name: string;
  variantLabel: string | null;
  unitPrice: number;
  storePrice: number | null;
  image: string | null;
  quantity: number;
  /** Máximo que se puede pedir; null si no hay control de stock. */
  maxStock: number | null;
  subtotal: number;
}

export type ProductSort =
  | "destacados"
  | "precio-asc"
  | "precio-desc"
  | "nombre-asc"
  | "nombre-desc";
