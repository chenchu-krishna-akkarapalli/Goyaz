export type MasterpieceSize = "normal" | "wide";

export type JewelryType =
  | "Necklace"
  | "Choker"
  | "Earrings"
  | "Bangle"
  | "Ring"
  | "Pendant"
  | "Mangalsutra"
  | "Haar"
  | "Hasli"
  | "Tikka"
  | "Set"
  | "Pasa"
  | "Tiara"
  | "Other";

export const JEWELRY_TYPES: JewelryType[] = [
  "Necklace",
  "Choker",
  "Earrings",
  "Bangle",
  "Ring",
  "Pendant",
  "Mangalsutra",
  "Haar",
  "Hasli",
  "Tikka",
  "Set",
  "Pasa",
  "Tiara",
  "Other",
];

export type MasterpieceProduct = {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  imageSrc: string;
  category: "Nakshi" | "Polki" | "Kundan" | "Temple" | "Bridal";
  size: MasterpieceSize;
  jewelryType: JewelryType;
};

function deriveJewelryType(title: string): JewelryType {
  const lower = title.toLowerCase();
  if (lower.includes("mangalsutra")) return "Mangalsutra";
  if (lower.includes("haar")) return "Haar";
  if (lower.includes("hasli")) return "Hasli";
  if (lower.includes("tikka")) return "Tikka";
  if (lower.includes("tiara")) return "Tiara";
  if (lower.includes("pasa") || lower.includes("hairpin")) return "Pasa";
  if (lower.includes("choker")) return "Choker";
  if (lower.includes("necklace") || lower.includes("suite")) return "Necklace";
  if (lower.includes("pendant")) return "Pendant";
  if (lower.includes("ring")) return "Ring";
  if (lower.includes("bangle")) return "Bangle";
  if (lower.includes("set")) return "Set";
  if (
    lower.includes("earring") ||
    lower.includes("stud") ||
    lower.includes("hoop") ||
    lower.includes("earcuff") ||
    lower.includes("drop")
  )
    return "Earrings";
  if (lower.includes("cuff")) return "Bangle";
  return "Other";
}

export const MASTERPIECE_LINE_IMAGE =
  "/images/sections/masterpieces/tab-line.svg";

export const MASTERPIECE_CATEGORIES: MasterpieceProduct["category"][] = [
  "Nakshi",
  "Polki",
  "Kundan",
  "Temple",
  "Bridal",
];

const COLLECTION_IMAGES = [
  "/images/sections/collections/frame233.avif",
  "/images/sections/collections/frame234.avif",
  "/images/sections/collections/frame235.avif",
  "/images/sections/collections/frame236.avif",
  "/images/sections/collections/frame237.avif",
  "/images/sections/collections/frame238.avif",
  "/images/sections/collections/frame239.avif",
  "/images/sections/collections/frame240.avif",
];

const PER_CATEGORY = 16;
const sizeAt = (i: number): MasterpieceSize => (i % 2 === 0 ? "normal" : "wide");

const PRODUCT_TITLES: Record<MasterpieceProduct["category"], string[]> = {
  Nakshi: [
    "Nakshi Petal Pendant",
    "Royal Nakshi Choker",
    "Heritage Nakshi Bangle",
    "Crowned Nakshi Studs",
    "Florence Nakshi Hoops",
    "Empress Nakshi Cuff",
    "Antique Nakshi Earcuff",
    "Engraved Nakshi Mangalsutra",
    "Royal Nakshi Drop",
    "Bloom Nakshi Necklace",
    "Heirloom Nakshi Set",
    "Crown Nakshi Tiara",
    "Bridal Nakshi Necklace",
    "Imperial Nakshi Choker",
    "Ornate Nakshi Haar",
    "Treasured Nakshi Set",
  ],
  Polki: [
    "Princess Polki Pendant",
    "Mughal Polki Choker",
    "Statement Polki Studs",
    "Vintage Polki Drop",
    "Royal Polki Cuff",
    "Diamond Polki Hoops",
    "Bridal Polki Earrings",
    "Heritage Polki Hasli",
    "Imperial Polki Pendant",
    "Mughal Polki Hairpin",
    "Royal Polki Pasa",
    "Antique Polki Ring",
    "Empress Polki Necklace",
    "Royal Polki Haar",
    "Diamond Polki Choker",
    "Treasured Polki Set",
  ],
  Kundan: [
    "Kundan Bloom Pendant",
    "Royal Kundan Earrings",
    "Heritage Kundan Choker",
    "Bridal Kundan Tikka",
    "Antique Kundan Bangle",
    "Imperial Kundan Drop",
    "Crowned Kundan Studs",
    "Mughal Kundan Pasa",
    "Empress Kundan Choker",
    "Vintage Kundan Hoops",
    "Royal Kundan Maang",
    "Floral Kundan Cuff",
    "Bridal Kundan Necklace",
    "Royal Kundan Haar",
    "Crown Kundan Set",
    "Heirloom Kundan Suite",
  ],
  Temple: [
    "Temple Lakshmi Pendant",
    "Sacred Temple Hoops",
    "Antique Temple Choker",
    "Heritage Temple Studs",
    "Goddess Temple Drop",
    "Royal Temple Hasli",
    "Crown Temple Bangle",
    "Bridal Temple Tikka",
    "Royal Temple Mangalsutra",
    "Lakshmi Temple Cuff",
    "Imperial Temple Set",
    "Crown Temple Ring",
    "Royal Temple Necklace",
    "Heritage Temple Haar",
    "Goddess Temple Choker",
    "Treasured Temple Suite",
  ],
  Bridal: [
    "Bridal Crown Pendant",
    "Royal Bridal Choker",
    "Imperial Bridal Drop",
    "Heritage Bridal Studs",
    "Crown Bridal Hoops",
    "Empress Bridal Bangle",
    "Floral Bridal Cuff",
    "Bridal Diamond Mangalsutra",
    "Royal Bridal Tikka",
    "Crown Bridal Pasa",
    "Heritage Bridal Hasli",
    "Bridal Heirloom Ring",
    "Royal Bridal Necklace",
    "Imperial Bridal Haar",
    "Crown Bridal Choker",
    "Treasured Bridal Suite",
  ],
};

const CATEGORY_OFFSETS: Record<MasterpieceProduct["category"], { base: number; step: number; img: number }> = {
  Nakshi: { base: 85000, step: 1000, img: 0 },
  Polki:  { base: 55000, step: 1200, img: 2 },
  Kundan: { base: 65000, step: 1100, img: 4 },
  Temple: { base: 72000, step: 1300, img: 6 },
  Bridal: { base: 95000, step: 1500, img: 1 },
};

function buildCategory(category: MasterpieceProduct["category"]): MasterpieceProduct[] {
  const cfg = CATEGORY_OFFSETS[category];
  const titles = PRODUCT_TITLES[category];
  return Array.from({ length: PER_CATEGORY }, (_, i) => {
    const title = titles[i] ?? `${category} Masterpiece ${i + 1}`;
    const priceValue = cfg.base + i * cfg.step;
    return {
      id: `${category.toLowerCase()}-product-${i + 1}`,
      title,
      price: `INR ${priceValue.toLocaleString("en-IN")}/-`,
      priceValue,
      imageSrc: COLLECTION_IMAGES[(i + cfg.img) % COLLECTION_IMAGES.length],
      category,
      size: sizeAt(i),
      jewelryType: deriveJewelryType(title),
    };
  });
}

export const MASTERPIECE_PRODUCTS: MasterpieceProduct[] = MASTERPIECE_CATEGORIES.flatMap(buildCategory);
