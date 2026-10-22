"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Project, ProjectScreenshot } from "@/data/projects";

interface ProjectMasonryGalleryProps {
  project: Project;
}

/**
 * Computes an inline aspectRatio style based on the screenshot's natural dimensions
 * so the card container exactly matches the image's shape with zero cropping.
 */
function getBoxAspectStyle(
  screenshot?: ProjectScreenshot,
  fallback = "16 / 9"
): React.CSSProperties {
  if (!screenshot) return { aspectRatio: fallback };
  if (screenshot.aspectRatio) {
    return { aspectRatio: screenshot.aspectRatio.replace("/", " / ") };
  }
  if (screenshot.width && screenshot.height) {
    return { aspectRatio: `${screenshot.width} / ${screenshot.height}` };
  }
  if (screenshot.type === "mobile") {
    return { aspectRatio: "820 / 1600" };
  }
  return { aspectRatio: fallback };
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
        SHAPE-PRESERVING PURE IMAGE GALLERY
        - Every card container uses the image's exact natural aspect ratio
        - object-contain ensures 100% of the image is visible with zero cropping
        - Column 1: Wide 6 cols (Top: Primary Desktop | Bottom: Modal + Article View)
        - Column 2: 3 cols (Top: Article Page | Bottom: Tall Feedback Form)
        - Column 3: 3 cols (Top: Tall Mobile Phone UI | Bottom: PageSpeed Score)
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* =======================================================
            COLUMN 1 (WIDE LEFT: 6 COLS)
            Top: Primary UI Image 1 (Wide Landscape)
            Bottom: Split Row with Image 5 (Modal) + Image 7 (Article View)
           ======================================================= */}
        <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-5">
          {/* Box 1 (Wide Primary Desktop UI) */}
          {img1 && (
            <div
              onClick={() => setActiveLightbox(img1)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)] w-full"
              style={getBoxAspectStyle(img1, "1894 / 917")}
            >
              <Image
                src={img1.src}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Bottom Split Row: Box 5 + Box 7 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Box 5 (Square / Modal) */}
            {img5 && (
              <div
                onClick={() => setActiveLightbox(img5)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full ${
                  !img7 ? "sm:col-span-2" : ""
                }`}
                style={getBoxAspectStyle(img5, "801 / 824")}
              >
                <Image
                  src={img5.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
              </div>
            )}

            {/* Box 7 (Article View / Wide Reader Table) */}
            {img7 && (
              <div
                onClick={() => setActiveLightbox(img7)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
                style={getBoxAspectStyle(img7, "1617 / 908")}
              >
                <Image
                  src={img7.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            COLUMN 2 (MIDDLE: 3 COLS)
            Top: Image 2 (Wide Desktop Article Page)
            Bottom: Image 4 (Tall Portrait Feedback Form)
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {/* Box 2 (Wide Desktop Article Page) */}
          {img2 && (
            <div
              onClick={() => setActiveLightbox(img2)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(img2, "1708 / 917")}
            >
              <Image
                src={img2.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Box 4 (Tall Portrait Feedback Form) */}
          {img4 && (
            <div
              onClick={() => setActiveLightbox(img4)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(img4, "495 / 709")}
            >
              <Image
                src={img4.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}
        </div>

        {/* =======================================================
            COLUMN 3 (RIGHT: 3 COLS)
            Top: Image 3 (Tall Mobile Native Healthcare UI)
            Bottom: Image 6 (Wide PageSpeed Insights Score)
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {/* Box 3 (Tall Mobile View - Full shape preserved) */}
          {img3 && (
            <div
              onClick={() => setActiveLightbox(img3)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(img3, "820 / 1600")}
            >
              <Image
                src={img3.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Box 6 (Wide PageSpeed Performance Gauge) */}
          {img6 && (
            <div
              onClick={() => setActiveLightbox(img6)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(img6, "943 / 517")}
            >
              <Image
                src={img6.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}
        </div>
      </div>

      {/* Optional extra images row if project has > 7 screenshots */}
      {extraImages.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-start">
          {extraImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightbox(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(item, "16 / 9")}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* =======================================================
          SHAPE-ADAPTIVE LIGHTBOX MODAL
          - Adapts width & height to the natural shape of the image
          - Mobile UI screenshot renders in a sleek mobile portrait frame
          - Desktop screenshot renders in a wide landscape frame
          - Guaranteed 100% visible: uses native <img> with max-h/max-w
         ======================================================= */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 bg-canvas/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          style={{ zIndex: 2147483647 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col rounded-2xl border border-line bg-card shadow-2xl overflow-hidden max-w-[95vw] max-h-[94vh] w-fit mx-auto"
          >
            {/* Modal Header */}
            <div className="flex h-10 items-center justify-between border-b border-line bg-canvas/90 px-4 gap-4">
              <span className="font-mono text-xs font-bold text-fg truncate">
                {activeLightbox.title || "Screenshot Preview"}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-lg p-1 text-muted hover:text-fg hover:bg-line/40 transition-colors shrink-0"
                aria-label="Close image modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Image Viewport - Naturally hugs the image shape */}
            <div className="relative p-2 sm:p-3 bg-canvas/40 flex items-center justify-center overflow-auto max-h-[85vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title || "Preview"}
                className="max-h-[80vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-lg block mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
