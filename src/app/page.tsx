import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FAQPreview from "@/components/home/FAQPreview";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-white font-sans min-h-screen">
      <main className="w-full">
        <Hero />
        <Features />
        <FeaturedProducts />
        <FAQPreview />

        <section className="w-full bg-gray-50 text-black border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <p className="mx-auto max-w-3xl text-center text-xs sm:text-sm lg:text-base text-gray-600 font-sans">
              We craft premium supplements with a focus on purity, efficacy, and clinical validation — because your wellness deserves precision.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
