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
  Globe,
  Mail,
  ReceiptText,
  Rocket,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterProps, staggerContainer, staggerItem, StatCard } from "@/design";
import { Section, SectionHeading } from "@/design/components/section";
import { identity, summary, stats, domains, services, processSteps } from "@/profile";
import { getFeaturedProjects } from "@/profile/projects";
import { useRouterStore } from "@/store/router";
import { CountUp } from "@/design/components/count-up";
import { ProjectCard } from "./project-card";

const HERO_STATS = [
  { value: 35, suffix: "+", label: "Projects shipped" },
  { value: stats.liveDeployments, suffix: "", label: "Live deployments" },
  { value: 3, suffix: "", label: "Certifications" },
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
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src="/images/project/hero-glow.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 dark:opacity-35"
          />
          <div className="absolute inset-0 bg-grid-fade" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:pb-20 md:pt-16">
          <div>
            <motion.p
              {...enterProps(reduce, 0)}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold"
            >
              {identity.title}
            </motion.p>

            <motion.h1
              {...enterProps(reduce, 0.05)}
              id="hero-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
            >
              <span className="text-foreground">{identity.name.split(" ")[0]} </span>
              <span className="text-gradient-gold">{identity.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.p
              {...enterProps(reduce, 0.1)}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {summary.headline}
            </motion.p>

            <motion.p
              {...enterProps(reduce, 0.15)}
              className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/90 md:text-base"
            >
              {summary.subheadline}
            </motion.p>

            <motion.div {...enterProps(reduce, 0.2)} className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate("/quotation")}
                className="h-11 rounded-md bg-gold px-6 font-bold text-charcoal shadow-md shadow-gold/25 transition-transform duration-200 hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98]"
              >
                <ReceiptText size={16} aria-hidden="true" /> Get a Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/projects")}
                className="h-11 rounded-md border-gold/50 px-6 font-semibold text-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
              >
                View Projects <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate("/contact")}
                className="h-11 rounded-md px-5 font-semibold text-muted-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
              >
                <Mail size={16} aria-hidden="true" /> Contact
              </Button>
            </motion.div>

            <motion.dl {...enterProps(reduce, 0.25)} className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-mono text-2xl font-bold text-gold md:text-3xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
              <div className="max-w-44">
                <dt className="sr-only">Domains</dt>
                <dd className="flex flex-wrap gap-1.5 pt-1">
                  {domains.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </dd>
              </div>
            </motion.dl>
          </div>

          {/* Portrait — user-supplied avatar (A02-gold-ring), circular per design brief.
              Identity Lock: never generated, never edited — used as provided. */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduce ? { duration: 0.15 } : { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[320px] md:max-w-none"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[340px]">
              {/* Rotating dashed gold ring */}
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-dashed border-gold/40 animate-spin-slow"
              />
              {/* Static glow ring */}
              <span
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-gold/50 via-gold/10 to-gold/50 p-[2px] shadow-xl shadow-gold/20"
              />
              {/* The circle portrait */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-gold/60 shadow-2xl shadow-gold/25 animate-float">
                <Image
                  src={identity.avatar.src}
                  alt={identity.avatar.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 340px, 300px"
                  className="object-cover"
                />
              </div>

              {/* Floating proof badges */}
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0.2, delay: 0.5 } : { duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-4 top-6 flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-gold shadow-md backdrop-blur-sm animate-float-delayed"
              >
                <Sparkles size={12} aria-hidden="true" /> 35+ projects
              </motion.span>
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0.2, delay: 0.65 } : { duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-3 bottom-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-gold shadow-md backdrop-blur-sm animate-float"
              >
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                {stats.liveDeployments} live deployments
              </motion.span>
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">{identity.affiliations}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Numbers ────────────────────────────────────────────────────── */}
      <Section ariaLabel="Portfolio numbers">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={stats.projectsTotal} suffix="+" label="Projects shipped" icon={Briefcase} delay={0} />
          <StatCard value={stats.projectsFeatured} suffix="" label="Featured case studies" icon={Rocket} delay={0.05} />
          <StatCard value={stats.liveDeployments} suffix="" label="Live deployments" icon={ArrowRight} delay={0.1} />
          <StatCard value={stats.certifications} suffix="" label="Certifications" icon={Award} delay={0.15} />
        </div>
      </Section>

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
