"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { enterProps, PageHero, Section, staggerContainer, staggerItem } from "@/design";
import { certifications, education, experience } from "@/profile";

export function ExperiencePage() {
  const reduce = useReducedMotion();

  return (
    <>
      <PageHero
        eyebrow="Experience & Education"
        title={
          <>
            Where I&apos;ve <span className="text-gradient-gold">built and studied</span>
          </>
        }
        description="Roles, degrees, and certifications — the trail behind the shipped systems."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Experience" }]}
      />

      <Section ariaLabel="Experience, education and certifications">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ── Experience timeline ────────────────────────────────────── */}
          <div>
            <motion.h2
              {...enterProps(reduce, 0)}
              className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground"
            >
              <Briefcase size={16} className="text-gold" aria-hidden="true" /> Experience
            </motion.h2>

            <div className="relative space-y-6 pl-6">
              {/* Timeline rail */}
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gold/40" aria-hidden="true" />

              {experience.map((job, i) => (
                <motion.article
                  key={job.role}
                  {...enterProps(reduce, 0.05 + i * 0.06)}
                  className="relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
                >
                  {/* Timeline node */}
                  <span
                    className="absolute -left-6 top-7 grid size-[15px] place-items-center rounded-full border-2 border-gold bg-background"
                    aria-hidden="true"
                  >
                    <span className="size-[5px] rounded-full bg-gold" />
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight">{job.role}</h3>
                    <time className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold">
                      {job.period}
                    </time>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{job.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>

          {/* ── Education + Certifications ─────────────────────────────── */}
          <div className="space-y-10">
            <div>
              <motion.h2
                {...enterProps(reduce, 0.05)}
                className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                <GraduationCap size={16} className="text-gold" aria-hidden="true" /> Education
              </motion.h2>

              <motion.div
                variants={staggerContainer(reduce, 0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-4"
              >
                {education.map((ed) => (
                  <motion.article
                    key={ed.credential}
                    variants={staggerItem(reduce)}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold tracking-tight">{ed.credential}</h3>
                      <time className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold">
                        {ed.period}
                      </time>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{ed.institution}</p>
                    {ed.detail ? <p className="mt-0.5 text-xs text-muted-foreground/80">{ed.detail}</p> : null}
                  </motion.article>
                ))}
              </motion.div>
            </div>

            <div>
              <motion.h2
                {...enterProps(reduce, 0.08)}
                className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                <Award size={16} className="text-gold" aria-hidden="true" /> Certifications
              </motion.h2>

              <motion.div
                variants={staggerContainer(reduce, 0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-3"
              >
                {certifications.map((cert) => (
                  <motion.article
                    key={cert.name}
                    variants={staggerItem(reduce, 10)}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
                      <Award size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">{cert.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {cert.issuer}
                        {cert.note ? ` · ${cert.note}` : ""}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
