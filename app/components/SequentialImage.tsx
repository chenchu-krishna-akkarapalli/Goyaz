"use client";

import { useEffect, useRef, useState } from "react";

type SequentialImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** Set true for above-the-fold images — loads eagerly with fetchPriority=high */
  priority?: boolean;
  /**
   * If true (default), the image waits until it enters the viewport AND any
   * sibling SequentialImages above it have finished loading. This avoids
   * 50+ images racing the browser's connection pool on a single paint.
   */
  sequential?: boolean;
  /** Stagger between sequential images (ms). Default 80 ms keeps it snappy. */
  staggerMs?: number;
  /** ms after intersection before src is set (override per-image) */
  delayMs?: number;
  onLoad?: () => void;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  draggable?: boolean;
};

/**
 * SequentialImage
 *
 * Loads images one-after-the-other with a graceful fade-in once each finishes.
 * Big lists (marquees, grids, slider rails) call the network in waves instead
 * of all at once — keeps the main thread responsive and lets the LCP image
 * win the bandwidth race.
 *
 *   • `priority` skips the queue and sets fetchPriority="high" + eager.
 *   • Below-the-fold images wait for IntersectionObserver before requesting.
 *   • A shared head-counter (per page) sequences the network requests so
 *     they don't all fire on the same frame.
 */

// Module-level counter — every non-priority instance increments it so they
// each get a unique 80 ms (default) offset. Resets to 0 on hard reload.
let queuePosition = 0;
function nextSlot() {
  return queuePosition++;
}

export function SequentialImage({
  src,
  alt,
  className = "",
  style,
  priority = false,
  sequential = true,
  staggerMs = 80,
  delayMs,
  onLoad,
  onError,
  draggable,
}: SequentialImageProps) {
  const ref = useRef<HTMLImageElement | null>(null);
  const slotRef = useRef<number | null>(null);
  const [active, setActive] = useState(priority);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (priority) return;
    if (slotRef.current === null) slotRef.current = sequential ? nextSlot() : 0;

    const el = ref.current;
    if (!el) return;

    const start = () => {
      const offset = delayMs ?? slotRef.current! * staggerMs;
      const t = window.setTimeout(() => setActive(true), offset);
      return () => window.clearTimeout(t);
    };

    // Already in view at mount? trigger immediately.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight + 200 && rect.bottom > -200;
    if (inView) {
      const cleanup = start();
      return cleanup;
    }

    // Otherwise wait for it to scroll close to the viewport.
    let cleanup: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cleanup = start();
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cleanup?.();
    };
  }, [priority, sequential, staggerMs, delayMs]);

  return (
    <img
      ref={ref}
      alt={alt}
      src={active ? src : undefined}
      data-src={src}
      onLoad={() => {
        setLoaded(true);
        onLoad?.();
      }}
      onError={onError}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={draggable}
      className={`seq-img ${loaded ? "is-loaded" : ""} ${className}`}
      style={style}
    />
  );
}
