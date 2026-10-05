"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHero, Section, SectionHeading } from "@/design";
import { categories, projects, getFeaturedProjects } from "@/profile";
import { ProjectCard } from "./project-card";

interface FilterState {
  category: string; // "all" | category id
  query: string;
  setCategory: (c: string) => void;
  setQuery: (q: string) => void;
}

/** Client filter state — Zustand (FRONTEND_CONTEXT §1), scoped to the Projects page. */
const useFilterStore = create<FilterState>((set) => ({
  category: "all",
  query: "",
  setCategory: (category) => set({ category }),
  setQuery: (query) => set({ query }),
}));

export function ProjectsPage() {
  const reduce = useReducedMotion();
  const { category, query, setCategory, setQuery } = useFilterStore();

  const featured = useMemo(() => getFeaturedProjects(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      const inQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [category, query]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Project Registry"
        title={
          <>
            Systems I&apos;ve shipped <span className="text-gradient-gold">end-to-end</span>
          </>
        }
        description="Every shipped build across applied AI, business systems, automation, mobile, data, and utilities. Missing a live link means private repo or Docker-ready packaging — never a dead URL."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Projects" }]}
      />

      {/* ── Featured ───────────────────────────────────────────────────── */}
      <Section ariaLabel="Featured projects">
        <SectionHeading
          eyebrow="Flagship & Featured"
          title="Eight headliners"
          description="Live-deployed platforms and production-grade AI, each built frontend to deployment. Open a card for the full case study."
        />
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} variant="featured" />
          ))}
        </motion.div>
      </Section>

      {/* ── Registry ───────────────────────────────────────────────────── */}
      <Section id="all-projects" ariaLabel="All projects registry" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Full Registry"
          title={`All ${projects.length} projects, filterable`}
          description="Filter by category or search by name, tagline, or tech."
        />

        <div className="mb-8 flex flex-col gap-4">
          <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            <FilterTab
              active={category === "all"}
              onClick={() => setCategory("all")}
              label="All"
              count={projects.length}
            />
            {categories.map((c) => (
              <FilterTab
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
                label={c.label}
                count={counts.get(c.id) ?? 0}
              />
            ))}
          </div>

          <div className="relative max-w-sm">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, tagline, or tech…"
              aria-label="Search projects"
              className="h-10 rounded-md border-border bg-card pl-9 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <p className="mb-5 text-xs text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {projects.length} projects
          {category !== "all" ? ` in ${categories.find((c) => c.id === category)?.label}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
            <Search size={28} className="mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm font-medium">No projects match your filters.</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different keyword or category.</p>
            <button
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              className="mt-4 rounded-md border border-gold/50 px-4 py-2 text-xs font-semibold text-gold transition-colors duration-200 hover:bg-gold/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.ul
            key={`${category}-${query}`}
            variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.03 } } }}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p) => (
              <motion.li key={p.id} variants={{ hidden: {}, show: { transition: { duration: reduce ? 0.15 : 0.25 } } }} className="h-full">
                <ProjectCard project={p} variant="compact" />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </Section>
    </>
  );
}

function FilterTab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
        active
          ? "border-gold bg-gold text-primary-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-gold"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-px font-mono text-[10px] ${
          active ? "bg-background/20 text-inherit" : "bg-secondary text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
