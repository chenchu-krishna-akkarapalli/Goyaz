# Goyaz — Design System Reference

Figma source: `https://www.figma.com/design/Wc68TC2bHQr7JB8xzOPihb/Goaz`

---

## Brand Identity

**Goyaz** is India's largest premium silver jewellery brand. The visual language is rooted in heritage craftsmanship, regal restraint, and tactile luxury.

- **Tone:** Timeless, elevated, artisanal — never garish
- **Audience:** Urban affluent women 25-45, bridal shoppers, gift buyers
- **Positioning:** Premium over mass-market; craft story over product catalogue

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#ffffff` | Page backgrounds |
| `--color-fg` | `#0a0a0a` | Default text |
| `--color-primary` | `#013809` | Brand green (hero, emphasis) |
| `--color-primary-mid` | `#007311` | Mid-tone green accents |
| `--color-accent` | `#083c30` | Card borders, teal accent |
| `--color-dark` | `#002f00` | Primary dark text, CTA bg |
| `--color-muted` | `#f5f5f5` | Subtle backgrounds |
| `--color-overlay` | `rgba(0,0,0,0.35)` | Image overlays |

The frosted "Add to Cart" bar uses `rgba(255,255,255,0.77)`.

---

## Typography

| Role | Font | Usage |
|---|---|---|
| Display / Headlines | `House of Montague` (serif) | Section headers, hero text, brand panel titles |
| Script / Taglines | `Nostalgic Whispers` (cursive) | Hero tagline, emotive phrases |
| Body / UI | `Futura PT Book` (sans-serif) | Labels, prices, descriptions, nav items |
| Body Medium | `Futura PT Medium` | Section sub-headings, uppercase labels |
| Stamp / Accent | `Imprint MT Shadow` | Decorative stamp elements |
| Shell | `Outfit` | Root shell font via CSS var `--font-shell` |

### Size Scale
```
--text-xs:   12px    →  "Add to Cart" label, secondary info
--text-sm:   14px    →  Price, secondary body
--text-base: 16px    →  Body, category labels, nav items
--text-lg:   20px    →  Section labels, nav primary
--text-xl:   24px    →  CTA buttons ("Discover More")
--text-2xl:  32px    →  Brand panel headings
--text-4xl:  48px    →  Page-level category titles (collection header)
--text-hero: 96px    →  Hero statements (reserved)
```

---

## Layout System

- **Canvas:** 1440px design width, 40px gutters
- **Inner content:** `max-width: 1360px` (`1440 - 2×40`)
- **Grid gap (cards):** 20px
- **Navbar height:** 80px (fixed)
- **Hero height:** 840px

### Container Classes
```css
.layout-container  /* full-bleed wrapper: max-w-[1440px] + px-[40px] */
.layout-inner      /* inner: max-w-[1360px] auto margins */
```

### Page structure for non-hero pages
```
0-80px   → Navbar (fixed, z-50)
80-240px → Page header (bg-white, h-160px, pt-[80px] offset)
260px+   → Content grid (20px gap after header)
```

---

## Card System

### Normal Card — `325×325px`
- Rounded corners: `30px`
- Border: `0.5px solid #083c30`
- Image: `object-cover`, fills card
- Bottom bar: semi-transparent frosted overlay (`rgba(255,255,255,0.77)`, `h-41px`)
- Text: title (`16px` uppercase), price (`14px` "starting from + amount")

### Wide Card — `670×325px`
- Same as Normal, double the width
- Centred "Add to Cart" bar matches width

### Card grid widths
```
4 Normal in a row:  4×325 + 3×20 = 1360px ✓
1 Wide + 2 Normal:  670 + 20 + 325 + 20 + 325 = 1360px ✓
2 Wides (stacked):  670px, height = 2×325 + 20 = 670px
```

### Bento-Grid Pattern (View All pages)
```
Row A: [N][N][N][N]
Row B: [N][N][N][N]
Row C: [W stacked] | [Brand Panel 670×670+]
Row D: [W][N][N]
Row E: [N][W][N]
```

---

## Component Inventory

### Global Components
| File | Purpose |
|---|---|
| `app/components/Navbar.tsx` | Fixed 80px navbar, scroll-aware styling, menu trigger |
| `app/components/NavMenu.tsx` | 7-section slide-out menu with 3-level hierarchy |
| `app/components/HeroMediaCarousel.tsx` | Hero video/image sequence (840px) |
| `app/components/ScrollIndicator.tsx` | Animated bounce-down scroll prompt |
| `app/components/CollectionHeroBanner.tsx` | Full-bleed hero banner for collection pages (see below) |
| `app/components/PageHeader.tsx` | Sticky page-title bar for non-hero pages (see below) |
| `app/components/SectionHeading.tsx` | Left/right label pair with slide-in animation |
| `app/components/Footer.tsx` | Dark-green footer with nav columns, social icons, newsletter |
| `app/components/cards/MasterpieceNormalCard.tsx` | 325px product card (homepage use) |
| `app/components/cards/MasterpieceWideCard.tsx` | 670px product card (homepage use) |
| `app/components/cards/CollectionCard.tsx` | Product card with Add to Cart bar (collection pages) |

---

### CollectionHeroBanner

Full-bleed hero banner placed **above** `PageHeader` on every collection page. The background image and tagline are fixed; headline and description are dynamic props.

**Figma node:** `399:484`

**Heights:** `200px` (mobile) / `260px` (tablet) / `319px` (desktop)

**Props:**
| Prop | Type | Description |
|---|---|---|
| `headline` | `string` | Large display-font heading on the left |
| `description` | `string` | Short body copy below the headline |
| `imageAlt` | `string?` | Alt text for background image (default: `"Collection hero"`) |

**Usage pattern:**
```tsx
<CollectionHeroBanner
  headline="The Nakshi Heritage Room"
  description="Step into the world of hand-engraved Nakshi craftsmanship…"
  imageAlt="Nakshi collection hero"
/>
```

**Implementation notes:**
- Uses `next/image` with `fill` + `priority` for the background (above-the-fold, no lazy load)
- Desktop layout: headline + description positioned at `left-0 top-[120px]`; tagline `TRUST | Quality | Premium` at `right-[40px] top-[222px]`
- Mobile/tablet: centred column layout replaces the absolute positioning
- Background image: `/images/sections/collections/hero-collection.avif` (fixed, not a prop)
- Does **not** add `pt-[80px]` — the banner covers the full viewport width from top

---

### PageHeader

Sticky bar that appears **below** `CollectionHeroBanner`. It sticks to `top-0` once the banner scrolls away (the navbar has already hidden on scroll-down by that point).

**Heights:** `~70px` with `py-[25px]` padding

**Props:**
| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Main page title (large text) |
| `subtitle` | `string?` | Small label above the title (e.g. `"Silver Jeweler"`) |
| `count` | `number?` | Product count shown as superscript next to title |
| `rightSlot` | `ReactNode?` | Optional slot on the right (e.g. Filters & Sorting control) |

**Usage pattern:**
```tsx
<PageHeader
  subtitle="Silver Jeweler"
  title="Nakshi"
  count={products.length}
  rightSlot={<FilterControl />}
/>
```

**Implementation notes:**
- `sticky top-0 z-40` — sits beneath the navbar z-index (50) but above content (1)
- `bg-white border-b border-[#f0f0f0]` — white with subtle bottom divider
- Left side uses `DirectionalReveal direction="left"` animation
- Right slot uses `DirectionalReveal direction="right"` animation
- Text sizes: title `28px → 40px → 48px` (mobile → tablet → desktop); subtitle/count `14px → 16px`
- Uses `layout-container` + `layout-inner` for gutter consistency

### Homepage Sections
| File | Key Design |
|---|---|
| `app/sections/MasterpiecesForEveryOccasionSection.tsx` | Horizontal scroll + category tabs + custom slider |
| `app/sections/MasterpiecesInSilverSection.tsx` | Single-product spotlight carousel |
| `app/sections/InnerCircleSection.tsx` | 3-row loyalty program with card sliders |
| `app/sections/CurrentObsessionsSection.tsx` | 6-item trend grid |
| `app/sections/SpottedInGoyazSection.tsx` | Infinite marquee |
| `app/sections/BrandStorySection.tsx` | Multi-panel heritage story |
| `app/sections/OurSocialSection.tsx` | Social icon row |

---

## Animation System (`app/utils/animations.tsx`)

### Core Hooks
| Hook | Purpose |
|---|---|
| `useScrollReveal()` | IntersectionObserver fade-in on scroll |
| `useStaggeredReveal()` | Children reveal with index delay |
| `useReducedMotion()` | Respects `prefers-reduced-motion` |
| `useMagneticHover()` | Cursor-following magnetic effect |
| `useParallax()` | Scroll-driven parallax |
| `useDelayedUnmount()` | Keep element in DOM for exit animation |

### Core Components
| Component | Usage |
|---|---|
| `ScrollRevealWrapper` | Wraps any element for scroll reveal |
| `StaggerRevealList` | Wraps list of items for staggered entry |
| `MagneticButton` | Hover magnetic CTA button |
| `MarqueeTrack` | Infinite marquee (used in SpottedInGoyaz) |

### Animation Classes (from `ANIMATION_CLASSES`)
```ts
hoverZoomBase  // parent: overflow-hidden + group for hover zoom
hoverZoomImg   // image: scale on group-hover
```

### Timing
```
instant: 100ms | quick: 200ms | normal: 300ms | slow: 500ms
slower: 700ms | epic: 1200ms
```

---

## Data Models

### `MasterpieceProduct`
```ts
{
  id: string;
  title: string;
  price: string;           // e.g. "INR 85,000/-"
  imageSrc: string;        // relative path from /public
  category: "Nakshi" | "Polki" | "Kundan" | "Temple" | "Bridal";
  size: "normal" | "wide";
}
```

### Product Counts (mock data)
- 8 products per category × 5 categories = **40 total**
- Prices: Nakshi ₹85k–92k | Polki ₹55k–64k | Kundan ₹65k–72k | Temple ₹72k–81k | Bridal ₹95k–106k

---

## Routing Architecture

```
app/
├── page.tsx                          ← Homepage (all sections)
├── layout.tsx                        ← Root shell + Navbar
└── collections/
    └── [category]/
        └── page.tsx                  ← View All for a collection
            URL: /collections/nakshi, /collections/polki, etc.
```

### Route Conventions
- Dynamic `params` are `Promise<{...}>` — always `await params` (Next.js 16)
- Use `generateStaticParams` for known param sets
- Use `notFound()` for invalid params

---

## Figma Page Map

| Figma Node | Page / Section |
|---|---|
| `374:21` ("Desktop - 9") | Collection View All page (Earrings) |
| Homepage nodes | Various homepage sections |

---

## Brand Panel (CTA Block)

Appears in collection pages and inner circle. Dark green background with:
- `background: linear-gradient(160deg, #013809 0%, #083c30 60%, #002f00 100%)`
- Heading: House of Montague, 32px, white, centered, max-w-[477px]
- Body: Futura PT, 16px, white
- CTA: white bg button, `border border-[#002f00]`, hover inverts colors

---

## Asset Paths

```
/public/images/sections/
├── masterpieces/       → frame30.avif, frame31.avif, frame48.avif, tab-line.svg
├── masterpieces-in-silver/
├── inner-circle/
├── current-obsessions/
├── spotted-in-goyaz/
├── brand-story/
├── navbar/             → logo, icons
└── our-social/         → social platform icons
```
