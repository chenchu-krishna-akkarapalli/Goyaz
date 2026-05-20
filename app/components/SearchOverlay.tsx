"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MASTERPIECE_PRODUCTS } from "../data/masterpieces";
import { CollectionCard } from "./cards/CollectionCard";
import { useDelayedUnmount } from "../utils/animations";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const shouldRender = useDelayedUnmount(isOpen, 1500);
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync animation state
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small timeout to allow input focus after slide animation
      setTimeout(() => inputRef.current?.focus(), 300);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as any).lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  // Real-time filtering
  const filteredProducts = query.trim()
    ? MASTERPIECE_PRODUCTS.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.jewelryType.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularRooms = ["Nakshi", "Polki", "Kundan", "Temple", "Bridal"];

  return (
    <div
      className={`fixed inset-0 z-[150] flex flex-col transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "bg-black/55 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-0 opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Outer backdrop click area */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close search"
      />

      {/* Search sliding panel */}
      <div
        className={`relative w-full bg-white border-b border-[#083c30]/10 flex flex-col transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-[20px] lg:px-[40px] pt-[80px] lg:pt-[100px] pb-[40px] flex flex-col gap-[30px]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-[20px] right-[20px] lg:right-[40px] flex items-center gap-[6px] text-[#002f00] hover:scale-105 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
            <span className="font-sans text-[12px] uppercase tracking-[0.1em]">Close</span>
          </button>

          {/* Search bar container */}
          <div className="relative border-b border-[#002f00]/20 pb-[10px]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search our heritage rooms..."
              className="font-display w-full bg-transparent text-[24px] sm:text-[36px] lg:text-[44px] text-[#002f00] placeholder-[#002f00]/20 focus:outline-none tracking-[0.01em] pr-[40px]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#002f00]/50 hover:text-[#002f00] text-[20px] p-2"
              >
                &times;
              </button>
            )}
          </div>

          {/* Popular recommendations */}
          {!query && (
            <div className="flex flex-col gap-[12px] animate-[searchFadeIn_0.5s_ease-out]">
              <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#002f00]/50">
                Popular Rooms
              </span>
              <div className="flex flex-wrap gap-[10px]">
                {popularRooms.map((room) => (
                  <button
                    key={room}
                    onClick={() => setQuery(room)}
                    className="font-sans text-[12px] uppercase tracking-[0.1em] px-[16px] py-[8px] rounded-full border border-[#002f00]/15 text-[#002f00]/80 hover:bg-[#002f00] hover:text-white hover:border-[#002f00] transition-all duration-300"
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Area */}
          {query && (
            <div
              data-lenis-prevent
              className="w-full max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-[6px] nav-menu-scrollbar flex flex-col gap-[20px]"
            >
              <div className="flex justify-between items-center border-b border-[#002f00]/5 pb-[8px]">
                <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#002f00]/50">
                  Search Results ({filteredProducts.length})
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-[60px] text-center flex flex-col items-center justify-center gap-[8px]">
                  <p className="font-display text-[18px] sm:text-[22px] text-[#002f00]/70">No masterpieces found</p>
                  <p className="font-sans text-[13px] text-[#002f00]/50 max-w-[360px]">
                    Try refining your search terms or browse our popular categories above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px] sm:gap-[20px] pb-[20px]">
                  {filteredProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="animate-[searchResultReveal_0.4s_ease-out_both]"
                      style={{ animationDelay: `${idx * 40}ms` }}
                      onClick={onClose}
                    >
                      <CollectionCard
                        id={product.id}
                        imageSrc={product.imageSrc}
                        title={product.title}
                        price={product.price}
                        category={product.category.toLowerCase()}
                        wide={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes searchFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes searchResultReveal {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
