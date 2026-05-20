import Link from "next/link";
import { CURRENT_OBSESSIONS } from "../data/currentObsessions";
import { ScrollRevealWrapper, ANIMATION_CLASSES } from "../utils/animations";
import { SectionHeading } from "../components/SectionHeading";
import { SECTION_HEADINGS } from "../data/sectionHeadings";
import { SequentialImage } from "../components/SequentialImage";

export function CurrentObsessionsSection() {
  return (
    <section className="flex flex-col gap-10 items-center w-full" data-mfe="section">
      <SectionHeading {...SECTION_HEADINGS.currentObsessions} />

      {/* ── Category cards grid ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-6 w-full">
        {CURRENT_OBSESSIONS.map(({ label, img, objectPosition, href }, index) => {
          const card = (
            <div className={`flex flex-col gap-2 lg:gap-4 items-center w-full ${ANIMATION_CLASSES.hoverZoomBase}`}>
              <div className="border-[#083c30] border-[0.5px] border-solid aspect-square relative rounded-[16px] sm:rounded-[20px] lg:rounded-[30px] w-full overflow-hidden">
                <SequentialImage
                  alt={label}
                  className={`absolute inset-0 w-full h-full object-cover rounded-[16px] sm:rounded-[20px] lg:rounded-[30px] pointer-events-none ${ANIMATION_CLASSES.hoverZoomImg}`}
                  src={img}
                  style={objectPosition ? { objectPosition } : undefined}
                  sequential={index > 0}
                  delayMs={index > 0 ? index * 120 : undefined}
                />
              </div>
              <p className="font-sans text-[11px] sm:text-[13px] lg:text-[16px] text-black text-center leading-[96.8%] w-full uppercase tracking-wide">{label}</p>
            </div>
          );

          return (
            <ScrollRevealWrapper key={label} delay={(index % 4) * 100}>
              {href ? (
                <Link href={href} className="block">
                  {card}
                </Link>
              ) : card}
            </ScrollRevealWrapper>
          );
        })}
      </div>

      {/* ── View All CTA — centered ── */}
      <ScrollRevealWrapper variant="up" delay={200} className="w-full flex justify-center">
        <Link href="/collections" className="btn-ghost text-(--color-dark) border-(--color-dark) mt-5">
          View All Collections
        </Link>
      </ScrollRevealWrapper>
    </section>
  );
}
