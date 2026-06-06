"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Product } from "@/types";

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
};

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  if (!isOpen || !product) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 sticky top-0 bg-white">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black font-sans truncate">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-600 hover:text-black transition-colors flex-shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            {/* Product Image */}
            <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center mb-6 sm:mb-8 h-48 sm:h-64 relative">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                />
              ) : (
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e5e7eb" />
                      <stop offset="100%" stopColor="#f3f4f6" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pg)" />
                  <g transform="translate(200,150)">
                    <circle r="120" fill="#ffffff" stroke="#22c55e" strokeWidth="3" />
                    <text x="0" y="12" textAnchor="middle" fontSize="84" fontWeight="700" fill="#22c55e">
                      {product.name.charAt(0).toUpperCase()}
                    </text>
                  </g>
                </svg>
              )}
            </div>

            {/* Price */}
            <div className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6 font-sans">${product.price}</div>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 font-sans">{product.description}</p>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="font-semibold text-black mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base font-sans">Product Details</h4>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-700 font-sans">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="font-medium text-black capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock</span>
                  <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <button
              onClick={onAddToCart}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-full transition-colors mb-3 text-xs sm:text-sm lg:text-base font-sans"
            >
              Add to Cart
            </button>

            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-black font-semibold py-2.5 sm:py-3 rounded-full hover:border-gray-400 transition-colors text-xs sm:text-sm lg:text-base font-sans"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
