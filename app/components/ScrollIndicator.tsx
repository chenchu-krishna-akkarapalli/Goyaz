"use client";

import { MouseEvent } from "react";

type ScrollIndicatorProps = {
  targetId: string;
  className?: string;
};

export function ScrollIndicator({ targetId, className = "" }: ScrollIndicatorProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      aria-label="Scroll to main sections"
      className={`scroll-indicator absolute bottom-[34px] left-1/2 z-20 flex h-[48px] w-[30px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white/80 bg-black/12 backdrop-blur-[1px] hover:border-white transition-colors duration-300 ${className}`}
      onClick={handleClick}
      type="button"
    >
      <span className="relative flex h-full w-full items-start justify-center pt-[8px]">
        <span className="h-[8px] w-[4px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </span>
    </button>
  );
}
