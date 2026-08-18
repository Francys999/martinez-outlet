"use client";

import { PackageSearch } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onReset: () => void;
}

export default function ProductGrid({
  products,
  onOpenDetail,
  onReset,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-lila-300 bg-lila-50/60 px-6 py-16 text-center">
        <PackageSearch className="mx-auto size-9 text-lila-500" aria-hidden />
        <h3 className="mt-4 font-display text-lg font-bold text-ink">
          No encontramos productos
        </h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">
          Prueba con otro nombre o quita algunos filtros para ver más resultados.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-lila-300 bg-white px-5 text-sm font-semibold text-lila-800 transition-colors hover:bg-lila-50"
        >
          Ver todos los productos
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
