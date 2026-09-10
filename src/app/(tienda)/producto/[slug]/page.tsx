import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgePercent, Package, ShieldCheck, Truck } from "lucide-react";
import {
  getAllProductIds,
  getProduct,
  getRelatedProducts,
} from "@/lib/catalog";
import { ONLINE_DISCOUNT_NOTE } from "@/lib/config";
import { discountPercent, formatPrice } from "@/lib/format";
import AddToCartPanel from "@/components/store/AddToCartPanel";
import ProductCard from "@/components/store/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

/** Todas las páginas de producto se generan al compilar: cargan al instante. */
export function generateStaticParams() {
  return getAllProductIds().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.name,
    description:
      product.description.slice(0, 160) ||
      `${product.name} en Martinez Outlet. Precio online ${formatPrice(product.price)}.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.categoryId, product.id, 4);
  const discount = discountPercent(product.price, product.storePrice);
  const saving =
    product.storePrice && product.storePrice > product.price
      ? product.storePrice - product.price
      : 0;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <nav aria-label="Ruta" className="text-xs text-ink-muted">
          <Link href="/" className="hover:text-lila-700">
            Inicio
          </Link>
          <span className="mx-1.5">/</span>
          <Link
            href={`/catalogo?categoria=${product.categoryId}`}
            className="hover:text-lila-700"
          >
            {product.categoryName}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-soft">{product.name}</span>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-lila-200 bg-lila-50">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              ) : (
                <Package
                  className="absolute inset-0 m-auto size-16 text-lila-300"
                  aria-hidden
                />
              )}

              {discount !== null && (
                <span className="absolute left-4 top-4 rounded-md bg-fucsia-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  -{discount}% online
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <ul className="mt-3 grid grid-cols-5 gap-2">
                {product.images.map((image) => (
                  <li
                    key={image}
                    className="relative aspect-square overflow-hidden rounded-xl border border-lila-200 bg-lila-50"
                  >
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <Link
              href={`/catalogo?categoria=${product.categoryId}`}
              className="text-xs font-semibold uppercase tracking-wider text-lila-600 hover:text-lila-800"
            >
              {product.categoryName}
            </Link>

            <h1 className="mt-1.5 font-display text-3xl font-extrabold leading-tight text-balance text-ink sm:text-4xl">
              {product.name}
            </h1>

            {(product.brand || product.size) && (
              <p className="mt-1.5 text-sm text-ink-muted">
                {[product.brand, product.size].filter(Boolean).join(" · ")}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-ink">
                {formatPrice(product.price)}
              </span>
              {product.storePrice && product.storePrice > product.price && (
                <span className="text-base text-ink-muted">
                  <span className="line-through">
                    {formatPrice(product.storePrice)}
                  </span>{" "}
                  en tienda
                </span>
              )}
            </div>

            {saving > 0 && (
              <p className="mt-2 inline-flex items-center gap-2 rounded-xl bg-fucsia-100 px-3 py-1.5 text-sm font-semibold text-fucsia-700">
                <BadgePercent className="size-4" aria-hidden />
                Ahorras {formatPrice(saving)} comprando por la web
              </p>
            )}

            {product.description && (
              <p className="mt-5 text-[15px] leading-relaxed text-pretty text-ink-soft">
                {product.description}
              </p>
            )}

            <div className="mt-6 border-t border-lila-100 pt-6">
              <AddToCartPanel product={product} />
            </div>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              <li className="flex items-start gap-2.5 rounded-xl border border-lila-200 bg-lila-50/60 p-3">
                <Truck className="mt-0.5 size-4 shrink-0 text-lila-700" aria-hidden />
                <span className="text-xs leading-relaxed text-ink-soft">
                  Coordinamos la entrega por WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-xl border border-lila-200 bg-lila-50/60 p-3">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-lila-700"
                  aria-hidden
                />
                <span className="text-xs leading-relaxed text-ink-soft">
                  {ONLINE_DISCOUNT_NOTE}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-lila-50/50 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              align="left"
              eyebrow="También te puede interesar"
              title={`Más de ${product.categoryName}`}
            />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
