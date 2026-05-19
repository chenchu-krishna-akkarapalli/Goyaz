import Image from "next/image";
import { ScrollRevealWrapper } from "../utils/animations";

const HERO_IMAGE = "/images/sections/collections/hero-collection.avif";
const HERO_TAGLINE = "TRUST | Quality | Premium";

interface CollectionHeroBannerProps {
  /** Large serif headline on the left */
  headline: string;
  /** Short body copy below the headline */
  description: string;
  /** Alt text for the background image */
  imageAlt?: string;
}

/**
 * CollectionHeroBanner
 * Full-bleed 319 px hero banner shared by the collections index and every
 * category page. Accepts dynamic headline + description; tagline and
 * background image are fixed per the Figma spec (node 399:484).
 */
export function CollectionHeroBanner({
  headline,
  description,
  imageAlt = "Collection hero",
}: CollectionHeroBannerProps) {
  return (
    <div className="relative w-full h-[200px] md:h-[260px] lg:h-[319px] overflow-hidden">
      {/* Background image — full-bleed */}
      <Image
        src={HERO_IMAGE}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Subtle dark tint for legibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Mobile/tablet: centred stacked layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <ScrollRevealWrapper variant="up" delay={120}>
          <p className="font-display text-white text-[22px] md:text-[30px] leading-tight">
            {headline}
          </p>
        </ScrollRevealWrapper>
        <ScrollRevealWrapper variant="fade" delay={260}>
          <p className="font-sans text-white text-[11px] md:text-[13px] leading-[1.55] max-w-[420px]">
            {description}
          </p>
        </ScrollRevealWrapper>
      </div>

      {/* Desktop: original absolute layout */}
      <div className="hidden lg:block absolute inset-0 layout-container">
        <div className="layout-inner h-full relative">
          <div className="absolute left-0 top-[120px] w-[523px] flex flex-col gap-[12px] items-center text-center">
            <ScrollRevealWrapper variant="up" delay={120}>
              <p className="font-display text-white text-[40px] leading-[1.241] whitespace-nowrap">
                {headline}
              </p>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper variant="fade" delay={260}>
              <p className="font-sans text-white text-[12px] leading-[1.55] w-[447px]">
                {description}
              </p>
            </ScrollRevealWrapper>
          </div>
          <ScrollRevealWrapper
            variant="right"
            delay={320}
            className="absolute right-[40px] top-[222px]"
          >
            <p className="font-sans text-white text-[20px] tracking-[2px] text-center w-[278px]">
              {HERO_TAGLINE}
            </p>
          </ScrollRevealWrapper>
        </div>
      </div>
    </div>
  );
}
