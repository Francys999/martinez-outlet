import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { MAX_CART_LINES, MAX_QUANTITY_PER_LINE } from "@/lib/constants";
import type {
  CartLine,
  Category,
  CategoryId,
  Product,
  ProductDetail,
  ResolvedCartLine,
} from "@/types/catalog";

/* --------------------------------------------------------------------------
 * El catálogo entero vive en memoria (src/data). No hay base de datos ni
 * llamadas de red: la página se arma al compilar y filtra en el navegador.
 * ------------------------------------------------------------------------ */

const categoryById = new Map<CategoryId, Category>(
  categories.map((category) => [category.id, category]),
);

const productById = new Map<string, Product>(
  products.map((product) => [product.id, product]),
);

/** Normaliza texto para buscar sin importar tildes ni mayúsculas. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function toDetail(product: Product): ProductDetail {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    storePrice: product.storePrice ?? null,
    image: product.images[0] ?? null,
    images: product.images,
    categoryId: product.category,
    categoryName: categoryById.get(product.category)?.name ?? "Otros",
    size: product.size ?? null,
    brand: product.brand ?? null,
    offer: product.offer ?? false,
    featured: product.featured ?? false,
    stock: product.stock ?? null,
    variantCount: product.variants?.length ?? 0,
    description: product.description,
    variants: product.variants ?? [],
  };
}

/**
 * Todos los productos, ya ordenados para la vitrina:
 * destacados primero, luego ofertas, luego el resto.
 */
export function getAllProducts(): ProductDetail[] {
  const score = (product: Product) =>
    (product.featured ? 2 : 0) + (product.offer ? 1 : 0);

  return [...products].sort((a, b) => score(b) - score(a)).map(toDetail);
}

export function getProduct(id: string): ProductDetail | null {
  const product = productById.get(id);
  return product ? toDetail(product) : null;
}

export function getProductCount(): number {
  return products.length;
}

/** Descuento máximo del catálogo, para el gancho de la cabecera. */
export function getMaxDiscount(): number {
  let max = 0;
  for (const product of products) {
    if (!product.storePrice || product.storePrice <= product.price) continue;
    const discount = Math.round(
      ((product.storePrice - product.price) / product.storePrice) * 100,
    );
    if (discount > max) max = discount;
  }
  return max;
}

/* --------------------------------- Carrito -------------------------------- */

/**
 * Resuelve el carrito guardado en el navegador contra el catálogo real.
 *
 * Del almacenamiento local solo se aceptan identificadores y cantidades: los
 * nombres y precios salen siempre del catálogo. Así, aunque alguien edite el
 * localStorage a mano, el pedido que llega por WhatsApp mantiene los precios
 * verdaderos. Las líneas que ya no existen se descartan.
 */
export function resolveCartLines(lines: CartLine[]): ResolvedCartLine[] {
  const resolved: ResolvedCartLine[] = [];

  for (const line of lines.slice(0, MAX_CART_LINES)) {
    const product = productById.get(line.productId);
    if (!product) continue;

    const variant = line.variantId
      ? product.variants?.find((option) => option.id === line.variantId)
      : null;

    // Si la línea pide una opción que ya no existe, se descarta.
    if (line.variantId && !variant) continue;

    const stock = variant?.stock ?? product.stock ?? null;
    if (stock !== null && stock <= 0) continue;

    const limit = Math.min(
      MAX_QUANTITY_PER_LINE,
      stock === null ? MAX_QUANTITY_PER_LINE : stock,
    );
    const quantity = Math.min(
      Math.max(1, Math.floor(Number(line.quantity) || 1)),
      limit,
    );

    const unitPrice = product.price + (variant?.priceDelta ?? 0);

    resolved.push({
      productId: product.id,
      variantId: variant?.id ?? null,
      name: product.name,
      variantLabel: variant?.label ?? null,
      unitPrice,
      storePrice: product.storePrice ?? null,
      image: product.images[0] ?? null,
      quantity,
      maxStock: stock,
      subtotal: unitPrice * quantity,
    });
  }

  return resolved;
}
