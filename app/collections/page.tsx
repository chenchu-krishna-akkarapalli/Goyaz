import type { Metadata } from "next";
import Link from "next/link";
import { MASTERPIECE_CATEGORIES, MASTERPIECE_PRODUCTS } from "../data/masterpieces";
import { PageHeader } from "../components/PageHeader";
import { CollectionHeroBanner } from "../components/CollectionHeroBanner";

export const metadata: Metadata = {
  title: "Collections — Goyaz",
  description: "Explore all Goyaz handcrafted silver jewellery collections — Nakshi, Polki, Kundan, Temple, and Bridal.",
};

const COLLECTION_HERO: Record<string, string> = {
  Nakshi:  "/images/sections/collections/frame233.avif",
  Polki:   "/images/sections/collections/frame237.avif",
  Kundan:  "/images/sections/collections/frame235.avif",
  Temple:  "/images/sections/collections/frame236.avif",
  Bridal:  "/images/sections/collections/frame239.avif",
};


export default function CollectionsIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero banner ── */}
      <CollectionHeroBanner
        headline="Explore Our Collections"
        description="Discover the finest handcrafted 92.5 sterling silver jewellery. Each collection tells a story of heritage, artistry, and timeless elegance."
        imageAlt="Collections hero"
      />

      {/* ── Page header — sticky at top edge ── */}
      <PageHeader subtitle="Silver Jeweler" title="All Collections" />

      {/* ── Collections grid ── */}
      <div className="layout-container py-[16px] lg:py-0 pb-[40px] lg:pb-[60px]">
        <div className="layout-inner">
          {/*
            Mobile / tablet : 2-col grid; last card spans full width when count is odd
            Desktop          : flex-wrap with fixed 325 × 420 px cards (unchanged)
          */}
          <div className="grid grid-cols-2 gap-[10px] sm:gap-[14px] lg:flex lg:flex-wrap lg:gap-[20px]">
            {MASTERPIECE_CATEGORIES.map((cat, index) => {
              const count    = MASTERPIECE_PRODUCTS.filter((p) => p.category === cat).length;
              const heroImg  = COLLECTION_HERO[cat];
              const lastOdd  = index === MASTERPIECE_CATEGORIES.length - 1 && MASTERPIECE_CATEGORIES.length % 2 !== 0;

              return (
                <Link
                  key={cat}
                  href={`/collections/${cat.toLowerCase()}`}
                  className={[
                    "group relative overflow-hidden block",
                    "rounded-[16px] lg:rounded-[30px]",
                    "h-[185px] sm:h-[230px] lg:h-[420px]",
                    "w-full lg:w-[325px] lg:flex-shrink-0",
                    lastOdd ? "col-span-2" : "",
                  ].join(" ")}
                >
                  <img
                    src={heroImg}
                    alt={cat}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,20,0,0.78)] via-transparent to-transparent" />
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-[14px] sm:p-[18px] lg:p-[24px] flex flex-col gap-[3px] lg:gap-[4px]">
                    <p className="font-display text-white text-[18px] sm:text-[22px] lg:text-[24px] leading-none">{cat}</p>
                    <p className="font-sans text-white/70 text-[11px] sm:text-[13px] lg:text-[14px]">{count} pieces</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
