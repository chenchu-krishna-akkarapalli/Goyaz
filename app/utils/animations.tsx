'use client';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
  CSSProperties,
} from 'react';

// ─────────────────────────────────────────────────────────────
// EASING CURVES  (named after industry reference points)
// ─────────────────────────────────────────────────────────────
export const EASINGS = {
  /** Apple / iOS spring feel — fast out, slight overshoot */
  spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Linear-style snappy entrance */
  snap: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  /** Expo-out — used by Stripe for hero reveals */
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Anticipation — slight pull-back before movement */
  anticipate: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Silky ease-in-out for ambient / background motion */
  silk: 'cubic-bezier(0.37, 0, 0.63, 1)',
  /** Hard stop — mechanical, editorial */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// ─────────────────────────────────────────────────────────────
// DURATION TOKENS
// ─────────────────────────────────────────────────────────────
export const DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 350,
  slow: 600,
  cinematic: 900,
  epic: 1200,
  sweep: 2000,
} as const;

// ─────────────────────────────────────────────────────────────
// TAILWIND CLASS MAPS
// ─────────────────────────────────────────────────────────────
export const ANIMATION_CLASSES = {
  // ── Scroll Reveal ──────────────────────────────────────────
  /** Base state: invisible, shifted down */
  revealBase:
    'opacity-0 translate-y-24 transition-[opacity,transform] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
  /** Active state: fully visible */
  revealActive: '!opacity-100 !translate-y-0',

  /** Reveal from left */
  revealFromLeftBase:
    'opacity-0 -translate-x-[120px] transition-[opacity,transform] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
  revealFromLeftActive: '!opacity-100 !translate-x-0',

  /** Reveal from right */
  revealFromRightBase:
    'opacity-0 translate-x-[120px] transition-[opacity,transform] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
  revealFromRightActive: '!opacity-100 !translate-x-0',

  /** Fade only — no movement (good for overlays, text) */
  fadeBase:
    'opacity-0 transition-opacity duration-[2000ms] ease-[cubic-bezier(0.37,0,0.63,1)] will-change-[opacity]',
  fadeActive: '!opacity-100',

  /** Scale + fade — card / modal entrance feel */
  scaleRevealBase:
    'opacity-0 scale-[0.96] transition-[opacity,transform] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
  scaleRevealActive: '!opacity-100 !scale-100',

  // ── Stagger delays (apply to individual children) ──────────
  delay0: 'delay-[0ms]',
  delay1: 'delay-[80ms]',
  delay2: 'delay-[160ms]',
  delay3: 'delay-[240ms]',
  delay4: 'delay-[320ms]',
  delay5: 'delay-[400ms]',
  delay6: 'delay-[480ms]',
  delay7: 'delay-[560ms]',
  delay8: 'delay-[640ms]',

  // ── Hover Micro-interactions ───────────────────────────────
  /** Container: enables child zoom on hover */
  hoverZoomBase: 'overflow-hidden group cursor-pointer',
  /** Child image / element that zooms */
  hoverZoomImg:
    'hover-zoom-transition group-hover:scale-[1.37]',

  /** Lift on hover — card elevation feel */
  hoverLift:
    'transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl',

  /** Subtle press / active state for buttons */
  pressable:
    'transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.6,1)] active:scale-[0.97]',

  /** Glow border reveal on hover */
  glowBorder:
    'relative transition-shadow duration-300 hover:shadow-[0_0_0_2px_currentColor]',

  // ── Looping / Ambient ──────────────────────────────────────
  /** Slow float — hero decorative elements */
  float: 'animate-[float_6s_ease-in-out_infinite]',
  /** Pulse ring — attention / notification */
  pulseRing: 'animate-[pulseRing_2s_ease-out_infinite]',
  /** Shimmer loading skeleton */
  shimmer:
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',

  /** Hero image rail fades in after 5s */
  heroMarqueeReveal:
    'opacity-0 animate-[heroMarqueeReveal_2s_cubic-bezier(0.16,1,0.3,1)_5s_forwards]',
  /** Hero image rail horizontal movement */
  heroMarqueeTrack:
    'animate-[heroMarqueeScroll_30s_linear_5s_infinite]',

  // ── Text Animations ────────────────────────────────────────
  /** Blur-in — Vercel-style heading reveal */
  blurRevealBase:
    'opacity-0 blur-sm transition-[opacity,filter] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,filter]',
  blurRevealActive: '!opacity-100 !blur-none',

  /** Clip reveal — text slides up from mask */
  clipRevealBase:
    '[clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[clip-path]',
  clipRevealActive: '![clip-path:inset(0%_0_0_0)]',

  // ── Nav Menu Panel ─────────────────────────────────────────
  /** Panel slides in from left — spring easing, 1.5s */
  navMenuPanel:
    'animate-[navMenuSlideIn_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Panel slides out to left — sharp easing, 1.5s */
  navMenuPanelExit:
    'animate-[navMenuSlideOut_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Backdrop fades in */
  navBackdrop:
    'animate-[navBackdropIn_1.5s_ease-out_forwards]',
  /** Backdrop fades out */
  navBackdropExit:
    'animate-[navBackdropOut_1.5s_ease-out_forwards]',
  /** Child panel expands to full width after sliding in */
  navChildPanelIn:
    'animate-[full-width_0.3s_ease-in-out_0.2s_forwards]',
  /** Child area rises from below main panel */
  navChildPanelRise:
    'animate-[navChildPanelRise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Left child list panel content entrance */
  navChildListIn:
    'animate-[navChildListIn_0.75s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Right child card panel content entrance */
  navChildCardsIn:
    'animate-[navChildCardsIn_0.82s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Mobile child panel slides in from the right edge (1.5 s spring) */
  navChildPanelSlideIn:
    'animate-[navChildPanelSlideInRight_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Mobile child panel slides out to the right edge (1.5 s sharp) */
  navChildPanelSlideOut:
    'animate-[navChildPanelSlideOutRight_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',

  // ── Cart Sidebar ───────────────────────────────────────────
  /** Sidebar slides in from right edge */
  cartDrawerIn:
    'animate-[cartDrawerSlideIn_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Sidebar slides out to right edge */
  cartDrawerOut:
    'animate-[cartDrawerSlideOut_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Cart backdrop fades in */
  cartBackdropIn:
    'animate-[cartBackdropIn_1.5s_ease-out_forwards]',
  /** Cart backdrop fades out */
  cartBackdropOut:
    'animate-[cartBackdropOut_1.5s_ease-out_forwards]',
  /** Cart line item slides up + fades in */
  cartItemIn:
    'animate-[cartItemSlideUp_0.45s_cubic-bezier(0.16,1,0.3,1)_forwards]',
  /** Hover-revealed Add-to-Cart bar — start state */
  cartBarHidden:
    'opacity-0 translate-y-full transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
  /** Hover-revealed Add-to-Cart bar — group-hover state */
  cartBarReveal:
    'group-hover:opacity-100 group-hover:translate-y-0',
} as const;

// ─────────────────────────────────────────────────────────────
// KEYFRAMES  (inject once into <head> or global CSS)
// ─────────────────────────────────────────────────────────────
const KEYFRAME_CSS = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
@keyframes pulseRing {
  0%   { transform: scale(1);    opacity: 0.8; }
  70%  { transform: scale(1.4);  opacity: 0;   }
  100% { transform: scale(1.4);  opacity: 0;   }
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
@keyframes heroMarqueeReveal {
  from { opacity: 0; transform: translateX(4%); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes heroMarqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0);     }
}
@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1);    }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes counterUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0);    }
}
@keyframes navMenuSlideIn {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}
@keyframes navMenuSlideOut {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
}
@keyframes navBackdropIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes navBackdropOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes navItemSlideUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes navItemSlideRight {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes navCardReveal {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes navImageReveal {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes full-width {
  from { width: 0; }
  to   { width: 880px; }
}
@keyframes navChildPanelRise {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes navChildListIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes navChildCardsIn {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cartDrawerSlideIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes cartDrawerSlideOut {
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
}
@keyframes cartBackdropIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes cartBackdropOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes cartItemSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

/** Inject keyframes once into <head>. Call at app root. */
export function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('brand-animation-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'brand-animation-keyframes';
  style.textContent = KEYFRAME_CSS;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────

/**
 * useScrollReveal
 * Fires once when the element enters the viewport. Stops observing after trigger.
 */
export function useScrollReveal(
  options: IntersectionObserverInit = { threshold: 0, rootMargin: '0px 0px -40px 0px' },
  once: boolean = true
) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setIsVisible(false);
      }
    }, options);
    observer.observe(el);
    return () => observer.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref: ref as MutableRefObject<any>, isVisible };
}

/**
 * useReducedMotion
 * Respects the OS-level prefers-reduced-motion setting.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/**
 * useCountUp
 * Animates a number from 0 (or `from`) to `to` using requestAnimationFrame.
 * Returns the current display value as a string.
 */
export function useCountUp({
  to,
  from = 0,
  duration = DURATIONS.cinematic,
  decimals = 0,
  prefix = '',
  suffix = '',
  startOnMount = false,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  startOnMount?: boolean;
}) {
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(startOnMount);
  const rafRef = useRef<number | null>(null);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const range = to - from;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Expo-out easing
      const eased = 1 - Math.pow(2, -10 * progress);
      setValue(from + range * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, to, from, duration]);

  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`;
  return { value, formatted, start };
}

/**
 * useParallax
 * Returns a scroll-driven Y offset for parallax effects.
 * `speed` of 0.3 means element moves 30% of scroll distance.
 */
export function useParallax(speed = 0.3): { y: number; ref: MutableRefObject<any> } {
  const ref = useRef<HTMLElement | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      setY(scrolled * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { y, ref: ref as MutableRefObject<any> };
}

/**
 * useMagneticHover
 * Applies a subtle magnetic pull toward the cursor — used by Linear, Vercel for CTA buttons.
 * Attach `ref` to the element, spread `style` onto it.
 */
export function useMagneticHover(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      setStyle({
        transform: `translate(${dx}px, ${dy}px)`,
        transition: `transform 200ms ${EASINGS.spring}`,
      });
    };

    const onLeave = () => {
      setStyle({
        transform: 'translate(0px, 0px)',
        transition: `transform 500ms ${EASINGS.spring}`,
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return { ref: ref as MutableRefObject<any>, style };
}

/**
 * useStaggeredReveal
 * Observes a container; when visible, sets `revealed` to true.
 * Children can derive their delay from their index * `staggerMs`.
 */
export function useStaggeredReveal(
  staggerMs = 80,
  options: IntersectionObserverInit = { threshold: 0, rootMargin: '0px 0px -40px 0px' }
) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.unobserve(el);
      }
    }, options);
    observer.observe(el);
    return () => observer.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChildStyle = (index: number): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(80px)',
    transition: `opacity 2000ms ${EASINGS.spring} ${index * staggerMs}ms,
                 transform 2000ms ${EASINGS.spring} ${index * staggerMs}ms`,
    willChange: 'opacity, transform',
  });

  return { containerRef: containerRef as MutableRefObject<any>, revealed, getChildStyle };
}

/**
 * useDelayedUnmount
 * Keeps `shouldRender` true for `delayMs` after `isMounted` flips false,
 * so CSS exit animations can finish before the element is removed from the DOM.
 *
 * @example
 * const shouldRender = useDelayedUnmount(isOpen, 450);
 * return shouldRender ? <Panel isOpen={isOpen} /> : null;
 */
export function useDelayedUnmount(isMounted: boolean, delayMs: number): boolean {
  const [shouldRender, setShouldRender] = useState(isMounted);

  useEffect(() => {
    if (isMounted) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), delayMs);
      return () => clearTimeout(timer);
    }
  }, [isMounted, delayMs]);

  return shouldRender;
}

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur' | 'clip';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before the animation fires after becoming visible */
  delay?: number;
  /** Which animation variant to use */
  variant?: RevealVariant;
  /** Override the transition duration in ms */
  duration?: number;
  /** Pass `as` to render a different element (e.g. 'section', 'li') */
  as?: React.ElementType;
  /** Intersection observer options */
  observerOptions?: IntersectionObserverInit;
  /** Whether the animation should only run once (default: true) */
  once?: boolean;
}

const VARIANT_BASE: Record<RevealVariant, string> = {
  up: ANIMATION_CLASSES.revealBase,
  down: 'opacity-0 -translate-y-6 transition-[opacity,transform] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
  left: ANIMATION_CLASSES.revealFromLeftBase,
  right: ANIMATION_CLASSES.revealFromRightBase,
  fade: ANIMATION_CLASSES.fadeBase,
  scale: ANIMATION_CLASSES.scaleRevealBase,
  blur: ANIMATION_CLASSES.blurRevealBase,
  clip: ANIMATION_CLASSES.clipRevealBase,
};

const VARIANT_ACTIVE: Record<RevealVariant, string> = {
  up: ANIMATION_CLASSES.revealActive,
  down: '!opacity-100 !translate-y-0',
  left: ANIMATION_CLASSES.revealFromLeftActive,
  right: ANIMATION_CLASSES.revealFromRightActive,
  fade: ANIMATION_CLASSES.fadeActive,
  scale: ANIMATION_CLASSES.scaleRevealActive,
  blur: ANIMATION_CLASSES.blurRevealActive,
  clip: ANIMATION_CLASSES.clipRevealActive,
};

/**
 * ScrollRevealWrapper
 * Drop-in component that animates children on scroll entry.
 *
 * @example
 * <ScrollRevealWrapper variant="blur" delay={200}>
 *   <h1>Hello World</h1>
 * </ScrollRevealWrapper>
 */
export function ScrollRevealWrapper({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  duration,
  as: Tag = 'div',
  observerOptions,
  once = true,
}: ScrollRevealWrapperProps) {
  const { ref, isVisible } = useScrollReveal(observerOptions, once);
  const reducedMotion = useReducedMotion();

  const inlineStyle: CSSProperties = {
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
    ...(duration != null ? { transitionDuration: `${duration}ms` } : {}),
  };

  // Skip animation entirely for accessibility
  if (reducedMotion) {
    return (
      <Tag className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      style={inlineStyle}
      className={`${VARIANT_BASE[variant]} ${isVisible ? VARIANT_ACTIVE[variant] : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * StaggerRevealList
 * Wraps a list of children and staggers their entrance.
 *
 * @example
 * <StaggerRevealList staggerMs={100} variant="up">
 *   {items.map(item => <Card key={item.id} {...item} />)}
 * </StaggerRevealList>
 */
export function StaggerRevealList({
  children,
  staggerMs = 80,
  className = '',
  childClassName = '',
  variant = 'up',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  staggerMs?: number;
  className?: string;
  childClassName?: string;
  variant?: RevealVariant;
  as?: React.ElementType;
}) {
  const { containerRef, getChildStyle } = useStaggeredReveal(staggerMs);
  const reducedMotion = useReducedMotion();

  return (
    <Tag ref={containerRef} className={className}>
      {React.Children.map(children, (child, i) =>
        child ? (
          <div
            key={i}
            style={reducedMotion ? {} : getChildStyle(i)}
            className={childClassName}
          >
            {child}
          </div>
        ) : null
      )}
    </Tag>
  );
}

/**
 * MagneticButton
 * A wrapper that applies magnetic hover pull to any button or CTA.
 *
 * @example
 * <MagneticButton>
 *   <button>Get started →</button>
 * </MagneticButton>
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const { ref, style } = useMagneticHover(strength);
  const reducedMotion = useReducedMotion();
  return (
    <div
      ref={ref}
      style={reducedMotion ? {} : style}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * ParallaxLayer
 * Applies a scroll-driven Y offset to its children.
 *
 * @example
 * <ParallaxLayer speed={0.4} className="absolute inset-0">
 *   <img src="bg.avif"  loading="lazy" decoding="async" />
 * </ParallaxLayer>
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { y, ref } = useParallax(speed);
  const reducedMotion = useReducedMotion();
  return (
    <div
      ref={ref}
      style={reducedMotion ? {} : { transform: `translateY(${y}px)`, willChange: 'transform' }}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * CountUpNumber
 * Animated counter that counts up when it enters the viewport.
 *
 * @example
 * <CountUpNumber to={12400} prefix="$" suffix="+" decimals={0} />
 */
export function CountUpNumber({
  to,
  from = 0,
  duration = DURATIONS.cinematic,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
  const { formatted, start } = useCountUp({ to, from, duration, decimals, prefix, suffix });

  useEffect(() => {
    if (isVisible) start();
  }, [isVisible, start]);

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}

/**
 * MarqueeTrack
 * Infinite horizontal marquee for logos, tags, or short text lines.
 *
 * @example
 * <MarqueeTrack speed={40} gap={48}>
 *   {logos.map(l => <img key={l} src={l}  loading="lazy" decoding="async" />)}
 * </MarqueeTrack>
 */
export function MarqueeTrack({
  children,
  speed = 40,
  gap = 32,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: {
  children: React.ReactNode;
  /** px per second */
  speed?: number;
  gap?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const items = React.Children.toArray(children);
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const duration = `${(items.length * 120) / speed}s`;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className="flex h-full gpu-layer"
        style={{
          gap,
          animationName: reducedMotion ? 'none' : 'marquee',
          animationDuration: duration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: 'running',
          width: 'max-content',
          /* Force a compositor layer so the marquee animation
             never causes layout/paint on the main thread */
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        {...(pauseOnHover && !reducedMotion ? {
          onMouseEnter: (e) => (e.currentTarget.style.animationPlayState = 'paused'),
          onMouseLeave: (e) => (e.currentTarget.style.animationPlayState = 'running'),
        } : {})}
      >
        {doubled.map((child, i) => (
          <div key={i} className="flex-shrink-0">{child}</div>
        ))}
      </div>
    </div>
  );
}

/**
 * DirectionalReveal
 * SSR-safe directional slide-in using CSS transitions.
 *
 * Content starts VISIBLE. The slide-in animation only plays when:
 * 1. User scrolls away (element exits viewport → opacity:0, translateX offset)
 * 2. User scrolls back (element re-enters → smooth slide-in transition)
 *
 * This guarantees content is always visible on initial load regardless of
 * viewport position, flex layout, or SSR hydration timing.
 */
export function DirectionalReveal({
  children,
  direction = 'left',
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Start visible — content is always rendered on first paint
  const [isVisible, setIsVisible] = useState(true);
  const [hasExited, setHasExited] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Only hide after the element has been seen and then scrolled away
          setHasExited(true);
          setIsVisible(false);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const translateX = direction === 'left' ? '-120px' : '120px';

  // Only apply transition styles after the element has exited at least once.
  // Before that, content is plain visible — no inline styles needed.
  const style: React.CSSProperties = hasExited
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : `translateX(${translateX})`,
        transition: `opacity 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }
    : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * LeftReveal / RightReveal
 * Safe alternatives to DirectionalReveal that work inside overflow-hidden parents.
 * Uses a small 32px offset (instead of 120px) so the element never exits the
 * clipping boundary. The primary reveal cue is opacity; the translate is subtle.
 */
function DirectionalRevealSafe({
  children,
  direction,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  direction: 'left' | 'right';
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const translateX = direction === 'left' ? '-32px' : '32px';

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : `translateX(${translateX})`,
    transition: `opacity 2s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export function LeftReveal({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <DirectionalRevealSafe direction="left" className={className} delay={delay}>
      {children}
    </DirectionalRevealSafe>
  );
}

export function RightReveal({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <DirectionalRevealSafe direction="right" className={className} delay={delay}>
      {children}
    </DirectionalRevealSafe>
  );
}
