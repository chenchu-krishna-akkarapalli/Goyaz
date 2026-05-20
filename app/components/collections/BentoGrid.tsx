import Image from "next/image";
import type { MasterpieceProduct } from "../../data/masterpieces";
import { CollectionCard } from "../cards/CollectionCard";
import { ScrollRevealWrapper } from "../../utils/animations";

/**
 * BentoGrid — the default browse layout.
 * Renders products in the curated bento arrangement:
 *   Row 1  — 4 normal cards
 *   Row 2  — 4 normal cards
 *   Bento  — 2 stacked wide cards beside a brand panel
 *   Row 4  — wide | normal | normal
 *   Row 5  — normal | wide | normal
 *
 * Used when no filters are active. When the user filters, the explorer
 * swaps to UniformGrid for a scannable list view.
 */

function BrandPanel() {
  return (
    <div className="h-[320px] sm:h-[420px] lg:h-[846px] relative rounded-[16px] lg:rounded-[30px] flex-shrink-0 w-full overflow-hidden flex flex-col items-center justify-end pb-[28px] lg:pb-[60px]">
      <Image
        src="/images/sections/collections/frame260.avif"
        alt=""
        fill
        className="object-cover pointer-events-none"
        loading="lazy"
        sizes="670px"
      />
      <div className="absolute inset-0 bg-[rgba(0,18,0,0.45)]" />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 lg:px-10">
        <p className="font-display text-[18px] sm:text-[22px] lg:text-[32px] text-center text-white leading-tight max-w-[300px] lg:max-w-[477px]">
          {"India's Largest Premium Silver Destination"}
        </p>
        <p className="font-sans text-[11px] sm:text-[13px] lg:text-[16px] text-center text-white/85 leading-[1.5] max-w-[260px] sm:max-w-[400px] lg:max-w-[477px]">
          Join the Goyaz Inner Circle. Get early access to new collections and exclusive bridal offers.
        </p>
        <button
          className="font-sans bg-white text-(--color-dark) border border-(--color-dark) px-[20px] py-[10px] lg:px-[40px] lg:py-[18px] text-[12px] lg:text-[24px] mt-3 lg:mt-5 hover:bg-(--color-dark) hover:text-white transition-colors"
          type="button"
        >
          Discover More
        </button>
      </div>
    </div>
  );
}

function renderCard(p: MasterpieceProduct, forceWide?: boolean) {
  return (
    <CollectionCard
      key={p.id}
      id={p.id}
      imageSrc={p.imageSrc}
      title={p.title}
      price={p.price}
      category={p.category.toLowerCase()}
      wide={forceWide ?? p.size === "wide"}
    />
  );
}

export function BentoGrid({ products }: { products: MasterpieceProduct[] }) {
  const normal = products.filter((p) => p.size === "normal");
  const wide = products.filter((p) => p.size === "wide");

  const row1 = normal.slice(0, 4);
  const row2 = normal.slice(4, 8);
  const bentoWides = wide.slice(0, 2);
  const row4Wide = wide[2];
  const row4Normals = normal.slice(8, 10);
  const row5LeftN = normal[10];
  const row5Wide = wide[3];
  const row5RightN = normal[11];

  return (
    <div className="flex flex-col gap-3 lg:gap-5 w-full">
      {row1.length > 0 && (
        <ScrollRevealWrapper variant="up" delay={0}>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5 items-start w-full">
            {row1.map((p) => renderCard(p))}
          </div>
        </ScrollRevealWrapper>
      )}

      {row2.length > 0 && (
        <ScrollRevealWrapper variant="up" delay={120}>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5 items-start w-full">
            {row2.map((p) => renderCard(p))}
          </div>
        </ScrollRevealWrapper>
      )}

      {bentoWides.length >= 2 ? (
        <ScrollRevealWrapper variant="scale" delay={80}>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-stretch w-full">
            <div className="flex flex-col gap-3 lg:gap-5 w-full lg:w-[670px] lg:shrink-0">
              {bentoWides.map((p) => renderCard(p, true))}
            </div>
            <div className="flex-1">
              <BrandPanel />
            </div>
          </div>
        </ScrollRevealWrapper>
      ) : (
        <ScrollRevealWrapper variant="scale" delay={200}>
          <BrandPanel />
        </ScrollRevealWrapper>
      )}

      {row4Wide && row4Normals.length === 2 && (
        <ScrollRevealWrapper variant="up" delay={80}>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-start w-full">
            {renderCard(row4Wide, true)}
            <div className="grid grid-cols-2 gap-3 lg:contents lg:gap-0 w-full">
              {row4Normals.map((p) => renderCard(p))}
            </div>
          </div>
        </ScrollRevealWrapper>
      )}

      {row5LeftN && row5Wide && row5RightN && (
        <ScrollRevealWrapper variant="up" delay={120}>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-start w-full">
            {renderCard(row5LeftN)}
            {renderCard(row5Wide, true)}
            {renderCard(row5RightN)}
          </div>
        </ScrollRevealWrapper>
      )}
    </div>
  );
}
