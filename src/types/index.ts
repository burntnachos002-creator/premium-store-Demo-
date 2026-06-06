export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  stock: number;
};

export type CartItem = Product & { quantity: number };