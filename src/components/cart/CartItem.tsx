"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, type CartItemWithSelection } from "@/store/cartStore";
import products from "@/data/products";

type CartItemProps = {
  item: CartItemWithSelection;
};

export default function CartItem({ item }: CartItemProps) {
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const toggleItem = useCartStore((s) => s.toggleItem);

  const itemTotal = item.price * item.quantity;
  const fallback = products.find((p) => p.id === item.id);
  const imageSrc = item.images && item.images[0] ? item.images[0] : fallback?.images?.[0];

  return (
    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
      {/* Checkbox */}
      <button
        onClick={() => toggleItem(item.id)}
        className="flex-shrink-0 mt-1"
        aria-label="Select item"
      >
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 transition-all flex items-center justify-center ${
          item.selected
            ? "bg-green-500 border-green-500"
            : "border-gray-300 hover:border-green-400"
        }`}>
          {item.selected && (
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center relative overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#g)" />
            <circle cx="50" cy="50" r="20" fill="#ffffff" stroke="#22c55e" strokeWidth="1.5" />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#22c55e"
            >
              {item.name.charAt(0)}
            </text>
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-semibold text-black truncate font-sans">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-1 font-sans">${item.price.toFixed(2)}</p>

        {/* Quantity Control */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <button
            onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
            className="p-1 text-gray-500 hover:text-black transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="text-xs sm:text-sm font-medium text-black w-5 sm:w-6 text-center font-sans">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="p-1 text-gray-500 hover:text-black transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="ml-auto p-1 text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Item Total */}
        <p className="text-xs sm:text-sm font-semibold text-black mt-2 font-sans">
          ${itemTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
