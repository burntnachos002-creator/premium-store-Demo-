"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

type CartSummaryProps = {
  onClose: () => void;
};

export default function CartSummary({ onClose }: CartSummaryProps) {
  const total = useCartStore((s) => s.total());
  const selectedTotal = useCartStore((s) => s.selectedTotal());
  const items = useCartStore((s) => s.items);
  const selectedCount = items.filter((i) => i.selected).length;

  return (
    <div className="space-y-4">
      {/* Selected Items Info */}
      {selectedCount > 0 && (
        <div className="bg-green-50 rounded-xl p-3 border border-green-200">
          <p className="text-xs sm:text-sm font-semibold text-green-700 font-sans">
            {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
          </p>
          <p className="text-xs sm:text-sm text-green-600 font-sans mt-1">
            Total: ${selectedTotal.toFixed(2)}
          </p>
        </div>
      )}

      {/* Totals */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="text-xs sm:text-sm text-gray-600 font-sans">Total Items</span>
        <span className="text-base sm:text-lg font-bold text-black font-sans">${total.toFixed(2)}</span>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-500 text-center font-sans">
        Shipping & tax calculated at checkout
      </p>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        onClick={onClose}
        className={`block w-full text-center font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-xs sm:text-sm font-sans ${
          selectedCount > 0
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {selectedCount > 0 ? `Checkout ${selectedCount} Item${selectedCount > 1 ? "s" : ""}` : "Select items to checkout"}
      </Link>

      {/* Continue Shopping */}
      <button
        onClick={onClose}
        className="w-full border border-gray-300 text-black font-semibold py-2.5 sm:py-3 rounded-full hover:border-gray-400 transition-colors text-xs sm:text-sm font-sans"
      >
        Continue Shopping
      </button>
    </div>
  );
}
