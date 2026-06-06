import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight max-w-xl font-sans">
              Pure Science. <span className="text-green-500">Clinically Proven.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-lg font-sans">
              Premium supplements formulated with pharmaceutical-grade ingredients and backed by rigorous clinical research.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-green-600 transition-colors font-sans"
              >
                Shop Now
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-full border-2 border-black px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black hover:bg-gray-50 transition-colors font-sans"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Product Visual */}
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center relative overflow-hidden">
              <Image
                src="/images/products/aurum-hero.png"
                alt="Aurum visual"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
