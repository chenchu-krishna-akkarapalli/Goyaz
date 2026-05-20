"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * LenisProvider
 *
 * Wraps the app in a single Lenis instance for buttery-smooth wheel/touch
 * scrolling. Respects the OS reduced-motion preference (bails out cleanly).
 *
 * Horizontal scrollers and any nested overflow areas can opt out by setting
 * `data-lenis-prevent` on the scrolling element — Lenis will leave them
 * to the browser's native scroll.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced-motion: no smooth-scroll lib at all.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      // ~1.1s cinematic glide; matches the brand's 2000ms reveal cadence
      duration: 1.1,
      // Industry-standard expo-out
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // Anchor-link clicks still work natively
      anchors: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    }
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
