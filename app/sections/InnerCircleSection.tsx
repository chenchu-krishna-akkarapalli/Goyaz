"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import {
  INNER_CIRCLE_CARDS,
  INNER_CIRCLE_CTA_LABEL,
  INNER_CIRCLE_FRAME47,
  INNER_CIRCLE_FRAME130,
  INNER_CIRCLE_FRAME60,
  INNER_CIRCLE_HEADING_1,
  INNER_CIRCLE_SUBHEADING_1,
  INNER_CIRCLE_HEADING_2,
  INNER_CIRCLE_SUBHEADING_2,
  INNER_CIRCLE_HEADING_3,
  INNER_CIRCLE_SUBHEADING_3,
  INNER_CIRCLE_SLIDER,
} from "../data/innerCircle";
import { ScrollRevealWrapper, ANIMATION_CLASSES, DirectionalReveal } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";

type DragState = {
  pointerId: number;
  trackLeft: number;
  trackWidth: number;
  thumbWidth: number;
};

function InnerCircleCardPanel({ startIndex = 0 }: { startIndex?: number }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [thumbLeft, setThumbLeft] = useState(4.5);


  const cards = useMemo(() => {
    return [...INNER_CIRCLE_CARDS.slice(startIndex), ...INNER_CIRCLE_CARDS.slice(0, startIndex)];
  }, [startIndex]);

  const syncThumbToScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxThumbLeft = Math.max(0, INNER_CIRCLE_SLIDER.trackWidth - INNER_CIRCLE_SLIDER.thumbWidth - 9);

    if (maxScroll === 0) {
      setThumbLeft(4.5);
      return;
    }

    const ratio = viewport.scrollLeft / maxScroll;
    setThumbLeft(4.5 + maxThumbLeft * ratio);
  };

  const syncScrollToPointer = (clientX: number) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;
    if (!viewport || !dragState) {
      return;
    }

    const maxThumbLeft = Math.max(0, dragState.trackWidth - dragState.thumbWidth - 9);
    if (maxThumbLeft === 0) {
      return;
    }

    const localX = clientX - dragState.trackLeft;
    const boundedX = Math.max(4.5, Math.min(4.5 + maxThumbLeft, localX - dragState.thumbWidth / 2));
    setThumbLeft(boundedX);

    const ratio = (boundedX - 4.5) / maxThumbLeft;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    viewport.scrollTo({ left: maxScroll * ratio, behavior: "auto" });
  };

  const onTrackPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!trackRef.current) {
      return;
    }

    const rect = trackRef.current.getBoundingClientRect();
    dragStateRef.current = {
      pointerId: event.pointerId,
      trackLeft: rect.left,
      trackWidth: rect.width,
      thumbWidth: INNER_CIRCLE_SLIDER.thumbWidth,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    syncScrollToPointer(event.clientX);
  };

  const onTrackPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }
    syncScrollToPointer(event.clientX);
  };

  const endTrackDrag: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }
    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="bg-white w-full lg:w-[400px] lg:flex-shrink-0 lg:relative lg:overflow-hidden lg:h-[640px]">
      <div className="flex flex-col gap-[34px] items-center w-full px-6 py-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[300px] lg:px-0 lg:py-0">
        <div className="flex flex-col gap-[40px] items-center w-full">
          <div
            ref={viewportRef}
            className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            onScroll={syncThumbToScroll}
          >
            <div className="flex w-max">
              {cards.map((card, index) => (
                <div key={`${card.title}-${index}`} className={`flex-shrink-0 w-[300px] flex flex-col gap-[10px] items-center snap-start ${ANIMATION_CLASSES.hoverZoomBase}`}>
                  <div className="h-[300px] relative w-full rounded-[30px] overflow-hidden">
                    <img alt="" className={`absolute inset-0 object-cover w-full h-full rounded-[30px] ${ANIMATION_CLASSES.hoverZoomImg}`} src={card.imageSrc} draggable={false}  loading="lazy" decoding="async" />
                  </div>
                  <div style={{ fontFamily: "'Futura PT', sans-serif" }} className="flex flex-col gap-[10px] items-center text-black w-[240px]">
                    <p className="text-[16px] text-center uppercase leading-[96.8%]">{card.title}</p>
                    <div className="flex gap-[5px] items-center text-[14px] whitespace-nowrap">
                      <span>starting from</span>
                      <span>{card.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={trackRef}
            className="relative h-[11px] rounded-[5px] overflow-hidden cursor-grab active:cursor-grabbing touch-none"
            style={{ width: INNER_CIRCLE_SLIDER.trackWidth, maxWidth: '100%' }}
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={endTrackDrag}
            onPointerCancel={endTrackDrag}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-white rounded-[5px] pointer-events-none" />
            <div
              className="absolute top-1/2 -translate-y-1/2 bg-[#002f00] h-[5px] rounded-[2.5px] shadow-[-2px_2px_4px_0px_rgba(255,255,255,0.25)]"
              style={{ left: thumbLeft, width: INNER_CIRCLE_SLIDER.thumbWidth }}
            />
            <div className="absolute inset-0 pointer-events-none rounded-[5px] shadow-[inset_2px_-2px_4px_0px_rgba(0,0,0,0.25)]" />
          </div>
        </div>

        <Link href="/collections" className="bg-white border border-black flex items-center px-[40px] py-[18px] cursor-pointer transition-all duration-300 hover:bg-black hover:text-white group">
          <span style={{ fontFamily: "'Futura PT', sans-serif" }} className="text-[24px] text-black group-hover:text-white whitespace-nowrap">{INNER_CIRCLE_CTA_LABEL}</span>
        </Link>
      </div>
    </div>
  );
}

export function InnerCircleSection() {
  const frame47 = INNER_CIRCLE_FRAME47;
  const frame130 = INNER_CIRCLE_FRAME130;
  const frame60 = INNER_CIRCLE_FRAME60;
  return (
    <>
      <section className="flex flex-col gap-[40px] items-center w-full" data-mfe="section">
        <SectionHeading {...SECTION_HEADINGS.innerCircle} />
        {/* Row 1 — flipped green image LEFT, card panel RIGHT */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full overflow-hidden">
          <DirectionalReveal direction="left" className="w-full lg:flex-shrink-0">
            <div style={{ transform: "scaleY(-1) rotate(180deg)" }}>
              <div className="h-[240px] sm:h-[360px] lg:h-[640px] w-full lg:w-[960px] overflow-hidden relative">
                <img alt="" className="absolute inset-0 object-cover w-full h-full" src={frame47}  loading="lazy" decoding="async" />
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-[90%] lg:w-[477px]" style={{ top: "calc(50% + 83px)" }}>
                  <p style={{ fontFamily: "'House of Montague', serif", transform: "scaleY(-1) rotate(180deg)" }} className="text-[20px] lg:text-[32px] text-[#013809] text-center w-full">
                    {INNER_CIRCLE_HEADING_1}
                  </p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-[90%] lg:w-[477px]" style={{ top: "calc(50% + 165px)" }}>
                  <p style={{ fontFamily: "'Futura PT', sans-serif", transform: "scaleY(-1) rotate(180deg)" }} className="text-[13px] lg:text-[16px] text-[#007311] text-center w-full">
                    {INNER_CIRCLE_SUBHEADING_1}
                  </p>
                </div>
              </div>
            </div>
          </DirectionalReveal>

          <DirectionalReveal direction="right" className="w-full">
            <InnerCircleCardPanel startIndex={0} />
          </DirectionalReveal>
        </div>

        {/* Row 2 — card panel LEFT, image RIGHT */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between w-full overflow-hidden">
          <DirectionalReveal direction="left" className="w-full">
            <InnerCircleCardPanel startIndex={2} />
          </DirectionalReveal>

          <DirectionalReveal direction="right" className="w-full lg:flex-shrink-0">
            <div className="h-[240px] sm:h-[360px] lg:h-[640px] w-full lg:w-[960px] relative overflow-hidden">
              <img alt="" className="absolute inset-0 object-cover w-full h-full" src={frame130}  loading="lazy" decoding="async" />
              <p style={{ fontFamily: "'House of Montague', serif", left: "calc(50% - 218.5px)", top: "calc(50% - 188px)" }} className="absolute text-[20px] lg:text-[32px] text-center text-white w-[90%] lg:w-[477px] -translate-x-1/2">
                {INNER_CIRCLE_HEADING_2}
              </p>
              <p style={{ fontFamily: "'Futura PT', sans-serif", left: "calc(50% - 218.5px)", top: "calc(50% - 106px)" }} className="absolute text-[13px] lg:text-[16px] text-center text-white w-[90%] lg:w-[477px] -translate-x-1/2">
                {INNER_CIRCLE_SUBHEADING_2}
              </p>
            </div>
          </DirectionalReveal>
        </div>
      </section>

      {/* Full-width banner — slides up from below */}
      <ScrollRevealWrapper className="w-full h-[300px] sm:h-[440px] lg:h-[660px] relative overflow-hidden rounded-none" delay={200}>
        <img alt="" className="absolute inset-0 object-cover w-full h-full pointer-events-none" src={frame60}  loading="lazy" decoding="async" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
          <p style={{ fontFamily: "'House of Montague', serif" }} className="text-[22px] lg:text-[32px] text-center text-white w-full max-w-[477px]">
            {INNER_CIRCLE_HEADING_3}
          </p>
          <p style={{ fontFamily: "'Futura PT', sans-serif" }} className="text-[13px] lg:text-[16px] text-center text-white w-full max-w-[477px]">
            {INNER_CIRCLE_SUBHEADING_3}
          </p>
          <Link href="/collections" className="mt-2 bg-white border border-black flex items-center px-[24px] py-[12px] lg:px-[40px] lg:py-[18px] cursor-pointer transition-all duration-300 hover:bg-black hover:text-white group">
            <span style={{ fontFamily: "'Futura PT', sans-serif" }} className="text-[16px] lg:text-[24px] text-black group-hover:text-white whitespace-nowrap">{INNER_CIRCLE_CTA_LABEL}</span>
          </Link>
        </div>
      </ScrollRevealWrapper>
    </>
  );
}
