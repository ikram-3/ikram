"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  /** Feature icon component or custom React element */
  icon?: LucideIcon | React.ReactNode;
  /** Optional top category or status badge */
  badge?: string;
  /** Primary title of the feature */
  title: string;
  /** Clear, human-friendly feature description */
  description: string;
  /** Optional bullet highlights or capabilities */
  highlights?: string[];
  /** Label for the action button/link (defaults to "Learn more") */
  actionText?: string;
  /** Optional navigation URL (renders as an anchor if provided) */
  actionHref?: string;
  /** Optional click callback (renders as a button if provided without href) */
  onAction?: () => void;
  /** Corner where the simulated mouse pointer docks (defaults to "top-right") */
  cursorCorner?: "top-left" | "top-right";
  /** Optional pill label next to the simulated cursor (e.g. "Agent", "Interactive", "AI") */
  cursorLabel?: string;
  /** Additional CSS class names for the outer container */
  className?: string;
}

/**
 * Modern Glassmorphic Feature Card with Simulated Corner Cursor & Perimeter Glow Trace.
 * Strictly adheres to existing CSS variable design system tokens:
 * - Surface: var(--card), var(--background), var(--border)
 * - Typography: var(--foreground), var(--muted-foreground)
 * - Brand Accent: var(--primary), var(--gold-light)
 * - Icon Accent: var(--accent), var(--accent-foreground)
 * - Corner Radius: var(--radius) (0.75rem)
 */
export function FeatureCard({
  icon: Icon = Sparkles,
  badge,
  title,
  description,
  highlights,
  actionText = "Explore feature",
  actionHref,
  onAction,
  cursorCorner = "top-right",
  cursorLabel = "Interactive",
  className = "",
}: FeatureCardProps) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const isRight = cursorCorner === "top-right";

  // Vendor-prefixed mask styles for 100% cross-browser perimeter beam trace
  const perimeterMaskStyle: React.CSSProperties = {
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };

  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "function") {
      const LucideComponent = Icon as LucideIcon;
      return <LucideComponent size={22} aria-hidden="true" />;
    }
    return Icon;
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`
        group relative flex flex-col justify-between overflow-visible rounded-[var(--radius)]
        border border-[color-mix(in_srgb,var(--border)_75%,transparent)]
        bg-[rgba(255,255,255,0.45)] dark:bg-[rgba(19,22,28,0.55)]
        p-6 sm:p-7
        backdrop-blur-xl backdrop-saturate-150
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)]
        dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_40px_-15px_rgba(0,0,0,0.45)]
        transition-all duration-300
        ${className}
      `}
    >
      {/* ── Glowing Border Line Trace Animation (Border-Beam) ─────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius)]"
      >
        {/* Soft warm light trail / ambient glow around perimeter */}
        <div
          className="absolute -inset-[150%] transition-opacity duration-500"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, var(--primary) 310deg, var(--gold-light) 345deg, transparent 360deg)",
            filter: "blur(10px)",
            opacity: isHovered ? 0.85 : 0.45,
            animation: reduce ? "none" : `spin ${isHovered ? "4s" : "7s"} linear infinite`,
          }}
        />

        {/* Crisp glowing 1.5px perimeter beam line */}
        <div
          className="absolute inset-0 rounded-[var(--radius)] p-[1.5px]"
          style={perimeterMaskStyle}
        >
          <div
            className="absolute -inset-[150%]"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, var(--primary) 315deg, var(--gold-light) 345deg, transparent 360deg)",
              animation: reduce ? "none" : `spin ${isHovered ? "4s" : "7s"} linear infinite`,
            }}
          />
        </div>
      </div>

      {/* ── Corner Simulated Cursor & Radial Spotlight Glow ──────────────── */}
      <div
        className={`pointer-events-none absolute ${
          isRight ? "-top-3.5 -right-3.5" : "-top-3.5 -left-3.5"
        } z-20 flex items-center`}
      >
        {/* Pulsing radial spotlight under cursor */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--primary) 55%, transparent) 0%, color-mix(in srgb, var(--gold-light) 25%, transparent) 40%, transparent 75%)",
          }}
          animate={
            reduce
              ? undefined
              : {
                  scale: isHovered ? [1.1, 1.35, 1.1] : [0.85, 1.2, 0.85],
                  opacity: isHovered ? 0.95 : [0.55, 0.9, 0.55],
                }
          }
          transition={{
            duration: isHovered ? 1.8 : 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Swooping & Floating Pointer Cursor */}
        <motion.div
          initial={
            reduce
              ? undefined
              : {
                  x: isRight ? 24 : -24,
                  y: -24,
                  opacity: 0,
                  scale: 0.8,
                }
          }
          animate={
            reduce
              ? { opacity: 1 }
              : {
                  x: isHovered ? (isRight ? -2 : 2) : [0, isRight ? 2 : -2, 0],
                  y: isHovered ? 2 : [0, -3.5, 0],
                  opacity: 1,
                  scale: isHovered ? 0.94 : 1,
                }
          }
          transition={
            reduce
              ? undefined
              : isHovered
              ? { duration: 0.2, ease: "easeOut" }
              : {
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  default: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                }
          }
          className={`relative flex items-center gap-1.5 select-none ${
            isRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Crisp Mouse Cursor Arrow */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
          >
            <path
              d="M4.5 3L18.5 11L11.5 13L8 20L4.5 3Z"
              fill="var(--foreground)"
              stroke="var(--card)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="4.5" cy="3" r="2.5" fill="var(--primary)" />
          </svg>

          {/* Optional cursor label tag */}
          {cursorLabel && (
            <motion.span
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-tight shadow-md border border-white/20 whitespace-nowrap"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* ── Card Content Body ────────────────────────────────────────────── */}
      <div className="relative z-10 space-y-4">
        {/* Top Row: Icon + Optional Badge */}
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex size-12 sm:size-13 items-center justify-center rounded-xl border shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
              borderColor: "color-mix(in srgb, var(--primary) 22%, transparent)",
            }}
          >
            {renderIcon()}
          </div>

          {badge && (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase font-[family-name:var(--font-mono)] border"
              style={{
                color: "var(--gold-light)",
                backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-bold tracking-tight font-[family-name:var(--font-heading)] pt-1"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed font-[family-name:var(--font-sans)]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {description}
        </p>

        {/* Optional Capability Highlights */}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-1.5 pt-1">
            {highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs font-medium"
                style={{ color: "var(--foreground)" }}
              >
                <span
                  className="size-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Card Footer Action ───────────────────────────────────────────── */}
      <div className="relative z-10 pt-6 mt-2 border-t border-[color-mix(in_srgb,var(--border)_50%,transparent)]">
        {actionHref ? (
          <a
            href={actionHref}
            className="group/btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 4px 14px color-mix(in srgb, var(--primary) 28%, transparent)",
            }}
          >
            <span>{actionText}</span>
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
            />
          </a>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="group/btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 4px 14px color-mix(in srgb, var(--primary) 28%, transparent)",
            }}
          >
            <span>{actionText}</span>
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}
