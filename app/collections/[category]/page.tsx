import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  MASTERPIECE_CATEGORIES,
  MASTERPIECE_PRODUCTS,
  type MasterpieceProduct,
} from "../../data/masterpieces";
import { CollectionCard } from "../../components/cards/CollectionCard";
import { ScrollRevealWrapper } from "../../utils/animations";
import { PageHeader } from "../../components/PageHeader";
import { CollectionHeroBanner } from "../../components/CollectionHeroBanner";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return MASTERPIECE_CATEGORIES.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = MASTERPIECE_CATEGORIES.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );
  if (!cat) return {};
  return {
    title: `${cat} Collection — Goyaz`,
    description: `Explore our handcrafted ${cat} silver jewellery collection at Goyaz. Premium 92.5 silver jewellery crafted by master karigars.`,
  };
}

// ── Category-specific hero copy ─────────────────────────────────
const CATEGORY_HERO_COPY: Record<
  MasterpieceProduct["category"],
  { headline: string; description: string }
> = {
  Nakshi: {
    headline: "The Nakshi Heritage Room",
    description:
      "Step into the world of hand-engraved Nakshi craftsmanship — every petal, every motif tells a story. Crafted from 92.5 sterling silver by master karigars, our Nakshi collection celebrates the time-honoured art of relief work, where heritage meets the modern muse.",
  },
  Polki: {
    headline: "The Royal Polki Room",
    description:
      "Embrace the regal radiance of uncut diamonds set into pure silver. The Polki Room captures the courtly elegance of Mughal-era jewellery — striking, brilliant, and unmistakably royal — designed for women who carry tradition with confidence.",
  },
  Kundan: {
    headline: "The Imperial Kundan Room",
    description:
      "Discover Kundan in its purest form — refined gold-foil setting, vivid stones, and exquisite enamel reverse work. The Imperial Kundan Room is a tribute to the Indian royal aesthetic, where every piece is an heirloom in the making.",
  },
  Temple: {
    headline: "The Sacred Temple Room",
    description:
      "Inspired by the divine motifs of South Indian temples, our Temple Room brings together Lakshmi coins, peacock filigree, and sacred geometry — silver jewellery that connects the wearer to centuries of devotion and craftsmanship.",
  },
  Bridal: {
    headline: "The Antique Silver Room",
    description:
      "Embrace the beauty of the bold and the beautiful. The Antique Silver Room celebrates the raw, unpolished charm of vintage-finish jewelry. Featuring dark, oxidized textures that beautifully contrast with silver's natural shine, this collection is for the modern woman who loves to pair striking, tribal-inspired aesthetics with both crisp cotton weaves and contemporary silhouettes.",
  },
};


// ── Brand Panel ────────────────────────────────────────────────
function BrandPanel() {
  return (
    <div className="h-[500px] lg:h-[846px] relative rounded-[30px] flex-shrink-0 w-full overflow-hidden flex flex-col items-center justify-end pb-[40px] lg:pb-[60px]">
      <Image
        src="/images/sections/collections/frame260.avif"
        alt=""
        fill
        className="object-cover pointer-events-none"
        loading="lazy"
        sizes="670px"
      />
      <div className="absolute inset-0 bg-[rgba(0,18,0,0.45)]" />
      <div className="relative z-10 flex flex-col items-center gap-5 px-10">
        <p
          className="text-[32px] text-center text-white leading-normal max-w-[477px]"
          style={{ fontFamily: "'House of Montague', Georgia, serif" }}
        >
          {"India's Largest Premium Silver Destination"}
        </p>
        <p
          className="text-[16px] text-center text-white/85 leading-normal max-w-[477px]"
          style={{ fontFamily: "'Futura PT', sans-serif" }}
        >
          Join the Goyaz Inner Circle. Get early access to new collections and
          exclusive bridal offers.
        </p>
        <button
          className="bg-white text-(--color-dark) border border-(--color-dark) px-[24px] py-[14px] lg:px-[40px] lg:py-[18px] text-[16px] lg:text-[24px] mt-5 hover:bg-(--color-dark) hover:text-white transition-colors"
          type="button"
          style={{ fontFamily: "'Futura PT', sans-serif" }}
        >
          Discover More
        </button>
      </div>
    </div>
  );
}

// ── Card render helper ─────────────────────────────────────────
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

// ── Product Grid ───────────────────────────────────────────────
function ProductGrid({ products }: { products: MasterpieceProduct[] }) {
  const normal = products.filter((p) => p.size === "normal");
  const wide   = products.filter((p) => p.size === "wide");

  // Row 1 & 2 — 4 normal cards each
  const row1 = normal.slice(0, 4);
  const row2 = normal.slice(4, 8);

  // Bento — 2 wide cards stacked left, brand panel right
  const bentoWides = wide.slice(0, 2);

  // Row 4 — Wide | Normal | Normal
  const row4Wide = wide[2];
  const row4Normals = normal.slice(8, 10);

  // Row 5 — Normal | Wide | Normal
  const row5LeftN  = normal[10];
  const row5Wide   = wide[3];
  const row5RightN = normal[11];

  return (
    <div className="flex flex-col gap-3 lg:gap-5 w-full">

      {/* Row 1 */}
      {row1.length > 0 && (
        <ScrollRevealWrapper variant="up" delay={0}>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5 items-start w-full">
            {row1.map((p) => renderCard(p))}
          </div>
        </ScrollRevealWrapper>
      )}

      {/* Row 2 */}
      {row2.length > 0 && (
        <ScrollRevealWrapper variant="up" delay={120}>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5 items-start w-full">
            {row2.map((p) => renderCard(p))}
          </div>
        </ScrollRevealWrapper>
      )}

      {/* Bento — [W stacked W] | [Brand panel] */}
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

      {/* Row 4 — Wide | Normal | Normal */}
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

      {/* Row 5 — Normal | Wide | Normal */}
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

// ── Page ───────────────────────────────────────────────────────
export default async function CollectionPage({ params }: Props) {
  const { category } = await params;
  const cat = MASTERPIECE_CATEGORIES.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );
  if (!cat) notFound();

  const products = MASTERPIECE_PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero banner ── */}
      <CollectionHeroBanner
        headline={CATEGORY_HERO_COPY[cat].headline}
        description={CATEGORY_HERO_COPY[cat].description}
        imageAlt={`${cat} collection hero`}
      />

      {/* ── Page header — sticky at top edge ── */}
      <PageHeader
        subtitle="Silver Jeweler"
        title={cat}
        count={products.length}
        rightSlot={
          <div className="flex flex-col gap-[3px] items-start cursor-pointer group">
            <p
              className="text-(--color-dark) text-[16px] leading-[96.8%] group-hover:opacity-70 transition-opacity"
              style={{ fontFamily: "'Futura PT', sans-serif" }}
            >
              Filters &amp; Sorting
            </p>
            <div className="w-full h-[1px] bg-(--color-dark)" />
          </div>
        }
      />

      {/* ── Product grid ── */}
      <div className="layout-container py-5">
        <div className="layout-inner">
          <ProductGrid products={products} />
        </div>
      </div>

    </div>
  );
}
