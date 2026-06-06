"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CardPaymentModal from "@/components/checkout/CardPaymentModal";
import CryptoModal from "@/components/checkout/CryptoModal";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const selectedTotal = useCartStore((s) => s.selectedTotal());
  const selectedItems = items.filter((i) => i.selected);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);

  const subtotal = selectedTotal;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = Number((subtotal * 0.1).toFixed(2));
  const grandTotal = Number((subtotal + shipping + tax).toFixed(2));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black py-12 sm:py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-sans">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-6 sm:mb-8 font-sans">Add items to proceed to checkout.</p>
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

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black py-12 sm:py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-sans">No Items Selected</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-6 sm:mb-8 font-sans">Select items from your cart to proceed to checkout.</p>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base text-white font-semibold hover:bg-green-600 transition-colors font-sans"
          >
            View Cart
          </Link>
        </div>
      </div>
    );
  }

  const handlePaymentClick = () => {
    if (paymentMethod === "card") {
      setShowCardModal(true);
    } else {
      setShowCryptoModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-8 sm:py-12 lg:py-20 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link href="/products" className="text-xs sm:text-sm text-gray-500 hover:text-black transition-colors font-medium font-sans">
            ← Back to Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4 font-sans">Checkout</h1>
        </div>

        {/* Grid: Left (Summary) + Right (Payment) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Left: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl border border-gray-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 font-sans">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12">
                        <defs>
                          <linearGradient id="g" x1="0" x2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                        <rect width="100" height="100" fill="url(#g)" />
                        <circle cx="50" cy="50" r="20" fill="#ffffff" stroke="#22c55e" strokeWidth="1.5" />
                        <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="700" fill="#22c55e">
                          {item.name.charAt(0)}
                        </text>
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-black font-sans">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 font-sans">Qty: {item.quantity}</p>
                      <p className="font-semibold text-xs sm:text-sm lg:text-base text-black mt-2 font-sans">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm lg:text-base text-gray-600 font-sans">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm lg:text-base text-gray-600 font-sans">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm lg:text-base text-gray-600 font-sans">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 sm:pt-3 flex justify-between font-bold text-base sm:text-lg lg:text-xl font-sans">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 lg:p-8 sticky top-24">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 font-sans">Payment Method</h3>

              {/* Payment Options */}
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <label className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" 
                  />
                  <span className="ml-2 sm:ml-3 font-semibold text-xs sm:text-sm lg:text-base text-black font-sans">Credit Card</span>
                </label>
                <label className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "crypto"}
                    onChange={() => setPaymentMethod("crypto")}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" 
                  />
                  <span className="ml-2 sm:ml-3 font-semibold text-xs sm:text-sm lg:text-base text-black font-sans">Cryptocurrency</span>
                </label>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePaymentClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 sm:py-4 rounded-full transition-colors text-xs sm:text-sm lg:text-base font-sans"
              >
                {paymentMethod === "card" ? "Pay with Card" : "Pay with Crypto"}
              </button>

              {/* Security Note */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center font-sans">
                  🔒 Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modals */}
      <CardPaymentModal 
        isOpen={showCardModal} 
        onClose={() => setShowCardModal(false)} 
        amount={grandTotal}
      />
      <CryptoModal 
        isOpen={showCryptoModal} 
        onClose={() => setShowCryptoModal(false)} 
      />
    </div>
  );
}
