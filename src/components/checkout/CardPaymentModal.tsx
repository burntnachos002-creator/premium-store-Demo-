"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type CardPaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
};

export default function CardPaymentModal({ isOpen, onClose, amount }: CardPaymentModalProps) {
  const removeSelectedItems = useCartStore((s) => s.removeSelectedItems);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleClose = () => {
    setStep("form");
    setFormData({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
    onClose();
  };

  const handleDone = () => {
    removeSelectedItems();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30 transition-opacity"
        onClick={step === "form" ? handleClose : undefined}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {step === "form" && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black font-sans">Credit Card Payment</h2>
                <button
                  onClick={handleClose}
                  className="p-1 text-gray-600 hover:text-black transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">
                {/* Amount */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 font-sans">Total Amount</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-500 mt-1 font-sans">
                    ${amount.toFixed(2)}
                  </p>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-black mb-2 font-sans">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm font-sans"
                    required
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-black mb-2 font-sans">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4532 1234 5678 9010"
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\s/g, "");
                      if (value.length > 0) {
                        value = value.match(/.{1,4}/g)?.join(" ") || value;
                      }
                      setFormData({ ...formData, cardNumber: value });
                    }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm font-sans"
                    required
                  />
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-black mb-2 font-sans">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={formData.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setFormData({ ...formData, expiry: value });
                      }}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm font-sans"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-black mb-2 font-sans">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm font-sans"
                      required
                    />
                  </div>
                </div>

                {/* Security Note */}
                <p className="text-xs text-gray-500 text-center font-sans">
                  🔒 Your card information is encrypted and secure.
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-full transition-colors text-xs sm:text-sm lg:text-base font-sans"
                >
                  Pay ${amount.toFixed(2)}
                </button>
              </form>
            </>
          )}

          {step === "processing" && (
            <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
              <Loader className="w-12 h-12 text-green-500 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-2 font-sans">Processing Payment</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-sans">
                Please wait while we process your payment...
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-2 font-sans">Payment Successful!</h3>
              <p className="text-gray-600 mb-6 text-xs sm:text-sm lg:text-base font-sans">
                Your order has been placed successfully. You'll receive a confirmation email shortly.
              </p>
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 font-sans">Order Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-500 mt-1 font-sans">
                  ${amount.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleDone}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-full transition-colors text-xs sm:text-sm lg:text-base font-sans"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
