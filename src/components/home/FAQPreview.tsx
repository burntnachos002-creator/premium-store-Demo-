import React from "react";
import Link from "next/link";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqData } from "@/data/faq";

export default function FAQPreview() {
  // Show only first 3 FAQ items
  const preview = faqData.slice(0, 3);

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-sans">Common Questions</h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 font-sans">Find answers to frequently asked questions about our products</p>
        </div>

        <div className="space-y-0 border border-gray-200 rounded-2xl overflow-hidden">
          {preview.map((item) => (
            <FaqAccordion key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-green-600 transition-colors font-sans"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
