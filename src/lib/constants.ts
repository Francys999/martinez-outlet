import type { ProductSort, VariantType } from "@/types/catalog";

export const PRODUCT_SORTS: ProductSort[] = [
  "destacados",
  "precio-asc",
  "precio-desc",
  "nombre-asc",
  "nombre-desc",
];

export const PRODUCT_SORT_LABELS: Record<ProductSort, string> = {
  destacados: "Destacados",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  "nombre-asc": "Nombre: A - Z",
  "nombre-desc": "Nombre: Z - A",
};

export const VARIANT_TYPE_LABELS: Record<VariantType, string> = {
  color: "Color",
  modelo: "Modelo",
  talla: "Talla",
  otro: "Opción",
};

/* ------------------------- Límites del carrito ---------------------------- */

/** Máximo de unidades de un mismo producto. */
export const MAX_QUANTITY_PER_LINE = 20;

/** Máximo de productos distintos en un pedido. */
export const MAX_CART_LINES = 30;

/** Máximo de unidades sumando todo el pedido. */
export const MAX_CART_UNITS = 120;
