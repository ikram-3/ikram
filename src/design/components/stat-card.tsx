"use client";

import type { LucideIcon } from "lucide-react";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: LucideIcon;
  delay?: number;
}

/** KPI card with count-up — DESIGN MODULE primitive. */
export function StatCard({ value, suffix = "", label, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full items-center gap-3.5 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md">
        {Icon ? (
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
            <Icon size={18} />
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="font-mono text-2xl font-bold leading-none text-gold">
            <CountUp value={value} suffix={suffix} />
          </p>
          <p className="mt-1.5 truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </Reveal>
  );
}
