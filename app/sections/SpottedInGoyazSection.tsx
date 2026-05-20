import { SPOTTED_IN_GOYAZ_ELLIPSE, SPOTTED_IN_GOYAZ_IMAGES } from "../data/spottedInGoyaz";
import { MarqueeTrack, ANIMATION_CLASSES } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";
import { SequentialImage } from "../components/SequentialImage";

export function SpottedInGoyazSection() {
  const ellipse5 = SPOTTED_IN_GOYAZ_ELLIPSE;
  return (
    <div className="flex flex-col gap-[40px] w-full" data-mfe="section">
      <SectionHeading
        {...SECTION_HEADINGS.spottedInGoyaz}
        className="flex justify-between items-start w-full overflow-hidden px-[16px] lg:px-[80px]"
      />

      {/* Mobile: marquee scroll — original image size, all images */}
      <div className="relative lg:hidden w-full overflow-hidden" style={{ height: "104px" }}>
        <MarqueeTrack speed={30} gap={10} className="absolute left-0 top-0 h-full w-full">
          {SPOTTED_IN_GOYAZ_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`relative h-full w-[80px] flex-shrink-0 ${ANIMATION_CLASSES.hoverZoomBase}`}
            >
              <SequentialImage
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${ANIMATION_CLASSES.hoverZoomImg}`}
                src={img}
                sequential={index >= 3}
                delayMs={index >= 3 ? (index - 2) * 80 : undefined}
              />
            </div>
          ))}
        </MarqueeTrack>

        {/* Top arch */}
        <div className="absolute left-0 w-full pointer-events-none z-10" style={{ top: "-20px", height: "40px" }}>
          <img alt="" className="block h-full w-full" src={ellipse5} loading="lazy" decoding="async" />
        </div>
        {/* Bottom arch */}
        <div className="absolute left-0 w-full pointer-events-none z-10" style={{ bottom: "-20px", height: "40px" }}>
          <img alt="" className="block h-full w-full" src={ellipse5} loading="lazy" decoding="async" />
        </div>
        {/* Left & right white fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[40px] bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[40px] bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Desktop: full-width marquee */}
      <section className="hidden lg:block w-full h-[388px] bg-white relative overflow-hidden">
        <MarqueeTrack speed={40} gap={40} className="absolute left-0 top-0 h-full w-full">
          {SPOTTED_IN_GOYAZ_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`relative h-full w-[325px] flex-shrink-0 ${ANIMATION_CLASSES.hoverZoomBase}`}
            >
              <SequentialImage
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${ANIMATION_CLASSES.hoverZoomImg}`}
                src={img}
                sequential={index >= 3}
                delayMs={index >= 3 ? (index - 2) * 80 : undefined}
              />
            </div>
          ))}
        </MarqueeTrack>

        <div className="absolute left-0 top-[-86px] h-[174px] w-full pointer-events-none z-10">
          <img alt="" className="block h-full w-full" src={ellipse5} loading="lazy" decoding="async" />
        </div>
        <div className="absolute bottom-[-87px] left-0 h-[174px] w-full pointer-events-none z-10">
          <img alt="" className="block h-full w-full" src={ellipse5} loading="lazy" decoding="async" />
        </div>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[80px] bg-white blur-[37px]" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[80px] bg-white blur-[37px]" />
      </section>
    </div>
  );
}
