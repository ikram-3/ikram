// DESIGN MODULE — barrel export.
// Design system consumed by all pages: tokens, motion recipes, layout primitives.

export * from "./tokens";
export * from "./motion";

export { Reveal } from "./components/reveal";
export { CountUp } from "./components/count-up";
export { PageTransition } from "./components/page-transition";
export { PageHero } from "./components/page-hero";
export type { Crumb } from "./components/page-hero";
export { Section, SectionHeading } from "./components/section";
export { StatCard } from "./components/stat-card";
export { BackLink } from "./components/back-link";
export { ScrollProgress } from "./components/scroll-progress";
export { BackToTop } from "./components/back-to-top";
export { GoldCursor } from "./components/gold-cursor";
export { FeatureCard } from "@/components/ui/feature-card";
export type { FeatureCardProps } from "@/components/ui/feature-card";
