"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type CryptoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CryptoModal({ isOpen, onClose }: CryptoModalProps) {
  const removeSelectedItems = useCartStore((s) => s.removeSelectedItems);
  const [step, setStep] = useState<"info" | "payment" | "success">("info");

  const handleContinue = () => {
    handleSimulatePayment();
  };

  const handleSimulatePayment = () => {
    setStep("payment");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleClose = () => {
    setStep("info");
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
        onClick={step === "info" ? handleClose : undefined}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {step === "info" && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black font-sans">Coinbase Commerce</h2>
                <button
                  onClick={handleClose}
                  className="p-1 text-gray-600 hover:text-black transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs sm:text-sm font-semibold text-green-600 font-sans">Ready to Connect</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4 font-sans">Cryptocurrency Payment</h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm lg:text-base font-sans">
                  Pay securely with Bitcoin, Ethereum, USDC, or other major cryptocurrencies. Your transaction will be processed instantly through Coinbase Commerce, the industry-leading crypto payment processor trusted by thousands of merchants worldwide.
                </p>

                {/* Supported Coins */}
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
                  <h4 className="text-xs sm:text-sm font-semibold text-black mb-3 sm:mb-4 font-sans">Supported Cryptocurrencies</h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 font-sans">
                    <div>• Bitcoin (BTC)</div>
                    <div>• Ethereum (ETH)</div>
                    <div>• USDC</div>
                    <div>• Dogecoin (DOGE)</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <button
                  onClick={handleContinue}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-full transition-colors text-xs sm:text-sm lg:text-base font-sans mb-3"
                >
                  Continue to Payment
                </button>

                {/* Cancel Button */}
                <button
                  onClick={handleClose}
                  className="w-full border border-gray-300 text-black font-semibold py-2.5 sm:py-3 rounded-full hover:border-gray-400 transition-colors text-xs sm:text-sm lg:text-base font-sans"
                >
                  Cancel
                </button>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gray-50">
                <p className="text-xs text-gray-600 text-center font-sans">
                  🔒 Payments secured by Coinbase Commerce
                </p>
              </div>
            </>
          )}

          {step === "payment" && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black font-sans">Select Cryptocurrency</h2>
                <button
                  onClick={handleClose}
                  className="p-1 text-gray-600 hover:text-black transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Processing indicator during payment */}
                <div className="flex justify-center mb-6">
                  <Loader className="w-10 h-10 text-green-500 animate-spin" />
                </div>
                <p className="text-center text-sm text-gray-600 font-sans">Processing your payment...</p>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-2 font-sans">Payment Confirmed!</h3>
              <p className="text-gray-600 mb-6 text-xs sm:text-sm lg:text-base font-sans">
                Your cryptocurrency payment has been received and is being processed.
              </p>
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 font-sans">Transaction Status</p>
                <p className="text-base sm:text-lg font-bold text-green-500 mt-2 font-sans">Confirmed ✓</p>
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
