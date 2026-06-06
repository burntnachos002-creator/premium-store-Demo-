"use client";

import React, { useState } from "react";
import type { FAQItem } from "@/data/faq";

type FaqAccordionProps = {
  item: FAQItem;
};

export default function FaqAccordion({ item }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 sm:py-6 px-4 sm:px-6 text-left flex items-center justify-between group hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-black group-hover:text-gray-700 transition-colors max-w-2xl leading-tight font-sans">
          {item.question}
        </h3>
        <span
          className={`flex-shrink-0 ml-3 sm:ml-6 text-green-500 transition-transform duration-300 flex-none ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="pb-4 sm:pb-6 px-4 sm:px-6 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed font-sans">{item.answer}</p>
      </div>
    </div>
  );
}
