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
        <HeroMediaCarousel imageSources={HERO_SCROLL_IMAGES} />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-[12px] lg:gap-[20px] w-full px-4">
          <ScrollRevealWrapper className="flex flex-col items-center">
            <p
              className="font-script w-[90vw] sm:w-[480px] lg:w-[574px] text-[22px] sm:text-[28px] lg:text-[32px] text-center text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(59deg, rgb(255,255,255) 73.973%, rgb(32,226,200) 97.525%)" }}
            >
              Timeless Royalty, Crafted in Silver.
            </p>
          </ScrollRevealWrapper>
          <ScrollRevealWrapper delay={200}>
            <div className="border border-white flex gap-[10px] items-center px-[24px] py-[14px] lg:px-[40px] lg:py-[18px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-black group">
              <span className="font-sans text-[16px] lg:text-[24px] text-white group-hover:text-black whitespace-nowrap">
                Discover More
              </span>
            </div>
          </ScrollRevealWrapper>
        </div>
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
