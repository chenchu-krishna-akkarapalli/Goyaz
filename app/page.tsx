import { MasterpiecesForEveryOccasionSection } from "./sections/MasterpiecesForEveryOccasionSection";
import { InnerCircleSection } from "./sections/InnerCircleSection";
import { CurrentObsessionsSection } from "./sections/CurrentObsessionsSection";
import { MasterpiecesInSilverSection } from "./sections/MasterpiecesInSilverSection";
import { SpottedInGoyazSection } from "./sections/SpottedInGoyazSection";
import { BrandStorySection } from "./sections/BrandStorySection";
import { OurSocialSection } from "./sections/OurSocialSection";
import { HeroMediaCarousel } from "./components/HeroMediaCarousel";
import { HERO_SCROLL_IMAGES } from "./data/hero";
import { ScrollRevealWrapper } from "./utils/animations";
import { ScrollIndicator } from "./components/ScrollIndicator";

export default function Home() {
  return (
    <div className="bg-white relative w-full overflow-x-hidden">


      {/* Hero Section */}
      <div className="relative h-[100svh] lg:h-[840px] w-full overflow-hidden">
        {/* Ambient media background slider */}
        <HeroMediaCarousel imageSources={HERO_SCROLL_IMAGES} />

        {/* Exquisite dark vignette layer for luxury depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/65 z-[1] pointer-events-none select-none" />

        {/* Magazine-style layered hero content */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-[18px] sm:gap-[24px] w-full px-6 select-none">
          <ScrollRevealWrapper className="flex flex-col items-center">
            {/* Elegant luxury subtitle */}
            <span className="font-sans text-[10px] sm:text-[12px] lg:text-[14px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold text-center mb-1 sm:mb-2 animate-header-text">
              Goyaz Fine Jewelry
            </span>

            {/* Regal display title */}
            <h1 className="font-display text-[42px] sm:text-[62px] lg:text-[80px] text-white text-center font-light leading-none tracking-[0.02em] animate-header-text">
              Timeless Royalty
            </h1>

            {/* Cursive script flourish accent */}
            <p
              className="font-allura text-[38px] sm:text-[50px] lg:text-[68px] text-center text-transparent bg-clip-text mt-[-4px] sm:mt-[-8px] lg:mt-[-12px] leading-tight animate-header-text-staggered"
              style={{ backgroundImage: "linear-gradient(59deg, #ffffff 65%, #c5a880 100%)" }}
            >
              Crafted in Silver
            </p>
          </ScrollRevealWrapper>

          {/* Premium gold-bordered sliding CTA button */}
          <ScrollRevealWrapper delay={200}>
            <a
              href="#home-sections"
              className="border border-[#c5a880]/60 bg-black/15 backdrop-blur-[3px] flex gap-[12px] items-center px-[28px] py-[14px] lg:px-[40px] lg:py-[18px] cursor-pointer rounded-full transition-all duration-500 hover:border-[#fafafa] hover:bg-white hover:text-black hover:scale-[1.03] active:scale-[0.98] group relative overflow-hidden shadow-lg shadow-black/10"
            >
              {/* Sliding Gold Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span className="font-sans text-[11px] sm:text-[12px] lg:text-[13px] uppercase tracking-[0.25em] text-[#fafafa] group-hover:text-black transition-colors duration-300 font-medium whitespace-nowrap">
                Discover Masterpieces
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 1024 1024"
                className="fill-white/80 group-hover:fill-black transition-all duration-300 transform group-hover:translate-x-[4px]"
              >
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
              </svg>
            </a>
          </ScrollRevealWrapper>
        </div>

        {/* Scroll down indicator pill */}
        <ScrollIndicator targetId="home-sections" className="!bottom-[90px]" />
      </div>

      <div className="mt-10 lg:mt-20 flex flex-col gap-[48px] lg:gap-[80px] [&_[data-mfe='section']]:mt-0" id="home-sections">
        <MasterpiecesForEveryOccasionSection />
        <InnerCircleSection />
        <CurrentObsessionsSection />
        <MasterpiecesInSilverSection />
        <SpottedInGoyazSection />
        <BrandStorySection />
        <OurSocialSection />
      </div>

    </div>
  );
}
