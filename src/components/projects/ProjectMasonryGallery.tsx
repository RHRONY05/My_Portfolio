"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Project, ProjectScreenshot, GallerySlot } from "@/data/projects";

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

  // --------------------------------------------------------------------------
  // SLOT RESOLUTION:
  // 1. First, check if the project has explicit `slot` assignments.
  // 2. If slots are not explicitly assigned, fall back to smart auto-matching.
  // --------------------------------------------------------------------------
  const hasExplicitSlots = gallery.some((g) => g.slot);

  let imgCol1Top: ProjectScreenshot | undefined;
  let imgCol1BottomWide: ProjectScreenshot | undefined;
  let imgCol1BottomLeft: ProjectScreenshot | undefined;
  let imgCol1BottomRight: ProjectScreenshot | undefined;
  let imgCol2Top: ProjectScreenshot | undefined;
  let imgCol2Bottom: ProjectScreenshot | undefined;
  let imgCol3Top: ProjectScreenshot | undefined;
  let imgCol3Bottom: ProjectScreenshot | undefined;
  let extraImages: ProjectScreenshot[] = [];

  if (hasExplicitSlots) {
    imgCol1Top = gallery.find((g) => g.slot === "col1-top");
    imgCol1BottomWide = gallery.find((g) => g.slot === "col1-bottom");
    imgCol1BottomLeft = gallery.find((g) => g.slot === "col1-bottom-left");
    imgCol1BottomRight = gallery.find((g) => g.slot === "col1-bottom-right");
    imgCol2Top = gallery.find((g) => g.slot === "col2-top");
    imgCol2Bottom = gallery.find((g) => g.slot === "col2-bottom");
    imgCol3Top = gallery.find((g) => g.slot === "col3-top");
    imgCol3Bottom = gallery.find((g) => g.slot === "col3-bottom");

    // Any items without an assigned slot go to extraImages
    const assignedSrcs = new Set(
      [
        imgCol1Top,
        imgCol1BottomWide,
        imgCol1BottomLeft,
        imgCol1BottomRight,
        imgCol2Top,
        imgCol2Bottom,
        imgCol3Top,
        imgCol3Bottom,
      ]
        .filter(Boolean)
        .map((g) => g!.src)
    );
    extraImages = gallery.filter((g) => !assignedSrcs.has(g.src));
  } else {
    // Smart auto-distribution
    const assigned = new Set<string>();

    imgCol1Top =
      gallery.find((g) => g.src.includes("desktop") || g.src.includes("landing")) || gallery[0];
    if (imgCol1Top) assigned.add(imgCol1Top.src);

    const img3Mobile = gallery.find((g) => g.type === "mobile" && !assigned.has(g.src));
    if (img3Mobile) assigned.add(img3Mobile.src);

    const img5Modal = gallery.find(
      (g) =>
        !assigned.has(g.src) &&
        (g.src.includes("modal") ||
          g.src.includes("auth") ||
          (g.width && g.height && Math.abs(g.width / g.height - 1) < 0.25))
    );
    if (img5Modal) assigned.add(img5Modal.src);

    const img4Tall = gallery.find(
      (g) =>
        !assigned.has(g.src) &&
        (g.src.includes("form") ||
          g.src.includes("feedback") ||
          (g.height && g.width && g.height > g.width))
    );
    if (img4Tall) assigned.add(img4Tall.src);

    const pool = gallery.filter((g) => !assigned.has(g.src));

    imgCol2Top = pool.shift();
    imgCol3Top = img3Mobile || pool.shift();
    imgCol2Bottom = img4Tall || pool.shift();
    imgCol1BottomLeft = img5Modal || pool.shift();
    imgCol3Bottom = pool.shift();
    imgCol1BottomRight = pool.shift();
    extraImages = pool;
  }

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
        CUSTOMIZABLE PURE IMAGE BENTO GALLERY
        Every box is 100% image filled edge-to-edge. No text explanations.
        - Column 1: 6 cols (Top: Primary Desktop | Bottom: Wide Banner OR Split Left/Right)
        - Column 2: 3 cols (Top: Box 2 | Bottom: Box 4)
        - Column 3: 3 cols (Top: Box 3 | Bottom: Box 6)
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* =======================================================
            COLUMN 1 (WIDE LEFT: 6 COLS)
            Top: Primary UI (Wide Landscape)
            Bottom: Either Wide Banner (e.g. Carousel) OR Split Left/Right
           ======================================================= */}
        <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-5">
          {/* Col 1 Top Box */}
          {imgCol1Top && (
            <div
              onClick={() => setActiveLightbox(imgCol1Top)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)] w-full"
              style={getBoxAspectStyle(imgCol1Top, "1894 / 917")}
            >
              <Image
                src={imgCol1Top.src}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Col 1 Bottom Wide Box (e.g. Calowry Product Carousel) */}
          {imgCol1BottomWide && (
            <div
              onClick={() => setActiveLightbox(imgCol1BottomWide)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)] w-full"
              style={getBoxAspectStyle(imgCol1BottomWide, "1837 / 796")}
            >
              <Image
                src={imgCol1BottomWide.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {/* Col 1 Bottom Split Row (when project has two smaller items like SabaiHealth) */}
          {(imgCol1BottomLeft || imgCol1BottomRight) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              {imgCol1BottomLeft && (
                <div
                  onClick={() => setActiveLightbox(imgCol1BottomLeft)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full ${
                    !imgCol1BottomRight ? "sm:col-span-2" : ""
                  }`}
                  style={getBoxAspectStyle(imgCol1BottomLeft, "1 / 1")}
                >
                  <Image
                    src={imgCol1BottomLeft.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
                </div>
              )}

              {imgCol1BottomRight && (
                <div
                  onClick={() => setActiveLightbox(imgCol1BottomRight)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
                  style={getBoxAspectStyle(imgCol1BottomRight, "16 / 9")}
                >
                  <Image
                    src={imgCol1BottomRight.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* =======================================================
            COLUMN 2 (MIDDLE: 3 COLS)
            Top: Image 2
            Bottom: Image 4
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {imgCol2Top && (
            <div
              onClick={() => setActiveLightbox(imgCol2Top)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(imgCol2Top, "16 / 9")}
            >
              <Image
                src={imgCol2Top.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {imgCol2Bottom && (
            <div
              onClick={() => setActiveLightbox(imgCol2Bottom)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(imgCol2Bottom, "495 / 709")}
            >
              <Image
                src={imgCol2Bottom.src}
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
            Top: Image 3
            Bottom: Image 6
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {imgCol3Top && (
            <div
              onClick={() => setActiveLightbox(imgCol3Top)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(imgCol3Top, "820 / 1600")}
            >
              <Image
                src={imgCol3Top.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
          )}

          {imgCol3Bottom && (
            <div
              onClick={() => setActiveLightbox(imgCol3Bottom)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md w-full"
              style={getBoxAspectStyle(imgCol3Bottom, "16 / 9")}
            >
              <Image
                src={imgCol3Bottom.src}
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

      {/* Optional extra images row if project has additional screenshots */}
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
