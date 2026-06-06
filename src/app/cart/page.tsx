"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const selectedTotal = useCartStore((s) => s.selectedTotal());
  const selectedCount = items.filter((i) => i.selected).length;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black py-12 sm:py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-sans">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-6 sm:mb-8 font-sans">
            Start shopping to add items to your cart.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base text-white font-semibold hover:bg-green-600 transition-colors font-sans"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-8 sm:py-12 lg:py-20 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link href="/products" className="text-xs sm:text-sm text-gray-500 hover:text-black transition-colors font-medium font-sans">
            ← Back to Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4 font-sans">Shopping Cart</h1>
        </div>

        {/* Grid: Left (Items) + Right (Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right: Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-3xl border border-gray-200 p-4 sm:p-6 lg:p-8 sticky top-24">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 font-sans">Order Summary</h3>

              {/* Selected Items Info */}
              {selectedCount > 0 && (
                <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
                  <p className="text-xs sm:text-sm font-semibold text-green-700 font-sans">
                    {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
                  </p>
                  <p className="text-xs sm:text-sm text-green-600 font-sans mt-2">
                    Subtotal: ${selectedTotal.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 sm:space-y-3 pb-6 sm:pb-8 border-b border-gray-200">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 font-sans">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Info */}
              <p className="text-xs text-gray-500 text-center my-4 sm:my-6 font-sans">
                Shipping & tax calculated at checkout
              </p>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className={`block w-full text-center font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-xs sm:text-sm font-sans mb-3 ${
                  selectedCount > 0
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none"
                }`}
              >
                {selectedCount > 0 ? `Checkout ${selectedCount} Item${selectedCount > 1 ? "s" : ""}` : "Select items to checkout"}
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="block w-full border border-gray-300 text-black font-semibold py-2.5 sm:py-3 rounded-full hover:border-gray-400 transition-colors text-xs sm:text-sm text-center font-sans"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
