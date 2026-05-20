import {
  BRAND_STORY_FRAME81,
  BRAND_STORY_FRAME82,
  BRAND_STORY_FRAME83,
  BRAND_STORY_FRAME49,
  BRAND_STORY_FRAME130,
  BRAND_STORY_GROUP13,
  BRAND_STORY_GROUP18,
  BRAND_STORY_GROUP10,
  BRAND_STORY_GROUP8,
} from "../data/brandStory";
import { ScrollRevealWrapper } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";
import { SequentialImage } from "../components/SequentialImage";

export function BrandStorySection() {
  const frame81 = BRAND_STORY_FRAME81;
  const frame82 = BRAND_STORY_FRAME82;
  const frame83 = BRAND_STORY_FRAME83;
  const frame49 = BRAND_STORY_FRAME49;
  const frame130 = BRAND_STORY_FRAME130;
  const group13 = BRAND_STORY_GROUP13;
  const group18 = BRAND_STORY_GROUP18;
  const group10 = BRAND_STORY_GROUP10;
  const group8 = BRAND_STORY_GROUP8;

  return (
    <section className="flex flex-col gap-[10px] lg:gap-[40px] items-start w-full" data-mfe="section">

      <SectionHeading {...SECTION_HEADINGS.brandStory} />

      {/* ── BLOCK 1 ─────────────────────────────────────── */}
      <div className="w-full flex flex-col">

        {/* Mobile: collage LEFT · text RIGHT */}
        <div className="lg:hidden flex items-start gap-[16px] w-full">

          {/* Overlapping image collage */}
          <div className="flex-shrink-0 relative" style={{ width: 152, height: 152 }}>
            <div className="absolute top-0 left-0 w-[100px] h-[100px] rounded-[15px] overflow-hidden">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame81} sequential={false} />
            </div>
            <div className="absolute bottom-0 right-0 w-[100px] h-[100px] rounded-[15px] overflow-hidden border-2 border-white">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame82} delayMs={150} />
            </div>
          </div>

          {/* Text column */}
          <div className="flex-1 min-w-0 flex flex-col gap-[10px] items-center">
            <p className="font-sans text-[8px] font-medium text-black text-center uppercase w-full leading-snug">
              Loved by Brides Across India
            </p>
            <div className="font-sans text-[5px] text-black text-center uppercase w-full leading-[1.45]">
              <p className="mb-[4px]">From intimate pre-wedding rituals to the grandeur of the mandap, Goyaz has been the trusted choice for countless brides. We believe that your bridal jewelry should be as unforgettable as the day itself. See how women are styling our intricate Nakshi and brilliant Polki silver masterpieces to complete their dream trousseau&mdash;achieving the rich, regal aesthetic of traditional gold, crafted purely in premium 92.5 silver. Become part of our legacy and let our heirlooms witness your most cherished milestones.</p>
              <p>Our jewelry isn&apos;t simply manufactured, it is sculpted. Each piece is brought to life by master karigars (artisans) who have spent generations perfecting the ancient arts of Nakshi, Kundan, and Victorian jewelry. From the deep, dimensional carving of temple motifs to the precision setting of premium moissanites and Russian emeralds, every detail is meticulously finished with 24k gold micron plating. The result is a flawless, royal gleam that rivals pure gold.</p>
            </div>
            <div className="bg-white border border-black flex items-center justify-center px-[16px] py-[8px] cursor-pointer hover:bg-black hover:text-white transition-colors group w-full max-w-[120px]">
              <span className="font-sans text-[8px] text-black group-hover:text-white whitespace-nowrap">Discover More</span>
            </div>
          </div>
        </div>

        {/* Mobile: decorative SVG after Block 1 */}
        <div className="lg:hidden self-start mt-[-30px]" style={{ height: 75, width: 269 }}>
          <img alt="" className="w-full h-full" src={group18} loading="lazy" decoding="async" />
        </div>

        {/* Desktop: images LEFT · text RIGHT */}
        <div className="hidden lg:block relative" style={{ height: 560 }}>
          {/* Image collage — top-left at x=40 */}
          <div className="absolute top-0 left-[40px]" style={{ width: 480, height: 480 }}>
            <div className="absolute top-0 left-0 w-[320px] h-[320px] rounded-[30px] overflow-hidden">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame81} sequential={false} />
            </div>
            <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-[30px] overflow-hidden border-[5px] border-white">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame82} delayMs={150} />
            </div>
          </div>
          {/* group13 decorative SVG */}
          <div className="absolute left-0" style={{ top: 288, width: 915, height: 256 }}>
            <img alt="" className="w-full h-full" src={group13} loading="lazy" decoding="async" />
          </div>
          {/* Text column — right side */}
          <div className="absolute right-0 top-[48px] w-[560px] flex flex-col items-center">
            <ScrollRevealWrapper delay={200}>
              <div className="font-sans flex flex-col gap-[20px] items-center px-[10px] py-[40px] text-black text-center uppercase w-[560px]">
                <p className="text-[20px] font-medium w-full">Loved by Brides Across India</p>
                <div className="text-[14px] w-full">
                  <p className="mb-1">From intimate pre-wedding rituals to the grandeur of the mandap, Goyaz has been the trusted choice for countless brides. We believe that your bridal jewelry should be as unforgettable as the day itself. See how women are styling our intricate Nakshi and brilliant Polki silver masterpieces to complete their dream trousseau&mdash;achieving the rich, regal aesthetic of traditional gold, crafted purely in premium 92.5 silver. Become part of our legacy and let our heirlooms witness your most cherished milestones.</p>
                  <p>Our jewelry isn&apos;t simply manufactured, it is sculpted. Each piece is brought to life by master karigars (artisans) who have spent generations perfecting the ancient arts of Nakshi, Kundan, and Victorian jewelry. From the deep, dimensional carving of temple motifs to the precision setting of premium moissanites and Russian emeralds, every detail is meticulously finished with 24k gold micron plating. The result is a flawless, royal gleam that rivals pure gold.</p>
                </div>
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={400}>
              <div className="bg-white border border-black flex items-center px-[40px] py-[18px] cursor-pointer transition-all duration-300 hover:bg-black hover:text-white group">
                <span className="font-sans text-[24px] text-black group-hover:text-white whitespace-nowrap">Discover More</span>
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>
      </div>

      {/* ── BLOCK 2 ─────────────────────────────────────── */}
      <div className="w-full flex flex-col">

        {/* Mobile: text LEFT · collage RIGHT */}
        <div className="lg:hidden flex items-start gap-[16px] w-full">

          {/* Text column */}
          <div className="flex-1 min-w-0 flex flex-col gap-[10px] items-center">
            <p className="font-sans text-[8px] font-medium text-black text-center uppercase w-full leading-snug">
              Crafted by Master Karigars
            </p>
            <div className="font-sans text-[5px] text-black text-center uppercase w-full leading-[1.45]">
              <p className="mb-[4px]">Every Goyaz piece begins as a hand-drawn idea and is shaped through time-honored craftsmanship. Our karigars preserve heritage techniques across Nakshi, Kundan, and temple-inspired artistry, creating jewelry that feels traditional yet unmistakably modern for today&apos;s celebrations.</p>
              <p>From precise stone setting to rich 24k gold micron finishing, each detail is executed by hand with meticulous care. This devotion to process gives every piece its royal depth, brilliant sparkle, and heirloom quality designed to be treasured across generations.</p>
            </div>
            <div className="bg-white border border-black flex items-center justify-center px-[16px] py-[8px] cursor-pointer hover:bg-black hover:text-white transition-colors group w-full max-w-[120px]">
              <span className="font-sans text-[8px] text-black group-hover:text-white whitespace-nowrap">Discover More</span>
            </div>
          </div>

          {/* Overlapping image collage */}
          <div className="flex-shrink-0 relative" style={{ width: 152, height: 152 }}>
            <div className="absolute top-0 left-0 w-[100px] h-[100px] rounded-[15px] overflow-hidden">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame83} sequential={false} />
            </div>
            <div className="absolute bottom-0 right-0 w-[100px] h-[100px] rounded-[15px] overflow-hidden border-2 border-white">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame49} delayMs={150} />
            </div>
          </div>
        </div>

        {/* Mobile: decorative SVG after Block 2 */}
        <div className="lg:hidden self-end mt-[-28px]" style={{ height: 72, width: 266 }}>
          <img alt="" className="w-full h-full" src={group10} loading="lazy" decoding="async" />
        </div>

        {/* Desktop: text LEFT · images RIGHT */}
        <div className="hidden lg:block relative" style={{ height: 560 }}>
          {/* Text column — left side */}
          <div className="absolute left-0 top-[56px] w-[560px] flex flex-col items-center">
            <ScrollRevealWrapper delay={200}>
              <div className="font-sans flex flex-col gap-[20px] items-center px-[10px] py-[40px] text-black text-center uppercase w-[560px]">
                <p className="text-[20px] font-medium w-full">Crafted by Master Karigars</p>
                <div className="text-[14px] w-full">
                  <p className="mb-1">Every Goyaz piece begins as a hand-drawn idea and is shaped through time-honored craftsmanship. Our karigars preserve heritage techniques across Nakshi, Kundan, and temple-inspired artistry, creating jewelry that feels traditional yet unmistakably modern for today&apos;s celebrations.</p>
                  <p>From precise stone setting to rich 24k gold micron finishing, each detail is executed by hand with meticulous care. This devotion to process gives every piece its royal depth, brilliant sparkle, and heirloom quality designed to be treasured across generations.</p>
                </div>
              </div>
            </ScrollRevealWrapper>
            <ScrollRevealWrapper delay={400}>
              <div className="bg-white border border-black flex items-center px-[40px] py-[18px] cursor-pointer transition-all duration-300 hover:bg-black hover:text-white group">
                <span className="font-sans text-[24px] text-black group-hover:text-white whitespace-nowrap">Discover More</span>
              </div>
            </ScrollRevealWrapper>
          </div>
          {/* Image collage — right side at x=840 */}
          <div className="absolute top-0 right-[40px]" style={{ width: 480, height: 480 }}>
            <div className="absolute top-0 left-0 w-[320px] h-[320px] rounded-[30px] overflow-hidden">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame83} sequential={false} />
            </div>
            <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-[30px] overflow-hidden border-[5px] border-white">
              <SequentialImage alt="" className="absolute inset-0 object-cover w-full h-full" src={frame49} delayMs={150} />
            </div>
          </div>
          {/* group10 decorative SVG */}
          <div className="absolute right-0" style={{ top: 298, width: 966, height: 262 }}>
            <img alt="" className="w-full h-full" src={group10} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      {/* ── BANNER ──────────────────────────────────────── */}
      <ScrollRevealWrapper className="flex flex-col gap-[10px] lg:gap-[40px] items-center w-full">
        <div className="border-[#083c30] border-[0.5px] border-solid h-[113px] sm:h-[180px] lg:h-[398px] relative rounded-[15px] lg:rounded-[30px] w-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[15px] lg:rounded-[30px]">
            <SequentialImage alt="" className="absolute left-0 max-w-none w-full" src={frame130} style={{ height: "195.3%", top: "-68.09%" }} sequential={false} />
          </div>

          {/* Mobile: two-column layout — brand message LEFT · promo RIGHT */}
          <div className="lg:hidden absolute inset-0 flex items-center px-[16px] gap-3">
            <div className="flex flex-col gap-[6px] items-start flex-1 min-w-0">
              <p className="font-display text-[14px] sm:text-[17px] text-white leading-tight">
                {"India's Largest Premium Silver Destination"}
              </p>
              <p className="font-sans text-[5px] sm:text-[11px] text-white/80 leading-tight">
                Join the Goyaz Inner Circle. Get early access to new collections and exclusive bridal offers.
              </p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0 gap-[3px]">
              <div className="font-display flex flex-col items-end text-white">
                <p className="text-[13px] sm:text-[15px] text-center">MOTHER&apos;S DAY</p>
                <p className="text-[8px] text-right">OFFER</p>
              </div>
              <div className="flex items-end gap-[2px]">
                <div className="font-display flex flex-col text-white text-[8px] leading-tight">
                  <p>CLAIM</p>
                  <p>UP TO</p>
                </div>
                <p className="font-stamp text-white text-[28px] sm:text-[32px] leading-none">3000</p>
              </div>
            </div>
          </div>

          {/* Desktop: original absolute-positioned text (unchanged) */}
          <p className="font-display hidden lg:block absolute -translate-x-1/2 text-[32px] text-center text-white w-[477px]" style={{ left: "calc(50% - 400.5px)", top: "calc(50% - 62px)" }}>
            {"India's Largest Premium Silver Destination"}
          </p>
          <p className="font-sans hidden lg:block absolute -translate-x-1/2 text-[16px] text-center text-white w-[477px]" style={{ left: "calc(50% - 400.5px)", top: "calc(50% + 20px)" }}>
            Join the Goyaz Inner Circle. Get early access to new collections and exclusive bridal offers.
          </p>
          <p className="font-display hidden lg:block absolute -translate-x-1/2 text-[48px] text-center text-white w-[330px]" style={{ left: "calc(50% + 417px)", top: "calc(50% - 79.5px)" }}>
            MOTHER&apos;S DAY
          </p>
          <p className="font-display hidden lg:block absolute -translate-x-1/2 text-[24px] text-center text-white w-[72px]" style={{ left: "calc(50% + 554px)", top: "calc(50% - 26px)" }}>
            OFFER
          </p>
          <p className="font-display hidden lg:block absolute -translate-x-1/2 text-[40px] text-center text-white w-[112px]" style={{ left: "calc(50% + 308px)", top: "calc(50% + 13px)" }}>
            CLAIM
          </p>
          <p className="font-display hidden lg:block absolute -translate-x-1/2 text-[24px] text-center text-white w-[68px]" style={{ left: "calc(50% + 286px)", top: "calc(50% + 62px)" }}>
            UP TO
          </p>
          <p className="font-display hidden lg:block absolute -translate-x-1/2 text-[24px] text-center text-white w-[34px]" style={{ left: "calc(50% + 573px)", top: "calc(50% + 93px)" }}>
            RS
          </p>
          <p className="font-stamp hidden lg:block absolute -translate-x-1/2 text-[96px] text-center text-white h-[104px] w-[205px]" style={{ left: "calc(50% + 479.5px)", top: "calc(50% - 11px)" }}>
            3000
          </p>
        </div>

        {/* Bottom SVG stamp — 89×24 on mobile, 275×73 on desktop */}
        <div className="lg:hidden relative" style={{ height: 24, width: 89 }}>
          <img alt="" className="absolute inset-0 w-full h-full" src={group8} loading="lazy" decoding="async" />
        </div>
        <div className="hidden lg:block relative" style={{ height: 72.862, width: 274.765 }}>
          <img alt="" className="absolute inset-0 w-full h-full" src={group8} loading="lazy" decoding="async" />
        </div>
      </ScrollRevealWrapper>
    </section>
  );
}
