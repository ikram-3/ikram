"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  ListChecks,
  Lock,
  ServerCog,
  Sparkles,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackLink, enterProps, PageHero, Section } from "@/design";
import {
  getAdjacentProjects,
  getCategoryLabel,
  getDeployNote,
  getProjectBySlug,
  getProjectImage,
} from "@/profile";
import { useRouterStore } from "@/store/router";

export function ProjectDetailPage({ slug }: { slug: string | null }) {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageHero
        eyebrow="404"
        title={
          <>
            Project <span className="text-gradient-gold">not found</span>
          </>
        }
        description="The case study you're looking for isn't in the registry. It may have been renamed — browse the full registry instead."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Projects", path: "/projects" }, { label: "Not found" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() => navigate("/projects")}
            className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground shadow-md"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Browse all projects
          </Button>
        </div>
      </PageHero>
    );
  }

  const image = getProjectImage(project.id);
  const categoryLabel = getCategoryLabel(project.category);
  const live = project.links.live;
  const deployNote = getDeployNote(project.id);
  const { prev, next } = getAdjacentProjects(project.id);

  return (
    <>
      {/* ── Case-study hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-labelledby="project-title">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-fade opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 md:pb-12 md:pt-10">
          <motion.nav {...enterProps(reduce, 0, 8)} aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <BackLink to="/projects" label="Projects" className="-ml-1" />
              </li>
              <li aria-hidden="true" className="text-muted-foreground/50">/</li>
              <li className="max-w-[50vw] truncate font-medium text-foreground" aria-current="page">
                {project.name}
              </li>
            </ol>
          </motion.nav>

          <motion.p
            {...enterProps(reduce, 0.02, 10)}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold"
          >
            <Tag size={12} aria-hidden="true" /> {categoryLabel}
          </motion.p>

          <motion.h1
            {...enterProps(reduce, 0.06, 12)}
            id="project-title"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            {project.name}
          </motion.h1>

          <motion.p
            {...enterProps(reduce, 0.1, 12)}
            className="mt-2 text-sm font-medium uppercase tracking-wide text-gold/80"
          >
            {project.type}
          </motion.p>

          <motion.p
            {...enterProps(reduce, 0.14, 12)}
            className="mt-4 max-w-2xl text-sm font-medium italic leading-relaxed text-gold/90 md:text-base"
          >
            {project.tagline}
          </motion.p>

          <motion.div {...enterProps(reduce, 0.18, 10)} className="mt-5 flex flex-wrap items-center gap-2.5">
            {live ? (
              <Button asChild size="lg" className="h-11 rounded-lg bg-gold px-6 font-bold text-charcoal shadow-md shadow-gold/25 transition-all duration-200 hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98]">
                <a href={live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} aria-hidden="true" /> Open Live Deployment
                </a>
              </Button>
            ) : (
              <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
                {deployNote.includes("Docker") ? (
                  <ServerCog size={12} aria-hidden="true" />
                ) : (
                  <Lock size={12} aria-hidden="true" />
                )}
                {deployNote}
              </Badge>
            )}
            {project.links.repo ? (
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-md border-gold/50 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
              >
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  View repository <ExternalLink size={15} aria-hidden="true" />
                </a>
              </Button>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* ── Visual ─────────────────────────────────────────────────────── */}
      {image ? (
        <Section ariaLabel={`${project.name} preview`} className="pt-0 md:pt-0">
          <motion.figure
            {...enterProps(reduce, 0.05)}
            className="overflow-hidden rounded-2xl border border-border shadow-md"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            </div>
            <figcaption className="border-t border-border/60 bg-card px-4 py-2.5 text-[11px] text-muted-foreground">
              {image.alt}
            </figcaption>
          </motion.figure>
        </Section>
      ) : null}

      {/* ── Narrative ──────────────────────────────────────────────────── */}
      <Section ariaLabel="Case study details" className={image ? "pt-0 md:pt-0" : undefined}>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="space-y-6">
            <motion.blockquote
              {...enterProps(reduce, 0.05)}
              className="rounded-xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm"
            >
              <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                <Sparkles size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Why it matters
                  </span>
                  {project.whyItMatters ?? "Deployment note: " + deployNote}
                </span>
              </p>
            </motion.blockquote>

            <motion.div {...enterProps(reduce, 0.08)}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <ListChecks size={15} className="text-gold" aria-hidden="true" /> What I did
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {project.whatIDid ??
                  "Full build owned end-to-end — frontend, backend, data layer, and deployment packaging. Details under NDA-adjacent private repos; ask me about the architecture."}
              </p>
            </motion.div>

            <motion.div {...enterProps(reduce, 0.1)}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Overview
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{project.description}</p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.aside {...enterProps(reduce, 0.1)} className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Layers size={14} className="text-gold" aria-hidden="true" /> Stack
              </h2>
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Badge variant="outline" className="rounded-full text-xs font-normal">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Facts</h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-muted-foreground">Category</dt>
                  <dd className="font-medium">{categoryLabel}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-muted-foreground">Type</dt>
                  <dd className="text-right text-xs font-medium leading-snug">{project.type}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-muted-foreground">Registry</dt>
                  <dd className="font-mono text-xs font-semibold text-gold">
                    #{String(project.id).padStart(2, "0")} of 35
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-muted-foreground">Status</dt>
                  <dd className="text-xs font-medium">{live ? "Live" : deployNote}</dd>
                </div>
              </div>
            </dl>
          </motion.aside>
        </div>
      </Section>

      {/* ── Prev / Next ────────────────────────────────────────────────── */}
      <Section ariaLabel="More projects" className="border-t border-border/60 pt-8 md:pt-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <button
              onClick={() => navigate(`/projects/${prev.slug}`)}
              className="group rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <ArrowLeft size={12} aria-hidden="true" /> Previous in registry
              </span>
              <span className="block text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-gold">
                {prev.name}
              </span>
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <button
              onClick={() => navigate(`/projects/${next.slug}`)}
              className="group rounded-xl border border-border bg-card p-5 text-right shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:col-start-2"
            >
              <span className="mb-1 flex items-center justify-end gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Next in registry <ArrowRight size={12} aria-hidden="true" />
              </span>
              <span className="block text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-gold">
                {next.name}
              </span>
            </button>
          ) : null}
        </div>
      </Section>
    </>
  );
}
