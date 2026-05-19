import { type ReactNode } from "react";
import { LeftReveal, RightReveal } from "../utils/animations";

interface SectionHeadingProps {
  left: string;
  right?: string;
  rightSlot?: ReactNode;
  className?: string;
  delay?: number;
  leftRevealClassName?: string;
  rightRevealClassName?: string;
}

export function SectionHeading({
  left,
  right,
  rightSlot,
  className = "flex justify-between items-start w-full overflow-hidden",
  delay = 0,
  leftRevealClassName,
  rightRevealClassName,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <LeftReveal delay={delay} className={leftRevealClassName}>
        <p
          style={{ fontFamily: "'Futura PT', sans-serif" }}
          className="text-[14px] lg:text-[20px] text-black uppercase whitespace-nowrap font-medium"
        >
          {left}
        </p>
      </LeftReveal>

      {(right || rightSlot) && (
        <RightReveal delay={delay} className={rightRevealClassName}>
          {rightSlot ?? (
            <p
              style={{ fontFamily: "'Futura PT', sans-serif" }}
              className="text-[11px] lg:text-[16px] text-black uppercase whitespace-nowrap opacity-60"
            >
              {right}
            </p>
          )}
        </RightReveal>
      )}
    </div>
  );
}
