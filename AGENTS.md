<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent-Specific Rules for Goyaz

## Stack (exact versions)
- **Next.js 16.2.4** — App Router, NOT Pages Router
- **React 19.2.4** — Server Components by default
- **TypeScript 5**
- **Tailwind CSS v4** — config via CSS `@theme` block in `globals.css`, NOT `tailwind.config.js`

## Breaking Changes to Know

### Dynamic Route Params (Next.js 15+)
`params` is now a `Promise`. **Always await it.**
```tsx
// ✅ Correct
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
}

// ❌ Wrong (Next.js 14 style — will fail)
export default function Page({ params }: { params: { category: string } }) {
  const { category } = params; // params is a Promise, not an object
}
```

### Server Components Cannot Have Event Handlers
Any file using `onClick`, `onError`, `onChange`, `useState`, `useEffect`, etc. **must start with `"use client"`**.
The existing card components use `onError` on img elements — always add `"use client"` to such components.

### Tailwind CSS v4
- No `tailwind.config.js` file. Theme customisation goes in `globals.css` under `@theme inline { ... }`.
- Import: `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- Custom properties work as Tailwind tokens via CSS variables.

### Image Optimization
All images in `public/` must be in `.avif` format for premium performance. Always apply `loading="lazy" decoding="async"` to `<img>` tags unless they are Next.js `<Image>` components (which handle this natively) or above the fold.

## Architecture Patterns

### Micro-Frontend Isolation
Each section has `[data-mfe="section"]` on its root element. CSS `isolation: isolate` and `contain: layout style` prevent bleed between sections. Respect this — don't add global styles that target section internals.

### Animation System
All scroll animations live in `app/utils/animations.tsx`. Use the exported hooks and components (`ScrollRevealWrapper`, `StaggerRevealList`, etc.) rather than writing new IntersectionObserver logic.

### Data Layer
All product/section data is in `app/data/*.ts` as static TypeScript exports. There is no API or database. To add products, edit the data files.

## Route Map

| URL | File |
|---|---|
| `/` | `app/page.tsx` |
| `/collections/nakshi` | `app/collections/[category]/page.tsx` |
| `/collections/polki` | `app/collections/[category]/page.tsx` |
| `/collections/kundan` | `app/collections/[category]/page.tsx` |
| `/collections/temple` | `app/collections/[category]/page.tsx` |
| `/collections/bridal` | `app/collections/[category]/page.tsx` |

## When Adding New Pages
1. Create `app/<route>/page.tsx`
2. If the route uses dynamic segments, use `generateStaticParams` for known values
3. Keep the Navbar out — it's injected by `app/layout.tsx`
4. Add `pt-[80px]` to the outermost div (navbar is fixed, 80px tall)
5. Use `px-[40px]` for horizontal gutters matching the 1440px design grid

## Design Reference
See `ClaudeDesign.md` for the full design system: colors, typography, card specs, layout grid, and Figma node map.
