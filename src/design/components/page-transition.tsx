"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../motion";

interface PageTransitionProps {
  /** Unique key per page view — drives enter/exit on route change. */
  pageKey?: string;
  children: ReactNode;
}

/** Page swap animation — DESIGN MODULE primitive used by the site shell. */
export function PageTransition({ pageKey, children }: PageTransitionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={pageKey}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={reduce ? { duration: 0.12, ease: "easeOut" } : { duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
