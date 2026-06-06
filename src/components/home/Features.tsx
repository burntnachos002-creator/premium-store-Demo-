import React from "react";
import { CheckCircle2, Zap, Beaker } from "lucide-react";

const features = [
  {
    icon: Beaker,
    title: "Lab Tested",
    description: "Rigorously tested for purity and potency by independent labs",
  },
  {
    icon: Zap,
    title: "Fast Shipping",
    description: "Free shipping on orders over $100. Ships within 1-2 business days",
  },
  {
    icon: CheckCircle2,
    title: "Purity Guarantee",
    description: "Pharmaceutical-grade ingredients with full transparency and traceability",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-gray-50 text-black border-y border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col items-center md:items-start">
                <div className="mb-3 sm:mb-4">
                  <Icon className="w-8 h-8 text-green-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-center md:text-left font-sans">{feature.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center md:text-left font-sans">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
