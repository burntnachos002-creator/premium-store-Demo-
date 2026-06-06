import React from "react";
import { faqData } from "@/data/faq";
import FaqAccordion from "@/components/faq/FaqAccordion";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-black mb-3 sm:mb-4 font-sans">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed font-sans">
            Everything you need to know about our products, sourcing, testing, and policies.
          </p>
        </header>

        {/* FAQ Accordion */}
        <div className="space-y-0 border border-gray-200 rounded-3xl overflow-hidden divide-y divide-gray-200 mb-12 sm:mb-16">
          {faqData.map((item) => (
            <FaqAccordion key={item.id} item={item} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-200 pt-8 sm:pt-12">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4 font-sans">Still have questions?</h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 font-sans">
            We're here to help. Reach out to our team and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
            <a
              href="mailto:support@aurumstore.com"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors text-xs sm:text-sm lg:text-base font-sans"
            >
              Email Support
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-black font-semibold rounded-full hover:border-gray-400 transition-colors text-xs sm:text-sm lg:text-base font-sans"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
