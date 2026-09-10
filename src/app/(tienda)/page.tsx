import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import {
  getActiveBanners,
  getAverageOnlineSaving,
  getCategories,
  getFeaturedProducts,
  getOfferProducts,
  getProductCount,
} from "@/lib/catalog";
import { ONLINE_DISCOUNT_NOTE } from "@/lib/config";
import Hero from "@/components/store/Hero";
import BannerSlider from "@/components/store/BannerSlider";
import CategoryGrid from "@/components/store/CategoryGrid";
import ProductCard from "@/components/store/ProductCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  About,
  Benefits,
  Contact,
  OnlinePriceStrip,
} from "@/components/store/Sections";

export default function HomePage() {
  const categories = getCategories();
  const banners = getActiveBanners();
  const featured = getFeaturedProducts(8);
  const offers = getOfferProducts(4);

  return (
    <>
      <Hero
        productCount={getProductCount()}
        categoryCount={categories.length}
        averageSaving={getAverageOnlineSaving()}
      />

      <BannerSlider banners={banners} />

      <OnlinePriceStrip note={ONLINE_DISCOUNT_NOTE} />

      {/* El catálogo va primero: es lo que el cliente vino a ver. */}
      {featured.length > 0 && (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  align="left"
                  eyebrow="Catálogo"
                  title="Lo más pedido"
                  description="Una selección de lo que más se lleva nuestra clientela."
                />
                <Link
                  href="/catalogo"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-lila-300 bg-white px-5 text-sm font-semibold text-lila-800 transition-colors hover:bg-lila-50"
                >
                  Ver todo el catálogo
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="categorias" className="bg-lila-50/50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Categorías"
              title="Explora nuestras categorías"
              description="Skincare, maquillaje, joyería, aseo personal, mochilas, loncheras y más."
            />
          </Reveal>

          <CategoryGrid categories={categories} />
        </div>
      </section>

      {offers.length > 0 && (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  align="left"
                  eyebrow="Ofertas"
                  title="Precios especiales"
                  description="Aprovecha mientras dure el stock."
                />
                <Link
                  href="/catalogo?ofertas=1"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-600 to-fucsia-700 px-5 text-sm font-semibold text-white transition-all hover:shadow-soft"
                >
                  <Tag className="size-4" aria-hidden />
                  Ver todas las ofertas
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {offers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Benefits />
      <About />
      <Contact />
    </>
  );
}
