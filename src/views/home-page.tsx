"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bot,
  BrainCircuit,
  Briefcase,
  ChartBarBig,
  Download,
  FolderGit2,
  Globe,
  HeartHandshake,
  Mail,
  ReceiptText,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterProps, staggerContainer, staggerItem, StatCard } from "@/design";
import { Section, SectionHeading } from "@/design/components/section";
import { identity, summary, stats, domains, services, processSteps } from "@/profile";
import { getFeaturedProjects } from "@/profile/projects";
import { useRouterStore } from "@/store/router";
import { CountUp } from "@/design/components/count-up";
import { ProjectCard } from "./project-card";
import { HERO_TECH_STACK } from "@/components/portfolio/tech-badges";

const LANDING_METRICS = [
  {
    icon: Target,
    value: 3,
    suffix: "+",
    label: "Years Learning & Building",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: FolderGit2,
    value: 6,
    suffix: "+",
    label: "Real Projects",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    icon: ShieldCheck,
    value: 3,
    suffix: "",
    label: "Certifications",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: HeartHandshake,
    value: 100,
    suffix: "%",
    label: "Passion & Dedication",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
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
      {/* ── Hero matching reference design (Theme-aware, crisp, and properly proportioned) ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-background text-foreground transition-colors duration-300 pt-6 pb-12 sm:pb-16 lg:pb-20 border-b border-border/40"
      >
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-background dark:from-emerald-950/20 dark:via-background dark:to-background" />
          <div className="absolute right-0 top-1/4 size-96 rounded-full bg-emerald-500/[0.07] dark:bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 pt-4 lg:pt-8">
            
            {/* Left Content Column */}
            <div className="max-w-xl">
              {/* Eyebrow Pill */}
              <motion.div
                {...enterProps(reduce, 0)}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 backdrop-blur-md shadow-sm"
              >
                <span className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden="true" />
                <span>Available for Opportunities</span>
              </motion.div>

              {/* Title / Name */}
              <motion.div {...enterProps(reduce, 0.05)} className="space-y-1">
                <p className="text-base sm:text-lg font-medium text-muted-foreground">
                  Hello, I&apos;m
                </p>
                <h1
                  id="hero-heading"
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[3.8rem] text-foreground"
                >
                  Muhammad{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-green-400 bg-clip-text text-transparent">
                    Ikram
                  </span>
                </h1>
                <p className="pt-1 text-lg sm:text-xl font-semibold text-foreground/90 md:text-2xl">
                  Project Based Software Engineer
                </p>
              </motion.div>

              {/* Bio Paragraph */}
              <motion.p
                {...enterProps(reduce, 0.1)}
                className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-[15px]"
              >
                I build modern web applications, work with AI &amp; data, and love creating scalable systems.
                I turn ideas into real products using clean code, smart design and problem-solving skills.
              </motion.p>

              {/* Tech Stack Horizontal Pills */}
              <motion.div
                {...enterProps(reduce, 0.15)}
                className="mt-6 flex flex-wrap items-center gap-2"
                aria-label="Core Tech Stack"
              >
                {HERO_TECH_STACK.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className={`inline-flex items-center gap-1.5 rounded-full border ${tech.border} ${tech.bg} px-3 py-1 text-xs font-medium ${tech.color} backdrop-blur-md shadow-sm transition-transform hover:scale-105`}
                    >
                      <Icon className="size-3.5 shrink-0" />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Action Buttons */}
              <motion.div {...enterProps(reduce, 0.2)} className="mt-8 flex flex-wrap items-center gap-3.5">
                <Button
                  size="lg"
                  onClick={() => navigate("/projects")}
                  className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-neutral-950 px-6 text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  View My Projects <ArrowRight size={16} aria-hidden="true" className="ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open("/cv", "_blank")}
                  className="h-12 rounded-xl border border-border/80 hover:border-emerald-500/50 bg-card/80 hover:bg-muted text-foreground px-6 text-sm font-semibold backdrop-blur-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Download size={16} aria-hidden="true" className="mr-1.5" /> Download CV
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Executive Portrait Showcase (image.png transparent cutout) */}
            <motion.div
              {...enterProps(reduce, 0.15)}
              className="relative mx-auto flex w-full max-w-[420px] lg:max-w-[460px] items-center justify-center"
            >
              {/* Subtle ambient emerald backlight */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/25 via-emerald-400/10 to-transparent blur-2xl opacity-70 pointer-events-none"
              />

              {/* Framed Graphic Showcase Card */}
              <div className="relative aspect-[3/3.6] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-card/90 via-card/50 to-emerald-950/20 shadow-2xl shadow-emerald-950/25 transition-all duration-300 hover:scale-[1.01] hover:shadow-emerald-500/20 flex items-end justify-center pt-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.12),transparent_70%)]"
                />

                <Image
                  src="/images/profile/image.png"
                  alt="Muhammad Ikram — Software Engineer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
                />

                {/* Bottom subtle edge blend */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/60 to-transparent" />

                {/* Floating identity badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-background/85 px-3.5 py-2 backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">Muhammad Ikram</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-400">Software Engineer</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Metric Stats Bar (spans across the entire bottom) */}
          <motion.div
            {...enterProps(reduce, 0.25)}
            className="mt-12 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-lg backdrop-blur-md dark:border-emerald-500/20 dark:bg-card/40 dark:shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-4 divide-y divide-border/20 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:gap-6">
              {LANDING_METRICS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3">
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl border ${item.iconBg} shadow-inner`}
                    >
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="font-mono text-2xl font-extrabold text-white">
                        <CountUp value={item.value} suffix={item.suffix} />
                      </p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What I build (services) ────────────────────────────────────── */}
      <Section ariaLabel="Services" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="What I build"
          title="Six service lines, every one shipped before"
          description="Nothing here is theoretical — each service line points at a delivered system from the 35-project registry."
        />
        <motion.div
          variants={staggerContainer(reduce, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <motion.article
                key={service.id}
                variants={staggerItem(reduce)}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid size-10 place-items-center rounded-md bg-gold/10 text-gold transition-transform duration-200 group-hover:scale-110" aria-hidden="true">
                    <Icon size={19} />
                  </span>
                  <h3 className="text-sm font-bold leading-snug tracking-tight">{service.title}</h3>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <button
                  onClick={() => navigate(`/projects/${service.proofSlug}`)}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md text-xs font-semibold text-gold transition-colors duration-200 hover:text-gold-light focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label={`Proof: ${service.proof} — open case study`}
                >
                  <Sparkles size={12} aria-hidden="true" /> {service.proof}
                  <ArrowRight size={12} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {/* ── How an engagement runs ─────────────────────────────────────── */}
      <Section ariaLabel="How an engagement runs" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Working together"
          title="From request to production in four moves"
          description="Straight scope, visible milestones, one-click deployment — the same path every project took."
        />
        <motion.div
          variants={staggerContainer(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={staggerItem(reduce)}
              className="relative flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
            >
              <span aria-hidden="true" className="font-mono text-3xl font-bold text-gold/25">
                {step.step}
              </span>
              <h3 className="mt-2 text-sm font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              {/* Connector arrow */}
              {i < processSteps.length - 1 ? (
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-gold/50 lg:block"
                />
              ) : null}
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/quotation")}
            className="h-11 rounded-md bg-gold px-7 font-bold text-charcoal shadow-md shadow-gold/25 transition-transform duration-200 hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98]"
          >
            <ReceiptText size={16} aria-hidden="true" /> Start step one — request a quotation
          </Button>
        </div>
      </Section>

      {/* ── Featured snapshot ──────────────────────────────────────────── */}
      <Section ariaLabel="Featured projects snapshot" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Flagship & Featured"
          title="Built end-to-end, deployed for real"
          description="Three headliners from the 35-project registry — open any card for the full case study."
        />
        <motion.div
          variants={staggerContainer(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredSnapshot.map((p) => (
            <ProjectCard key={p.id} project={p} variant="featured" />
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/projects")}
            className="h-11 rounded-md border-gold/50 px-6 font-semibold text-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
          >
            Browse all {stats.projectsTotal} projects <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Section>

      {/* ── CTA band ───────────────────────────────────────────────────── */}
      <Section ariaLabel="Call to action" className="pt-0 md:pt-0">
        <motion.div
          {...enterProps(reduce, 0)}
          className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm md:p-10"
        >
          <div className="absolute inset-0 -z-10 bg-grid-fade opacity-40" aria-hidden="true" />
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                Have a system that needs building{" "}
                <span className="text-gradient-gold">end-to-end?</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Register, request a quotation, and follow it from scope to deployment — one developer, entire
                product: frontend, backend, payments, deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => navigate("/quotation")}
                className="h-11 rounded-md bg-gold px-6 font-bold text-charcoal shadow-md shadow-gold/25 transition-transform duration-200 hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98]"
              >
                <ReceiptText size={16} aria-hidden="true" /> Get a quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/register")}
                className="h-11 rounded-md border-gold/50 px-6 font-semibold text-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
              >
                Create account
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
