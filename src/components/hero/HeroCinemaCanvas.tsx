"use client";

import React from "react";
import Image from "next/image";

interface HeroCinemaCanvasProps {
  children?: React.ReactNode;
}

export function HeroCinemaCanvas({ children }: HeroCinemaCanvasProps) {

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-canvas select-none"
      aria-label="Hero Section: The Open-Air Cinema"
    >
      {/* Hero Image - Fitted to Viewport */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <Image
          src="/images/Hero/billboard&me.jpeg"
          alt="Open-Air Cinema Sky"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>

      {/* Subtle Atmospheric Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(13,17,23,0.6)_100%)]"
        aria-hidden="true"
      />

      {/* Children Overlay Slot (Live Projector Screen Content & CTAs) */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {children}
      </div>
    </section>
  );
}

