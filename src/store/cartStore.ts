import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

export type CartItemWithSelection = CartItem & { selected?: boolean };

type CartStore = {
  items: CartItemWithSelection[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleItem: (id: string) => void;
  removeSelectedItems: () => void;
  clearCart: () => void;
  total: () => number;
  selectedTotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set({ items: get().items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )});
        } else {
          set({ items: [...get().items, { ...product, quantity: 1, selected: false }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id, qty) => set({ items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      )}),
      toggleItem: (id) => set({ items: get().items.map((i) =>
        i.id === id ? { ...i, selected: !i.selected } : i
      )}),
      removeSelectedItems: () => set({ items: get().items.filter((i) => !i.selected) }),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      selectedTotal: () => get().items
        .filter((i) => i.selected)
        .reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
