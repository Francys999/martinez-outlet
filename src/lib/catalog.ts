import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { banners } from "@/data/banners";
import { PRODUCTS_PER_PAGE } from "@/lib/config";
import { MAX_CART_LINES, MAX_QUANTITY_PER_LINE } from "@/lib/constants";
import type {
  Banner,
  CartLine,
  Category,
  CategoryId,
  CategoryListItem,
  Product,
  ProductDetail,
  ProductListItem,
  ProductSort,
  ResolvedCartLine,
} from "@/types/catalog";

/* --------------------------------------------------------------------------
 * Consultas del catálogo. Todo ocurre en memoria sobre src/data: no hay base
 * de datos ni llamadas de red.
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

function toListItem(product: Product): ProductListItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    storePrice: product.storePrice ?? null,
    image: product.images[0] ?? null,
    categoryId: product.category,
    categoryName: categoryById.get(product.category)?.name ?? "Otros",
    size: product.size ?? null,
    brand: product.brand ?? null,
    offer: product.offer ?? false,
    featured: product.featured ?? false,
    stock: product.stock ?? null,
    variantCount: product.variants?.length ?? 0,
  };
}

/* ------------------------------- Categorías ------------------------------- */

export function getCategories(): CategoryListItem[] {
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.category === category.id)
      .length,
  }));
}

export function getCategory(id: string): CategoryListItem | null {
  const category = categoryById.get(id as CategoryId);
  if (!category) return null;
  return {
    ...category,
    productCount: products.filter((product) => product.category === category.id)
      .length,
  };
}

/* -------------------------------- Productos ------------------------------- */

export interface CatalogFilters {
  search?: string;
  category?: string;
  onlyOffers?: boolean;
  sort?: ProductSort;
  page?: number;
  perPage?: number;
}

export interface CatalogResult {
  products: ProductListItem[];
  total: number;
  page: number;
  totalPages: number;
}

function sortProducts(list: Product[], sort: ProductSort): Product[] {
  const sorted = [...list];

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
        const score = (product: Product) =>
          (product.featured ? 2 : 0) + (product.offer ? 1 : 0);
        return score(b) - score(a);
      });
  }
  return sorted;
}

export function getCatalog(filters: CatalogFilters = {}): CatalogResult {
  const term = filters.search ? normalize(filters.search.trim()) : "";
  const perPage = Math.min(60, Math.max(4, filters.perPage ?? PRODUCTS_PER_PAGE));

  const filtered = products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.onlyOffers && !product.offer) return false;
    if (term) {
      const haystack = normalize(
        `${product.name} ${product.description} ${product.brand ?? ""}`,
      );
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  const sorted = sortProducts(filtered, filters.sort ?? "destacados");
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const page = Math.min(Math.max(1, filters.page ?? 1), totalPages);

  return {
    products: sorted
      .slice((page - 1) * perPage, page * perPage)
      .map(toListItem),
    total: sorted.length,
    page,
    totalPages,
  };
}

export function getAllProductIds(): string[] {
  return products.map((product) => product.id);
}

export function getProduct(id: string): ProductDetail | null {
  const product = productById.get(id);
  if (!product) return null;

  return {
    ...toListItem(product),
    description: product.description,
    images: product.images,
    variants: product.variants ?? [],
  };
}

export function getFeaturedProducts(limit = 8): ProductListItem[] {
  return products
    .filter((product) => product.featured)
    .slice(0, limit)
    .map(toListItem);
}

export function getOfferProducts(limit = 8): ProductListItem[] {
  return products
    .filter((product) => product.offer)
    .slice(0, limit)
    .map(toListItem);
}

export function getRelatedProducts(
  category: CategoryId,
  excludeId: string,
  limit = 4,
): ProductListItem[] {
  return products
    .filter((product) => product.category === category && product.id !== excludeId)
    .slice(0, limit)
    .map(toListItem);
}

/** Ahorro medio (%) del precio online frente al precio de tienda. */
export function getAverageOnlineSaving(): number | null {
  const withStorePrice = products.filter(
    (product) => product.storePrice && product.storePrice > product.price,
  );
  if (withStorePrice.length === 0) return null;

  const total = withStorePrice.reduce(
    (sum, product) =>
      sum + (product.storePrice! - product.price) / product.storePrice!,
    0,
  );
  return Math.round((total / withStorePrice.length) * 100);
}

export function getProductCount(): number {
  return products.length;
}

/* -------------------------------- Anuncios -------------------------------- */

/** Anuncios activos y dentro de su rango de fechas. */
export function getActiveBanners(): Banner[] {
  const today = new Date().toISOString().slice(0, 10);

  return banners.filter((banner) => {
    if (banner.active === false) return false;
    if (banner.startsAt && today < banner.startsAt) return false;
    if (banner.endsAt && today > banner.endsAt) return false;
    return true;
  });
}

/* --------------------------------- Carrito -------------------------------- */

/**
 * Resuelve el carrito guardado en el navegador contra el catálogo real.
 *
 * Esto es importante: del almacenamiento local solo se aceptan identificadores
 * y cantidades. Los nombres y precios se toman siempre del catálogo, así que
 * aunque alguien edite el localStorage a mano, el pedido que se envía por
 * WhatsApp mantiene los precios verdaderos. Las líneas que ya no existen
 * (producto retirado, opción eliminada) se descartan.
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
