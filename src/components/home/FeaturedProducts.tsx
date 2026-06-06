import React from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-sans">Bestsellers</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-sans">Our most trusted formulations</p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-semibold text-green-500 hover:text-green-600 transition-colors font-sans whitespace-nowrap">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="block group">
              <ProductCard
                name={p.name}
                price={`$${p.price}`}
                image={p.images?.[0]}
                monogram={p.name.charAt(0)}
                color="#22c55e"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
