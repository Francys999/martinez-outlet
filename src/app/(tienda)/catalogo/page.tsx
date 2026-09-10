import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { getCatalog, getCategories, getCategory } from "@/lib/catalog";
import { ONLINE_DISCOUNT_NOTE, PRODUCTS_PER_PAGE } from "@/lib/config";
import { PRODUCT_SORTS } from "@/lib/constants";
import CatalogFilters from "@/components/store/CatalogFilters";
import ProductCard from "@/components/store/ProductCard";
import { OnlinePriceStrip } from "@/components/store/Sections";
import type { ProductSort } from "@/types/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Todo el catálogo de Martinez Outlet: skincare, maquillaje, joyería, aseo personal, mochilas y loncheras con precio online.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    categoria?: string;
    orden?: string;
    ofertas?: string;
    p?: string;
  }>;
}) {
  const params = await searchParams;

  // Los parámetros vienen de la URL: se acotan antes de usarlos.
  const search = typeof params.q === "string" ? params.q.slice(0, 60) : "";
  const page = Math.min(999, Math.max(1, Number(params.p ?? 1) || 1));
  const sort = PRODUCT_SORTS.includes(params.orden as ProductSort)
    ? (params.orden as ProductSort)
    : "destacados";

  const categories = getCategories();
  const activeCategory = params.categoria ? getCategory(params.categoria) : null;

  const catalog = getCatalog({
    search,
    category: activeCategory?.id,
    onlyOffers: params.ofertas === "1",
    sort,
    page,
    perPage: PRODUCTS_PER_PAGE,
  });

  const buildPageHref = (target: number) => {
    const query = new URLSearchParams();
    if (search) query.set("q", search);
    if (activeCategory) query.set("categoria", activeCategory.id);
    if (params.ofertas === "1") query.set("ofertas", "1");
    if (sort !== "destacados") query.set("orden", sort);
    if (target > 1) query.set("p", String(target));
    const qs = query.toString();
    return `/catalogo${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      <OnlinePriceStrip note={ONLINE_DISCOUNT_NOTE} />

      <section className="bg-gradient-to-b from-lila-50/70 to-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta" className="text-xs text-ink-muted">
            <Link href="/" className="hover:text-lila-700">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink-soft">
              {activeCategory ? activeCategory.name : "Catálogo"}
            </span>
          </nav>

          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {activeCategory
              ? activeCategory.name
              : params.ofertas === "1"
                ? "Ofertas"
                : "Nuestro catálogo"}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-pretty text-ink-soft">
            {activeCategory?.description ??
              "Explora todos nuestros productos. Los precios que ves son precios online."}
          </p>

          <div className="mt-6">
            <CatalogFilters categories={categories} total={catalog.total} />
          </div>

          {catalog.products.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-lila-300 bg-lila-50/60 px-6 py-16 text-center">
              <PackageSearch className="mx-auto size-9 text-lila-500" aria-hidden />
              <h2 className="mt-4 font-display text-lg font-bold text-ink">
                No encontramos productos
              </h2>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">
                Prueba con otro nombre o quita algunos filtros para ver más
                resultados.
              </p>
              <Link
                href="/catalogo"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-lila-300 bg-white px-5 text-sm font-semibold text-lila-800 transition-colors hover:bg-lila-50"
              >
                Ver todos los productos
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {catalog.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {catalog.totalPages > 1 && (
                <nav
                  aria-label="Paginación"
                  className="mt-8 flex items-center justify-center gap-2"
                >
                  {catalog.page > 1 && (
                    <Link
                      href={buildPageHref(catalog.page - 1)}
                      className="inline-flex h-11 items-center rounded-xl border border-lila-200 bg-white px-4 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      Anterior
                    </Link>
                  )}
                  <span className="px-2 text-sm text-ink-soft">
                    Página {catalog.page} de {catalog.totalPages}
                  </span>
                  {catalog.page < catalog.totalPages && (
                    <Link
                      href={buildPageHref(catalog.page + 1)}
                      className="inline-flex h-11 items-center rounded-xl border border-lila-200 bg-white px-4 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      Siguiente
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
