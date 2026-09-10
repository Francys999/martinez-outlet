import { getAllProducts, getMaxDiscount, getProductCount } from "@/lib/catalog";
import HeroStrip from "@/components/store/HeroStrip";
import CatalogSection from "@/components/store/CatalogSection";
import TrustFooter from "@/components/store/TrustFooter";

/**
 * Landing única: cintillo de urgencia y cabecera (en el layout), catálogo
 * completo y pie de confianza. Sin secciones institucionales.
 */
export default function HomePage() {
  return (
    <>
      <HeroStrip
        productCount={getProductCount()}
        maxDiscount={getMaxDiscount()}
      />
      <CatalogSection products={getAllProducts()} />
      <TrustFooter />
    </>
  );
}
