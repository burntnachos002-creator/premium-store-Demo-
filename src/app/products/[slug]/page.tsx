"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, Beaker, Shield } from "lucide-react";
import type { Product } from "@/types";

type Props = {
	params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: Props) {
	const { slug } = React.use(params);
	const prod: Product =
		getProductBySlug(slug) ?? {
			id: slug,
			slug: slug,
			name: slug.replace(/-/g, " "),
			price: 39,
			images: [],
			description:
				"Clean ingredients, transparent sourcing, and clinically informed dosages for daily use.",
			category: "supplements",
			stock: 0,
		};

	const variants = ["Original", "Unflavored", "Lemon"];
	const [selected, setSelected] = useState(variants[0]);
	const [isAdded, setIsAdded] = useState(false);
	const addItem = useCartStore((s) => s.addItem);

	const trustBadges = [
		{ icon: Beaker, label: "Lab Tested", value: "100%" },
		{ icon: CheckCircle2, label: "Verified", value: "GMP" },
		{ icon: Shield, label: "Purity", value: "98%" },
	];

	function handleAdd() {
		const item = { ...prod, id: `${prod.id}--${selected}`, name: `${prod.name} — ${selected}` };
		addItem(item);
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2000);
	}

	return (
		<div className="min-h-screen bg-white text-black py-8 sm:py-12 lg:py-20 font-sans">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Back Link */}
				<Link href="/products" className="text-xs sm:text-sm text-gray-500 hover:text-black transition-colors font-medium font-sans">
					← Back to Shop
				</Link>

				{/* Product Grid */}
				<div className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
					{/* Left: Product Image */}
					<div className="w-full flex flex-col gap-6">
						<div className="w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-white border border-gray-200 flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
							<svg viewBox="0 0 800 600" className="w-full h-full object-cover">
								<defs>
									<linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
										<stop offset="0%" stopColor="#e5e7eb" />
										<stop offset="100%" stopColor="#f3f4f6" />
									</linearGradient>
								</defs>
								<rect width="100%" height="100%" fill="url(#pg)" />
								<g transform="translate(400,300)">
									<circle r="120" fill="#ffffff" stroke="#22c55e" strokeWidth="3" />
									<text x="0" y="12" textAnchor="middle" fontSize="84" fontWeight="700" fill="#22c55e">
										{prod.name.charAt(0).toUpperCase()}
									</text>
								</g>
							</svg>
						</div>
					</div>

					{/* Right: Product Details */}
					<div className="w-full">
						{/* Header */}
						<div className="mb-4 sm:mb-6">
							<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-black leading-tight font-sans">{prod.name}</h1>
							<div className="mt-2 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-black font-sans">${prod.price}</div>
						</div>

						{/* Trust Badges */}
						<div className="mb-6 sm:mb-8 pt-4 sm:pt-6 border-t border-gray-200">
							<div className="grid grid-cols-3 gap-3 sm:gap-4">
								{trustBadges.map((badge) => {
									const Icon = badge.icon;
									return (
										<div key={badge.label} className="flex flex-col items-center text-center">
											<Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mb-2" />
											<div className="text-xs sm:text-sm font-semibold text-gray-900 font-sans">{badge.value}</div>
											<div className="text-xs text-gray-600 mt-1 font-sans">{badge.label}</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Description */}
						<p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 font-sans">{prod.description}</p>

						{/* Variant Selector */}
						<div className="mb-6 sm:mb-8">
							<h3 className="text-xs sm:text-sm font-semibold text-black mb-3 sm:mb-4 font-sans">Choose Variant</h3>
							<div className="flex flex-wrap gap-2 sm:gap-3">
								{variants.map((v) => (
									<button
										key={v}
										onClick={() => setSelected(v)}
										className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all font-sans ${
											selected === v
												? "bg-black text-white border border-black"
												: "bg-white text-black border border-gray-300 hover:border-gray-400"
										}`}
									>
										{v}
									</button>
								))}
							</div>
						</div>

						{/* Add to Cart Button */}
						<button
							onClick={handleAdd}
							className={`w-full font-semibold py-2.5 sm:py-4 rounded-full transition-all text-xs sm:text-sm lg:text-base font-sans ${
								isAdded
									? "bg-black text-white"
									: "bg-green-500 hover:bg-green-600 text-white"
							}`}
						>
							{isAdded ? "✓ Added to Cart" : "Add to Cart"}
						</button>

						{/* Stock Info */}
						<div className="mt-4 sm:mt-6 text-center">
							<p className="text-xs sm:text-sm lg:text-base text-gray-500 font-sans">
								{prod.stock > 0 ? (
									<span className="text-green-600 font-medium">{prod.stock} in stock</span>
								) : (
									<span className="text-gray-600">Limited availability</span>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
