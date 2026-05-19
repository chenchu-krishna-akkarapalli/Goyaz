# Goyaz Design & Animation System

## 1. Global Transitions & Motion Tokens
- **Default ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, premium ease-out)
- **Duration**: 300ms for micro-interactions, 800ms for scroll reveals.
- **Hover states**: Smooth background/color transitions on all buttons and interactive links.

## 2. Scroll Revealing Animations
Used when sections enter the viewport to create a dynamic, narrative feel.
- **Fade Up**: Elements start at `opacity: 0` and `translateY: 32px`, animating to `opacity: 1` and `translateY: 0`.
- **Implementation**: Utilizes an Intersection Observer hook (`useScrollReveal` in `app/utils/animations.ts`) combined with Tailwind transition utilities.

## 3. Keyframe Animations
Continuous or complex multi-step animations.
- **Hero Scroll Indicator**: Existing `bounce-y` animation, smooth floating effect.
- **Image Hover Zoom**: When hovering over product cards or category images, the image subtly scales up `transform: scale(1.03)` over 300ms.

## 4. Micro-Interactions
Feedback for user actions to make the interface feel alive and premium.
- **Button Hover**: 'Ghost buttons' fill with solid background (`--color-fg`) and text inverts to `--color-bg`.
- **Cart/Heart Icon Hover**: Small opacity/brightness shift to indicate interactivity.

## 5. Animation Files
- `app/utils/animations.ts`: Contains the `useScrollReveal` hook and standard animation class name constants.
- `app/globals.css`: Contains core CSS definitions for global classes (`.card`, `.btn-ghost`) and custom keyframes.

## 6. Performance & Media (Premium Standard)
- **Image Formats**: All photographic and raster assets must use `.avif` for maximum compression without quality loss.
- **Lazy Loading**: `loading="lazy"` and `decoding="async"` applied to all standard `<img>` tags to ensure lightning-fast TTI (Time to Interactive).
- **Next.js `<Image>`**: Preferred when strict dimensional control and LCP optimization are required for hero assets.
