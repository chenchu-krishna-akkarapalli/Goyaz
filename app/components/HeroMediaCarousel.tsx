"use client";

import { useEffect, useMemo, useState } from "react";

type HeroMediaCarouselProps = {
  imageSources: readonly string[];
};

export function HeroMediaCarousel({ imageSources }: HeroMediaCarouselProps) {
  const slides = useMemo(() => ["video", ...imageSources] as const, [imageSources]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStarted(true);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    const autoplay = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(autoplay);
    };
  }, [slides.length, started]);

  function handleIndicatorClick(index: number) {
    setStarted(true);
    setCurrentIndex(index);
  }

  return (
    <>
      <div className="hero-sequence absolute inset-0 z-0 overflow-hidden">
        <div
          className="hero-sequence-track flex h-full w-full transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="hero-sequence-slide h-full w-full flex-shrink-0">
            <video autoPlay className="h-full w-full object-cover" loop muted playsInline>
              <source src="/goyaz-landing-video.mp4" type="video/mp4" />
            </video>
          </div>

          {imageSources.map((imageSrc) => (
            <div className="hero-sequence-slide h-full w-full flex-shrink-0" key={imageSrc}>
              <img alt="Goyaz hero collection" className="h-full w-full object-cover" src={imageSrc}  loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

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
