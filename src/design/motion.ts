// DESIGN MODULE — Motion recipes.
// Shared variants/props so every page animates on the same curve.
// MOTION_CONTEXT rules: transform/opacity only, ease [0.22, 1, 0.36, 1],
// always honor prefers-reduced-motion.

import type { Variants } from "framer-motion";

/** Signature brand ease (MOTION_CONTEXT §2). */
export const EASE = [0.22, 1, 0.36, 1] as const;

interface MotionProps {
  initial: Record<string, unknown>;
  whileInView: Record<string, unknown>;
  viewport: { once: boolean; margin: string };
  transition: Record<string, unknown>;
}

interface EnterProps {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  transition: Record<string, unknown>;
}

/** Scroll-reveal props (whileInView). Pass `reduce` from useReducedMotion(). */
export function revealProps(reduce: boolean, delay = 0, y = 16): MotionProps {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: reduce
      ? { duration: 0.15, ease: "easeOut" }
      : { duration: 0.45, delay, ease: EASE },
  };
}

/** Mount animation props (animate on render, e.g. after page switch). */
export function enterProps(reduce: boolean, delay = 0, y = 14): EnterProps {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0.15, ease: "easeOut" }
      : { duration: 0.45, delay, ease: EASE },
  };
}

/** Staggered parent container — pair with `staggerItem`. */
export function staggerContainer(reduce: boolean, stagger = 0.06): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger } },
  };
}

/** Staggered child item — pair with `staggerContainer`. */
export function staggerItem(reduce: boolean, y = 14): Variants {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  };
}

/** Chip-scale variant for tiny elements (skill chips, badges). */
export function staggerChip(reduce: boolean): Variants {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };
}
