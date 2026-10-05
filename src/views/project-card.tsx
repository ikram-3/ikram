"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Lock, ServerCog, Sparkles } from "lucide-react";
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
        aria-label={`${project.name} — open live deployment (opens in new tab)`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-700/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 transition-colors duration-200 hover:bg-emerald-500/20 dark:border-emerald-400/30 dark:text-emerald-400 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        Live <ExternalLink size={11} aria-hidden="true" />
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
          <button onClick={open} className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border/60 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" aria-label={`Open case study: ${project.name}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </button>
        ) : null}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
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

          <button
            onClick={open}
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-gold transition-colors duration-200 hover:bg-gold/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`View case study: ${project.name}`}
          >
            Case study <ArrowRight size={15} aria-hidden="true" />
          </button>
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
        <button
          onClick={open}
          className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border/60 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={`View details: ${project.name}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
        </button>
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
      </div>
    </motion.article>
  );
}
