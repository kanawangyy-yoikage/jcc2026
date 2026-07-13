/**
 * Lightweight Framer Motion entry — LazyMotion + domAnimation
 * keeps the animation feature set while shrinking the runtime.
 */
export { LazyMotion, domAnimation, m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
export type { Variants } from 'framer-motion';

/** Shared easing used site-wide (GPU-friendly transform/opacity only). */
export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/** Viewport defaults: animate once, slightly early trigger. */
export const viewOnce = { once: true, margin: '-48px' as const, amount: 0.15 as const };
