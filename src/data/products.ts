import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "aurum-daily",
    slug: "aurum-daily",
    name: "Aurum Daily",
    price: 39,
    images: ["/images/products/aurum-daily.png"],
    description: "A daily multivitamin-inspired blend to support energy and focus.",
    category: "supplements",
    stock: 120,
  },
  {
    id: "night-restore",
    slug: "night-restore",
    name: "Night Restore",
    price: 49,
    images: ["/images/products/night-restore.png"],
    description: "A calming, evening formulation to help support restorative sleep.",
    category: "supplements",
    stock: 80,
  },
  {
    id: "focus-amplify",
    slug: "focus-amplify",
    name: "Focus Amplify",
    price: 34,
    images: ["/images/products/focus-amplify.png"],
    description: "Neuro-support blend designed for clarity and sustained concentration.",
    category: "supplements",
    stock: 55,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export default products;
