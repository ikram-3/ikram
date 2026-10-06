"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Award, BrainCircuit, Building2, GraduationCap, Handshake, MapPin, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterProps, PageHero, Section, SectionHeading, StatCard, staggerContainer, staggerItem } from "@/design";
import { identity, summary, aboutParagraphs, stats } from "@/profile";
import { useRouterStore } from "@/store/router";

const POSITIONING = [
  { icon: Building2, audience: "For employers", quote: summary.positioning.employers },
  { icon: BrainCircuit, audience: "For AI roles", quote: summary.positioning.aiRoles },
  { icon: Handshake, audience: "For clients", quote: summary.positioning.clients },
] as const;

export function AboutPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Grounded AI. Complete products. <span className="text-gradient-gold">Shipped.</span>
          </>
        }
        description="Applied AI and full product engineering — refuse to keep them separate."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "About" }]}
      />

      {/* ── Portrait + story ───────────────────────────────────────────── */}
      <Section ariaLabel="About Muhammad Ikram">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Portrait card — 3D Persona (A07) properly arranged in studio frame */}
          <motion.aside {...enterProps(reduce, 0.05)}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden border-b border-border/60 bg-muted/20">
                <Image
                  src={identity.avatarAbout.src}
                  alt={identity.avatarAbout.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                {/* 3D Persona badge */}
                <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur-md">
                  3D Persona
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">{identity.name}</h2>
                  <p className="text-sm text-muted-foreground">{identity.role}</p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={13} className="shrink-0 text-gold" aria-hidden="true" /> {identity.location}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GraduationCap size={13} className="shrink-0 text-gold" aria-hidden="true" /> {identity.affiliations}
                </p>
                <a
                  href={`mailto:${identity.email}`}
                  className="flex items-center gap-1.5 break-all text-xs font-medium text-gold transition-colors duration-200 hover:text-gold-light focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Mail size={13} className="shrink-0" aria-hidden="true" /> {identity.email}
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Story */}
          <div className="space-y-4">
            {aboutParagraphs.map((text, i) => (
              <motion.p
                key={i}
                {...enterProps(reduce, 0.08 + i * 0.06)}
                className="text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {text}
              </motion.p>
            ))}

            <motion.div {...enterProps(reduce, 0.3)} className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => navigate("/projects")}
                className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                See the projects <Rocket size={16} aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contact")}
                className="h-11 rounded-md border-gold/50 px-6 font-semibold text-foreground transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
              >
                Work with me
              </Button>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Positioning ────────────────────────────────────────────────── */}
      <Section ariaLabel="Positioning by audience" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Positioning"
          title="One engineer, three conversations"
          description="How the same body of work speaks to employers, AI teams, and clients."
        />
        <motion.div
          variants={staggerContainer(reduce, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-3"
          aria-label="Positioning statements by audience"
        >
          {POSITIONING.map(({ icon: Icon, audience, quote }) => (
            <motion.article
              key={audience}
              variants={staggerItem(reduce)}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{audience}</h3>
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/90 md:text-[15px]">“{quote}”</blockquote>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      {/* ── Numbers ────────────────────────────────────────────────────── */}
      <Section ariaLabel="Portfolio numbers" className="pt-0 md:pt-0">
        <SectionHeading eyebrow="By the numbers" title="Shipped, not just started" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={stats.projectsTotal} suffix="+" label="Projects in the registry" icon={Rocket} />
          <StatCard value={stats.projectsFeatured} suffix="" label="Featured case studies" icon={Building2} delay={0.05} />
          <StatCard value={stats.liveDeployments} suffix="" label="Live deployments" icon={BrainCircuit} delay={0.1} />
          <StatCard value={stats.certifications} suffix="" label="Certifications" icon={Award} delay={0.15} />
        </div>
      </Section>
    </>
  );
}
