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
      <div className="layout-container pb-[60px]">
        <div className="layout-inner">
          <div className="flex flex-wrap gap-[20px]">
            {MASTERPIECE_CATEGORIES.map((cat) => {
              const count = MASTERPIECE_PRODUCTS.filter((p) => p.category === cat).length;
              const heroImg = COLLECTION_HERO[cat];

              return (
                <Link
                  key={cat}
                  href={`/collections/${cat.toLowerCase()}`}
                  className={`group relative overflow-hidden rounded-[30px] flex-shrink-0 w-[325px] h-[420px] block`}
                >
                  <img
                    src={heroImg}
                    alt={cat}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,20,0,0.75)] via-transparent to-transparent" />
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-[24px] flex flex-col gap-[4px]">
                    <p
                      className="text-white text-[24px] leading-none"
                      style={{ fontFamily: "'House of Montague', Georgia, serif" }}
                    >
                      {cat}
                    </p>
                    <p
                      className="text-white/70 text-[14px]"
                      style={{ fontFamily: "'Futura PT', sans-serif" }}
                    >
                      {count} pieces
                    </p>
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
