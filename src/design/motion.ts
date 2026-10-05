// DESIGN MODULE — Motion recipes.
// Shared variants/props so every page animates on the same curve.
// MOTION_CONTEXT rules: transform/opacity only, ease [0.22, 1, 0.36, 1],
// always honor prefers-reduced-motion.

import type { Variants, TargetAndTransition, Transition } from "framer-motion";

/** Signature brand ease (MOTION_CONTEXT §2). */
export const EASE = [0.22, 1, 0.36, 1] as const;

interface MotionProps {
  initial: TargetAndTransition;
  whileInView: TargetAndTransition;
  viewport: { once: boolean; margin: string };
  transition: Transition;
}

interface EnterProps {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

/** Scroll-reveal props (whileInView). Pass `reduce` from useReducedMotion(). */
export function revealProps(reduce: boolean | null | undefined, delay = 0, y = 16): MotionProps {
  const isReduced = Boolean(reduce);
  return {
    initial: isReduced ? { opacity: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: isReduced
      ? { duration: 0.15, ease: "easeOut" }
      : { duration: 0.45, delay, ease: EASE },
  };
}

/** Mount animation props (animate on render, e.g. after page switch). */
export function enterProps(reduce: boolean | null | undefined, delay = 0, y = 14): EnterProps {
  const isReduced = Boolean(reduce);
  return {
    initial: isReduced ? { opacity: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: isReduced
      ? { duration: 0.15, ease: "easeOut" }
      : { duration: 0.45, delay, ease: EASE },
  };
}

/** Staggered parent container — pair with `staggerItem`. */
export function staggerContainer(reduce: boolean | null | undefined, stagger = 0.06): Variants {
  const isReduced = Boolean(reduce);
  return {
    hidden: {},
    show: { transition: { staggerChildren: isReduced ? 0 : stagger } },
  };
}

/** Staggered child item — pair with `staggerContainer`. */
export function staggerItem(reduce: boolean | null | undefined, y = 14): Variants {
  const isReduced = Boolean(reduce);
  return {
    hidden: isReduced ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  };
}

/** Stagger chips for skill pills, tech tags, etc. */
export function staggerChip(reduce: boolean | null | undefined): Variants {
  const isReduced = Boolean(reduce);
  return {
    hidden: isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE } },
  };
}
