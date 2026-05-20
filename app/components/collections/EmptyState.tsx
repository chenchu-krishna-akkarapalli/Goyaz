"use client";

/**
 * EmptyState — shown when filters yield zero products.
 * Offers a one-click "Clear filters" escape.
 */
export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-[60px] lg:py-[120px] gap-[18px] text-(--color-dark)">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-40"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
        <path d="M14 8l-6 6M8 8l6 6" strokeOpacity="0.5" />
      </svg>
      <div className="flex flex-col gap-[6px]">
        <p className="font-display text-[20px] lg:text-[28px] leading-tight">
          No pieces match your selection
        </p>
        <p className="font-sans text-[12px] lg:text-[14px] opacity-70 max-w-[320px]">
          Try clearing a filter or browsing a different category.
        </p>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="font-sans mt-[6px] bg-(--color-dark) text-white px-[24px] lg:px-[40px] py-[12px] lg:py-[16px] text-[12px] lg:text-[14px] uppercase tracking-wide hover:bg-black transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
