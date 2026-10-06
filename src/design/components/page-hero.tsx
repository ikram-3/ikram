"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { enterProps } from "../motion";
import { useRouterStore } from "@/store/router";

export interface Crumb {
  label: string;
  /** When provided the crumb is a navigation button; otherwise it is the current page. */
  path?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  breadcrumb?: Crumb[];
  children?: ReactNode;
}

/**
 * Per-page hero — DESIGN MODULE primitive.
 * Ambient grid + gold eyebrow + page title + optional breadcrumb trail.
 */
export function PageHero({ eyebrow, title, description, breadcrumb, children }: PageHeroProps) {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  return (
    <section aria-labelledby="page-hero-title" className="relative border-b border-border bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 md:pb-14 md:pt-14">
        {breadcrumb && breadcrumb.length > 0 ? (
          <motion.nav
            {...enterProps(reduce, 0, 8)}
            aria-label="Breadcrumb"
            className="mb-5"
          >
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                    {crumb.path && !last ? (
                      <button
                        onClick={() => navigate(crumb.path!)}
                        className="rounded-sm font-medium transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className={last ? "font-medium text-foreground" : undefined} aria-current={last ? "page" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!last ? <ChevronRight size={12} className="text-muted-foreground/60" aria-hidden="true" /> : null}
                  </li>
                );
              })}
            </ol>
          </motion.nav>
        ) : null}

        <motion.p
          {...enterProps(reduce, 0.02, 10)}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          {...enterProps(reduce, 0.06, 12)}
          id="page-hero-title"
          className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            {...enterProps(reduce, 0.1, 12)}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {description}
          </motion.p>
        ) : null}


        {children ? <motion.div {...enterProps(reduce, 0.18, 10)} className="mt-8">{children}</motion.div> : null}
      </div>
    </section>
  );
}
