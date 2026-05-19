"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MasterpieceNormalCard } from "../components/cards/MasterpieceNormalCard";
import { MasterpieceWideCard } from "../components/cards/MasterpieceWideCard";
import {
  MASTERPIECE_CATEGORIES,
  MASTERPIECE_LINE_IMAGE,
  MASTERPIECE_PRODUCTS,
} from "../data/masterpieces";
import { ScrollRevealWrapper, StaggerRevealList } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";

export function MasterpiecesForEveryOccasionSection() {
  const [selectedCategory, setSelectedCategory] = useState(MASTERPIECE_CATEGORIES[0]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [trackWidth, setTrackWidth] = useState(846);
  const [thumbWidth, setThumbWidth] = useState(78);

  useEffect(() => {
    const updateMetrics = () => {
      const scroller = scrollRef.current;
      const track = trackRef.current;
      if (!scroller || !track) {
        return;
      }

      const nextMaxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      const nextTrackWidth = track.clientWidth;
      const visibleRatio = scroller.scrollWidth > 0 ? scroller.clientWidth / scroller.scrollWidth : 1;
      const nextThumbWidth = Math.max(78, Math.round(nextTrackWidth * visibleRatio));

      setMaxScrollLeft(nextMaxScrollLeft);
      setTrackWidth(nextTrackWidth);
      setThumbWidth(Math.min(nextThumbWidth, nextTrackWidth));
      setScrollLeft(scroller.scrollLeft);
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    const scroller = scrollRef.current;
    scroller?.addEventListener("scroll", updateMetrics, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMetrics);
      scroller?.removeEventListener("scroll", updateMetrics);
    };
  }, []);

  const maxThumbOffset = useMemo(() => Math.max(0, trackWidth - thumbWidth), [trackWidth, thumbWidth]);
  const thumbOffset = useMemo(() => {
    if (maxScrollLeft <= 0 || maxThumbOffset <= 0) {
      return 0;
    }
    return (scrollLeft / maxScrollLeft) * maxThumbOffset;
  }, [maxScrollLeft, maxThumbOffset, scrollLeft]);

  const scrollToThumbOffset = (nextThumbOffset: number) => {
    const scroller = scrollRef.current;
    if (!scroller || maxThumbOffset <= 0 || maxScrollLeft <= 0) {
      return;
    }

    const clampedOffset = Math.min(maxThumbOffset, Math.max(0, nextThumbOffset));
    const nextScrollLeft = (clampedOffset / maxThumbOffset) * maxScrollLeft;
    scroller.scrollLeft = nextScrollLeft;
    setScrollLeft(nextScrollLeft);
  };

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const pointerOffset = event.clientX - rect.left;
    scrollToThumbOffset(pointerOffset - thumbWidth / 2);
  };

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;

    const startX = event.clientX;
    const startOffset = thumbOffset;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!draggingRef.current) {
        return;
      }
      const delta = moveEvent.clientX - startX;
      scrollToThumbOffset(startOffset + delta);
    };

    const stopDragging = () => {
      draggingRef.current = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
  };

  return (
    <section className="flex flex-col gap-[40px] items-start w-full" data-mfe="section">
      <SectionHeading
        left={SECTION_HEADINGS.masterpiecesForEveryOccasion.left}
        delay={200}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full z-10 overflow-hidden gap-3 sm:gap-0 px-4"
        rightSlot={
          <div className="flex gap-[20px] lg:gap-[40px] items-start overflow-x-auto [scrollbar-width:none] pb-1">
            {MASTERPIECE_CATEGORIES.map((category) => (
              <div
                key={category}
                className="flex flex-col gap-[5px] items-center w-[54px] flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <span
                  style={{ fontFamily: "'Futura PT', sans-serif" }}
                  className={`text-[16px] text-black uppercase leading-[81.7%] w-full ${selectedCategory === category ? "font-bold" : "font-medium"}`}
                >
                  {category}
                </span>
                <div className="relative h-px w-full">
                  {selectedCategory === category && (
                    <img alt="" className="block h-full w-full" src={MASTERPIECE_LINE_IMAGE} loading="lazy" decoding="async" />
                  )}
                </div>
                <span
                  style={{ fontFamily: "'Futura PT', sans-serif" }}
                  className="text-[8px] text-black text-center tracking-[0.32px] font-medium w-full"
                >
                  {selectedCategory === category ? "SEE ALL" : ""}
                </span>
              </div>
            ))}
          </div>
        }
      />

      <div className="flex flex-col gap-[40px] items-center w-full">
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <StaggerRevealList staggerMs={400} className="flex flex-nowrap gap-[20px] items-start w-max min-w-full" childClassName="flex-shrink-0">
            {MASTERPIECE_PRODUCTS.filter((p) => p.category === selectedCategory).map((product) =>
              product.size === "wide" ? (
                <MasterpieceWideCard
                  key={product.id}
                  imageSrc={product.imageSrc}
                  title={product.title}
                  price={product.price}
                />
              ) : (
                <MasterpieceNormalCard
                  key={product.id}
                  imageSrc={product.imageSrc}
                  title={product.title}
                  price={product.price}
                />
              )
            )}
          </StaggerRevealList>
        </div>
        {/* slider dragger */}
        <div
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          className="relative h-[11px] rounded-[5.5px] w-full max-w-[846px] flex-shrink-0 overflow-hidden cursor-pointer"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-white rounded-[5.5px] pointer-events-none" />
          <div
            role="slider"
            aria-label="Masterpieces horizontal scroll"
            aria-valuemin={0}
            aria-valuemax={Math.round(maxScrollLeft)}
            aria-valuenow={Math.round(scrollLeft)}
            onPointerDown={handleThumbPointerDown}
            className="absolute top-1/2 -translate-y-1/2 bg-[#002f00] h-[5px] rounded-[2.5px] shadow-[-2px_2px_4px_0px_rgba(255,255,255,0.25)] cursor-grab active:cursor-grabbing"
            style={{ left: `${thumbOffset}px`, width: `${thumbWidth}px` }}
          />
          <div className="absolute inset-0 pointer-events-none rounded-[5.5px] shadow-[inset_2px_-2px_4px_0px_rgba(0,0,0,0.25)]" />
        </div>
      </div>
    </section>
  );
}
