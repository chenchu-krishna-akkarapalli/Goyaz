"use client";

import { useMemo, useState } from "react";
import type { JewelryType, MasterpieceProduct } from "../../data/masterpieces";
import { PageHeader } from "../PageHeader";
import { BentoGrid } from "./BentoGrid";
import { UniformGrid } from "./UniformGrid";
import { FilterDrawer } from "./FilterDrawer";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { EmptyState } from "./EmptyState";
import { applyFilters, type PriceBucketId, type SortKey } from "./filterTypes";

type Props = {
  category: string;
  products: MasterpieceProduct[];
};

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 6h18M6 12h12M10 18h4" />
    </svg>
  );
}

/**
 * CollectionExplorer
 *
 * Single client tree owning the filter + sort state for a category page.
 * Renders PageHeader (with the trigger button), an active-filter chip row,
 * the product grid (bento by default, uniform when filtered), and the
 * slide-in FilterDrawer.
 */
export function CollectionExplorer({ category, products }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [types, setTypes] = useState<JewelryType[]>([]);
  const [bucket, setBucket] = useState<PriceBucketId | null>(null);

  const availableTypes = useMemo<JewelryType[]>(() => {
    const set = new Set<JewelryType>();
    products.forEach((p) => set.add(p.jewelryType));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(
    () => applyFilters(products, { types, bucket, sort }),
    [products, types, bucket, sort]
  );

  const hasFilters = sort !== "featured" || types.length > 0 || bucket !== null;
  const activeFilterCount = types.length + (bucket ? 1 : 0) + (sort !== "featured" ? 1 : 0);

  const clearAll = () => {
    setSort("featured");
    setTypes([]);
    setBucket(null);
  };

  return (
    <>
      <PageHeader
        subtitle="Silver Jeweler"
        title={category}
        count={filtered.length}
        rightSlot={
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="group flex flex-col gap-[3px] items-end cursor-pointer"
            aria-label="Open filters and sorting"
          >
            <span className="font-sans text-(--color-dark) text-[12px] lg:text-[16px] leading-[96.8%] group-hover:opacity-70 transition-opacity flex items-center gap-[6px] lg:gap-[8px]">
              <FilterIcon />
              <span>Filters &amp; Sorting</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px] bg-(--color-dark) text-white text-[10px] rounded-full leading-none">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <span className="w-full h-[1px] bg-(--color-dark)" />
          </button>
        }
      />

      <ActiveFilterChips
        sort={sort}
        types={types}
        bucket={bucket}
        onResetSort={() => setSort("featured")}
        onRemoveType={(t) => setTypes(types.filter((x) => x !== t))}
        onResetBucket={() => setBucket(null)}
        onClearAll={clearAll}
      />

      <div className="layout-container py-5">
        <div className="layout-inner">
          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : hasFilters ? (
            <UniformGrid products={filtered} />
          ) : (
            <BentoGrid products={filtered} />
          )}
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sort={sort}
        onSortChange={setSort}
        types={types}
        onTypesChange={setTypes}
        bucket={bucket}
        onBucketChange={setBucket}
        resultCount={filtered.length}
        onClearAll={clearAll}
        availableTypes={availableTypes}
      />
    </>
  );
}
