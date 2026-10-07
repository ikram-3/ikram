"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bot,
  BrainCircuit,
  ChartBarBig,
  Code2,
  Download,
  FileCode2,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  ReceiptText,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterProps, staggerContainer, staggerItem } from "@/design";
import { Section, SectionHeading } from "@/design/components/section";
import { identity, stats, services, processSteps } from "@/profile";
import { getFeaturedProjects } from "@/profile/projects";
import { useRouterStore } from "@/store/router";
import { FeatureCard } from "@/components/ui/feature-card";
import { ProjectCard } from "./project-card";

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
      {/* ── Modern Tech Hero Section matching Reference Mockup ───────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-background text-foreground pt-4 pb-16 lg:pb-24 border-b border-border/40"
      >
        {/* Subtle ambient warm mesh glow */}
        <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
          <div className="absolute right-0 top-1/4 size-[500px] rounded-full bg-gradient-to-bl from-orange-500/10 via-amber-500/5 to-transparent blur-3xl dark:from-orange-500/15" />
          <div className="absolute left-10 top-10 size-[350px] rounded-full bg-gradient-to-tr from-orange-500/[0.04] to-transparent blur-2xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 pt-4 sm:pt-6">
            <div className="lg:col-span-7 max-w-xl">


              {/* Headline */}
              <motion.div {...enterProps(reduce, 0.05)} className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90">
                  Hi, I&apos;m
                </p>
                <h1
                  id="hero-heading"
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.8rem] text-foreground leading-[1.08]"
                >
                  Muhammad{" "}
                  <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Ikram
                  </span>
                </h1>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground/95 pt-1">
                  Software Engineer
                </p>
              </motion.div>

              {/* Bio Paragraph */}
              <motion.p
                {...enterProps(reduce, 0.1)}
                className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground"
              >
                I build modern web applications, AI-powered solutions and user-friendly digital experiences.
                Passionate about clean code, scalable systems and turning ideas into real products.
              </motion.p>

              {/* Action Buttons */}
              <motion.div {...enterProps(reduce, 0.15)} className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => navigate("/projects")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-[0.98]"
                >
                  <Code2 size={16} aria-hidden="true" className="shrink-0" />
                  <span>View My Projects</span>
                  <ArrowRight size={15} aria-hidden="true" className="shrink-0 ml-0.5" />
                </button>

                <button
                  onClick={() => window.open("/cv", "_blank")}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-muted text-foreground px-6 py-3 text-sm font-semibold shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download size={15} aria-hidden="true" className="shrink-0" />
                  <span>Download Resume</span>
                </button>
              </motion.div>

              {/* 4-Item Stats Strip Card */}
              <motion.div
                {...enterProps(reduce, 0.2)}
                className="mt-8 rounded-2xl border border-orange-500/25 bg-orange-500/[0.03] dark:bg-card/60 p-4 sm:p-5 backdrop-blur-sm shadow-sm"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
                  {/* Metric 1 */}
                  <div className="pt-2 sm:pt-0 sm:px-3 first:sm:pl-0">
                    <span className="text-orange-500 block mb-1">
                      <FileCode2 size={18} />
                    </span>
                    <p className="font-mono text-xl sm:text-2xl font-black text-foreground">5+</p>
                    <p className="text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
                      Projects Completed
                    </p>
                  </div>

                  {/* Metric 2 */}
                  <div className="pt-3 sm:pt-0 sm:px-3">
                    <span className="text-orange-500 block mb-1">
                      <GraduationCap size={18} />
                    </span>
                    <p className="font-mono text-xl sm:text-2xl font-black text-foreground">BSc</p>
                    <p className="text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
                      Software Engineering.
                    </p>
                  </div>

                  {/* Metric 3 */}
                  <div className="pt-3 sm:pt-0 sm:px-3">
                    <span className="text-orange-500 block mb-1">
                      <Award size={18} />
                    </span>
                    <p className="font-mono text-xl sm:text-2xl font-black text-foreground">1st</p>
                    <p className="text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
                      AI Training (KPITB)
                    </p>
                  </div>

                  {/* Metric 4 */}
                  <div className="pt-3 sm:pt-0 sm:px-3">
                    <span className="text-orange-500 block mb-1">
                      <MapPin size={18} />
                    </span>
                    <p className="font-sans text-sm sm:text-base font-bold text-foreground truncate">
                      Pakistan
                    </p>
                    <p className="text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
                      Based In
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Let's Connect + Social Pills Row */}
              <motion.div {...enterProps(reduce, 0.25)} className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold italic text-orange-600 dark:text-orange-400 font-serif pr-1">
                  Let&apos;s Connect ➔
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={identity.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="grid size-9 place-items-center rounded-xl border border-border bg-card hover:border-orange-500/50 hover:text-orange-500 text-foreground/80 shadow-2xs transition-all hover:scale-105"
                  >
                    <Github size={16} />
                  </a>

                  <a
                    href={identity.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="grid size-9 place-items-center rounded-xl border border-border bg-card hover:border-orange-500/50 hover:text-orange-500 text-foreground/80 shadow-2xs transition-all hover:scale-105"
                  >
                    <Linkedin size={16} />
                  </a>

                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X / Twitter"
                    className="grid size-9 place-items-center rounded-xl border border-border bg-card hover:border-orange-500/50 hover:text-orange-500 text-foreground/80 shadow-2xs transition-all hover:scale-105 font-bold text-xs"
                  >
                    𝕏
                  </a>

                  <a
                    href={`mailto:${identity.email}`}
                    aria-label="Email Muhammad Ikram"
                    className="grid size-9 place-items-center rounded-xl border border-border bg-card hover:border-orange-500/50 hover:text-orange-500 text-foreground/80 shadow-2xs transition-all hover:scale-105"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Graphic Artwork (5 cols) */}
            <motion.div
              {...enterProps(reduce, 0.15)}
              className="lg:col-span-5 relative mx-auto w-full max-w-[480px] lg:max-w-none flex items-center justify-center"
            >
              {/* Warm ambient radial backdrop glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-gradient-to-tr from-orange-500/25 via-amber-500/15 to-transparent blur-3xl opacity-80 pointer-events-none"
              />

              {/* Hero Image Artwork - seamless, borderless, blends realistically with background */}
              <div className="relative aspect-[1416/1111] w-full transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src="/images/profile/modern-tech-hero-portrait.webp"
                  alt="Muhammad Ikram — Software Engineer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-contain object-center select-none pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Section ariaLabel="Services">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          description="Full-stack web applications, practical AI tools, and automated business workflows."
        />
        <motion.div
          variants={staggerContainer(reduce, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => {
            const Icon = SERVICE_ICONS[service.icon];
            const badges = ["Full-Stack", "AI Pipeline", "Automation", "Mobile", "Analytics", "Computer Vision"];
            const showCursor = idx === 0 || idx === 1;
            const cursorLabel = idx === 0 ? "Production" : "AI Agent";

            return (
              <motion.div key={service.id} variants={staggerItem(reduce)} className="h-full">
                <FeatureCard
                  icon={Icon}
                  badge={badges[idx]}
                  title={service.title}
                  description={service.description}
                  actionText={`Case study: ${service.proof}`}
                  onAction={() => navigate(`/projects/${service.proofSlug}`)}
                  showCursor={showCursor}
                  cursorCorner="top-right"
                  cursorLabel={cursorLabel}
                  className="h-full"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <Section ariaLabel="How an engagement runs" className="border-y border-border bg-card/50">
        <SectionHeading
          eyebrow="Process"
          title="From first conversation to launch"
          description="Clear goals, continuous updates, and thorough testing from start to finish."
        />
        <motion.ol
          variants={staggerContainer(reduce, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step) => (
            <motion.li key={step.step} variants={staggerItem(reduce)} className="border-t-2 border-orange-500 pt-5">
              <span className="font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">Step {step.step}</span>
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
            eyebrow="Featured Projects"
            title="Real software built and deployed"
            description="A selection of full-stack web platforms and intelligent AI applications."
            className="mb-0 md:mb-0"
          />
          <Button
            variant="outline"
            onClick={() => navigate("/projects")}
            className="h-10 shrink-0 rounded-full border-border px-5 font-semibold text-foreground hover:bg-muted"
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
          className="relative overflow-hidden flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#1C1815] via-[#161412] to-[#1F1914] p-8 text-white md:flex-row md:items-center md:p-12 border border-white/10 shadow-xl"
        >
          <div className="absolute right-0 top-0 size-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Ready to build?</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-white">Have a project in mind?</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Share the outline and receive a written scope with a fixed price — usually within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <button
              onClick={() => navigate("/quotation")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ReceiptText size={16} aria-hidden="true" /> Request a quote
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact me
            </button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
