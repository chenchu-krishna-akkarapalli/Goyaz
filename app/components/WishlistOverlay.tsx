"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "../utils/wishlist";
import { useCart } from "../utils/cart";
import { ANIMATION_CLASSES, useDelayedUnmount } from "../utils/animations";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function HeartIconLarge() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function WishlistOverlay() {
  const { items, isOpen, close, removeItem } = useWishlist();
  const { addItem: addCartItem } = useCart();
  const shouldRender = useDelayedUnmount(isOpen, 1500);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC closes the drawer
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!mounted || !shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[200]"
      aria-modal="true"
      role="dialog"
      aria-label="Your Wishlist"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close wishlist"
        onClick={close}
        className={`absolute inset-0 bg-black/45 ${
          isOpen ? ANIMATION_CLASSES.cartBackdropIn : ANIMATION_CLASSES.cartBackdropOut
        }`}
      />

      {/* Drawer panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-[440px] bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.15)] flex flex-col ${
          isOpen ? ANIMATION_CLASSES.cartDrawerIn : ANIMATION_CLASSES.cartDrawerOut
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-[30px] py-[24px] border-b border-[#e8e8e8]">
          <div className="flex items-center gap-[12px] text-[#002f00]">
            <HeartIconLarge />
            <p className="font-display text-[24px] leading-none">Your Wishlist</p>
            <span className="font-sans text-[14px] opacity-60">({items.length})</span>
          </div>
          <button
            type="button"
            aria-label="Close wishlist"
            onClick={close}
            className="text-[#002f00] p-[6px] rounded-full hover:bg-[#f3f3f3] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Body ── */}
        <div data-lenis-prevent className="font-sans flex-1 overflow-y-auto nav-menu-scrollbar px-[24px] py-[20px]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-[12px] text-[#002f00]/70 py-[60px]">
              <HeartIconLarge />
              <p className="text-[16px]">Your wishlist is empty.</p>
              <p className="text-[13px] opacity-70">
                Favorite items by clicking the heart button on details or cards to save them for later.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-[18px]">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`flex gap-[14px] items-start border-b border-[#f5f5f5] pb-[16px] last:border-0 ${ANIMATION_CLASSES.cartItemIn}`}
                >
                  <div className="w-[88px] h-[88px] rounded-[16px] overflow-hidden bg-[#f5f5f5] shrink-0">
                    <img
                      alt={item.title}
                      src={item.imageSrc}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#002f00]/50 font-medium">
                      {item.category}
                    </span>
                    <p className="text-[14px] uppercase text-[#002f00] leading-tight font-medium truncate">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-[#002f00]/80">
                      {item.price}
                    </p>
                    <div className="flex items-center gap-[16px] mt-[8px]">
                      <button
                        type="button"
                        onClick={() => {
                          addCartItem({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            imageSrc: item.imageSrc,
                          });
                          removeItem(item.id);
                        }}
                        className="text-[11px] uppercase tracking-[0.1em] font-medium bg-[#002f00] text-white px-[12px] py-[6px] rounded-full hover:bg-[#083c30] transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] text-[#002f00]/60 hover:text-[#002f00] underline underline-offset-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="font-sans border-t border-[#e8e8e8] px-[30px] py-[22px] flex flex-col gap-[10px] bg-white">
          <button
            type="button"
            onClick={() => {
              // Add all to cart
              items.forEach((item) => {
                addCartItem({
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  imageSrc: item.imageSrc,
                });
                removeItem(item.id);
              });
              close();
            }}
            disabled={items.length === 0}
            className="w-full bg-[#002f00] text-white py-[16px] text-[14px] uppercase tracking-wide hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-lg"
          >
            Add All to Cart
          </button>
          <button
            type="button"
            onClick={close}
            className="text-[12px] text-[#002f00]/70 hover:text-[#002f00] underline underline-offset-2 self-center transition-colors"
          >
            Back to Shopping
          </button>
        </div>
      </aside>
    </div>
  );
}
