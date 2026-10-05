"use client";

import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

/** Page content band — DESIGN MODULE primitive (max-width container + rhythm). */
export function Section({ children, className, id, ariaLabel }: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={`py-12 md:py-16 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** Section header — gold eyebrow + title + gold rule (aria-labelledby target via `id`). */
export function SectionHeading({ id, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-10 max-w-2xl md:mb-12 ${className ?? ""}`}>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
      ) : null}
      <div className="mt-5 h-px w-16 bg-gold/60" aria-hidden="true" />
    </Reveal>
  );
}
