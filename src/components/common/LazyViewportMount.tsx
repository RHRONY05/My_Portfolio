"use client";

import React, { useState, useEffect, useRef } from "react";

interface UseInViewOptions {
  rootMargin?: string;
  requireScroll?: boolean;
}

export function useInView(options?: UseInViewOptions) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rootMargin = options?.rootMargin || "300px 0px";
  const requireScroll = options?.requireScroll ?? true;

  useEffect(() => {
    if (isInView) return;

    // If navigated directly via hash anchor (#about, #skills, etc.), mount immediately
    const hasHash =
      typeof window !== "undefined" &&
      window.location.hash &&
      window.location.hash !== "#hero";

    let scrolled = hasHash || !requireScroll;

    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const checkMount = (isIntersecting: boolean) => {
      if (isIntersecting && scrolled) {
        setIsInView(true);
        observer.disconnect();
      }
    };

    let intersecting = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        checkMount(intersecting);
      },
      { rootMargin }
    );

    observer.observe(el);

    const onScrollOrTouch = () => {
      scrolled = true;
      checkMount(intersecting);
      window.removeEventListener("scroll", onScrollOrTouch);
      window.removeEventListener("touchstart", onScrollOrTouch);
    };

    if (!scrolled) {
      window.addEventListener("scroll", onScrollOrTouch, { passive: true });
      window.addEventListener("touchstart", onScrollOrTouch, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrTouch);
      window.removeEventListener("touchstart", onScrollOrTouch);
    };
  }, [isInView, rootMargin, requireScroll]);

  return { ref, isInView };
}

interface LazyViewportMountProps {
  children: React.ReactNode | (() => React.ReactNode);
  fallback?: React.ReactNode;
  rootMargin?: string;
  requireScroll?: boolean;
  className?: string;
}

/**
 * Defers mounting heavy WebGL / 3D Canvases until the user scrolls within proximity.
 * When passed a render function `() => <CanvasComponent />`, it guarantees that Next.js dynamic()
 * imports are NOT evaluated during initial page hydration, dropping TBT to near zero.
 */
export function LazyViewportMount({
  children,
  fallback = null,
  rootMargin = "300px 0px",
  requireScroll = true,
  className = "",
}: LazyViewportMountProps) {
  const { ref, isInView } = useInView({ rootMargin, requireScroll });

  return (
    <div ref={ref} className={className}>
      {isInView
        ? typeof children === "function"
          ? (children as () => React.ReactNode)()
          : children
        : fallback}
    </div>
  );
}
