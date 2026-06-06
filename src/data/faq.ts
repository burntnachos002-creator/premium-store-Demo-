export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What makes your products different from standard supplements?",
    answer:
      "Our products are formulated with pharmaceutical-grade ingredients and transparent sourcing. Each blend is clinically inspired and designed for modern lifestyles, prioritizing both efficacy and elegant minimalism.",
  },
  {
    id: "2",
    question: "How long does it take to notice results?",
    answer:
      "Most customers report noticeable benefits within 2-4 weeks of consistent use. Results vary based on individual factors like lifestyle, sleep, and stress levels. We recommend a 60-day commitment for optimal results.",
  },
  {
    id: "3",
    question: "Are your products safe to combine with medications?",
    answer:
      "While our products are generally safe, we always recommend consulting your healthcare provider before combining supplements with medications. This ensures there are no interactions specific to your health profile.",
  },
  {
    id: "4",
    question: "What is your shipping and return policy?",
    answer:
      "We offer free shipping on orders over $75 within the continental US (3-5 business days). All orders are backed by our 30-day satisfaction guarantee. If you're not happy, full refunds are issued no questions asked.",
  },
  {
    id: "5",
    question: "Do you offer subscription discounts?",
    answer:
      "Yes, our subscription service provides 15% off all products, plus exclusive early access to new releases. You can customize your delivery frequency and pause anytime.",
  },
  {
    id: "6",
    question: "Are your ingredients sourced sustainably?",
    answer:
      "Sustainability is core to our values. We partner with suppliers who meet rigorous environmental standards and maintain full traceability. Our packaging is recyclable, and we're working toward carbon-neutral shipping by 2025.",
  },
  {
    id: "7",
    question: "Are your products third-party tested and certified?",
    answer:
      "Yes, all products undergo rigorous third-party testing for purity, potency, and contaminants. We maintain NSF Certified for Sport and GMP certifications. Complete batch test results are available on our website for full transparency.",
  },
  {
    id: "8",
    question: "What certifications and quality standards do you meet?",
    answer:
      "We exceed FDA standards and maintain GMP (Good Manufacturing Practice) certification. Our facility is ISO 9001 certified, and we comply with all CGMP requirements. Each batch is tested for heavy metals, microbial contamination, and ingredient identity verification.",
  },
];
