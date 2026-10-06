"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Mail, MapPin, Phone, Globe } from "lucide-react";
import { identity, summary, skillGroups } from "@/profile";
import { getFeaturedProjects } from "@/profile/projects";
import { Button } from "@/components/ui/button";

export default function CvPage() {
  const featured = getFeaturedProjects();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-8 px-4 sm:px-6 print:bg-white print:text-black print:p-0">
      {/* Top Action Bar — hidden when printing */}
      <div className="mx-auto max-w-4xl mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        <Button
          onClick={() => window.print()}
          className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold gap-2 rounded-xl shadow-lg shadow-emerald-500/20"
        >
          <Printer size={16} /> Print or Save as PDF
        </Button>
      </div>

      {/* CV Sheet */}
      <main className="mx-auto max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-2xl print:border-none print:shadow-none print:p-0 print:bg-white">
        
        {/* Header */}
        <header className="border-b border-neutral-800 pb-6 print:border-neutral-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
                {identity.name}
              </h1>
              <p className="text-lg font-semibold text-emerald-400 mt-1 print:text-emerald-700">
                {identity.role} · Full-Stack × Applied AI
              </p>
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-neutral-400 print:text-neutral-700">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400 print:text-emerald-700" /> {identity.location}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400 print:text-emerald-700" />
                <a href={`mailto:${identity.email}`} className="hover:underline">{identity.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 print:text-emerald-700" /> {identity.phone}
              </p>
              <p className="flex items-center gap-2">
                <Globe size={14} className="text-emerald-400 print:text-emerald-700" />
                <a href={identity.socials.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {identity.socials.website}
                </a>
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-300 print:text-neutral-800">
            {summary.headline} {summary.subheadline}
          </p>
        </header>

        {/* Core Technical Skills */}
        <section className="py-6 border-b border-neutral-800 print:border-neutral-300">
          <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-400 print:text-emerald-800 mb-3">
            Core Competencies &amp; Technical Stack
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {skillGroups.map((s) => (
              <div key={s.category} className="text-xs">
                <span className="font-semibold text-neutral-200 print:text-black">{s.category}: </span>
                <span className="text-neutral-400 print:text-neutral-700">{s.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Production Systems */}
        <section className="py-6 border-b border-neutral-800 print:border-neutral-300">
          <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-400 print:text-emerald-800 mb-4">
            Featured Systems &amp; Delivered Projects
          </h2>
          <div className="space-y-5">
            {featured.slice(0, 5).map((p) => (
              <div key={p.slug} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    {p.name}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 print:text-emerald-700">
                    {p.category} · {p.type}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed print:text-neutral-800">
                  {p.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tech.slice(0, 7).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 print:border-neutral-300 print:text-black print:bg-neutral-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Fellowship */}
        <section className="pt-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-emerald-400 print:text-emerald-800 mb-3">
            Education &amp; Fellowships
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-white print:text-black">KPITB Generative AI Fellow</p>
              <p className="text-neutral-400 print:text-neutral-700">
                Khyber Pakhtunkhwa Information Technology Board (KPITB) · Applied AI Specialization
              </p>
            </div>
            <div>
              <p className="font-bold text-white print:text-black">Bachelor of Science in Software Engineering</p>
              <p className="text-neutral-400 print:text-neutral-700">
                University of Swat, Pakistan
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
