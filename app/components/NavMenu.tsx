"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  NAV_MENU_ACCOUNT_LINKS,
  NAV_MENU_SECONDARY_LINKS,
  NAV_MENU_SECTIONS,
} from "../data/navMenu";
import { ANIMATION_CLASSES, useReducedMotion } from "../utils/animations";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SECTION_ID = "collections";

function itemStyle(
  index: number,
  baseDelay: number,
  staggerMs: number,
  isOpen: boolean,
  reduced: boolean,
  animName = "navItemSlideUp"
): CSSProperties {
  if (reduced || !isOpen) {
    return {};
  }

  return {
    animation: `${animName} 0.5s cubic-bezier(0.16,1,0.3,1) ${baseDelay + index * staggerMs}ms both`,
    willChange: "opacity, transform",
  };
}

function imageStyle(isOpen: boolean, reduced: boolean): CSSProperties {
  if (reduced || !isOpen) {
    return {};
  }

  return {
    animation: "navImageReveal 0.65s cubic-bezier(0.16,1,0.3,1) 180ms both",
    willChange: "opacity, transform",
  };
}

function cardStyle(index: number, isOpen: boolean, reduced: boolean): CSSProperties {
  if (reduced || !isOpen) {
    return {};
  }

  return {
    animation: `navCardReveal 0.55s cubic-bezier(0.16,1,0.3,1) ${260 + index * 80}ms both`,
    willChange: "opacity, transform",
  };
}

function contentSwapStyle(isOpen: boolean, reduced: boolean, delayMs = 0): CSSProperties {
  if (reduced || !isOpen) {
    return {};
  }

  return {
    animation: `navItemSlideRight 0.72s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms both`,
    willChange: "opacity, transform",
  };
}

const futuraFont: CSSProperties = {
  lineHeight: "96.8%",
};

const ArrowRight = () => (
  <svg width="10" height="10" viewBox="0 0 1024 1024" fill="black" aria-hidden>
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
  </svg>
);

export function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const reduced = useReducedMotion();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(DEFAULT_SECTION_ID);
  const [childPanesVisible, setChildPanesVisible] = useState(false);
  const revealTimerRef = useRef<number | null>(null);

  const activeSection =
    NAV_MENU_SECTIONS.find((section) => section.id === activeSectionId) ?? null;

  function clearRevealTimer() {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }

  function scheduleChildReveal(nextSectionId?: string, delayMs = 60) {
    clearRevealTimer();
    revealTimerRef.current = window.setTimeout(() => {
      if (nextSectionId) {
        setActiveSectionId(nextSectionId);
      }
      setChildPanesVisible(true);
      revealTimerRef.current = null;
    }, delayMs);
  }

  function handleSectionSelect(nextSectionId: string) {
    if (nextSectionId === activeSectionId && childPanesVisible) {
      return;
    }

    if (reduced || !isOpen) {
      clearRevealTimer();
      setActiveSectionId(nextSectionId);
      setChildPanesVisible(true);
      return;
    }

    scheduleChildReveal(nextSectionId, 120);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    clearRevealTimer();

    if (!isOpen) {
      return;
    }

    return () => {
      clearRevealTimer();
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearRevealTimer();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setChildPanesVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || reduced) {
      return;
    }

    const preloadImages = NAV_MENU_SECTIONS.flatMap((section) => [
      section.featured.image,
      ...section.cards.map((card) => card.image),
    ]);

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isOpen, reduced]);

  const panelClass = reduced
    ? ""
    : isOpen
      ? ANIMATION_CLASSES.navMenuPanel
      : ANIMATION_CLASSES.navMenuPanelExit;

  const backdropClass = reduced
    ? ""
    : isOpen
      ? ANIMATION_CLASSES.navBackdrop
      : ANIMATION_CLASSES.navBackdropExit;

  const showChildPanes = isOpen && childPanesVisible && activeSection !== null;
  const showListPanel =
    !!activeSection &&
    activeSection.childPanelMode !== "cards-only" &&
    activeSection.subCategories.length > 0;
  const showCardsPanel =
    !!activeSection &&
    activeSection.childPanelMode !== "list-only" &&
    activeSection.cards.length > 0;
  const childPanelWidth = showListPanel && showCardsPanel ? 880 : showCardsPanel ? 640 : 240;

  return (
    <div className="fixed inset-0 z-[100] flex" aria-modal="true" role="dialog">
      <div
        className={`relative h-screen overflow-hidden bg-white w-full lg:w-[280px] ${panelClass}`}
        style={{ maxWidth: "100vw" }}
      >
        <div className="font-sans relative h-full flex-none border-r border-black/10 bg-white w-full lg:w-[280px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-[40px] top-[23px] flex items-end gap-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-60"
            aria-label="Close navigation menu"
          >
            <svg width="16" height="16" viewBox="0 0 1024 1024" fill="black" aria-hidden>
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
            <span className="whitespace-nowrap text-[14px] uppercase text-black" style={futuraFont}>
              Close
            </span>
          </button>

          <div className="nav-menu-scrollbar absolute inset-x-0 bottom-[118px] top-[88px] overflow-y-auto pr-4">
            <div className="pl-[40px] pr-4">
              <div className="flex w-[199px] flex-col gap-[100px] uppercase" style={futuraFont}>
                <div className="flex w-full flex-col items-start gap-[30px] text-[20px]">
                    {NAV_MENU_SECTIONS.map((section, index) => {
                      const isActive = section.id === activeSectionId;

                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => handleSectionSelect(section.id)}
                          className={`w-full text-left uppercase transition-opacity duration-200 hover:opacity-60 ${
                            isActive ? "text-black" : "text-[#4f4f4f]"
                          }`}
                          style={itemStyle(index, 120, 55, isOpen, reduced)}
                        >
                          {section.label}
                        </button>
                      );
                    })}
                </div>

                <div className="flex w-[122px] flex-col items-start gap-[30px] text-[16px] text-[#4f4f4f]">
                  {NAV_MENU_SECONDARY_LINKS.map((link, index) => (
                    <button
                      key={link}
                      type="button"
                      className="w-full text-left uppercase transition-opacity duration-200 hover:opacity-60"
                      style={itemStyle(index, 505, 40, isOpen, reduced)}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-[40px] w-[199px]">
            <div
              className="h-px w-full bg-black"
              style={
                reduced || !isOpen
                  ? {}
                  : {
                      animation: "navItemSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 660ms both",
                    }
              }
            />

            <div className="mt-[30px] flex flex-col items-start gap-[20px] text-[14px] uppercase text-[#4f4f4f]" style={futuraFont}>
              {NAV_MENU_ACCOUNT_LINKS.map((link, index) => (
                <button
                  key={link}
                  type="button"
                  className="text-left uppercase transition-opacity duration-200 hover:opacity-60"
                  style={itemStyle(index, 690, 40, isOpen, reduced)}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showChildPanes && activeSection && (
        <div
          key={`child-panel-${activeSection.id}`}
          className={`font-sans hidden lg:flex relative h-screen overflow-hidden bg-white ${
            reduced ? "" : ANIMATION_CLASSES.navChildPanelRise
          }`}
          style={{
            width: `${childPanelWidth}px`,
            maxWidth: 'calc(100vw - 280px)',
          }}
        >
          {showListPanel && (
            <div
              className={`relative h-full overflow-hidden ${
                showCardsPanel ? "flex-none border-r border-black" : "flex-1"
              } ${reduced ? "" : ANIMATION_CLASSES.navChildListIn}`}
              style={{ width: showCardsPanel ? "240px" : "100%" }}
            >
              <div className="absolute left-[40px] top-[100px] flex w-[145px] flex-col gap-[40px]">
                <div className="flex flex-col items-start gap-[20px] text-[15px] uppercase text-black" style={futuraFont}>
                  {activeSection.subCategories.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      className="text-left uppercase transition-opacity duration-200 hover:opacity-60"
                      style={itemStyle(index, 220, 55, true, reduced, "navItemSlideRight")}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="flex items-center gap-[5px] transition-opacity duration-200 hover:opacity-60"
                  style={itemStyle(0, 500, 0, true, reduced)}
                >
                  <span className="whitespace-nowrap text-[13px] uppercase text-black" style={futuraFont}>
                    {activeSection.ctaLabel}
                  </span>
                  <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {showCardsPanel && (
            <div className={`relative h-full flex-1 overflow-hidden ${reduced ? "" : ANIMATION_CLASSES.navChildCardsIn}`}>
            <div className="absolute right-0 top-[100px] flex items-center gap-[5px] pr-[20px]" style={contentSwapStyle(true, reduced, 180)}>
              <button
                type="button"
                className="flex items-center gap-[5px] transition-opacity duration-200 hover:opacity-60"
              >
                <span className="whitespace-nowrap text-[13px] uppercase text-black" style={futuraFont}>
                  {activeSection.ctaLabel}
                </span>
                <ArrowRight />
              </button>
            </div>

            <div className="nav-menu-scrollbar absolute bottom-6 left-0 right-0 top-[125px] overflow-y-auto px-[40px] pr-[22px]">
              <div
                key={activeSection.id}
                className="flex flex-col gap-[20px] pb-8"
                style={contentSwapStyle(true, reduced, 260)}
              >
                <div
                  className="relative h-[318px] w-full overflow-hidden rounded-[30px]"
                  style={imageStyle(true, reduced)}
                >
                  <img
                    alt={activeSection.featured.title}
                    className="pointer-events-none absolute inset-0 h-full w-full rounded-[30px] object-cover"
                    src={activeSection.featured.image}
                   loading="lazy" decoding="async" />
                  <div className="absolute bottom-[45px] right-[20px] flex w-[195px] flex-col items-end gap-[5px] text-center text-white">
                    <p className="font-display w-full text-[16px] uppercase">
                      {activeSection.featured.title}
                    </p>
                    <p className="w-full text-[12px] uppercase" style={futuraFont}>
                      {activeSection.featured.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[20px]">
                  <div className="flex items-center gap-[20px]">
                    {activeSection.cards.slice(0, 2).map((card, index) => (
                      <div
                        key={`${activeSection.id}-${card.label}`}
                        className={`relative aspect-square flex-1 rounded-[30px] border border-black border-solid group cursor-pointer`}
                        style={cardStyle(index, true, reduced)}
                      >
                        <div className="absolute inset-0 overflow-hidden rounded-[30px]">
                          <img
                            alt={card.label}
                            className={`pointer-events-none h-full w-full object-cover ${ANIMATION_CLASSES.hoverZoomImg}`}
                            src={card.image}
                           loading="lazy" decoding="async" />
                        </div>
                        <button
                          type="button"
                          className={`group/btn absolute bottom-[16px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-[10px] border border-black/10 bg-white px-[14px] py-[7px] transition-[background-color,color,opacity,box-shadow] duration-300 hover:bg-black hover:text-white hover:shadow-[0_0_0_2px_rgba(0,0,0,0.18)] ${ANIMATION_CLASSES.pressable} ${ANIMATION_CLASSES.hoverLift}`}
                        >
                          <span className="whitespace-nowrap text-[12px] uppercase text-black transition-colors duration-300 group-hover/btn:text-white" style={futuraFont}>
                            {card.label}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-[20px]">
                    {activeSection.cards.slice(2, 4).map((card, index) => (
                      <div
                        key={`${activeSection.id}-${card.label}-secondary`}
                        className={`relative aspect-square flex-1 rounded-[30px] border border-black border-solid group cursor-pointer`}
                        style={cardStyle(index + 2, true, reduced)}
                      >
                        <div className="absolute inset-0 overflow-hidden rounded-[30px]">
                          <img
                            alt={card.label}
                            className={`pointer-events-none h-full w-full object-cover ${ANIMATION_CLASSES.hoverZoomImg}`}
                            src={card.image}
                           loading="lazy" decoding="async" />
                        </div>
                        <button
                          type="button"
                          className={`group/btn absolute bottom-[16px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-[10px] border border-black/10 bg-white px-[14px] py-[7px] transition-[background-color,color,opacity,box-shadow] duration-300 hover:bg-black hover:text-white hover:shadow-[0_0_0_2px_rgba(0,0,0,0.18)] ${ANIMATION_CLASSES.pressable} ${ANIMATION_CLASSES.hoverLift}`}
                        >
                          <span className="whitespace-nowrap text-[12px] uppercase text-black transition-colors duration-300 group-hover/btn:text-white" style={futuraFont}>
                            {card.label}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      )}

      <div
        className={`flex-1 cursor-pointer ${backdropClass}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}
