"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeFontCustomizer } from "@/components/ThemeFontCustomizer";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCleanMode, setIsCleanMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("clean") === "true" || window.location.hash === "#clean") {
      setIsCleanMode(true);
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  if (isCleanMode) return null;

  return (
    <header
      className="fixed top-0 inset-x-0 z-[100] backdrop-blur-md border-b border-line/30 py-3 md:py-3.5 transition-all duration-300 shadow-sm shadow-black/20"
      style={{
        backgroundColor: "rgba(var(--color-canvas-rgb, 13, 17, 23), 0.55)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-xl font-black tracking-tight text-accent transition-transform active:scale-95 drop-shadow-sm cursor-pointer group"
          aria-label={`${profile.brand} home`}
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(var(--color-accent-rgb,229,229,229),0.45)]">
            <BrandLogo className="w-full h-full" />
          </div>
          <span className="transition-colors group-hover:text-secondary">{profile.brand}</span>
        </a>

        {/* Desktop Navigation Links - Clean, unboxed text links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] lg:text-base font-semibold text-fg/90 transition-colors hover:text-accent drop-shadow-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Theme/Font Customizer + Hire Me Button + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeFontCustomizer />

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2 text-xs font-mono font-bold text-on-accent transition-all duration-150 hover:bg-secondary hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb,229,229,229),0.45)] active:scale-95 cursor-pointer shadow-md"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-fg hover:text-accent transition-colors focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-line/60 bg-canvas/95 backdrop-blur-xl px-6 py-6 shadow-2xl mt-3"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-base font-medium text-fg/80 transition-colors hover:text-accent py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3.5 text-center font-mono text-xs font-bold text-on-accent transition-all hover:bg-secondary active:scale-95 shadow-md"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
