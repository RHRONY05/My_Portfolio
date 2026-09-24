"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Terminal } from "lucide-react";
import { StreetCurbRunner } from "./StreetCurbRunner";

export function HeroCinemaCanvas() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col justify-center"
      aria-label="Hero Section: Urban Graffiti Mural"
    >
      {/* 1. Full-Screen Graffiti Wall Background (Always Visible, z-0) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/Hero/My_graphetti.png"
          alt="Rony - Urban Street Art Graffiti Mural"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[74%_top] sm:object-[65%_top] md:object-[65%_top] lg:object-[right_top]"
        />

        {/* 1a. Uniform Dark / Canvas Overlay across the entire image */}
        <div
          className="absolute inset-0 bg-canvas/70 pointer-events-none"
          aria-hidden="true"
        />

        {/* 1b. Directional readability gradient on the left for tablet & desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/60 to-transparent pointer-events-none md:w-3/5"
          aria-hidden="true"
        />

        {/* 1c. Top-down readability gradient on mobile */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/30 to-transparent md:hidden pointer-events-none"
          aria-hidden="true"
        />

        {/* 1d. Subtle Vignette at Edges */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(13,17,23,0.6)_100%)] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Content: Wide Spanning Headline, Subhead & CTAs (z-20) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 py-12 pb-44 sm:pb-36 lg:py-12">
        <div className="max-w-md sm:max-w-lg md:max-w-lg lg:max-w-3xl xl:max-w-4xl flex flex-col items-start text-left">
          {/* Main Headline */}
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-fg leading-[1.08]">
            Software Engineer in the Making —{" "}
            <span className="text-accent drop-shadow-[0_0_20px_rgba(229,184,105,0.45)]">
              Full-Stack &amp; AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-6 max-w-3xl text-base sm:text-lg md:text-xl text-fg/80 leading-relaxed font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            CSE undergraduate focused on building production-ready web applications and autonomous systems. Experienced in{" "}
            <span className="text-fg font-semibold">full-stack architecture</span>,{" "}
            <span className="text-accent font-semibold">agentic workflows</span>, and LLM integrations, with an expanding focus on{" "}
            <span className="text-fg font-semibold">AI/ML engineering</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-bold text-on-accent transition-all hover:bg-secondary hover:shadow-[0_0_20px_rgba(229,184,105,0.4)] active:scale-95 cursor-pointer shadow-lg"
            >
              Explore Work
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-card/80 backdrop-blur-md px-6 py-3 text-base font-semibold text-fg transition-all hover:bg-card hover:border-accent/50 active:scale-95 cursor-pointer shadow-lg"
            >
              <Terminal className="size-4 text-accent" />
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Street Curb Runner (Interactive Mini-Game Easter Egg) */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 z-30 px-3 sm:px-8 md:px-10 lg:px-12 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto pointer-events-auto">
          <StreetCurbRunner />
        </div>
      </div>
    </section>
  );
}
