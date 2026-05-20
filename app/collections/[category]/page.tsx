import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MASTERPIECE_CATEGORIES,
  MASTERPIECE_PRODUCTS,
  type MasterpieceProduct,
} from "../../data/masterpieces";
import { CollectionHeroBanner } from "../../components/CollectionHeroBanner";
import { CollectionExplorer } from "../../components/collections/CollectionExplorer";

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

      {/* ── Page header + filter chips + product grid + drawer ── */}
      <CollectionExplorer category={cat} products={products} />
    </div>
  );
}
