"use client";

// DESIGN MODULE — GoldCursor: a custom cursor (gold dot + trailing ring).
// - Desktop only (fine pointer) and skipped entirely for prefers-reduced-motion.
// - Interactive elements (links/buttons) grow the ring; text fields fade the
//   custom cursor out so the native I-beam stays readable.
// - Adds `cursor-gold-active` to <html> so CSS hides the native cursor.

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='menuitem'], [data-cursor-hover], summary, select";
const TEXT_SELECTOR = "input, textarea";

type CursorState = "default" | "hover" | "text" | "down";

export function GoldCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const [state, setState] = useState<CursorState>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    // Touch devices keep the native cursor; desktops (incl. headless test
    // browsers that don't advertise pointer:fine) take over on first move.
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let active = false;
    // Activated on the first real mouse move — an event callback, not an
    // effect-body setState — so the native cursor stays put until takeover.
    const activate = () => {
      if (active) return;
      active = true;
      setEnabled(true);
      document.documentElement.classList.add("cursor-gold-active");
    };

    const onMove = (e: MouseEvent) => {
      activate();
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest(TEXT_SELECTOR)) setState("text");
      else if (target?.closest(INTERACTIVE_SELECTOR)) setState("hover");
      else setState("default");
    };

    const onDown = () => setState((s) => (s === "text" ? s : "down"));
    const onUp = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest(TEXT_SELECTOR)) setState("text");
      else if (target?.closest(INTERACTIVE_SELECTOR)) setState("hover");
      else setState("default");
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      active = false;
      document.documentElement.classList.remove("cursor-gold-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const ringSize = state === "hover" ? 44 : state === "down" ? 30 : 32;
  const dotSize = state === "hover" ? 4 : state === "down" ? 8 : 6;
  const faded = state === "text" || !visible;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY, opacity: faded ? 0 : 1 }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80 shadow-[0_0_12px_rgba(201,162,39,0.35)]"
      >
        {/* Corner ticks — hover state flourish */}
        <motion.span
          animate={{ opacity: state === "hover" ? 1 : 0, scale: state === "hover" ? 1 : 0.6 }}
          transition={{ duration: 0.15 }}
          className="absolute -left-1 -top-1 size-2 rounded-full border-l border-t border-gold"
        />
        <motion.span
          animate={{ opacity: state === "hover" ? 1 : 0, scale: state === "hover" ? 1 : 0.6 }}
          transition={{ duration: 0.15 }}
          className="absolute -bottom-1 -right-1 size-2 rounded-full border-b border-r border-gold"
        />
      </motion.div>

      {/* Center dot — instant follow */}
      <motion.div
        style={{ x, y, opacity: faded ? 0 : 1 }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />
    </div>
  );
}
