"use client";

import React from "react";
import { X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-white transition-transform duration-300 ease-in-out flex flex-col shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-5">
          <h2 className="text-lg font-bold text-black font-sans">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 font-sans">
          {items.length === 0 ? (
            <p className="text-center text-sm text-gray-500 font-sans">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer with summary and checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-4 sm:px-6 py-6">
            <CartSummary onClose={onClose} />
          </div>
        )}
      </div>
    </>
  );
}
