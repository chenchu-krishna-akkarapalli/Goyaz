'use client';
import { useState } from "react";
import {
  MASTERPIECES_IN_SILVER_ICON_LEFT,
  MASTERPIECES_IN_SILVER_ICON_RIGHT,
  MASTERPIECES_PRODUCTS,
} from "../data/masterpiecesInSilver";
import { ScrollRevealWrapper, ANIMATION_CLASSES } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";
import { SequentialImage } from "../components/SequentialImage";

export function MasterpiecesInSilverSection() {
  const iconLeft = MASTERPIECES_IN_SILVER_ICON_LEFT;
  const iconRight = MASTERPIECES_IN_SILVER_ICON_RIGHT;
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? MASTERPIECES_PRODUCTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === MASTERPIECES_PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  const currentProduct = MASTERPIECES_PRODUCTS[currentIndex];

  return (
    <section className="flex flex-col gap-[40px] items-center w-full" data-mfe="section">
      <SectionHeading {...SECTION_HEADINGS.masterpiecesInSilver} />
      <ScrollRevealWrapper className="flex gap-[32px] md:gap-[80px] lg:gap-[144px] items-center w-full" delay={200}>
        <div
          onClick={handlePrev}
          className="bg-white rounded-[56px] flex-shrink-0 w-[44px] h-[44px] lg:w-[56px] lg:h-[56px] flex items-center justify-center shadow-[-1px_-1px_2px_rgba(0,0,0,0.25)] cursor-pointer transition-transform duration-300 hover:scale-110"
        >
          <img alt="Previous" className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]" src={iconLeft}  loading="lazy" decoding="async" />
        </div>

        <div className="flex-1 min-w-0 relative flex justify-center overflow-hidden h-[340px] sm:h-[500px] lg:h-[560px]">
          <div className="flex flex-col gap-[10px] items-center w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[426px] absolute top-1/2 -translate-y-1/2">
            <div className={`relative w-full aspect-square overflow-hidden rounded-[30px] ${ANIMATION_CLASSES.hoverZoomBase}`}>
              <SequentialImage
                key={currentProduct.id}
                alt={currentProduct.title}
                className={`absolute inset-0 object-cover w-full h-full rounded-[30px] animate-[fade_0.4s_ease-in-out] ${ANIMATION_CLASSES.hoverZoomImg}`}
                src={currentProduct.image}
                sequential={false}
              />
            </div>
            <div className="font-sans flex flex-col gap-[10px] items-center text-black w-full max-w-[240px]">
              <p className="text-[16px] text-center uppercase leading-[96.8%] h-[32px] flex items-center justify-center">{currentProduct.title}</p>
              <div className="flex gap-[5px] items-center text-[14px] whitespace-nowrap">
                <span>starting from</span>
                <span>{currentProduct.price}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={handleNext}
          className="bg-white rounded-[56px] flex-shrink-0 w-[44px] h-[44px] lg:w-[56px] lg:h-[56px] flex items-center justify-center shadow-[1px_-1px_2px_rgba(0,0,0,0.25)] cursor-pointer transition-transform duration-300 hover:scale-110"
        >
          <img alt="Next" className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]" src={iconRight}  loading="lazy" decoding="async" />
        </div>
      </ScrollRevealWrapper>
    </section>
  );
}
