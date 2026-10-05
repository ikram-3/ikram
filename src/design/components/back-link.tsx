"use client";

import { ArrowLeft } from "lucide-react";
import { useRouterStore } from "@/store/router";

interface BackLinkProps {
  to: string;
  label: string;
  className?: string;
}

/** Navigate-back control — DESIGN MODULE primitive (router-aware). */
export function BackLink({ to, label, className }: BackLinkProps) {
  const navigate = useRouterStore((s) => s.navigate);
  return (
    <button
      onClick={() => navigate(to)}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${className ?? ""}`}
    >
      <ArrowLeft size={16} aria-hidden="true" /> {label}
    </button>
  );
}
