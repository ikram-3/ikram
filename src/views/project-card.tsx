"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Lock, ServerCog, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { staggerItem } from "@/design/motion";
import { getProjectImage, getDeployNote, type Project } from "@/profile";
import { useRouterStore } from "@/store/router";

interface ProjectCardProps {
  project: Project;
  /** featured = flagship card with image + narrative; compact = registry card. */
  variant?: "featured" | "compact";
}

/** Live / deployment badge — exact wording from the kit (never invent deploy notes). */
function StatusBadge({ project }: { project: Project }) {
  const live = project.links.live;
  if (live) {
    return (
      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — open live deployment in new tab`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-500/25 hover:border-emerald-500/60 dark:border-emerald-400/40 dark:text-emerald-400 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Live Demo <ExternalLink size={11} aria-hidden="true" />
      </a>
    );
  }
  const note = getDeployNote(project.id);
  return (
    <Badge variant="secondary" className="shrink-0 gap-1 rounded-full text-[11px] font-medium">
      {note.includes("Docker") ? <ServerCog size={11} aria-hidden="true" /> : <Lock size={11} aria-hidden="true" />}
      {note}
    </Badge>
  );
}

/** Shared project card — used by Home snapshot and the Projects page. */
export function ProjectCard({ project, variant = "compact" }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const image = getProjectImage(project.id);
  const live = project.links.live;
  const repo = project.links.repo;
  const open = () => navigate(`/projects/${project.slug}`);

  if (variant === "featured") {
    return (
      <motion.article
        variants={staggerItem(reduce)}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
      >
        {image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60 bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

            {/* Quick action buttons floating on image hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-2.5 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-[2px]">
              {live ? (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-xs font-bold text-charcoal shadow-lg shadow-gold/30 transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <ExternalLink size={14} aria-hidden="true" /> Open Live Project
                </a>
              ) : null}
              <button
                onClick={open}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-background/90 px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                Case Study <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={open}
              className="rounded-sm text-left text-base font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:text-lg"
            >
              {project.name}
            </button>
            <StatusBadge project={project} />
          </div>

          <p className="text-sm font-medium italic leading-relaxed text-gold/90">{project.tagline}</p>

          {project.whatIDid ? (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{project.whatIDid}</p>
          ) : null}

          {project.whyItMatters ? (
            <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-foreground/80">
              <Sparkles size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              {project.whyItMatters}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
            {project.tech.slice(0, 4).map((t) => (
              <Badge key={t} variant="outline" className="rounded-full text-[11px] font-normal">
                {t}
              </Badge>
            ))}
            {project.tech.length > 4 ? (
              <Badge variant="outline" className="rounded-full text-[11px] font-normal text-muted-foreground">
                +{project.tech.length - 4}
              </Badge>
            ) : null}
          </div>

          {/* Action Row — Direct Live link + Case study */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-2 border-t border-border/50">
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-xs font-bold text-charcoal shadow-sm shadow-gold/25 transition-all duration-200 hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <ExternalLink size={14} aria-hidden="true" /> Visit Live Project
              </a>
            ) : null}

            <button
              onClick={open}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                live
                  ? "border-border/80 text-foreground/90 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                  : "bg-gold text-charcoal font-bold hover:bg-gold-light hover:scale-[1.02]"
              }`}
              aria-label={`View case study: ${project.name}`}
            >
              Case study <ArrowRight size={14} aria-hidden="true" />
            </button>

            {repo ? (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                aria-label={`View source code for ${project.name}`}
              >
                <Github size={14} aria-hidden="true" /> Code
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={staggerItem(reduce, 10)}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-gold/40 hover:shadow-md"
    >
      {image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60 bg-muted">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

          {/* Quick hover link */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-[2px]">
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-md bg-gold px-3 py-1.5 text-xs font-bold text-charcoal shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <ExternalLink size={12} aria-hidden="true" /> Open Live
              </a>
            ) : null}
            <button
              onClick={open}
              className="inline-flex items-center gap-1 rounded-md border border-white/30 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Details <ArrowRight size={12} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <button
            onClick={open}
            className="rounded-sm text-left text-sm font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`View details: ${project.name}`}
          >
            {project.name}
          </button>
          <StatusBadge project={project} />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-gold/80">{project.type}</p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{project.tagline}</p>

        <div className="mt-auto flex max-h-[76px] flex-wrap content-start gap-1 overflow-y-auto pt-3">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline" className="rounded-full px-2 py-0 text-[10px] font-normal">
              {t}
            </Badge>
          ))}
        </div>

        {/* Compact action footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          {live ? (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-bold text-gold transition-colors duration-200 hover:text-gold-light hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ExternalLink size={12} aria-hidden="true" /> Live Demo
            </a>
          ) : (
            <span className="text-[11px] font-medium text-muted-foreground">{getDeployNote(project.id)}</span>
          )}

          <button
            onClick={open}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Case Study <ArrowRight size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
