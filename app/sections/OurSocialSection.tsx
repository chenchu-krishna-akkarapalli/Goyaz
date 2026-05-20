import { OUR_SOCIAL_ITEMS } from "../data/ourSocial";
import { StaggerRevealList } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";

export function OurSocialSection() {
  const items = OUR_SOCIAL_ITEMS;
  return (
    <section className="flex flex-col gap-[24px] lg:gap-[40px] items-center w-full pb-[40px]" data-mfe="section">
      <SectionHeading {...SECTION_HEADINGS.ourSocial} />
      <StaggerRevealList
        staggerMs={100}
        className="flex flex-wrap gap-[10px] sm:gap-[32px] lg:gap-[40px] items-center w-full justify-center"
        childClassName="flex-shrink-0 flex items-center justify-center"
        as="div"
      >
        {items.map(({ src, alt }) => (
          <div key={alt} className="relative w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] lg:w-[30px] lg:h-[30px] cursor-pointer transition-all duration-300 hover:scale-125">
            <img alt={alt} className="absolute inset-0 w-full h-full" src={src} loading="lazy" decoding="async" />
          </div>
        ))}
      </StaggerRevealList>
    </section>
  );
}
