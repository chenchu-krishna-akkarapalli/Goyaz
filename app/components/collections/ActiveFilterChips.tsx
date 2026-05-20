"use client";

import type { JewelryType } from "../../data/masterpieces";
import {
  PRICE_BUCKETS,
  SORT_OPTIONS,
  type PriceBucketId,
  type SortKey,
} from "./filterTypes";

type Props = {
  sort: SortKey;
  types: JewelryType[];
  bucket: PriceBucketId | null;
  onResetSort: () => void;
  onRemoveType: (t: JewelryType) => void;
  onResetBucket: () => void;
  onClearAll: () => void;
};

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="font-sans inline-flex items-center gap-[6px] px-[10px] py-[5px] lg:px-[12px] lg:py-[6px] bg-(--color-dark) text-white text-[11px] lg:text-[12px] rounded-full whitespace-nowrap">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="opacity-80 hover:opacity-100 transition-opacity"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

export function ActiveFilterChips({
  sort,
  types,
  bucket,
  onResetSort,
  onRemoveType,
  onResetBucket,
  onClearAll,
}: Props) {
  const sortLabel = SORT_OPTIONS.find((s) => s.id === sort)?.label;
  const bucketLabel = PRICE_BUCKETS.find((b) => b.id === bucket)?.label;
  const hasAny = sort !== "featured" || types.length > 0 || bucket !== null;

  if (!hasAny) return null;

  return (
    <div className="layout-container">
      <div className="layout-inner pt-[10px] lg:pt-[14px] pb-[2px]">
        <div
          data-lenis-prevent
          className="flex items-center gap-[8px] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {sort !== "featured" && sortLabel && (
            <Chip label={sortLabel} onRemove={onResetSort} />
          )}
          {types.map((t) => (
            <Chip key={t} label={t} onRemove={() => onRemoveType(t)} />
          ))}
          {bucket && bucketLabel && (
            <Chip label={bucketLabel} onRemove={onResetBucket} />
          )}
          <button
            type="button"
            onClick={onClearAll}
            className="font-sans flex-shrink-0 text-[11px] lg:text-[12px] text-(--color-dark)/70 hover:text-(--color-dark) underline underline-offset-2 transition-colors ml-[4px]"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
