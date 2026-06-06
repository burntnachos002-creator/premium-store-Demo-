import React from "react";

type ProductCardProps = {
  name: string;
  price: string;
  monogram?: string;
  color?: string;
};

export default function ProductCard({
  name,
  price,
  monogram = "P",
  color = "#22c55e",
}: ProductCardProps) {
  return (
    <article className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow font-sans">
      <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={name}
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
          <g transform="translate(200,150)">
            <circle cx="0" cy="0" r="72" fill="#ffffff" stroke={color} strokeWidth="3" />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fontFamily="inherit"
              fontSize="48"
              fontWeight="700"
              fill={color}
            >
              {monogram}
            </text>
          </g>
        </svg>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold leading-6 text-black font-sans">{name}</h3>
        <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700 font-sans">{price}</p>
      </div>
    </article>
  );
}
