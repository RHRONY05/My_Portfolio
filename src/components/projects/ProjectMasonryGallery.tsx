"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Project, ProjectScreenshot } from "@/data/projects";

interface ProjectMasonryGalleryProps {
  project: Project;
}

export function ProjectMasonryGallery({ project }: ProjectMasonryGalleryProps) {
  const [activeLightbox, setActiveLightbox] = useState<ProjectScreenshot | null>(null);

  const gallery = project.gallery || [];
  if (gallery.length === 0) return null;

  // Separate mobile screenshot from desktop/feature screenshots
  const mobileScreenshot = gallery.find((g) => g.type === "mobile");
  const otherScreenshots = gallery.filter((g) => g !== mobileScreenshot);

  // Map 7 primary slots cleanly
  const img1 =
    otherScreenshots.find((g) => g.src.includes("desktop") || g.src.includes("landing")) ||
    otherScreenshots[0];
  const remainingAfterImg1 = otherScreenshots.filter((g) => g !== img1);

  const img2 = remainingAfterImg1[0];

  const img3 = mobileScreenshot || remainingAfterImg1[1];

  const img4 =
    remainingAfterImg1.find(
      (g) =>
        g !== img2 &&
        (g.src.includes("feedback") ||
          g.src.includes("form") ||
          (g.height && g.width && g.height > g.width))
    ) || remainingAfterImg1[1];

  const remainingAfterImg4 = remainingAfterImg1.filter(
    (g) => g !== img2 && g !== img4 && g !== img3
  );

  const img5 =
    remainingAfterImg4.find(
      (g) => g.src.includes("modal") || g.src.includes("action")
    ) || remainingAfterImg4[0];

  const remainingAfterImg5 = remainingAfterImg4.filter((g) => g !== img5);

  const img6 =
    remainingAfterImg5.find(
      (g) => g.src.includes("pagespeed") || g.src.includes("audit")
    ) || remainingAfterImg5[0];

  const remainingAfterImg6 = remainingAfterImg5.filter((g) => g !== img6);

  const img7 = remainingAfterImg6[0];
  const extraImages = remainingAfterImg6.slice(1);

  // Keyboard navigation for lightbox modal
  const closeLightbox = useCallback(() => setActiveLightbox(null), []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (activeLightbox) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeLightbox, closeLightbox]);

  return (
    <div className="w-full my-8 sm:my-12">
      {/* 
        ========================================================================
        PURE IMAGE BENTO / PINTEREST GALLERY
        Every box is 100% image filled edge-to-edge. No text explanations.
        Column 1: 6 cols (Top: Wide Image 1 | Bottom: Image 5 + Image 7)
        Column 2: 3 cols (Top: Wide Image 2 | Bottom: Tall Image 4)
        Column 3: 3 cols (Top: Tall Mobile Image 3 | Bottom: Wide Image 6)
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* =======================================================
            COLUMN 1 (WIDE LEFT: 6 COLS)
            Top: Primary UI Image 1 (Wide)
            Bottom: Split Row with Image 5 + Image 7
           ======================================================= */}
        <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-5">
          {/* Box 1 (Wide Landscape) */}
          {img1 && (
            <div
              onClick={() => setActiveLightbox(img1)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)] h-[280px] sm:h-[320px] md:h-[340px] w-full"
            >
              <Image
                src={img1.src}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top w-full h-full transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Bottom Split Row: Box 5 + Box 7 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Box 5 (Square / Modal) */}
            {img5 && (
              <div
                onClick={() => setActiveLightbox(img5)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[210px] sm:h-[220px] w-full ${
                  !img7 ? "sm:col-span-2" : ""
                }`}
              >
                <Image
                  src={img5.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
              </div>
            )}

            {/* Box 7 (Article View / Wide Reader) */}
            {img7 && (
              <div
                onClick={() => setActiveLightbox(img7)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[210px] sm:h-[220px] w-full"
              >
                <Image
                  src={img7.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            COLUMN 2 (MIDDLE: 3 COLS)
            Top: Image 2 (Wide Desktop)
            Bottom: Image 4 (Tall Portrait)
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {/* Box 2 (Wide Desktop) */}
          {img2 && (
            <div
              onClick={() => setActiveLightbox(img2)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[220px] sm:h-[230px] w-full"
            >
              <Image
                src={img2.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Box 4 (Tall Portrait Form) */}
          {img4 && (
            <div
              onClick={() => setActiveLightbox(img4)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[310px] sm:h-[330px] w-full"
            >
              <Image
                src={img4.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}
        </div>

        {/* =======================================================
            COLUMN 3 (RIGHT: 3 COLS)
            Top: Image 3 (Tall Mobile View)
            Bottom: Image 6 (Wide Performance / Feature View)
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {/* Box 3 (Tall Mobile View) */}
          {img3 && (
            <div
              onClick={() => setActiveLightbox(img3)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[350px] sm:h-[370px] w-full"
            >
              <Image
                src={img3.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Box 6 (Wide Performance / Metric Image) */}
          {img6 && (
            <div
              onClick={() => setActiveLightbox(img6)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[170px] sm:h-[190px] w-full"
            >
              <Image
                src={img6.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}
        </div>
      </div>

      {/* Optional extra images row if project has > 7 screenshots */}
      {extraImages.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {extraImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightbox(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md h-[220px] w-full"
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* =======================================================
          INTERACTIVE FULLSCREEN LIGHTBOX MODAL
          View any screenshot at 100% natural resolution and aspect ratio
         ======================================================= */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 bg-canvas/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          style={{ zIndex: 2147483647 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-2xl border border-line bg-card shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex h-11 items-center justify-between border-b border-line bg-canvas/90 px-4">
              <span className="font-mono text-xs font-bold text-fg truncate">
                {activeLightbox.title || "Screenshot View"}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-lg p-1 text-muted hover:text-fg hover:bg-line/40 transition-colors"
                aria-label="Close image modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[80vh] bg-canvas flex items-center justify-center p-2 sm:p-4">
              <div className="relative w-full h-full max-h-[75vh]">
                <Image
                  src={activeLightbox.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
