"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products";
import type { Product } from "@/types";

export default function ProductsClient() {
  const colors = ["#22c55e", "#22c55e", "#22c55e"];

  return (
    <div className="min-h-screen bg-white text-black py-12 sm:py-16 lg:py-20 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-sans">Shop the Collection</h1>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-gray-600 font-sans">Clinically formulated for modern wellness</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((p, i) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="block group text-left">
              <ProductCard
                name={p.name}
                price={`$${p.price}`}
                image={p.images[0]}
                monogram={p.name.charAt(0)}
                color={colors[i % colors.length]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
