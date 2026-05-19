"use client";

import { DirectionalReveal } from "../utils/animations";

interface PageHeaderProps {
  /** Small label above the main title (e.g. "Silver Jeweler") */
  subtitle?: string;
  /** Main page title */
  title: string;
  /** Optional numeric count shown superscript next to the title */
  count?: number;
  /** Optional slot rendered on the right side (e.g. Filters & Sorting) */
  rightSlot?: React.ReactNode;
}

/**
 * PageHeader
 * Global sticky page-header bar used across collection pages.
 * Sticks to the top edge (top-0) — sits flush where the navbar was
 * after the navbar hides on scroll-down.
 */
export function PageHeader({
  subtitle,
  title,
  count,
  rightSlot,
}: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-white w-full border-b border-[#f0f0f0]">
      <div className="layout-container">
        <div className="layout-inner py-[25px] flex items-center justify-between">

          {/* Left — subtitle + title (optionally with count) */}
          <DirectionalReveal direction="left">
            <div className="font-sans flex flex-col gap-[16px] lg:gap-[30px] items-start text-(--color-dark) leading-[96.8%]">
              {subtitle && (
                <p className="text-[14px] lg:text-[16px]">{subtitle}</p>
              )}
              <div className="flex items-start whitespace-nowrap">
                <p className="text-[28px] md:text-[40px] lg:text-[48px]">{title}</p>
                {count !== undefined && (
                  <p className="text-[14px] lg:text-[16px] mt-1 lg:mt-2 ml-1">{count}</p>
                )}
              </div>
            </div>
          </DirectionalReveal>

          {/* Right — optional slot */}
          {rightSlot && (
            <DirectionalReveal direction="right">
              {rightSlot}
            </DirectionalReveal>
          )}

        </div>
      </div>
    </div>
  );
}
