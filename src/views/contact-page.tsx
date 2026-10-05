"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { enterProps, PageHero, Section, SectionHeading } from "@/design";
import { identity } from "@/profile";
import { useRouterStore } from "@/store/router";

/** Logistics FAQ — answers grounded in the quotation flow + published contact facts. */
const FAQ = [
  {
    q: "What's the fastest way to get a quotation?",
    a: "Use the Get a Quote form — it captures project type, budget range, and timeline in one pass, so the reply you get back is a scope with a price, not a chain of follow-up questions.",
  },
  {
    q: "Do I need an account to request a quote?",
    a: "No — guest submissions are welcome. Registering links each request to your account so you can track statuses (new → reviewing → quoted → closed) in one place.",
  },
  {
    q: "What kind of work do you take on?",
    a: "Full-stack business systems (POS, CMS, ERP, healthcare, e-commerce), grounded AI (RAG assistants with citations, agentic tool-use), automation and bots, Flutter mobile apps, and real-time computer vision — all built end-to-end through deployment.",
  },
  {
    q: "Can you deploy as well as build?",
    a: "Yes — four systems are live right now, and the rest of the registry is packaged for one-click Docker/Vercel deployment. Handover includes the repository and a walkthrough.",
  },
  {
    q: "How do I share project details safely?",
    a: "Send the outline through the quote form; anything sensitive — credentials, data samples, private specs — moves over email or a call once the engagement starts.",
  },
] as const;

export function ContactPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  const channels = [
    {
      Icon: Mail,
      label: "Email",
      value: identity.email,
      href: `mailto:${identity.email}`,
      external: false,
    },
    {
      Icon: Phone,
      label: "Phone",
      value: identity.phone,
      href: `tel:${identity.phone.replace(/-/g, "")}`,
      external: false,
    },
    {
      Icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ikramds",
      href: identity.socials.linkedin,
      external: true,
    },
    {
      Icon: Github,
      label: "GitHub",
      value: "github.com/ikram-3",
      href: identity.socials.github,
      external: true,
    },
    {
      Icon: Globe,
      label: "Website",
      value: "ikram.is-great.net",
      href: identity.socials.website,
      external: true,
    },
    {
      Icon: MapPin,
      label: "Location",
      value: identity.location,
      href: null,
      external: false,
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Have a system that needs building <span className="text-gradient-gold">end-to-end?</span>
          </>
        }
        description="One developer, entire product: frontend, backend, payments, deployment. Let's talk."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Contact" }]}
      />

      <Section ariaLabel="Contact channels">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* CTA card — includes user-supplied avatar chip (A01), Identity Lock honored */}
          <motion.div
            {...enterProps(reduce, 0.05)}
            className="flex flex-col justify-center rounded-xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm md:p-8"
          >
            <div className="mb-5 flex items-center gap-3.5">
              <span className="relative block size-14 shrink-0 overflow-hidden rounded-full border border-gold/50 shadow-sm">
                <Image
                  src="/images/profile/A01-circle-minimal.png"
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="text-sm font-semibold">{identity.name}</p>
                <p className="text-xs text-muted-foreground">{identity.role} · {identity.location}</p>
              </div>
            </div>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Let&apos;s build something <span className="text-gradient-gold">production-grade</span>.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Full-stack platforms, grounded AI agents, or automation that removes repetitive work — shipped
              end-to-end and deployable in one click.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-md bg-gold px-6 font-bold text-charcoal shadow-md shadow-gold/25 transition-transform duration-200 hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98]"
              >
                <a href={`mailto:${identity.email}?subject=Project%20inquiry`}>
                  <Mail size={16} aria-hidden="true" /> Email me
                </a>
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/quotation")}
                className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ReceiptText size={16} aria-hidden="true" /> Get a quote
              </Button>
            </div>
          </motion.div>

          <motion.ul
            {...enterProps(reduce, 0.1)}
            className="grid content-start gap-3 sm:grid-cols-2"
            aria-label="Contact channels"
          >
            {channels.map(({ Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">{value}</span>
                  </span>
                  {external ? (
                    <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground/60" aria-hidden="true" />
                  ) : null}
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </motion.ul>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section ariaLabel="Frequently asked questions" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="FAQ"
          title="Before you write"
          description="The five questions most projects start with — answered straight."
        />
        <motion.div {...enterProps(reduce, 0.05)} className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="rounded-xl border border-border bg-card shadow-sm">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="last:border-b-0">
                <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold hover:text-gold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Something else? Email{" "}
            <a
              href={`mailto:${identity.email}`}
              className="font-medium text-gold transition-colors duration-200 hover:text-gold-light"
            >
              {identity.email}
            </a>{" "}
            — or jump straight to the quotation form.
          </p>
        </motion.div>
      </Section>
    </>
  );
}
