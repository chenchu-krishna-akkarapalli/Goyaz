"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MASTERPIECE_PRODUCTS } from "../../../data/masterpieces";
import { CollectionCard } from "../../../components/cards/CollectionCard";
import { useCart } from "../../../utils/cart";

// ── Accordion item ─────────────────────────────────────────────
function AccordionItem({ label }: { label: string }) {
  return (
    <div className="font-sans flex items-center justify-between px-[20px] lg:px-[32px] py-[16px] lg:py-[18px] text-[13px] lg:text-[15px] uppercase tracking-[0.06em] text-[#002f00] border-b border-[#002f00]/10 last:border-b-0 cursor-pointer select-none hover:bg-[#f9f9f9] transition-colors">
      <span>{label}</span>
      <span className="text-[18px] leading-none">+</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function ProductPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = use(params);

  const product = MASTERPIECE_PRODUCTS.find(
    (p) => p.id === id && p.category.toLowerCase() === category
  );

  if (!product) notFound();

  const related = MASTERPIECE_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category && p.id !== id && p.size === "normal"
  ).slice(0, 6);

  return (
    <main className="bg-white min-h-screen">

      {/* ════════════════════════════════════════
          MOBILE LAYOUT  (hidden on lg+)
          No top padding — image goes full-bleed
          under the transparent navbar
      ════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* Full-bleed hero image — overlaid by the fixed navbar */}
        <div className="relative w-full h-[420px] sm:h-[500px] overflow-hidden">
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            className="object-cover animate-header-zoom"
            sizes="100vw"
            priority
          />
          {/* Subtle gradient to protect navbar legibility at the top */}
          <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-[#002f00]/50 to-transparent pointer-events-none z-10" />

          {/* Back link — sits elegantly below the 80px navbar */}
          <Link
            href={`/collections/${category}`}
            className="absolute top-[92px] left-[16px] z-20 flex items-center gap-[6px] bg-white/75 backdrop-blur-md border border-[#083c30]/10 hover:bg-white/90 hover:scale-[1.05] shadow-md group transition-all duration-300 rounded-full px-[14px] py-[8px]"
          >
            <span className="flex items-center justify-center group-hover:-translate-x-0.5 transition-transform duration-300">
              <svg width="12" height="12" viewBox="0 0 1024 1024" fill="#002f00" style={{ transform: "rotate(180deg)" }}>
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
              </svg>
            </span>
            <span className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#002f00]">Back</span>
          </Link>
        </div>

        {/* Product info */}
        <div className="px-[16px] pt-[20px] pb-[32px] flex flex-col gap-[20px]">

          {/* Category + Title + Price */}
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#002f00]/50">
              {product.category}
            </span>
            <h1 className="font-display text-[24px] sm:text-[28px] text-[#002f00] leading-[1.1]">
              {product.title}
            </h1>
            <p className="font-sans text-[16px] text-[#002f00]/80 tracking-[0.01em]">
              {product.price}
            </p>
          </div>

          {/* Add to Cart CTA */}
          <MobileCartButton product={product} />

          {/* Description */}
          <div className="rounded-[16px] border border-[#002f00]/10 bg-[#fafaf8] p-[16px]">
            <p className="font-sans text-[13px] text-[#0a0a0a]/75 leading-[1.7]">
              Immerse yourself in the timeless elegance of the Goyaz {product.category} collection.
              This {product.title.toLowerCase()} is handcrafted in 92.5 sterling silver by master karigars,
              with heritage motifs and a rich vintage finish — an heirloom for your most treasured occasions.
            </p>
          </div>

          {/* Accordions */}
          <div className="rounded-[16px] border border-[#002f00]/10 overflow-hidden">
            {["Product Details", "Shipping & Returns", "Care Instructions"].map((item) => (
              <AccordionItem key={item} label={item} />
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="px-[16px] pb-[48px]">
            <h2 className="font-display text-[20px] text-[#002f00] mb-[16px]">You May Also Like</h2>
            <div className="flex gap-[12px] overflow-x-auto pb-[8px] snap-x no-scrollbar">
              {related.map((p) => (
                <div key={p.id} className="snap-start shrink-0 w-[160px] sm:w-[200px]">
                  <CollectionCard
                    id={p.id}
                    imageSrc={p.imageSrc}
                    title={p.title}
                    price={p.price}
                    category={p.category.toLowerCase()}
                    wide={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below lg)
      ════════════════════════════════════════ */}
      <div className="hidden lg:block">

        {/* Image header — exquisite 280px showcase banner */}
        <div className="relative w-full h-[280px] overflow-hidden">
          {/* Background: product image with atmospheric zoom */}
          <Image
            src={product.imageSrc}
            alt=""
            fill
            className="object-cover object-center animate-header-zoom"
            sizes="100vw"
            priority
          />
          {/* Rich brand gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f00]/95 via-[#083c30]/80 to-[#002f00]/40 backdrop-brightness-[0.85]" />
          {/* Top subtle gradient overlay to protect navbar icons */}
          <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#002f00]/40 to-transparent pointer-events-none" />

          {/* Content — magazine-style page header */}
          <div className="relative z-10 h-full layout-container pt-[80px]">
            <div className="layout-inner h-full flex flex-col justify-between py-[22px]">
              {/* Breadcrumbs below navbar */}
              <div className="font-sans flex items-center gap-[10px] text-[11px] uppercase tracking-[0.15em] text-white/60 animate-header-text">
                <Link href="/collections" className="hover:text-white hover:underline underline-offset-4 decoration-white/30 transition-all duration-300">Collections</Link>
                <span className="text-white/30">/</span>
                <Link href={`/collections/${category}`} className="hover:text-white hover:underline underline-offset-4 decoration-white/30 transition-all duration-300 capitalize">{product.category}</Link>
                <span className="text-white/30">/</span>
                <span className="text-white font-medium truncate max-w-[250px]">{product.title}</span>
              </div>

              {/* Big magazine title at the bottom of the header */}
              <div className="flex flex-col gap-[6px] animate-header-text-staggered">
                <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/50">
                  Silver Jeweler
                </span>
                <h2 className="font-display text-white text-[32px] sm:text-[40px] tracking-[0.03em] font-light leading-none">
                  The <span className="italic">{product.category}</span> Room
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="layout-container py-[48px]">
          <div className="layout-inner">

            {/* Main 2-col grid */}
            <div className="grid grid-cols-[1fr_480px] gap-[60px] items-start">

              {/* Left — product image (sticky) */}
              <div className="sticky top-[100px]">
                <div className="relative w-full aspect-square overflow-hidden rounded-[30px] bg-[#f5f5f5]">
                  <Image
                    src={product.imageSrc}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    priority
                  />
                </div>
              </div>

              {/* Right — product details */}
              <div className="flex flex-col gap-[32px] pt-[8px]">

                {/* Category tag */}
                <div>
                  <span className="font-sans inline-block text-[11px] uppercase tracking-[0.35em] text-[#002f00]/50 border border-[#002f00]/20 rounded-full px-[14px] py-[6px]">
                    {product.category}
                  </span>
                </div>

                {/* Title + price */}
                <div className="flex flex-col gap-[12px]">
                  <h1 className="font-display text-[40px] text-[#002f00] leading-[1.05]">
                    {product.title}
                  </h1>
                  <p className="font-sans text-[22px] text-[#002f00]/80">
                    {product.price}
                  </p>
                </div>

                {/* Description */}
                <div className="rounded-[24px] border border-[#002f00]/10 bg-[#fafaf8] p-[28px]">
                  <p className="font-sans text-[15px] text-[#0a0a0a]/75 leading-[1.75]">
                    Immerse yourself in the timeless elegance of the Goyaz {product.category} collection.
                    This {product.title.toLowerCase()} is handcrafted in 92.5 sterling silver by master karigars,
                    with heritage motifs and a rich vintage finish — an heirloom for your most treasured occasions.
                  </p>
                </div>

                {/* Add to Cart */}
                <DesktopCartButton product={product} />

                {/* Accordions */}
                <div className="rounded-[24px] border border-[#002f00]/10 overflow-hidden">
                  {["Product Details", "Shipping & Returns", "Care Instructions"].map((item) => (
                    <AccordionItem key={item} label={item} />
                  ))}
                </div>

              </div>
            </div>

            {/* Related products */}
            {related.length > 0 && (
              <div className="mt-[80px]">
                <h2 className="font-display text-[36px] text-[#002f00] mb-[32px]">You May Also Like</h2>
                <div className="flex gap-[20px] flex-nowrap overflow-x-auto pb-[8px] snap-x no-scrollbar">
                  {related.map((p) => (
                    <div key={p.id} className="snap-start shrink-0">
                      <CollectionCard
                        id={p.id}
                        imageSrc={p.imageSrc}
                        title={p.title}
                        price={p.price}
                        category={p.category.toLowerCase()}
                        wide={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @keyframes headerBgZoom {
          0% {
            transform: scale(1.08);
            filter: blur(2px);
          }
          100% {
            transform: scale(1);
            filter: blur(0px);
          }
        }
        @keyframes headerTextSlideUp {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-header-zoom {
          animation: headerBgZoom 3.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-header-text {
          animation: headerTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-header-text-staggered {
          opacity: 0;
          animation: headerTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
      `}</style>

    </main>
  );
}

// ── Client cart buttons (need useCart hook) ────────────────────
function MobileCartButton({ product }: { product: typeof MASTERPIECE_PRODUCTS[number] }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem({ id: product.id, title: product.title, price: product.price, imageSrc: product.imageSrc })}
      className="font-sans w-full py-[14px] bg-[#002f00] text-white text-[13px] uppercase tracking-[0.12em] rounded-[12px] hover:bg-[#013809] active:scale-[0.98] transition-all duration-200"
    >
      Add to Cart
    </button>
  );
}

function DesktopCartButton({ product }: { product: typeof MASTERPIECE_PRODUCTS[number] }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem({ id: product.id, title: product.title, price: product.price, imageSrc: product.imageSrc })}
      className="font-sans w-full py-[18px] bg-[#002f00] text-white text-[15px] uppercase tracking-[0.14em] rounded-[16px] hover:bg-[#013809] active:scale-[0.98] transition-all duration-200"
    >
      Add to Cart
    </button>
  );
}
