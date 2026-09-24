import React from "react";

export function BrandLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary, #A3A3A3)" />
          <stop offset="60%" stopColor="var(--color-accent, #E5E5E5)" />
          <stop offset="100%" stopColor="var(--color-accent, #E5E5E5)" />
        </linearGradient>
      </defs>

      {/* Dark Base Octagon */}
      <polygon
        points="50,2 84,16 98,50 84,84 50,98 16,84 2,50 16,16"
        fill="var(--color-canvas, #000000)"
        stroke="var(--color-line, #343434)"
        strokeWidth="1.5"
      />

      {/* 8 Mahoraga Adaptation Vertices / Energy Nodes */}
      <circle cx="50" cy="2" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="84" cy="16" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="98" cy="50" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="84" cy="84" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="50" cy="98" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="16" cy="84" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="2" cy="50" r="2.8" fill="url(#brandLogoGrad)" />
      <circle cx="16" cy="16" r="2.8" fill="url(#brandLogoGrad)" />

      {/* Inner Octagonal Track with Dynamic Accent */}
      <polygon
        points="50,8 79,21 92,50 79,79 50,92 21,79 8,50 21,21"
        fill="none"
        stroke="url(#brandLogoGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Circular Data Orbit (Segmented) */}
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="var(--color-line, #343434)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />

      {/* Precision Monolithic Tech 'R' */}
      <path
        fillRule="evenodd"
        fill="url(#brandLogoGrad)"
        d="M 32 26 H 55 C 64 26 69 31 69 39 C 69 46 64 51 55 51.5 L 68 74 H 57.5 L 45.5 52 H 40.5 V 74 H 32 V 26 Z 
           M 40.5 33.5 V 45 H 54 C 58.5 45 61 43 61 39.2 C 61 35.5 58.5 33.5 54 33.5 H 40.5 Z"
      />
    </svg>
  );
}
