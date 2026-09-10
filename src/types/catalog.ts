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
  /** Identificador único y estable. */
  id: string;
  name: string;
  category: CategoryId;
  /** Precio Martinez Outlet: el que paga el cliente. */
  price: number;
  /** Precio de mercado. Si es mayor que `price`, se muestra tachado. */
  storePrice?: number;
  images: string[];
  description: string;
  /** Presentación: "30 ml", "Pack x2"... */
  size?: string;
  brand?: string;
  /** Unidades disponibles. Con 5 o menos se muestra el aviso de escasez. */
  stock?: number;
  /** Aparece primero en la vitrina. */
  featured?: boolean;
  /** Marca el producto como oferta. */
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

/* ----------------------------- Vistas del UI ------------------------------ */

/** Producto listo para pintar, con todo lo que necesita la tarjeta y la vista rápida. */
export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  storePrice: number | null;
  image: string | null;
  images: string[];
  categoryId: CategoryId;
  categoryName: string;
  size: string | null;
  brand: string | null;
  offer: boolean;
  featured: boolean;
  /** Unidades disponibles; null cuando no se controla stock. */
  stock: number | null;
  variantCount: number;
  description: string;
  variants: ProductVariant[];
}

/** Línea del carrito tal como se guarda en el navegador. */
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
