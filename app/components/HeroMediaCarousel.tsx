"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HeroMediaCarouselProps = {
  imageSources: readonly string[];
};

/**
 * HeroMediaCarousel
 *
 * Above-the-fold hero slider — first slide is the brand video, the rest
 * are still images. Performance optimisations baked in:
 *
 *   • Video: preload="metadata" + muted + playsInline + poster (uses the
 *     first hero image as the poster so the user never sees a black flash
 *     while metadata loads on slow connections).
 *   • Track: translate3d + will-change so the 2 s cross-fade rides the
 *     GPU compositor instead of the CPU.
 *   • Images: first image is eager + fetchPriority="high" (LCP candidate
 *     when the video is suppressed by data-saver / reduced-motion); the
 *     rest are deferred until the slide is about to be shown.
 *   • Visibility: when the slide is off-screen for a while we pause the
 *     video to save battery + bandwidth.
 */
export function HeroMediaCarousel({ imageSources }: HeroMediaCarouselProps) {
  const slides = useMemo(() => ["video", ...imageSources] as const, [imageSources]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* Initial 5 s dwell on the video before autoplay rotation begins */
  useEffect(() => {
    const timer = window.setTimeout(() => setStarted(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  /* Autoplay rotation */
  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides.length, started]);

  /* Pause the video when the hero scrolls out of view */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !videoRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function handleIndicatorClick(index: number) {
    setStarted(true);
    setCurrentIndex(index);
  }

  /* Use the first still as the video poster — same domain, already AVIF */
  const posterSrc = imageSources[0];

  return (
    <>
      <div ref={containerRef} className="hero-sequence absolute inset-0 z-0 overflow-hidden">
        <div
          className="hero-sequence-track gpu-layer flex h-full w-full transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
        >
          {/* ── Slide 0: video ── */}
          <div className="hero-sequence-slide h-full w-full flex-shrink-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={posterSrc}
              className="h-full w-full object-cover gpu-layer"
            >
              <source src="/goyaz-landing-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* ── Slide N: stills — first one eager (LCP), rest lazy ── */}
          {imageSources.map((imageSrc, i) => (
            <div className="hero-sequence-slide h-full w-full flex-shrink-0" key={imageSrc}>
              <img
                alt="Goyaz hero collection"
                className="h-full w-full object-cover gpu-layer"
                src={imageSrc}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicator pills */}
      <div className="absolute bottom-[34px] left-1/2 z-20 flex -translate-x-1/2 items-center justify-center rounded-full bg-black/12 px-[14px] py-[8px] backdrop-blur-[1px]">
        <div className="flex items-center gap-[8px]">
          {slides.map((_, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                aria-label={`Go to slide ${index + 1}`}
                className={`h-[8px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-[20px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    : "w-[8px] bg-white/85"
                }`}
                key={index}
                onClick={() => handleIndicatorClick(index)}
                type="button"
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
