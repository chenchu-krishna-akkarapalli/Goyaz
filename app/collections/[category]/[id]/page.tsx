"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MASTERPIECE_PRODUCTS } from "../../../data/masterpieces";
import { CollectionCard } from "../../../components/cards/CollectionCard";
import { useCart } from "../../../utils/cart";
import { ScrollRevealWrapper, StaggerRevealList } from "../../../utils/animations";

// ── Accordion item (Animate height smoothly via CSS grid) ───────
function AccordionItem({ label, content }: { label: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#002f00]/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="font-sans w-full flex items-center justify-between px-[20px] lg:px-[32px] py-[18px] lg:py-[22px] text-[12px] lg:text-[14px] uppercase tracking-[0.1em] text-[#002f00] cursor-pointer select-none hover:bg-[#fcfcfa] transition-colors text-left"
      >
        <span>{label}</span>
        <span className={`text-[18px] font-light transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 py-[16px] lg:py-[20px]" : "grid-rows-[0fr] opacity-0 py-0"
        }`}
      >
        <div className="overflow-hidden px-[20px] lg:px-[32px]">
          <p className="font-sans text-[13px] lg:text-[14px] text-[#0a0a0a]/70 leading-[1.6]">
            {content}
          </p>
        </div>
      </div>
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
    (p) => p.id === id && p.category.toLowerCase() === category.toLowerCase()
  );

  if (!product) notFound();

  // Pick other images from the collection to act as dummy variations
  const COLLECTION_IMAGES = [
    "/images/sections/collections/frame233.avif",
    "/images/sections/collections/frame234.avif",
    "/images/sections/collections/frame235.avif",
    "/images/sections/collections/frame236.avif",
    "/images/sections/collections/frame237.avif",
    "/images/sections/collections/frame238.avif",
    "/images/sections/collections/frame239.avif",
    "/images/sections/collections/frame240.avif",
  ];

  const mainImage = product.imageSrc;
  const otherImages = COLLECTION_IMAGES.filter((img) => img !== mainImage);

  // Set up 4 distinct interactive angles / variants
  const thumb1 = mainImage;
  const thumb2 = mainImage; // This will show a CSS zoomed-in macro detail!
  const thumb3 = otherImages[0] || COLLECTION_IMAGES[0];
  const thumb4 = otherImages[1] || COLLECTION_IMAGES[1];

  const galleryImages = [
    { src: thumb1, isMacro: false, label: "Main View", description: "Studio Portrait" },
    { src: thumb2, isMacro: true, label: "Craft Detail", description: "Macro Close-up" },
    { src: thumb3, isMacro: false, label: "Angle B", description: "Side Profile" },
    { src: thumb4, isMacro: false, label: "Angle C", description: "Ambient Frame" },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageSelect = (index: number) => {
    if (index === activeImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImageIndex(index);
      setIsTransitioning(false);
    }, 180); // Quick elegant crossfade timing
  };

  const { addItem } = useCart();

  const related = MASTERPIECE_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.id !== id && p.size === "normal"
  ).slice(0, 6);

  // Decorative text contents
  const descText = `Immerse yourself in the timeless elegance of the Goyaz ${product.category} collection. Handcrafted in 92.5 sterling silver by our master Indian karigars, this ${product.title.toLowerCase()} is detailed with heritage signature engraving and finished with a rich vintage patina — an iconic keepsake designed to transition seamlessly across generations.`;

  const detailsText = `Each Goyaz ornament is forged individually by hand, guaranteeing that no two pieces are exactly identical. Features a base weight of hallmarked 92.5% sterling silver, combined with carefully curated semi-precious antique embellishments. Hand-finished with our signature oxidation to showcase the micro-engravings.`;

  const shippingText = `Complimentary, fully insured express delivery on all orders within India. Every piece is carefully packed in our velvet-lined premium presentation case. Dispatched securely via our priority logistics network. Returns or replacements are accepted within 7 days in pristine, unworn condition.`;

  const careText = `Store individually in your Goyaz velvet chest to prevent scratch lines and oxidation. Avoid direct contact with liquids, perfumes, cosmetics, or hairspray. Clean gently using only a dry, soft microfiber cloth to preserve the antiqued silver finish.`;

  return (
    <main className="bg-white min-h-screen pb-[80px]">
      {/* ════════════════════════════════════════
          SAFE BRANDED BANNED (Navbar Contrast)
          Provides contrast for transparent navbar
      ════════════════════════════════════════ */}
      <div className="relative w-full h-[90px] sm:h-[100px] lg:h-[280px] overflow-hidden bg-[#002f00] select-none">
        {/* Ambient brand radial backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,60,48,0.95)_0%,rgba(0,47,0,1)_100%)]" />

        {/* Delicate gold-leaf abstract line decor */}
        <div className="absolute inset-y-0 right-0 w-[45%] opacity-[0.05] pointer-events-none mix-blend-overlay">
          <div className="w-full h-full border-r-[2px] border-y-[2px] border-[#c5a880] rounded-l-full scale-[1.25] origin-right" />
        </div>

        {/* Magazine-style page header container */}
        <div className="relative z-10 h-full layout-container pt-[60px] sm:pt-[70px] lg:pt-[80px]">
          <div className="layout-inner h-full flex flex-col justify-center py-0 lg:py-[24px]">
            {/* Elegant Breadcrumbs */}
            <div className="font-sans flex items-center gap-[8px] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/50 animate-header-text">
              <Link
                href="/collections"
                className="hover:text-white hover:underline underline-offset-4 decoration-[#c5a880]/30 transition-all duration-300"
              >
                Collections
              </Link>
              <span className="text-[#c5a880]/30">/</span>
              <Link
                href={`/collections/${category}`}
                className="hover:text-white hover:underline underline-offset-4 decoration-[#c5a880]/30 transition-all duration-300 capitalize"
              >
                {product.category}
              </Link>
              <span className="text-[#c5a880]/30">/</span>
              <span className="text-white font-medium truncate max-w-[180px] sm:max-w-[280px]">
                {product.title}
              </span>
            </div>

            {/* Regal title group - Hidden on Mobile/Tablet, Visible on Desktop */}
            <div className="hidden lg:flex flex-col gap-[4px] animate-header-text-staggered mt-[6px]">
              <div className="flex items-center gap-[8px]">
                <div className="h-[1px] w-[16px] bg-[#c5a880]/40" />
                <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#c5a880] font-semibold">
                  Handcrafted Heirlooms
                </span>
              </div>
              <h2 className="font-display text-white text-[24px] sm:text-[36px] lg:text-[44px] tracking-[0.03em] font-light leading-none">
                The <span className="italic">{product.category}</span> Suite
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          PRODUCT DETAILS GRID
      ════════════════════════════════════════ */}
      <div className="layout-container mt-[20px] sm:mt-[24px] lg:mt-[60px]">
        <div className="layout-inner">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[40px] lg:gap-[64px] items-start">
            
            {/* LEFT: Minimalistic Portrait Showcase (Sticky) */}
            <div className="lg:sticky lg:top-[100px] flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[28px]">
              
              {/* Back Link for Mobile */}
              <Link
                href={`/collections/${category}`}
                className="inline-flex lg:hidden items-center gap-[6px] self-start bg-[#fafaf8] border border-[#083c30]/10 hover:bg-white active:scale-[0.98] transition-all px-[14px] py-[8px] rounded-full"
              >
                <svg width="10" height="10" viewBox="0 0 1024 1024" fill="#002f00" style={{ transform: "rotate(180deg)" }}>
                  <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
                </svg>
                <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#002f00] font-medium">
                  Back to Room
                </span>
              </Link>

              {/* Minimalistic Main Image Frame */}
              <div className="relative w-full aspect-square overflow-hidden rounded-[24px] lg:rounded-[32px] border border-[#002f00]/8 bg-[#fafaf8] group select-none shadow-[0_4px_24px_rgba(0,47,0,0.02)]">
                <img
                  src={galleryImages[activeImageIndex].src}
                  alt={product.title}
                  className={`absolute inset-0 w-full h-full object-cover ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isTransitioning
                      ? "opacity-0 scale-[0.98] blur-[2px] duration-200"
                      : "opacity-100 scale-100 duration-[2500ms] delay-[2500ms] group-hover:scale-[1.37]"
                  } ${
                    galleryImages[activeImageIndex].isMacro ? "scale-[2.4] translate-y-[5%] group-hover:scale-[2.8]" : ""
                  }`}
                  style={{
                    transformOrigin: galleryImages[activeImageIndex].isMacro ? "35% 45%" : "center",
                  }}
                  loading="eager"
                  decoding="sync"
                />

                {/* Subtle Gold Badging in Minimal Frame */}
                <div className="absolute top-[20px] left-[20px] bg-white/70 backdrop-blur-md px-[12px] py-[6px] rounded-full border border-[#002f00]/5 pointer-events-none select-none">
                  <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#002f00] font-semibold">
                    {galleryImages[activeImageIndex].description}
                  </span>
                </div>
              </div>

              {/* Interactive Gallery Thumbnail Row */}
              <div className="flex flex-col gap-[8px]">
                <div className="grid grid-cols-4 gap-[10px] sm:gap-[16px]">
                  {galleryImages.map((thumb, i) => (
                    <button
                      key={i}
                      onClick={() => handleImageSelect(i)}
                      className={`relative aspect-square rounded-[16px] overflow-hidden border-2 cursor-pointer transition-all duration-300 bg-[#f9f9f7] select-none group/thumb ${
                        activeImageIndex === i
                          ? "border-[#c5a880] shadow-md shadow-[#c5a880]/15"
                          : "border-[#002f00]/10 hover:border-[#002f00]/30"
                      }`}
                    >
                      <img
                        src={thumb.src}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105 ${
                          thumb.isMacro ? "scale-[2.4] translate-y-[5%]" : ""
                        }`}
                        style={{
                          transformOrigin: thumb.isMacro ? "35% 45%" : "center",
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
                {/* Variant Labels */}
                <div className="grid grid-cols-4 gap-[10px] sm:gap-[16px] text-center pointer-events-none select-none">
                  {galleryImages.map((thumb, i) => (
                    <span
                      key={i}
                      className={`font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                        activeImageIndex === i ? "text-[#c5a880] font-medium" : "text-[#002f00]/40"
                      }`}
                    >
                      {thumb.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Editorial Info Panel */}
            <div className="flex flex-col gap-[28px] lg:gap-[36px]">
              
              {/* Category Breadcrumb + Back Button (Desktop) */}
              <div className="hidden lg:flex items-center justify-between">
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
                  {product.category} COLLECTION
                </span>
                <Link
                  href={`/collections/${category}`}
                  className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#002f00]/60 hover:text-[#002f00] hover:underline underline-offset-4 decoration-[#c5a880] transition-colors duration-300"
                >
                  Return to Room
                </Link>
              </div>

              {/* Title, Badge & Price Block */}
              <div className="flex flex-col gap-[14px]">
                <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[48px] text-[#002f00] font-light leading-[1.1] tracking-[0.01em]">
                  {product.title}
                </h1>
                
                {/* Hallmarked 92.5 Gold Badge */}
                <div className="flex gap-[12px] items-center rounded-[16px] border border-[#c5a880]/20 bg-[#fafaf8] p-[14px]">
                  <div className="flex-shrink-0 w-[36px] h-[36px] rounded-full border border-[#c5a880] flex items-center justify-center bg-white shadow-sm">
                    <span className="font-serif text-[15px] text-[#c5a880] italic">G</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">Goyaz Certified Pure Silver</span>
                    <span className="font-sans text-[11px] text-[#0a0a0a]/65 leading-none mt-[2px]">Hallmarked 92.5% sterling silver heirloom.</span>
                  </div>
                </div>

                <p className="font-sans text-[20px] sm:text-[24px] text-[#013809] font-medium tracking-[0.02em]">
                  {product.price}
                </p>
              </div>

              {/* Heritage Story Description */}
              <div className="rounded-[24px] border border-[#002f00]/10 bg-[#fafaf8] p-[24px] sm:p-[28px] shadow-[0_2px_12px_rgba(0,47,0,0.01)]">
                <p className="font-sans text-[14px] lg:text-[15px] text-[#0a0a0a]/75 leading-[1.8]">
                  {descText}
                </p>
              </div>

              {/* Premium Add to Cart CTA */}
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    imageSrc: product.imageSrc,
                  })
                }
                className="font-sans w-full py-[18px] sm:py-[20px] bg-[#002f00] text-white text-[12px] sm:text-[13px] uppercase tracking-[0.2em] rounded-[16px] hover:bg-[#013809] active:scale-[0.97] transition-all duration-300 shadow-md shadow-[#002f00]/10 flex items-center justify-center gap-[12px] group cursor-pointer relative overflow-hidden"
              >
                {/* Sliding Gold Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span>Add to Velvet Chest</span>
                <span className="text-white/40 tracking-normal">—</span>
                <span className="font-sans font-light tracking-[0.1em] text-white/90">
                  {product.price}
                </span>
              </button>

              {/* Animated Detail Accordions */}
              <div className="rounded-[20px] border border-[#002f00]/10 overflow-hidden bg-white shadow-sm">
                <AccordionItem label="Product Details" content={detailsText} />
                <AccordionItem label="Shipping & Returns" content={shippingText} />
                <AccordionItem label="Care Instructions" content={careText} />
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════════
              RELATED PRODUCTS SECTION (Heirlooms)
          ════════════════════════════════════════ */}
          {related.length > 0 && (
            <div className="mt-[80px] lg:mt-[100px] border-t border-[#002f00]/10 pt-[60px] lg:pt-[80px]">
              <ScrollRevealWrapper delay={150}>
                <div className="flex flex-col gap-[6px] mb-[32px]">
                  <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                    Similiar Artistry
                  </span>
                  <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[40px] text-[#002f00] font-light">
                    Heirlooms of the <span className="italic">{product.category}</span> Room
                  </h2>
                </div>
              </ScrollRevealWrapper>

              <StaggerRevealList
                className="flex gap-[16px] lg:gap-[20px] flex-nowrap overflow-x-auto pb-[16px] snap-x no-scrollbar"
                staggerMs={100}
                variant="up"
              >
                {related.map((p) => (
                  <div key={p.id} className="snap-start shrink-0 w-[240px] sm:w-[325px]">
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
              </StaggerRevealList>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes headerBgZoom {
          0% {
            transform: scale(1.06);
            filter: blur(1px);
          }
          100% {
            transform: scale(1);
            filter: blur(0px);
          }
        }
        @keyframes headerTextSlideUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-header-text {
          animation: headerTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-header-text-staggered {
          opacity: 0;
          animation: headerTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.18s forwards;
        }
      `}</style>
    </main>
  );
}
