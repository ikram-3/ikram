"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartBarBig,
  Download,
  Globe,
  MapPin,
  ReceiptText,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterProps, staggerContainer, staggerItem } from "@/design";
import { Section, SectionHeading } from "@/design/components/section";
import { identity, stats, services, processSteps } from "@/profile";
import { getFeaturedProjects } from "@/profile/projects";
import { useRouterStore } from "@/store/router";
import { CountUp } from "@/design/components/count-up";
import { ProjectCard } from "./project-card";
import { HERO_TECH_STACK } from "@/components/portfolio/tech-badges";

/** Factual metrics only — every value traces to the profile module. */
const LANDING_METRICS = [
  { value: stats.projectsTotal, suffix: "", label: "Projects delivered" },
  { value: stats.liveDeployments, suffix: "", label: "Live production systems" },
  { value: 3, suffix: "+", label: "Years building software" },
  { value: stats.certifications, suffix: "", label: "Professional certifications" },
] as const;

const SERVICE_ICONS = {
  globe: Globe,
  brain: BrainCircuit,
  bot: Bot,
  smartphone: Smartphone,
  chart: ChartBarBig,
  wrench: Wrench,
} as const;

export function HomePage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const featuredSnapshot = getFeaturedProjects().slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="relative border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
            {/* Left: copy */}
            <div className="max-w-xl">
              <motion.p
                {...enterProps(reduce, 0)}
                className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold"
              >
                Software Engineer · Full-Stack &amp; Applied AI
              </motion.p>

              <motion.h1
                {...enterProps(reduce, 0.05)}
                id="hero-heading"
                className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
              >
                Muhammad Ikram
              </motion.h1>

              <motion.p
                {...enterProps(reduce, 0.08)}
                className="mt-4 text-lg font-medium text-foreground/80 sm:text-xl"
              >
                I design, build and deploy complete software systems — from database to interface.
              </motion.p>

              <motion.p
                {...enterProps(reduce, 0.11)}
                className="mt-4 text-[15px] leading-relaxed text-muted-foreground"
              >
                Business platforms, AI assistants grounded in your own data, and automation that removes
                repetitive work. Delivered end-to-end with clean code and a clear handover.
              </motion.p>

              <motion.div {...enterProps(reduce, 0.14)} className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/projects")}
                  className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  View my work <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/quotation")}
                  className="h-11 rounded-md border-border bg-card px-6 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  <ReceiptText size={16} aria-hidden="true" /> Request a quote
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => window.open("/cv", "_blank")}
                  className="h-11 rounded-md px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Download size={16} aria-hidden="true" /> Download CV
                </Button>
              </motion.div>

              <motion.div {...enterProps(reduce, 0.17)} className="mt-10 border-t border-border pt-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Core stack
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Core tech stack">
                  {HERO_TECH_STACK.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <li
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground/80"
                      >
                        <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                        {tech.name}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>

            {/* Right: studio portrait */}
            <motion.figure
              {...enterProps(reduce, 0.1)}
              className="relative mx-auto w-full max-w-[400px] lg:max-w-[440px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#eef0f2_55%,#dfe3e7_100%)] dark:bg-[radial-gradient(ellipse_at_50%_35%,#2a2f36_0%,#1b1f24_60%,#131619_100%)]">
                {/* Soft floor shadow for a grounded, realistic look */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-[3%] left-1/2 h-[6%] w-[70%] -translate-x-1/2 rounded-[100%] bg-black/15 blur-xl dark:bg-black/50"
                />
                <Image
                  src="/images/profile/ikram-executive-sitting.webp"
                  alt="Muhammad Ikram, Software Engineer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 90vw"
                  className="object-contain object-bottom px-[6%] pt-[6%]"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{identity.name}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} aria-hidden="true" /> {identity.location}
                </span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Metrics */}
          <motion.dl
            {...enterProps(reduce, 0.2)}
            className="grid grid-cols-2 border-t border-border sm:grid-cols-4"
          >
            {LANDING_METRICS.map((item, i) => (
              <div
                key={item.label}
                className={[
                  "border-border py-6 pr-4",
                  i % 2 === 1 ? "border-l pl-5" : "",
                  i >= 2 ? "border-t sm:border-t-0" : "",
                  i === 2 ? "sm:border-l sm:pl-5" : "",
                ].join(" ")}
              >
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                  <CountUp value={item.value} suffix={item.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Section ariaLabel="Services">
        <SectionHeading
          eyebrow="Services"
          title="What I build for clients"
          description="Six service lines — each one backed by a delivered system you can open and inspect."
        />
        <motion.div
          variants={staggerContainer(reduce, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <motion.article
                key={service.id}
                variants={staggerItem(reduce)}
                className="group flex h-full flex-col bg-card p-6 transition-colors duration-200 hover:bg-muted/40"
              >
                <span
                  className="mb-4 grid size-10 place-items-center rounded-md border border-border bg-background text-gold"
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </span>
                <h3 className="text-[15px] font-semibold tracking-tight text-foreground">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <button
                  onClick={() => navigate(`/projects/${service.proofSlug}`)}
                  className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-gold transition-colors hover:text-gold-light focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label={`Case study: ${service.proof}`}
                >
                  Case study: {service.proof}
                  <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <Section ariaLabel="How an engagement runs" className="border-y border-border bg-card/50">
        <SectionHeading
          eyebrow="Process"
          title="From first message to production"
          description="Clear scope, visible milestones and a documented handover — the same path on every project."
        />
        <motion.ol
          variants={staggerContainer(reduce, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step) => (
            <motion.li key={step.step} variants={staggerItem(reduce)} className="border-t-2 border-gold pt-5">
              <span className="font-mono text-xs font-semibold text-muted-foreground">Step {step.step}</span>
              <h3 className="mt-1.5 text-[15px] font-semibold tracking-tight text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Section>

      {/* ── Featured work ────────────────────────────────────────────────── */}
      <Section ariaLabel="Featured projects">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Built end-to-end, deployed for real"
            description="Three representative systems from a registry of 35 delivered projects."
            className="mb-0 md:mb-0"
          />
          <Button
            variant="outline"
            onClick={() => navigate("/projects")}
            className="h-10 shrink-0 rounded-md border-border px-5 font-semibold text-foreground hover:bg-muted"
          >
            All {stats.projectsTotal} projects <ArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>
        <motion.div
          variants={staggerContainer(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredSnapshot.map((p) => (
            <ProjectCard key={p.id} project={p} variant="featured" />
          ))}
        </motion.div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section ariaLabel="Call to action" className="pt-0 md:pt-0">
        <motion.div
          {...enterProps(reduce, 0)}
          className="flex flex-col items-start justify-between gap-6 rounded-xl bg-[#0F1A14] p-8 text-white md:flex-row md:items-center md:p-12 dark:border dark:border-border dark:bg-card"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Have a project in mind?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 dark:text-muted-foreground">
              Share the outline and receive a written scope with a fixed price — usually within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => navigate("/quotation")}
              className="h-11 rounded-md bg-[#22C55E] px-6 font-semibold text-[#052E16] hover:bg-[#4ADE80]"
            >
              <ReceiptText size={16} aria-hidden="true" /> Request a quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/contact")}
              className="h-11 rounded-md border-white/25 bg-transparent px-6 font-semibold text-white hover:bg-white/10 hover:text-white dark:border-border"
            >
              Contact me
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
