"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ANIMATION_CLASSES,
  useDelayedUnmount,
} from "../../utils/animations";
import { JEWELRY_TYPES, type JewelryType } from "../../data/masterpieces";
import {
  PRICE_BUCKETS,
  SORT_OPTIONS,
  type PriceBucketId,
  type SortKey,
} from "./filterTypes";

type Props = {
  open: boolean;
  onClose: () => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  types: JewelryType[];
  onTypesChange: (t: JewelryType[]) => void;
  bucket: PriceBucketId | null;
  onBucketChange: (b: PriceBucketId | null) => void;
  resultCount: number;
  onClearAll: () => void;
  /** Only show jewelry types that actually appear in the current category. */
  availableTypes: JewelryType[];
};

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckDot({ checked }: { checked: boolean }) {
  return (
    <span
      className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
        checked ? "border-(--color-dark) bg-(--color-dark)" : "border-(--color-dark)/30"
      }`}
    >
      {checked && <span className="w-[6px] h-[6px] rounded-full bg-white" />}
    </span>
  );
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#e8e8e8] py-[18px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-(--color-dark)"
      >
        <span className="font-sans text-[14px] lg:text-[15px] uppercase tracking-[0.06em]">
          {title}
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="mt-[14px]">{children}</div>}
    </div>
  );
}

export function FilterDrawer({
  open,
  onClose,
  sort,
  onSortChange,
  types,
  onTypesChange,
  bucket,
  onBucketChange,
  resultCount,
  onClearAll,
  availableTypes,
}: Props) {
  const shouldRender = useDelayedUnmount(open, 450);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock page scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!mounted || !shouldRender) return null;

  const toggleType = (t: JewelryType) => {
    onTypesChange(types.includes(t) ? types.filter((x) => x !== t) : [...types, t]);
  };

  // Portalled into document.body so it escapes the [data-mfe="main"]
  // isolation: isolate stacking context that would trap z-index comparisons.
  return createPortal(
    <div
      className="fixed inset-0 z-[200]"
      aria-modal="true"
      role="dialog"
      aria-label="Filters and sorting"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 ${
          open ? ANIMATION_CLASSES.cartBackdropIn : ANIMATION_CLASSES.cartBackdropOut
        }`}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:max-w-[440px] bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.15)] flex flex-col ${
          open ? ANIMATION_CLASSES.cartDrawerIn : ANIMATION_CLASSES.cartDrawerOut
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] lg:px-[30px] py-[18px] lg:py-[24px] border-b border-[#e8e8e8] flex-shrink-0">
          <div className="flex flex-col gap-[2px] text-(--color-dark)">
            <p className="font-display text-[22px] lg:text-[26px] leading-none">Refine</p>
            <p className="font-sans text-[11px] lg:text-[12px] opacity-60 uppercase tracking-wide">
              {resultCount} {resultCount === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="text-(--color-dark) p-[6px] rounded-full hover:bg-[#f3f3f3] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div
          data-lenis-prevent
          className="font-sans flex-1 overflow-y-auto nav-menu-scrollbar px-[20px] lg:px-[30px]"
        >
          {/* Sort */}
          <Section title="Sort by">
            <div className="flex flex-col gap-[12px]">
              {SORT_OPTIONS.map((opt) => {
                const checked = sort === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSortChange(opt.id)}
                    className="flex items-center gap-[12px] text-left text-(--color-dark)"
                  >
                    <CheckDot checked={checked} />
                    <span className={`text-[13px] lg:text-[14px] ${checked ? "font-medium" : "opacity-80"}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Jewelry Type */}
          <Section title="Jewelry type">
            <div className="flex flex-wrap gap-[8px]">
              {JEWELRY_TYPES.filter((t) => availableTypes.includes(t)).map((t) => {
                const active = types.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleType(t)}
                    className={`px-[14px] py-[8px] text-[12px] lg:text-[13px] rounded-full border transition-colors ${
                      active
                        ? "bg-(--color-dark) text-white border-(--color-dark)"
                        : "bg-white text-(--color-dark) border-(--color-dark)/25 hover:border-(--color-dark)"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Price */}
          <Section title="Price">
            <div className="grid grid-cols-2 gap-[10px]">
              {PRICE_BUCKETS.map((b) => {
                const active = bucket === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onBucketChange(active ? null : b.id)}
                    className={`px-[12px] py-[12px] text-[12px] lg:text-[13px] border transition-colors text-center ${
                      active
                        ? "bg-(--color-dark) text-white border-(--color-dark)"
                        : "bg-white text-(--color-dark) border-(--color-dark)/25 hover:border-(--color-dark)"
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Spacer to keep last section's bottom border visible above footer */}
          <div className="h-[20px]" />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-[#e8e8e8] px-[20px] lg:px-[30px] py-[16px] lg:py-[20px] flex flex-col gap-[10px] bg-white">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClearAll}
              className="font-sans text-[12px] lg:text-[13px] text-(--color-dark)/70 hover:text-(--color-dark) underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
            <span className="font-sans text-[11px] lg:text-[12px] text-(--color-dark)/60 uppercase tracking-wide">
              {resultCount} {resultCount === 1 ? "result" : "results"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-(--color-dark) text-white py-[14px] lg:py-[16px] text-[13px] lg:text-[15px] uppercase tracking-wide hover:bg-black transition-colors"
          >
            {resultCount === 0 ? "Adjust filters" : `Show ${resultCount} ${resultCount === 1 ? "piece" : "pieces"}`}
          </button>
        </div>
      </aside>
    </div>,
    document.body
  );
}
