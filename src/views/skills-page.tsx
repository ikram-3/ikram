"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  LayoutTemplate,
  ServerCog,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterProps, PageHero, Section } from "@/design";
import { currentlyDeepening, skillGroups } from "@/profile";
import { useRouterStore } from "@/store/router";

/** Flat tech list for the marquee strip (derived from the skill groups above). */
const MARQUEE_TECH = skillGroups.flatMap((g) => g.items);

const SKILL_ICONS: Record<string, typeof BrainCircuit> = {
  "AI & Machine Learning": BrainCircuit,
  "Backend & APIs": ServerCog,
  Frontend: LayoutTemplate,
  Mobile: Smartphone,
  "Data & Visualization": BarChart3,
  "Tools & Automation": Wrench,
};

export function SkillsPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const chip = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <>
      <PageHero
        eyebrow="Skills"
        title={
          <>
            Stacks that <span className="text-gradient-gold">serve the problem</span>
          </>
        }
        description="From grounded AI pipelines to the unglamorous product details that make software usable — the stack follows the problem, never the reverse."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Skills" }]}
      />

      {/* Tech ticker — decorative marquee, duplicated list for a seamless loop */}
      <div
        aria-hidden="true"
        className="relative mt-2 overflow-hidden border-y border-border/60 bg-card/40 py-3"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-3">
          {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border/70 bg-background/60 px-3.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              <span className="size-1 rounded-full bg-gold/70" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <Section ariaLabel="Skill groups">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => {
            const Icon = SKILL_ICONS[group.category] ?? Wrench;
            return (
              <motion.article
                key={group.category}
                variants={item}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">{group.category}</h2>
                </div>
                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex max-h-64 flex-wrap gap-1.5 overflow-y-auto"
                  aria-label={`${group.category} skills`}
                >
                  {group.items.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={chip}
                      className="rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground transition-colors duration-200 hover:border-gold/50 hover:text-gold"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.p
          {...enterProps(reduce, 0.05)}
          className="mt-8 text-xs italic text-muted-foreground"
        >
          {currentlyDeepening}
        </motion.p>

        <motion.div {...enterProps(reduce, 0.1)} className="mt-10 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/projects")}
            className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            See the stacks in action <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </motion.div>
      </Section>
    </>
  );
}
