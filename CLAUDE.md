# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# Goyaz — Project Instructions for Claude

## What This Project Is
Luxury silver jewellery e-commerce site for Goyaz (India's premier silver brand). Built with Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npx tsc --noEmit  # Type-check without emitting
```

No test suite exists in this project.

## Design System
See `ClaudeDesign.md` for the full design reference including: colors, typography, layout grid, component inventory, animation system, data models, and Figma node map.

## Folder Conventions
```
app/
├── components/       → Shared UI components (Navbar, cards, etc.)
│   ├── cards/        → Product card variants (CollectionCard, MasterpieceNormalCard, MasterpieceWideCard)
│   └── cart/         → CartSidebar
├── sections/         → Full-width homepage sections (each self-contained)
├── data/             → Static mock data (TypeScript) — no API or database
├── utils/            → animations.tsx (scroll/hover primitives) + cart.tsx (context)
└── collections/
    └── [category]/   → /collections/nakshi, /collections/polki, etc.
```

- **New homepage sections** → `app/sections/`
- **New route pages** → `app/<route-name>/page.tsx`
- **New reusable UI** → `app/components/`
- **New data** → `app/data/`

## Architecture: Key Cross-File Patterns

### Layout Shell
`app/layout.tsx` wraps every page with `<Navbar>`, `<Footer>`, and `<CartProvider>` + `<CartSidebar>`. These are injected globally — never add them inside a page. The root element uses MFE isolation zones (`data-mfe="navbar"`, `"main"`, `"footer"`).

### Cart State
`app/utils/cart.tsx` exports a `CartProvider` (mounted in layout) and a `useCart()` hook. Any component that calls `addItem`, `removeItem`, `open`, or `close` must be a Client Component and call `useCart()`. The cart is session-only (no persistence).

### Animation System
`app/utils/animations.tsx` is the single source for all motion primitives. Use:
- `<ScrollRevealWrapper>` — fade/slide in on scroll
- `<StaggerRevealList>` — staggered children reveal
- `<DirectionalReveal>` — slide from left/right
- `<MarqueeTrack>` — infinite horizontal scroll
- `ANIMATION_CLASSES` object — Tailwind class strings for hover zoom, cart bar, nav panels

Never write new `IntersectionObserver` logic; always extend this file.

### Responsive Token System
Breakpoint tokens are defined via `@media` overrides in `app/globals.css` directly on `:root`:
- Mobile (≤639px): `--layout-gutter: 16px`, `--navbar-h: 60px`
- Tablet (640–1023px): `--layout-gutter: 24px`, `--navbar-h: 70px`
- Desktop: `--layout-gutter: 40px`, `--navbar-h: 80px`

The Tailwind breakpoints in use are `sm:` (640px), `md:` (768px), `lg:` (1024px). Desktop designs are at `lg:` and above.

### Section Isolation (MFE)
Every `<section data-mfe="section">` gets automatic `padding-inline: var(--layout-gutter)` and `isolation: isolate` from globals.css. This means gutter changes to the token propagate to all sections automatically.

## Code Style
- Tailwind v4 for styling; design tokens via CSS variables in `globals.css`
- Fonts via inline `style={{ fontFamily: ... }}` — never via Tailwind font utilities
- Always check existing patterns before introducing new abstractions
- No comments unless the WHY is non-obvious

## Image Paths
All images live under `/public/images/sections/<section-name>/`. Reference as `/images/sections/...` in `src` attributes. All images must be `.avif` format.

## Critical Rules
1. `params` in dynamic routes is a `Promise` — always `await params` (Next.js 16 breaking change)
2. Client event handlers (`onClick`, `onError`, etc.) require `"use client"` directive
3. **Hero/banner pages**: let the fixed navbar overlay the top of the page (no `pt` needed — the navbar is transparent over the hero). **Non-hero pages** (no full-bleed banner): add `pt-[60px] lg:pt-[80px]` to offset the fixed navbar.
4. Card grid math (desktop): 4 normal cards (325px) + 3 gaps (20px) = 1360px inner width. Normal cards use `aspect-square`; wide cards (670px) use fixed heights, not aspect-square.
5. The `section[data-mfe="section"]` CSS selector auto-applies gutters — don't add `px-` manually to section root elements.
