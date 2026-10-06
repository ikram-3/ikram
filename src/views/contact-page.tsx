"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ReceiptText,
  Send,
  Sparkles,
  User,
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
    a: "Yes — systems are packaged for one-click Docker and Vercel deployment. Handover includes the repository, environment documentation, and a personal walkthrough.",
  },
  {
    q: "How do I share project details safely?",
    a: "Send the high-level scope through this contact form or the quote form; anything sensitive — credentials, proprietary datasets, or private API keys — moves over secure email or a direct call once the NDA/engagement begins.",
  },
] as const;

export function ContactPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

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
        throw new Error(json.error?.message || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Contact submit error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending your message. Please reach out directly via email."
      );
    }
  };

  const channels = [
    {
      Icon: Mail,
      label: "Direct Email",
      value: identity.email,
      href: `mailto:${identity.email}`,
      external: false,
    },
    {
      Icon: Phone,
      label: "Phone / WhatsApp",
      value: "+92 349 9934605",
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
        eyebrow="Get In Touch"
        title={
          <>
            Let&apos;s build something <span className="text-gradient-gold">production-grade</span>.
          </>
        }
        description="Have a system that needs building end-to-end? Drop a message here to receive a prompt reply and an instant email confirmation."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Contact" }]}
      />

      <Section ariaLabel="Contact form and channels">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Contact Form Column (7 cols) */}
          <motion.div
            {...enterProps(reduce, 0.05)}
            className="rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm md:p-8 lg:col-span-7"
          >
            <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                  Send a Direct Message
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Delivered directly to Muhammad Ikram with an automated copy to your inbox.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                SMTP Online
              </span>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
              >
                <div className="grid size-14 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Thank you for reaching out. A confirmation email has been dispatched to your inbox. Muhammad Ikram will review your details and respond within 24 hours.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  variant="outline"
                  className="mt-6 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {status === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-xs font-medium text-destructive"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </motion.div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-name" className="text-xs font-medium text-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <User
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Alex Morgan"
                        className="pl-9"
                        disabled={status === "submitting"}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact-email" className="text-xs font-medium text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Mail
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@company.com"
                        className="pl-9"
                        disabled={status === "submitting"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-subject" className="text-xs font-medium text-foreground">
                    Subject / Topic (Optional)
                  </Label>
                  <div className="relative mt-1.5">
                    <FileText
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. AI Integration / Full-Stack System Scope"
                      className="pl-9"
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-message" className="text-xs font-medium text-foreground">
                    Project Brief or Message <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative mt-1.5">
                    <MessageSquare
                      size={15}
                      className="pointer-events-none absolute left-3 top-3 text-muted-foreground"
                    />
                    <Textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="Describe your project, timeline, deliverables, or questions in detail…"
                      className="pl-9 resize-y min-h-[120px]"
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] text-muted-foreground text-center sm:text-left">
                    Protected by secure TLS Gmail SMTP relay.
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "submitting" || !name.trim() || !email.trim() || !message.trim()}
                    className="h-11 w-full sm:w-auto px-8 bg-gold hover:bg-gold-light text-charcoal font-bold shadow-md shadow-gold/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Sending Message…
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Identity & Direct Channels Column (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Quick Profile Card */}
            <motion.div
              {...enterProps(reduce, 0.08)}
              className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="relative block size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-500/70 shadow-lg shadow-emerald-500/20 bg-background/50">
                  <Image
                    src="/logo.png"
                    alt={identity.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground">{identity.name}</h3>
                  <p className="text-xs text-muted-foreground">{identity.role}</p>
                  <p className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                    <Sparkles size={11} /> Open for new projects & contracts
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                One developer for your entire system: modern web frontends, high-performance backends, AI agents with RAG, database architectures, and automated cloud deployments.
              </p>

              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Need formal scope?</div>
                  <div className="text-xs text-foreground font-medium">Use the quote builder for itemized pricing</div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate("/quotation")}
                  className="rounded-md bg-primary text-primary-foreground font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <ReceiptText size={14} className="mr-1.5" /> Quote
                </Button>
              </div>
            </motion.div>

            {/* Direct Channels List */}
            <motion.ul
              {...enterProps(reduce, 0.12)}
              className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1"
              aria-label="Direct contact channels"
            >
              {channels.map(({ Icon, label, value, href, external }) => {
                const content = (
                  <>
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20"
                      aria-hidden="true"
                    >
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </span>
                      <span className="block truncate text-xs font-medium text-foreground">{value}</span>
                    </span>
                    {external ? (
                      <ArrowUpRight
                        size={13}
                        className="ml-auto shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                        aria-hidden="true"
                      />
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
                        className="group flex items-center gap-3 rounded-xl border border-border/80 bg-card p-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-card p-3 shadow-xs">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </div>
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
            Have a custom requirement? Email{" "}
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
