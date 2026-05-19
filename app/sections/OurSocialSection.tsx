import { OUR_SOCIAL_ITEMS } from "../data/ourSocial";
import { StaggerRevealList } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";

export function OurSocialSection() {
  const items = OUR_SOCIAL_ITEMS;
  return (
    <section className="flex flex-col gap-[40px] items-center w-full pb-[40px]" data-mfe="section">
      <SectionHeading {...SECTION_HEADINGS.ourSocial} />
      <StaggerRevealList
        staggerMs={100}
        className="flex gap-[24px] lg:gap-[40px] items-center w-full justify-center flex-wrap"
        childClassName="flex-shrink-0"
        as="div"
      >
        {items.map(({ src, alt }) => (
          <div key={alt} className="relative w-[30px] h-[30px] cursor-pointer transition-transform duration-300 hover:scale-125">
            <img alt={alt} className="absolute inset-0 w-full h-full" src={src}  loading="lazy" decoding="async" />
          </div>
        ))}
      </StaggerRevealList>
    </section>
  );
}
