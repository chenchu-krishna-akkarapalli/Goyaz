"use client";

import { useEffect, useState } from "react";
import {
  ANIMATION_CLASSES,
  useDelayedUnmount,
} from "../../utils/animations";
import { formatINR, useCart } from "../../utils/cart";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23777777' font-size='14' font-family='Arial'%3EImage%3C/text%3E%3C/svg%3E";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CartIconLarge() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7.5 17h11v-2H7.76c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export function CartSidebar() {
  const { items, isOpen, close, increment, decrement, removeItem, totals } = useCart();
  const shouldRender = useDelayedUnmount(isOpen, 450);
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
      aria-label="Shopping cart"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
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
          <div className="flex items-center gap-[12px] text-(--color-dark)">
            <CartIconLarge />
            <p
              className="text-[24px] leading-none"
              style={{ fontFamily: "'House of Montague', Georgia, serif" }}
            >
              Your Cart
            </p>
            <span
              className="text-[14px] opacity-60"
              style={{ fontFamily: "'Futura PT', sans-serif" }}
            >
              ({totals.itemCount})
            </span>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={close}
            className="text-(--color-dark) p-[6px] rounded-full hover:bg-[#f3f3f3] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Body ── */}
        <div
          className="flex-1 overflow-y-auto nav-menu-scrollbar px-[24px] py-[20px]"
          style={{ fontFamily: "'Futura PT', sans-serif" }}
        >
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-[12px] text-(--color-dark)/70 py-[60px]">
              <CartIconLarge />
              <p className="text-[16px]">Your cart is empty.</p>
              <p className="text-[13px] opacity-70">
                Hover over any masterpiece and tap Add to Cart.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-[18px]">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`flex gap-[14px] items-start ${ANIMATION_CLASSES.cartItemIn}`}
                >
                  <div className="w-[88px] h-[88px] rounded-[16px] overflow-hidden bg-[#f5f5f5] shrink-0">
                    <img
                      alt={item.title}
                      src={item.imageSrc}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                    <p className="text-[14px] uppercase text-(--color-dark) leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-(--color-dark)/70">
                      {item.price}
                    </p>
                    <div className="flex items-center justify-between mt-[6px]">
                      <div className="flex items-center border border-(--color-dark) rounded-full">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.title}`}
                          onClick={() => decrement(item.id)}
                          className="w-[28px] h-[28px] flex items-center justify-center text-(--color-dark) hover:bg-(--color-dark) hover:text-white transition-colors rounded-l-full text-[14px]"
                        >
                          −
                        </button>
                        <span className="w-[28px] text-center text-[12px] text-(--color-dark)">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.title}`}
                          onClick={() => increment(item.id)}
                          className="w-[28px] h-[28px] flex items-center justify-center text-(--color-dark) hover:bg-(--color-dark) hover:text-white transition-colors rounded-r-full text-[14px]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[12px] text-(--color-dark)/60 hover:text-(--color-dark) underline underline-offset-2 transition-colors"
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
        <div
          className="border-t border-[#e8e8e8] px-[30px] py-[22px] flex flex-col gap-[14px] bg-white"
          style={{ fontFamily: "'Futura PT', sans-serif" }}
        >
          <div className="flex flex-col gap-[6px] text-[14px] text-(--color-dark)">
            <div className="flex justify-between">
              <span className="opacity-70">Subtotal</span>
              <span>{formatINR(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Discount (10%)</span>
              <span className="text-[#a23a3a]">−{formatINR(totals.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Tax (3% GST)</span>
              <span>{formatINR(totals.tax)}</span>
            </div>
            <div className="flex justify-between pt-[8px] border-t border-[#e8e8e8] mt-[4px]">
              <span className="text-[16px]">Total</span>
              <span
                className="text-[18px] font-medium tracking-wide"
                style={{ fontFamily: "'Futura PT', 'Futura PT Book', sans-serif" }}
              >
                {formatINR(totals.total)}
              </span>
            </div>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="w-full bg-(--color-dark) text-white py-[16px] text-[16px] uppercase tracking-wide hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
          <button
            type="button"
            onClick={close}
            className="text-[13px] text-(--color-dark)/70 hover:text-(--color-dark) underline underline-offset-2 self-center transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </div>
  );
}
