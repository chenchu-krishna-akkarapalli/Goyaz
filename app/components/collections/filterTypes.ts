import type { JewelryType, MasterpieceProduct } from "../../data/masterpieces";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

export const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A to Z" },
];

export type PriceBucketId = "under-70" | "70-90" | "90-110" | "over-110";

export const PRICE_BUCKETS: {
  id: PriceBucketId;
  label: string;
  min: number;
  max: number;
}[] = [
  { id: "under-70", label: "Under ₹70K", min: 0, max: 69_999 },
  { id: "70-90", label: "₹70K — ₹90K", min: 70_000, max: 89_999 },
  { id: "90-110", label: "₹90K — ₹1.1L", min: 90_000, max: 109_999 },
  { id: "over-110", label: "Over ₹1.1L", min: 110_000, max: Number.POSITIVE_INFINITY },
];

export const SORTERS: Record<SortKey, (a: MasterpieceProduct, b: MasterpieceProduct) => number> = {
  featured: () => 0,
  "price-asc": (a, b) => a.priceValue - b.priceValue,
  "price-desc": (a, b) => b.priceValue - a.priceValue,
  "name-asc": (a, b) => a.title.localeCompare(b.title),
};

export function inBucket(value: number, bucketId: PriceBucketId): boolean {
  const bucket = PRICE_BUCKETS.find((b) => b.id === bucketId);
  if (!bucket) return true;
  return value >= bucket.min && value <= bucket.max;
}

export function applyFilters(
  products: MasterpieceProduct[],
  opts: {
    types: JewelryType[];
    bucket: PriceBucketId | null;
    sort: SortKey;
  }
): MasterpieceProduct[] {
  const { types, bucket, sort } = opts;
  let result = products;
  if (types.length > 0) {
    const typeSet = new Set(types);
    result = result.filter((p) => typeSet.has(p.jewelryType));
  }
  if (bucket) {
    result = result.filter((p) => inBucket(p.priceValue, bucket));
  }
  if (sort !== "featured") {
    result = [...result].sort(SORTERS[sort]);
  }
  return result;
}
