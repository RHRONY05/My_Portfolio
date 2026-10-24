"use client";

import React, { useState, useEffect, useRef } from "react";

interface UseInViewOptions {
  rootMargin?: string;
  requireScroll?: boolean;
  sessionKey?: string;
}

// Module-level cache keeping track of components mounted during current session
const sessionMountedCache = new Set<string>();

export function useInView(options?: UseInViewOptions) {
  const sessionKey = options?.sessionKey;
  const alreadyMounted = sessionKey ? sessionMountedCache.has(sessionKey) : false;
  const [isInView, setIsInView] = useState(alreadyMounted);
  const ref = useRef<HTMLDivElement>(null);
  const rootMargin = options?.rootMargin || "300px 0px";
  const requireScroll = options?.requireScroll ?? true;

  useEffect(() => {
    if (isInView) {
      if (sessionKey) sessionMountedCache.add(sessionKey);
      return;
    }

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
      if (sessionKey) sessionMountedCache.add(sessionKey);
      return;
    }

    const checkMount = (isIntersecting: boolean) => {
      if (isIntersecting && scrolled) {
        setIsInView(true);
        if (sessionKey) sessionMountedCache.add(sessionKey);
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
  sessionKey?: string;
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
  sessionKey,
}: LazyViewportMountProps) {
  const { ref, isInView } = useInView({ rootMargin, requireScroll, sessionKey });

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
