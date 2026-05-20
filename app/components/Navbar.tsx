"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { useDelayedUnmount } from "../utils/animations";
import { useCart } from "../utils/cart";
import { useAuth } from "../utils/auth";
import { useWishlist } from "../utils/wishlist";
import { SearchOverlay } from "./SearchOverlay";
import { WishlistOverlay } from "./WishlistOverlay";
import { AuthOverlay } from "./AuthOverlay";
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
  const [searchOpen, setSearchOpen] = useState(false);
  
  const lastScrollYRef = useRef(0);
  const { open: openCart, totals } = useCart();
  const { user, open: openAuth } = useAuth();
  const { open: openWishlist, items: wishlistItems } = useWishlist();

  // Keep NavMenu in DOM for 1500ms after close so exit animation plays
  const shouldRenderMenu = useDelayedUnmount(menuOpen, 1500);

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
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img alt="Goyaz" className="h-[36px] lg:h-[56px] w-auto object-contain" src={NAVBAR_LOGO} loading="lazy" decoding="async" />
        </Link>
        <button
          onClick={openMenu}
          className="absolute left-[16px] lg:left-[40px] top-1/2 -translate-y-1/2 flex gap-[10px] lg:gap-[14px] items-center cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_MENU}  loading="lazy" decoding="async" />
          <span
            className={`font-sans hidden sm:block text-[20px] leading-[96.8%] transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
          >
            MENU
          </span>
        </button>
        <div className="absolute right-[16px] lg:right-[40px] top-1/2 -translate-y-1/2 flex gap-[16px] lg:gap-[20px] items-center">
          
          {/* Active Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="cursor-pointer transition-all duration-300 hover:scale-110 flex items-center"
          >
            <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_SEARCH}  loading="lazy" decoding="async" />
          </button>

          {/* Active Wishlist Toggle */}
          <button
            type="button"
            onClick={openWishlist}
            aria-label={`Open wishlist (${wishlistItems.length} items)`}
            className="relative cursor-pointer transition-all duration-300 hover:scale-110 flex items-center"
          >
            <img alt="" className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} src={NAVBAR_ICON_HEART}  loading="lazy" decoding="async" />
            {wishlistItems.length > 0 && (
              <span
                className={`font-sans absolute -top-[6px] -right-[8px] min-w-[18px] h-[18px] px-[5px] flex items-center justify-center rounded-full text-[10px] font-medium leading-none ${isScrolled ? 'bg-(--color-dark) text-white' : 'bg-white text-(--color-dark)'}`}
              >
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Active Cart Toggle */}
          <button
            type="button"
            aria-label={`Open cart${totals.itemCount > 0 ? ` (${totals.itemCount} items)` : ""}`}
            onClick={openCart}
            className="relative cursor-pointer transition-all duration-300 hover:scale-110 flex items-center"
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

          {/* Active Account Auth Toggle */}
          <button
            type="button"
            onClick={openAuth}
            aria-label={user ? `Open account dashboard (${user.name})` : "Open membership sign in"}
            className="cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            {user ? (
              user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] rounded-full object-cover border border-[#002f00]/20"
                />
              ) : (
                <div className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] rounded-full flex items-center justify-center text-[10px] lg:text-[11px] font-medium leading-none tracking-tighter shadow-sm border border-[#002f00]/10 ${isScrolled ? 'bg-[#002f00] text-white' : 'bg-white text-[#002f00]'}`}>
                  {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              )
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] transition-all duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Nav menu overlay — always rendered while shouldRenderMenu, exit animation drives removal */}
      {shouldRenderMenu && (
        <NavMenu key={menuInstance} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}

      {/* Unified Heritage Overlay Sheets */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <WishlistOverlay />
      <AuthOverlay />
    </>
  );
}
