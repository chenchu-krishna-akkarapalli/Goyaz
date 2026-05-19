"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  if (reduced || !isOpen) return {};
  return {
    animation: `${animName} 0.5s cubic-bezier(0.16,1,0.3,1) ${baseDelay + index * staggerMs}ms both`,
    willChange: "opacity, transform",
  };
}

function imageStyle(isOpen: boolean, reduced: boolean): CSSProperties {
  if (reduced || !isOpen) return {};
  return {
    animation: "navImageReveal 0.65s cubic-bezier(0.16,1,0.3,1) 180ms both",
    willChange: "opacity, transform",
  };
}

function cardStyle(index: number, isOpen: boolean, reduced: boolean): CSSProperties {
  if (reduced || !isOpen) return {};
  return {
    animation: `navCardReveal 0.55s cubic-bezier(0.16,1,0.3,1) ${260 + index * 80}ms both`,
    willChange: "opacity, transform",
  };
}

function contentSwapStyle(isOpen: boolean, reduced: boolean, delayMs = 0): CSSProperties {
  if (reduced || !isOpen) return {};
  return {
    animation: `navItemSlideRight 0.72s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms both`,
    willChange: "opacity, transform",
  };
}

const futuraFont: CSSProperties = { lineHeight: "96.8%" };

const ArrowRight = () => (
  <svg width="10" height="10" viewBox="0 0 1024 1024" fill="black" aria-hidden>
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
  </svg>
);

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 1024 1024" fill="black" aria-hidden style={{ transform: "rotate(180deg)" }}>
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 1024 1024" fill="black" aria-hidden>
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

// Exit animation duration — must match navChildPanelSlideOut keyframe timing
const SLIDE_OUT_MS = 650;

export function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const reduced = useReducedMotion();

  // Level 1 → 2 (section drill)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(DEFAULT_SECTION_ID);
  const [childPanesVisible, setChildPanesVisible] = useState(false);
  const [mobileDrillOpen, setMobileDrillOpen] = useState(false);
  const [mobileDrillExiting, setMobileDrillExiting] = useState(false);

  // Level 2 → 3 (sub-cat drill, mobile only)
  const [mobileLevel3Open, setMobileLevel3Open] = useState(false);
  const [mobileLevel3Exiting, setMobileLevel3Exiting] = useState(false);
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);

  const revealTimerRef = useRef<number | null>(null);
  const exitTimerRef   = useRef<number | null>(null);
  const exit3TimerRef  = useRef<number | null>(null);

  const activeSection =
    NAV_MENU_SECTIONS.find((s) => s.id === activeSectionId) ?? null;

  function clearRevealTimer() {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }

  function scheduleChildReveal(nextSectionId?: string, delayMs = 60) {
    clearRevealTimer();
    revealTimerRef.current = window.setTimeout(() => {
      if (nextSectionId) setActiveSectionId(nextSectionId);
      setChildPanesVisible(true);
      revealTimerRef.current = null;
    }, delayMs);
  }

  // ── Level 1 → 2 ──────────────────────────────────────────────
  function handleSectionSelect(nextSectionId: string) {
    setMobileDrillExiting(false);
    setMobileDrillOpen(true);
    setMobileLevel3Open(false);
    setMobileLevel3Exiting(false);
    setSelectedSubCat(null);

    if (nextSectionId === activeSectionId && childPanesVisible) return;

    if (reduced || !isOpen) {
      clearRevealTimer();
      setActiveSectionId(nextSectionId);
      setChildPanesVisible(true);
      return;
    }
    scheduleChildReveal(nextSectionId, 120);
  }

  function handleMobileBack() {
    if (reduced) {
      setMobileDrillOpen(false);
      setMobileDrillExiting(false);
      return;
    }
    setMobileDrillExiting(true);
    if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    exitTimerRef.current = window.setTimeout(() => {
      setMobileDrillOpen(false);
      setMobileDrillExiting(false);
      exitTimerRef.current = null;
    }, SLIDE_OUT_MS);
  }

  // ── Level 2 → 3 (sub-cat tap, mobile only) ───────────────────
  function handleSubCatSelect(subCat: string) {
    setSelectedSubCat(subCat);
    setMobileLevel3Exiting(false);
    setMobileLevel3Open(true);
  }

  function handleMobileLevel3Back() {
    if (reduced) {
      setMobileLevel3Open(false);
      setMobileLevel3Exiting(false);
      return;
    }
    setMobileLevel3Exiting(true);
    if (exit3TimerRef.current !== null) window.clearTimeout(exit3TimerRef.current);
    exit3TimerRef.current = window.setTimeout(() => {
      setMobileLevel3Open(false);
      setMobileLevel3Exiting(false);
      exit3TimerRef.current = null;
    }, SLIDE_OUT_MS);
  }

  // ── Lifecycle cleanup ─────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    clearRevealTimer();
    if (!isOpen) return;
    return () => { clearRevealTimer(); };
  }, [isOpen]);

  useEffect(() => () => { clearRevealTimer(); }, []);

  useEffect(() => {
    if (!isOpen) {
      setChildPanesVisible(false);
      setMobileDrillOpen(false);
      setMobileDrillExiting(false);
      setMobileLevel3Open(false);
      setMobileLevel3Exiting(false);
      setSelectedSubCat(null);
      if (exitTimerRef.current !== null)  { window.clearTimeout(exitTimerRef.current);  exitTimerRef.current  = null; }
      if (exit3TimerRef.current !== null) { window.clearTimeout(exit3TimerRef.current); exit3TimerRef.current = null; }
    }
  }, [isOpen]);

  useEffect(() => () => {
    if (exitTimerRef.current !== null)  window.clearTimeout(exitTimerRef.current);
    if (exit3TimerRef.current !== null) window.clearTimeout(exit3TimerRef.current);
  }, []);

  useEffect(() => {
    if (!isOpen || reduced) return;
    NAV_MENU_SECTIONS.flatMap((s) => [s.featured.image, ...s.cards.map((c) => c.image)])
      .forEach((src) => { const img = new Image(); img.src = src; });
  }, [isOpen, reduced]);

  // ── Derived flags ─────────────────────────────────────────────
  const panelClass = reduced ? "" : isOpen ? ANIMATION_CLASSES.navMenuPanel : ANIMATION_CLASSES.navMenuPanelExit;
  const backdropClass = reduced ? "" : isOpen ? ANIMATION_CLASSES.navBackdrop : ANIMATION_CLASSES.navBackdropExit;

  const showChildPanes = isOpen && childPanesVisible && activeSection !== null;
  const showListPanel  = !!activeSection && activeSection.childPanelMode !== "cards-only" && activeSection.subCategories.length > 0;
  const showCardsPanel = !!activeSection && activeSection.childPanelMode !== "list-only"  && activeSection.cards.length > 0;
  const childPanelWidth = showListPanel && showCardsPanel ? 880 : showCardsPanel ? 640 : 240;
  // On mobile, cards live in the level-3 overlay (when list also exists)
  const mobileCardsHidden = showListPanel && showCardsPanel;

  // ── Shared cards content (desktop panel + mobile level-3) ─────
  const CardsContent = ({ animKey }: { animKey: string }) => (
    <div key={animKey} className="flex flex-col gap-[20px] pb-8" style={contentSwapStyle(true, reduced, 260)}>
      {/* Featured image */}
      <Link
        href={activeSection!.ctaHref}
        onClick={onClose}
        className="relative h-[220px] sm:h-[280px] lg:h-[318px] w-full overflow-hidden rounded-[20px] lg:rounded-[30px] block"
        style={imageStyle(true, reduced)}
      >
        <img
          alt={activeSection!.featured.title}
          className="pointer-events-none absolute inset-0 h-full w-full rounded-[20px] lg:rounded-[30px] object-cover"
          src={activeSection!.featured.image}
          loading="lazy" decoding="async"
        />
        <div className="absolute bottom-[45px] right-[20px] flex w-[195px] flex-col items-end gap-[5px] text-center text-white">
          <p className="font-display w-full text-[16px] uppercase">{activeSection!.featured.title}</p>
          <p className="w-full text-[12px] uppercase" style={futuraFont}>{activeSection!.featured.description}</p>
        </div>
      </Link>

      {/* 2×2 cards */}
      <div className="flex flex-col gap-[20px]">
        {[activeSection!.cards.slice(0, 2), activeSection!.cards.slice(2, 4)].map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-[20px]">
            {row.map((card, index) => (
              <Link
                key={card.label}
                href={card.href}
                onClick={onClose}
                className="relative aspect-square flex-1 rounded-[20px] lg:rounded-[30px] border border-black border-solid group cursor-pointer block"
                style={cardStyle(rowIdx * 2 + index, true, reduced)}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[20px] lg:rounded-[30px]">
                  <img
                    alt={card.label}
                    className={`pointer-events-none h-full w-full object-cover ${ANIMATION_CLASSES.hoverZoomImg}`}
                    src={card.image}
                    loading="lazy" decoding="async"
                  />
                </div>
                <div
                  className={`group/btn absolute bottom-[16px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-[10px] border border-black/10 bg-white px-[14px] py-[7px] transition-[background-color,color,opacity,box-shadow] duration-300 hover:bg-black hover:shadow-[0_0_0_2px_rgba(0,0,0,0.18)] ${ANIMATION_CLASSES.pressable} ${ANIMATION_CLASSES.hoverLift}`}
                >
                  <span className="whitespace-nowrap text-[12px] uppercase text-black transition-colors duration-300 group-hover/btn:text-white" style={futuraFont}>
                    {card.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex" aria-modal="true" role="dialog">

      {/* ── Level 1: Sections list ── */}
      <div
        className={`relative h-screen overflow-hidden bg-white w-full lg:w-[280px] ${panelClass}`}
        style={{ maxWidth: "100vw" }}
      >
        <div className="font-sans relative h-full flex-none border-r border-black/10 bg-white w-full lg:w-[280px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-[20px] lg:left-[40px] top-[20px] lg:top-[23px] flex items-end gap-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-60"
            aria-label="Close navigation menu"
          >
            <svg width="16" height="16" viewBox="0 0 1024 1024" fill="black" aria-hidden>
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
            <span className="whitespace-nowrap text-[14px] uppercase text-black" style={futuraFont}>Close</span>
          </button>

          <div className="nav-menu-scrollbar absolute inset-x-0 bottom-[118px] top-[88px] overflow-y-auto pr-4">
            <div className="pl-[20px] lg:pl-[40px] pr-4">
              <div className="flex w-[199px] flex-col gap-[100px] uppercase" style={futuraFont}>
                {/* Primary section labels */}
                <div className="flex w-full flex-col items-start gap-[30px] text-[20px]">
                  {NAV_MENU_SECTIONS.map((section, index) => {
                    const isActive = section.id === activeSectionId;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleSectionSelect(section.id)}
                        className={`w-full text-left uppercase transition-opacity duration-200 hover:opacity-60 ${isActive ? "text-black" : "text-[#4f4f4f]"}`}
                        style={itemStyle(index, 120, 55, isOpen, reduced)}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </div>

                {/* Secondary links */}
                <div className="flex w-[122px] flex-col items-start gap-[30px] text-[16px] text-[#4f4f4f]">
                  {NAV_MENU_SECONDARY_LINKS.map((link, index) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="w-full text-left uppercase transition-opacity duration-200 hover:opacity-60"
                      style={itemStyle(index, 505, 40, isOpen, reduced)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account links */}
          <div className="absolute bottom-6 left-[20px] lg:left-[40px] w-[199px]">
            <div
              className="h-px w-full bg-black"
              style={reduced || !isOpen ? {} : { animation: "navItemSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 660ms both" }}
            />
            <div className="mt-[30px] flex flex-col items-start gap-[20px] text-[14px] uppercase text-[#4f4f4f]" style={futuraFont}>
              {NAV_MENU_ACCOUNT_LINKS.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="text-left uppercase transition-opacity duration-200 hover:opacity-60"
                  style={itemStyle(index, 690, 40, isOpen, reduced)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Level 2: Section child panel ── */}
      {showChildPanes && activeSection && (
        <div
          key={`child-panel-${activeSection.id}-${mobileDrillExiting ? "exit" : "enter"}`}
          className={`font-sans ${mobileDrillOpen ? "flex" : "hidden"} lg:flex absolute lg:relative inset-0 lg:inset-auto h-screen overflow-hidden bg-white w-full lg:w-[var(--child-w)] lg:max-w-[calc(100vw-280px)] z-30 lg:z-auto ${
            reduced
              ? ""
              : mobileDrillExiting
                ? ANIMATION_CLASSES.navChildPanelSlideOut
                : `${ANIMATION_CLASSES.navChildPanelSlideIn} lg:animate-[navChildPanelRise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]`
          }`}
          style={{ ["--child-w" as string]: `${childPanelWidth}px` } as CSSProperties}
        >
          {/* Mobile top bar: Back | Section label | Close */}
          <div className="lg:hidden absolute left-0 right-0 top-0 z-30 flex items-center justify-between bg-white px-[20px] h-[60px] border-b border-black/10">
            <button
              type="button"
              onClick={handleMobileBack}
              className="flex items-center gap-[6px] cursor-pointer transition-opacity duration-200 hover:opacity-60"
              aria-label="Back to menu"
            >
              <BackArrow />
              <span className="text-[13px] uppercase text-black" style={futuraFont}>Back</span>
            </button>
            <span className="text-[14px] uppercase text-black font-medium" style={futuraFont}>{activeSection.label}</span>
            <button type="button" onClick={onClose} className="cursor-pointer transition-opacity duration-200 hover:opacity-60" aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          {/* Mobile: sub-list TOP (order-1), cards hidden here (shown in level-3).
              Desktop: side-by-side panes, unchanged. */}
          <div className="flex w-full h-full flex-col lg:flex-row pt-[60px] lg:pt-0 overflow-y-auto lg:overflow-hidden nav-menu-scrollbar">

            {/* ── Sub-categories list — top on mobile (order-1), left on desktop ── */}
            {showListPanel && (
              <div
                className={`relative w-full lg:h-full overflow-visible lg:overflow-hidden order-1 ${
                  showCardsPanel ? "lg:flex-none lg:w-[240px] lg:border-r lg:border-black" : "lg:flex-1 lg:w-full"
                } ${reduced ? "" : ANIMATION_CLASSES.navChildListIn}`}
              >
                <div className="relative lg:absolute lg:left-[40px] lg:top-[100px] flex w-full lg:w-[145px] flex-col gap-[24px] lg:gap-[40px] px-[20px] lg:px-0 py-[24px] lg:py-0">
                  <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] text-[15px] uppercase text-black" style={futuraFont}>
                    {activeSection.subCategories.map((item, index) => (
                      <span key={item.label} style={itemStyle(index, 220, 55, true, reduced, "navItemSlideRight")} className="w-full">
                        {/* Desktop: always a navigating Link */}
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="hidden lg:block text-left uppercase transition-opacity duration-200 hover:opacity-60"
                        >
                          {item.label}
                        </Link>
                        {/* Mobile: open level-3 if cards exist, else navigate directly */}
                        {showCardsPanel ? (
                          <button
                            type="button"
                            onClick={() => handleSubCatSelect(item.label)}
                            className="flex lg:hidden items-center justify-between w-full text-left uppercase transition-opacity duration-200 hover:opacity-60"
                          >
                            <span>{item.label}</span>
                            <span className="opacity-40"><ArrowRight /></span>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex lg:hidden items-center justify-between w-full text-left uppercase transition-opacity duration-200 hover:opacity-60"
                          >
                            <span>{item.label}</span>
                          </Link>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={activeSection.ctaHref}
                    onClick={onClose}
                    className="flex items-center gap-[5px] transition-opacity duration-200 hover:opacity-60"
                    style={itemStyle(0, 500, 0, true, reduced)}
                  >
                    <span className="whitespace-nowrap text-[13px] uppercase text-black" style={futuraFont}>
                      {activeSection.ctaLabel}
                    </span>
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            )}

            {/* ── Cards panel — hidden on mobile when list exists; shown in level-3 ── */}
            {showCardsPanel && (
              <div
                className={`${mobileCardsHidden ? "hidden lg:block" : "block"} relative w-full lg:h-full lg:flex-1 overflow-visible lg:overflow-hidden order-2 ${reduced ? "" : ANIMATION_CLASSES.navChildCardsIn}`}
              >
                <div className="hidden lg:flex absolute right-0 top-[100px] items-center gap-[5px] pr-[20px]" style={contentSwapStyle(true, reduced, 180)}>
                  <Link
                    href={activeSection.ctaHref}
                    onClick={onClose}
                    className="flex items-center gap-[5px] transition-opacity duration-200 hover:opacity-60"
                  >
                    <span className="whitespace-nowrap text-[13px] uppercase text-black" style={futuraFont}>{activeSection.ctaLabel}</span>
                    <ArrowRight />
                  </Link>
                </div>

                <div className="nav-menu-scrollbar relative lg:absolute lg:bottom-6 lg:left-0 lg:right-0 lg:top-[125px] lg:overflow-y-auto px-[20px] lg:px-[40px] lg:pr-[22px] pt-[20px] lg:pt-0">
                  <CardsContent animKey={activeSection.id} />
                </div>
              </div>
            )}

            {/* Mobile CTA for cards-only sections (no list pane) */}
            {!showListPanel && (
              <Link
                href={activeSection.ctaHref}
                onClick={onClose}
                className="lg:hidden flex items-center justify-center gap-[6px] mx-[20px] mb-[24px] py-[14px] border border-black bg-white transition-opacity duration-200 hover:opacity-70"
              >
                <span className="whitespace-nowrap text-[13px] uppercase text-black" style={futuraFont}>{activeSection.ctaLabel}</span>
                <ArrowRight />
              </Link>
            )}
          </div>

          {/* ── Level 3 (mobile only): cards overlay after sub-cat tap ── */}
          {mobileLevel3Open && showCardsPanel && (
            <div
              key={`level3-${selectedSubCat}-${mobileLevel3Exiting ? "exit" : "enter"}`}
              className={`lg:hidden absolute inset-0 z-40 flex flex-col bg-white overflow-hidden ${
                reduced
                  ? ""
                  : mobileLevel3Exiting
                    ? ANIMATION_CLASSES.navChildPanelSlideOut
                    : ANIMATION_CLASSES.navChildPanelSlideIn
              }`}
            >
              {/* Level-3 top bar: Back | Sub-cat name | Close */}
              <div className="flex-none flex items-center justify-between bg-white px-[20px] h-[60px] border-b border-black/10">
                <button
                  type="button"
                  onClick={handleMobileLevel3Back}
                  className="flex items-center gap-[6px] cursor-pointer transition-opacity duration-200 hover:opacity-60"
                  aria-label="Back to categories"
                >
                  <BackArrow />
                  <span className="text-[13px] uppercase text-black" style={futuraFont}>Back</span>
                </button>
                <span className="text-[14px] uppercase text-black font-medium" style={futuraFont}>
                  {selectedSubCat}
                </span>
                <button type="button" onClick={onClose} className="cursor-pointer transition-opacity duration-200 hover:opacity-60" aria-label="Close">
                  <CloseIcon />
                </button>
              </div>

              {/* Scrollable cards + CTA */}
              <div className="nav-menu-scrollbar flex-1 overflow-y-auto px-[20px] pt-[20px]">
                <CardsContent animKey={`l3-${selectedSubCat}`} />
                <Link
                  href={activeSection.ctaHref}
                  onClick={onClose}
                  className="flex items-center justify-center gap-[6px] w-full mb-[24px] py-[14px] border border-black bg-white transition-opacity duration-200 hover:opacity-70"
                >
                  <span className="whitespace-nowrap text-[13px] uppercase text-black" style={futuraFont}>{activeSection.ctaLabel}</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop — desktop only */}
      <div
        className={`hidden lg:block flex-1 cursor-pointer ${backdropClass}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}
