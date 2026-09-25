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
          src="/images/Hero/My_graphetti.webp"
          alt="Rony - Urban Street Art Graffiti Mural"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[74%_top] sm:object-[65%_top] md:object-[65%_top] lg:object-[right_top]"
        />

        {/* 1a. Base Dark / Canvas Dimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700"
          style={{
            backgroundColor: "rgba(var(--color-canvas-rgb, 0, 0, 0), 0.65)",
          }}
          aria-hidden="true"
        />

        {/* 1b. Option A: Dynamic Atmospheric Rim & Concrete Lighting */}
        {/* Softly warms or cools the graffiti wall & Rony's silhouette with the active theme */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 mix-blend-screen opacity-75"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 75% 45%, rgba(var(--color-accent-rgb, 229, 229, 229), 0.28) 0%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* 1c. Secondary ambient city sky highlight (upper-right) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 mix-blend-screen opacity-50"
          style={{
            background:
              "radial-gradient(circle at 85% 20%, rgba(var(--color-secondary-rgb, 163, 163, 163), 0.18) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* 1d. Directional readability gradient on the left for tablet & desktop */}
        <div
          className="absolute inset-0 pointer-events-none md:w-3/5 transition-all duration-700"
          style={{
            background:
              "linear-gradient(to right, rgba(var(--color-canvas-rgb, 0, 0, 0), 0.95), rgba(var(--color-canvas-rgb, 0, 0, 0), 0.6), transparent)",
          }}
          aria-hidden="true"
        />

        {/* 1e. Top-down readability gradient on mobile */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none transition-all duration-700"
          style={{
            background:
              "linear-gradient(to bottom, rgba(var(--color-canvas-rgb, 0, 0, 0), 0.8), rgba(var(--color-canvas-rgb, 0, 0, 0), 0.3), transparent)",
          }}
          aria-hidden="true"
        />

        {/* 1f. Subtle Vignette at Edges */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 60%, rgba(var(--color-canvas-rgb, 0, 0, 0), 0.7) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* 2. Content: Wide Spanning Headline, Subhead & CTAs (z-20) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 py-12 pb-44 sm:pb-36 lg:py-12">
        <div className="max-w-md sm:max-w-lg md:max-w-lg lg:max-w-3xl xl:max-w-4xl flex flex-col items-start text-left">
          {/* Main Headline */}
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-fg leading-[1.08]">
            Software Engineer in the Making —{" "}
            <span className="text-accent drop-shadow-[0_0_20px_rgba(var(--color-accent-rgb,229,229,229),0.45)]">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-bold text-on-accent transition-all hover:bg-secondary hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb,229,229,229),0.45)] active:scale-95 cursor-pointer shadow-lg"
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
