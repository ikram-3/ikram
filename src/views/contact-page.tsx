"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { enterProps, PageHero, Section, SectionHeading } from "@/design";
import { identity } from "@/profile";
import { useRouterStore } from "@/store/router";

/** Logistics FAQ — answers grounded in the quotation flow + published contact facts. */
const FAQ = [
  {
    q: "What's the fastest way to get a quotation?",
    a: "Use the Request a Quote form — it captures project type, budget range and timeline in four short steps, so the reply you get back is a scope with a price, not a chain of follow-up questions.",
  },
  {
    q: "Do I need an account to request a quote?",
    a: "No — guest submissions are welcome. Registering links each request to your account so you can track its status (new → reviewing → quoted → closed) in one place.",
  },
  {
    q: "What kind of work do you take on?",
    a: "Full-stack business systems (POS, CMS, ERP, healthcare, e-commerce), grounded AI (RAG assistants with citations, agentic tool-use), automation and bots, Flutter mobile apps, and real-time computer vision — all built end-to-end through deployment.",
  },
  {
    q: "Can you deploy as well as build?",
    a: "Yes — systems are packaged for Docker and Vercel deployment. Handover includes the repository, environment documentation and a walkthrough.",
  },
  {
    q: "How do I share project details safely?",
    a: "Send the high-level scope through the form; anything sensitive — credentials, proprietary data or private keys — is exchanged over email or a call once the engagement starts.",
  },
] as const;

export function ContactPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && message.trim().length >= 10;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "Your message could not be sent. Please try again.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please email me directly instead."
      );
    }
  };

  const channels = [
    { Icon: Mail, label: "Email", value: identity.email, href: `mailto:${identity.email}`, external: false },
    { Icon: Phone, label: "Phone / WhatsApp", value: "+92 349 9934605", href: `tel:${identity.phone.replace(/-/g, "")}`, external: false },
    { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ikramds", href: identity.socials.linkedin, external: true },
    { Icon: Github, label: "GitHub", value: "github.com/ikram-3", href: identity.socials.github, external: true },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Send a message and I'll reply personally — you'll also receive a confirmation email right away."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Contact" }]}
      />

      <Section ariaLabel="Contact form and channels">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
          {/* Form */}
          <motion.div
            {...enterProps(reduce, 0.05)}
            className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <h2 className="text-lg font-semibold tracking-tight">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">Usually answered within one business day.</p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col items-center rounded-lg border border-border bg-muted/40 px-6 py-10 text-center"
              >
                <span className="grid size-12 place-items-center rounded-full bg-accent text-gold" aria-hidden="true">
                  <CheckCircle2 size={26} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Thank you for reaching out. A confirmation has been sent to your inbox, and I&apos;ll get back to
                  you shortly.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")} className="mt-6 h-10 rounded-md px-5 font-semibold">
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {status === "error" ? (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-md border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-xs font-medium text-destructive"
                  >
                    <AlertCircle size={15} className="mt-px shrink-0" aria-hidden="true" />
                    <p>{errorMessage}</p>
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-name">Full name</Label>
                    <Input
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      placeholder="Name"
                      className="mt-1.5"
                      disabled={status === "submitting"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="Email"
                      className="mt-1.5"
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-subject">
                    Subject
                  </Label>
                  <Input
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="New web application"
                    className="mt-1.5"
                    disabled={status === "submitting"}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    maxLength={4000}
                    placeholder="Tell me a little about your project, goals and timeline."
                    className="mt-1.5 min-h-[140px] resize-y"
                    disabled={status === "submitting"}
                  />
                  <p className="mt-1.5 text-right text-[11px] text-muted-foreground">{message.length}/4000</p>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">Your details are only used to reply to you.</p>
                  <Button
                    type="submit"
                    disabled={status === "submitting" || !canSubmit}
                    className="h-10 rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden="true" /> Send message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside {...enterProps(reduce, 0.1)} className="space-y-5" aria-label="Contact details">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <span className="relative block size-12 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                  <Image src="/logo.png" alt={identity.name} fill sizes="48px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{identity.name}</p>
                  <p className="text-xs text-muted-foreground">{identity.role}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin size={14} aria-hidden="true" /> {identity.location}
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={14} aria-hidden="true" /> Replies within one business day
                </li>
              </ul>
            </div>

            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-sm" aria-label="Direct channels">
              {channels.map(({ Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
                  >
                    <Icon size={16} className="shrink-0 text-muted-foreground group-hover:text-gold" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] text-muted-foreground">{label}</span>
                      <span className="block truncate text-sm font-medium text-foreground">{value}</span>
                    </span>
                    {external ? (
                      <ArrowUpRight size={14} className="shrink-0 text-muted-foreground/60" aria-hidden="true" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-border bg-muted/40 p-6">
              <h2 className="text-sm font-semibold">Need a formal quote?</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Answer four short questions and receive a written scope with a fixed price.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/quotation")}
                className="mt-4 h-9 w-full rounded-md font-semibold"
              >
                <ReceiptText size={14} aria-hidden="true" /> Request a quote <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </div>
          </motion.aside>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section ariaLabel="Frequently asked questions" className="border-t border-border bg-card/50">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="Quick answers before you write."
            className="mb-0 md:mb-0"
          />
          <Accordion type="single" collapsible className="rounded-xl border border-border bg-card">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="last:border-b-0">
                <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
