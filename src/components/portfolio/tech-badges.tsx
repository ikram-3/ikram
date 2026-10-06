import React from "react";

export interface TechItem {
  name: string;
  color: string;
  bg: string;
  border: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

export const HERO_TECH_STACK: TechItem[] = [
  {
    name: "Laravel",
    color: "text-[#FF2D20]",
    bg: "bg-[#FF2D20]/10",
    border: "border-[#FF2D20]/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 6.2 12.3 1a.6.6 0 0 0-.6 0L2.5 6.2a.6.6 0 0 0-.3.5v10.6a.6.6 0 0 0 .3.5l9.2 5.2a.6.6 0 0 0 .6 0l9.2-5.2a.6.6 0 0 0 .3-.5V6.7a.6.6 0 0 0-.3-.5ZM12 2.3l7.9 4.4L12 11.2 4.1 6.7 12 2.3Zm-8.6 5.6 7.9 4.5v8.9L3.4 16.8V7.9Zm9.2 13.4v-8.9l7.9-4.5v8.9l-7.9 4.5Z" />
      </svg>
    ),
  },
  {
    name: "React",
    color: "text-[#61DAFB]",
    bg: "bg-[#61DAFB]/10",
    border: "border-[#61DAFB]/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "text-foreground",
    bg: "bg-foreground/10",
    border: "border-foreground/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm3.5 13.9-6.3-8.2h1.6l5.4 7.1-.7 1.1Zm-4.9-1.3V9.4h1.4v5.2h-1.4Z" />
      </svg>
    ),
  },
  {
    name: "Python",
    color: "text-[#38BDF8]",
    bg: "bg-[#38BDF8]/10",
    border: "border-[#38BDF8]/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h5.9v.9H6.6S4.2 5.3 4.2 8.4s2.1 3 2.1 3h1.2V9.8c0-1.8 1.5-1.7 1.5-1.7h5.8s1.4 0 1.4-1.4V3.4S16.4 2 11.9 2Zm-1.7 1.5a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Zm1.9 18.5c3.1 0 2.9-1.3 2.9-1.3v-1.4H9.1v-.9h8.3s2.4.3 2.4-2.8-2.1-3-2.1-3h-1.2v1.6c0 1.8-1.5 1.7-1.5 1.7H9.2s-1.4 0-1.4 1.4v3.3s-.2 1.4 4.3 1.4Zm1.7-1.5a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    color: "text-[#00758F]",
    bg: "bg-[#00758F]/10",
    border: "border-[#00758F]/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: "AI / ML",
    color: "text-[#C084FC]",
    bg: "bg-[#C084FC]/10",
    border: "border-[#C084FC]/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1.5C4.8 8.8 4 7.5 4 6a4 4 0 0 1 8-4Z" />
        <path d="M9 13v3a3 3 0 0 0 6 0v-3" />
        <path d="m15 16 3 2.5a2 2 0 0 1 0 3.1L16 23" />
        <path d="m9 16-3 2.5a2 2 0 0 0 0 3.1L8 23" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    color: "text-[#009688]",
    bg: "bg-[#009688]/10",
    border: "border-[#009688]/30",
    icon: ({ className = "size-3.5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2 3 14h8l-2 8 12-13h-8l2-7Z" />
      </svg>
    ),
  },
];
