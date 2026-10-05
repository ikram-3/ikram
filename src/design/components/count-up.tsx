"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Count-up KPI — DESIGN MODULE primitive (600ms ease-out).
 * Starts on first intersection; if `value` arrives/changes later (e.g. async
 * dashboard counts), it re-animates from the last displayed number.
 */
export function CountUp({ value, suffix = "", duration = 0.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);
  const shownRef = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let controls: { stop: () => void } | null = null;

    const run = () => {
      controls?.stop();
      if (reduce) {
        shownRef.current = value;
        setDisplay(value);
        return;
      }
      controls = animate(shownRef.current, value, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      shownRef.current = value;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        if (!startedRef.current) {
          startedRef.current = true;
          run();
        } else if (shownRef.current !== value) {
          run();
        }
      },
      { rootMargin: "-40px" }
    );
    observer.observe(node);

    // Value updated while already started and in view (e.g. counts loaded async).
    if (startedRef.current && shownRef.current !== value) run();

    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
