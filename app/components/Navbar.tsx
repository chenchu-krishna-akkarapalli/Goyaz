"use client";

import { useState, useEffect, useRef } from "react";
import { NavMenu } from "./NavMenu";
import { useDelayedUnmount } from "../utils/animations";
import { useCart } from "../utils/cart";
import {
  NAVBAR_LOGO,
  NAVBAR_ICON_MENU,
  NAVBAR_ICON_SEARCH,
  NAVBAR_ICON_HEART,
  NAVBAR_ICON_CART,
} from "../data/navbar";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuInstance, setMenuInstance] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const { open: openCart, totals } = useCart();

  // Keep NavMenu in DOM for 450ms after close so exit animation plays
  const shouldRenderMenu = useDelayedUnmount(menuOpen, 450);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 760);

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
        setMenuOpen(false); // close menu when navbar hides on scroll-down
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function openMenu() {
    setMenuInstance((current) => current + 1);
    setMenuOpen(true);
  }

  return (
    <>
      {/* Navbar bar */}
      <div className={`fixed h-[60px] lg:h-[80px] left-0 overflow-hidden top-0 w-full z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-white/85 backdrop-blur-md shadow-sm' : 'bg-transparent animate-[slideDown_0.8s_ease-out]'}`}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px] w-auto lg:h-[79px] lg:w-[118px]">
          <img alt="" className="absolute inset-0 object-contain w-full h-full pointer-events-none" src={NAVBAR_LOGO}  loading="lazy" decoding="async" />
        </div>
        <button
          onClick={openMenu}
          className="absolute left-[16px] lg:left-[40px] top-1/2 -translate-y-1/2 flex gap-[10px] lg:gap-[14px] items-center cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_MENU}  loading="lazy" decoding="async" />
          <span
            className={`font-sans hidden sm:block text-[20px] leading-[96.8%] transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
          >
            MENU
          </span>
        </button>
        <div className="absolute right-[16px] lg:right-[40px] top-1/2 -translate-y-1/2 flex gap-[16px] lg:gap-[20px] items-center">
          <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] cursor-pointer transition-all duration-300 hover:scale-110 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_SEARCH}  loading="lazy" decoding="async" />
          <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] cursor-pointer transition-all duration-300 hover:scale-110 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_HEART}  loading="lazy" decoding="async" />
          <button
            type="button"
            aria-label={`Open cart${totals.itemCount > 0 ? ` (${totals.itemCount} items)` : ""}`}
            onClick={openCart}
            className="relative cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_CART}  loading="lazy" decoding="async" />
            {totals.itemCount > 0 && (
              <span
                className={`font-sans absolute -top-[6px] -right-[8px] min-w-[18px] h-[18px] px-[5px] flex items-center justify-center rounded-full text-[10px] font-medium leading-none ${isScrolled ? 'bg-(--color-dark) text-white' : 'bg-white text-(--color-dark)'}`}
              >
                {totals.itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Nav menu overlay — always rendered while shouldRenderMenu, exit animation drives removal */}
      {shouldRenderMenu && (
        <NavMenu key={menuInstance} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
}
