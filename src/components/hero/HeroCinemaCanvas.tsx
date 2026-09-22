"use client";

import React, { useRef } from "react";

interface HeroCinemaCanvasProps {
  children?: React.ReactNode;
}

export function HeroCinemaCanvas({ children }: HeroCinemaCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-canvas select-none"
      aria-label="Hero Section: The Open-Air Cinema"
    >
      {/* Full-Bleed 1080p Living Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source
            src="/Flames_ignite_and_flicker_1080p_20260921024320.mp4"
            type="video/mp4"
          />
        </video>
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

