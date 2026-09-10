import Link from "next/link";
import {
  ArrowUpRight,
  Backpack,
  Brush,
  Droplets,
  Gem,
  Heart,
  Package,
  ShoppingBasket,
  ShowerHead,
  Sparkles,
  Star,
  Tag,
  Wind,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { CategoryListItem } from "@/types/catalog";

/** Iconos disponibles para el campo `icon` de src/data/categories.ts */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Droplets,
  Gem,
  ShowerHead,
  Wind,
  Backpack,
  ShoppingBasket,
  Brush,
  Heart,
  Star,
  Tag,
  Package,
};

export default function CategoryGrid({
  categories,
}: {
  categories: CategoryListItem[];
}) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {categories.map((category, index) => {
        const Icon = CATEGORY_ICONS[category.icon] ?? Package;

        return (
          <Reveal key={category.id} delay={index * 50} className="h-full">
            <Link
              href={`/catalogo?categoria=${category.id}`}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-lila-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lila-300 hover:shadow-card sm:p-5"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-lila-100 to-lila-200/70 transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-5 text-lila-700" aria-hidden />
              </span>

              <span className="flex-1">
                <span className="flex items-center gap-1 font-display text-[15px] font-bold text-ink">
                  {category.name}
                  <ArrowUpRight
                    className="size-4 text-lila-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                  {category.description}
                </span>
              </span>

              <span className="text-xs font-semibold text-lila-700">
                {category.productCount}{" "}
                {category.productCount === 1 ? "producto" : "productos"}
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
