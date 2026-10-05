"use client";

// VIEWS — Quotation request page (public; logged-in users get it linked to their account).
// POST /api/quotes (Zod + envelope). Success shows a reference code.

import { useEffect, useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Send,
  Smartphone,
  Sparkles,
  Wallet,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enterProps, PageHero, Section } from "@/design";
import { identity, processSteps } from "@/profile";
import { useRouterStore } from "@/store/router";

type FieldErrors = Record<string, string>;

const PROJECT_TYPES = [
  { value: "website", label: "Website / landing page", Icon: Globe },
  { value: "webapp", label: "Web app / business system", Icon: FileText },
  { value: "ai-agent", label: "AI agent / RAG assistant", Icon: Sparkles },
  { value: "automation", label: "Automation / bot", Icon: Bot },
  { value: "mobile", label: "Mobile app", Icon: Smartphone },
  { value: "other", label: "Something else", Icon: Wrench },
] as const;

const BUDGETS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-10k", label: "$3,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
  { value: "flexible", label: "Flexible / let's discuss" },
] as const;

const TIMELINES = [
  { value: "asap", label: "ASAP — urgent" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "1 – 3 months" },
  { value: "flexible", label: "Flexible" },
] as const;

interface QuoteResult {
  reference: string;
  status: string;
}

export function QuotationPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);

  // Pre-fill for signed-in visitors.
  useEffect(() => {
    if (session?.user) {
      setName((n) => n || session.user.name || "");
      setEmail((e) => e || session.user.email || "");
    }
  }, [session]);

  // Client-side Zod mirror of the API boundary (defined below the component).

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = quoteSchema.safeParse({ name, email, phone, company, projectType, budget, timeline, message });
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) errors[String(issue.path[0] ?? "form")] = issue.message;
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as {
        success: boolean;
        data?: { quote: QuoteResult };
        error?: { message: string; details?: FieldErrors };
      };

      if (!res.ok || !json.success || !json.data) {
        if (json.error?.details) setFieldErrors(json.error.details);
        setFormError(json.error?.message ?? "Something went wrong — please try again");
        return;
      }

      setResult(json.data.quote);
    } catch {
      setFormError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success state ─────────────────────────────────────────────────────── */
  if (result) {
    return (
      <Section ariaLabel="Quotation received" className="pt-10 md:pt-14">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={reduce ? { duration: 0.15 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-8 text-center shadow-md md:p-12"
        >
          <motion.span
            initial={reduce ? undefined : { scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={reduce ? undefined : { type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
            className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-gold/15 text-gold shadow-inner"
            aria-hidden="true"
          >
            <CheckCircle2 size={30} />
          </motion.span>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Request <span className="text-gradient-gold">received</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Thanks — your quotation request is in. You&apos;ll hear back with a straight scope and price.
          </p>

          <div className="mx-auto mt-6 w-fit rounded-xl border border-border bg-background/70 px-6 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Reference</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-gold">{result.reference}</p>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Keep this reference. {session?.user ? "It's also saved in your account — " : ""}
            for anything urgent, mention it in an email to {identity.email}.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => navigate(session?.user ? "/account" : "/projects")}
              className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground shadow-md"
            >
              {session?.user ? "Track it in my account" : "Browse projects meanwhile"} <ArrowRight size={15} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setMessage("");
              }}
              className="h-11 rounded-md border-gold/50 px-6 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
            >
              Submit another request
            </Button>
          </div>
        </motion.div>
      </Section>
    );
  }

  /* ── Form state ────────────────────────────────────────────────────────── */
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title={
          <>
            Let&apos;s scope it <span className="text-gradient-gold">straight</span>
          </>
        }
        description="Tell me what the system should do, pick a budget range and timeline — you get a clear quotation in reply, no vague hourly fog."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Get a Quote" }]}
      />

      <Section ariaLabel="Quotation request form" className="pt-0 md:pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Form */}
          <motion.div {...enterProps(reduce, 0.05)} className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              {/* Contact */}
              <fieldset className="space-y-4">
                <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <MessageSquare size={13} className="text-gold" aria-hidden="true" /> Who&apos;s asking
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="quote-name">Full name</Label>
                    <Input
                      id="quote-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      placeholder="Your name"
                      aria-invalid={Boolean(fieldErrors.name)}
                      className="mt-1.5"
                    />
                    <FieldError message={fieldErrors.name} />
                  </div>
                  <div>
                    <Label htmlFor="quote-email">Email</Label>
                    <Input
                      id="quote-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className="mt-1.5"
                    />
                    <FieldError message={fieldErrors.email} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="quote-phone">
                      Phone <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="quote-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="+92 3xx xxxxxxx"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      className="mt-1.5"
                    />
                    <FieldError message={fieldErrors.phone} />
                  </div>
                  <div>
                    <Label htmlFor="quote-company">
                      Company / Organization <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="quote-company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc / Personal"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Shape of the project */}
              <fieldset className="space-y-4">
                <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <Sparkles size={13} className="text-gold" aria-hidden="true" /> Shape of the project
                </legend>
                <div>
                  <Label htmlFor="quote-type">Project type</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger id="quote-type" aria-invalid={Boolean(fieldErrors.projectType)} className="mt-1.5 w-full">
                      <SelectValue placeholder="Pick the closest match" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map(({ value, label, Icon }) => (
                        <SelectItem key={value} value={value}>
                          <span className="flex items-center gap-2">
                            <Icon size={14} aria-hidden="true" /> {label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError message={fieldErrors.projectType} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="quote-budget">Budget range</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger id="quote-budget" aria-invalid={Boolean(fieldErrors.budget)} className="mt-1.5 w-full">
                        <SelectValue placeholder="Pick a range" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGETS.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError message={fieldErrors.budget} />
                  </div>
                  <div>
                    <Label htmlFor="quote-timeline">Timeline</Label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectTrigger id="quote-timeline" aria-invalid={Boolean(fieldErrors.timeline)} className="mt-1.5 w-full">
                        <SelectValue placeholder="When do you need it?" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError message={fieldErrors.timeline} />
                  </div>
                </div>
              </fieldset>

              {/* Details */}
              <fieldset>
                <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <Send size={13} className="text-gold" aria-hidden="true" /> The work itself
                </legend>
                <Label htmlFor="quote-message" className="sr-only">
                  Project description
                </Label>
                <Textarea
                  id="quote-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  maxLength={4000}
                  placeholder="What should the system do? Modules, users, integrations, anything that matters — the more concrete, the sharper the quote."
                  aria-invalid={Boolean(fieldErrors.message)}
                  className="mt-1.5 resize-y"
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <FieldError message={fieldErrors.message} />
                  <span className="ml-auto text-[11px] text-muted-foreground">{message.length}/4000</span>
                </div>
              </fieldset>

              <AnimatePresence>
                {formError ? (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
                  >
                    <AlertCircle size={14} aria-hidden="true" /> {formError}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <div className="flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {status === "authenticated"
                    ? "Signed in — this request will be linked to your account."
                    : (
                      <>
                        Guest submissions welcome —{" "}
                        <button
                          type="button"
                          onClick={() => navigate("/register")}
                          className="font-medium text-gold hover:text-gold-light"
                        >
                          register
                        </button>{" "}
                        to track it in your account.
                      </>
                    )}
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="h-11 shrink-0 rounded-md bg-primary px-7 font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" /> Request quotation
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.aside {...enterProps(reduce, 0.12)} className="space-y-5" aria-label="What happens next">
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm">
              <h2 className="text-base font-bold tracking-tight md:text-lg">
                What happens <span className="text-gradient-gold">next</span>
              </h2>
              <ol className="mt-5 space-y-5">
                {processSteps.map((step, i) => (
                  <motion.li
                    key={step.step}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={reduce ? { duration: 0.15 } : { duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/50 bg-background font-mono text-[11px] font-bold text-gold">
                      {step.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Wallet size={15} className="text-gold" aria-hidden="true" /> What a good request looks like
              </h2>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  The problem in one sentence — &ldquo;customers keep ordering the wrong items&rdquo;
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  Who uses it — staff, managers, customers — and on what device
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  What exists already — spreadsheet, old software, or a blank page
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  One example of a daily workflow the system should handle
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Clock size={15} className="text-gold" aria-hidden="true" /> Prefer to talk first?
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Email {identity.email} or call {identity.phone} — but a written request keeps every
                detail in scope.
              </p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mt-4 h-9 rounded-md border-gold/50 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
              >
                <a href={`mailto:${identity.email}?subject=Quotation%20follow-up`}>
                  <Mail size={14} aria-hidden="true" /> Email instead
                </a>
              </Button>
            </div>
          </motion.aside>
        </div>
      </Section>
    </>
  );
}

/* Client-side mirror of the API boundary schema. */
const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .union([z.string().trim().regex(/^[+\d][\d\s\-()]{6,20}$/, "Enter a valid phone number"), z.literal("")])
    .optional(),
  company: z.string().trim().max(120).optional(),
  projectType: z.enum(["website", "webapp", "ai-agent", "automation", "mobile", "other"], {
    message: "Pick a project type",
  }),
  budget: z.enum(["under-1k", "1k-3k", "3k-10k", "10k-plus", "flexible"], { message: "Pick a budget range" }),
  timeline: z.enum(["asap", "1-month", "1-3-months", "flexible"], { message: "Pick a timeline" }),
  message: z.string().trim().min(30, "Tell me a bit more — at least 30 characters").max(4000),
});

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle size={12} aria-hidden="true" /> {message}
    </p>
  );
}
