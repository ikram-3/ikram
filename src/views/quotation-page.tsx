"use client";

// VIEWS — Quotation request page (public; logged-in users get it linked to their account).
// Four-step flow: Project → Budget & Timeline → Contact → Review. POST /api/quotes (Zod + envelope).

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Loader2,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Section } from "@/design";
import { identity } from "@/profile";
import { useRouterStore } from "@/store/router";

type FieldErrors = Record<string, string>;

const PROJECT_TYPES = [
  { value: "website", label: "Website", hint: "Company site or landing page", Icon: Globe },
  { value: "webapp", label: "Web application", hint: "POS, CMS, ERP, portals", Icon: FileText },
  { value: "ai-agent", label: "AI assistant", hint: "RAG chatbot, agents", Icon: Sparkles },
  { value: "automation", label: "Automation", hint: "Bots, scripts, workflows", Icon: Bot },
  { value: "mobile", label: "Mobile app", hint: "Android & iOS (Flutter)", Icon: Smartphone },
  { value: "other", label: "Something else", hint: "Describe it in the brief", Icon: Wrench },
] as const;

const BUDGETS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-10k", label: "$3,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
  { value: "flexible", label: "Not sure yet" },
] as const;

const TIMELINES = [
  { value: "asap", label: "Urgent", hint: "As soon as possible" },
  { value: "1-month", label: "Within a month", hint: "Defined, near-term" },
  { value: "1-3-months", label: "1 – 3 months", hint: "Planned project" },
  { value: "flexible", label: "Flexible", hint: "Quality over speed" },
] as const;

const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Budget & timeline" },
  { id: 3, label: "Your details" },
  { id: 4, label: "Review" },
] as const;

interface QuoteResult {
  reference: string;
  status: string;
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
    message: "Choose a project type",
  }),
  budget: z.enum(["under-1k", "1k-3k", "3k-10k", "10k-plus", "flexible"], { message: "Choose a budget range" }),
  timeline: z.enum(["asap", "1-month", "1-3-months", "flexible"], { message: "Choose a timeline" }),
  message: z.string().trim().min(30, "Please add a little more detail — at least 30 characters").max(4000),
});

/** Which fields each step is responsible for validating. */
const STEP_FIELDS: Record<number, (keyof z.infer<typeof quoteSchema>)[]> = {
  1: ["projectType", "message"],
  2: ["budget", "timeline"],
  3: ["name", "email", "phone", "company"],
};

export function QuotationPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const { data: session, status } = useSession();

  const [step, setStep] = useState(1);
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

  useEffect(() => {
    if (session?.user) {
      setName((n) => n || session.user.name || "");
      setEmail((e) => e || session.user.email || "");
    }
  }, [session]);

  const values = { name, email, phone, company, projectType, budget, timeline, message };

  function validate(fields?: (keyof typeof values)[]) {
    const parsed = quoteSchema.safeParse(values);
    if (parsed.success) {
      setFieldErrors({});
      return true;
    }
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fields || fields.includes(key as keyof typeof values)) errors[key] = errors[key] ?? issue.message;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function next() {
    if (!validate(STEP_FIELDS[step])) return;
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setFieldErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 4) {
      next();
      return;
    }
    setFormError(null);
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      validate();
      // Jump back to the first step with an error.
      const firstBad = String(parsed.error.issues[0]?.path[0] ?? "");
      const target = Number(Object.entries(STEP_FIELDS).find(([, f]) => f.includes(firstBad as never))?.[0] ?? 1);
      setStep(target);
      return;
    }
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

  const typeLabel = PROJECT_TYPES.find((t) => t.value === projectType)?.label;
  const budgetLabel = BUDGETS.find((b) => b.value === budget)?.label;
  const timelineLabel = TIMELINES.find((t) => t.value === timeline)?.label;

  /* ── Success ─────────────────────────────────────────────────────────── */
  if (result) {
    return (
      <Section ariaLabel="Quotation received" className="pt-12 md:pt-16">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.4 }}
          className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center shadow-sm md:p-10"
        >
          <span className="mx-auto mb-5 grid size-12 place-items-center rounded-full bg-accent text-gold" aria-hidden="true">
            <CheckCircle2 size={26} />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Request received</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Thank you. I&apos;ll review your brief and reply with a written scope and fixed price, usually within one
            business day.
          </p>
          <div className="mx-auto mt-6 w-fit rounded-lg border border-border bg-muted/50 px-6 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Reference</p>
            <p className="mt-0.5 font-mono text-xl font-bold tracking-wider text-foreground">{result.reference}</p>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Keep this reference{session?.user ? " — it is also saved in your account" : ""}. For anything urgent, email{" "}
            {identity.email}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => navigate(session?.user ? "/account" : "/projects")}
              className="h-10 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {session?.user ? "Track in my account" : "Browse projects"} <ArrowRight size={15} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setMessage("");
                setStep(1);
              }}
              className="h-10 rounded-md px-5 font-semibold"
            >
              New request
            </Button>
          </div>
        </motion.div>
      </Section>
    );
  }

  /* ── Form ────────────────────────────────────────────────────────────── */
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell me about your project"
        description="Four short steps. You'll receive a written scope with a fixed price — no vague hourly estimates."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Request a quote" }]}
      />

      <Section ariaLabel="Quotation request form">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            {/* Stepper */}
            <ol className="flex border-b border-border" aria-label="Progress">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <li key={s.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => (done ? setStep(s.id) : undefined)}
                      disabled={!done}
                      aria-current={active ? "step" : undefined}
                      className={[
                        "flex w-full items-center gap-2.5 border-b-2 px-3 py-4 text-left text-xs font-medium transition-colors sm:px-5",
                        active ? "border-gold text-foreground" : done ? "border-transparent text-foreground hover:bg-muted/50" : "border-transparent text-muted-foreground",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
                          done ? "border-gold bg-gold text-white dark:text-[#052E16]" : active ? "border-gold text-gold" : "border-border",
                        ].join(" ")}
                      >
                        {done ? <Check size={13} aria-hidden="true" /> : s.id}
                      </span>
                      <span className="hidden md:inline">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <form onSubmit={onSubmit} noValidate className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 ? (
                    <div className="space-y-6">
                      <StepHeader title="What are we building?" text="Pick the closest match, then describe the work." />
                      <div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="radiogroup" aria-label="Project type">
                          {PROJECT_TYPES.map(({ value, label, hint, Icon }) => (
                            <OptionCard
                              key={value}
                              selected={projectType === value}
                              onSelect={() => setProjectType(value)}
                              title={label}
                              hint={hint}
                              icon={<Icon size={17} aria-hidden="true" />}
                            />
                          ))}
                        </div>
                        <FieldError message={fieldErrors.projectType} />
                      </div>
                      <div>
                        <Label htmlFor="quote-message">Project brief</Label>
                        <Textarea
                          id="quote-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                          maxLength={4000}
                          placeholder="What problem should the system solve? Who will use it? Which features or integrations matter most?"
                          aria-invalid={Boolean(fieldErrors.message)}
                          className="mt-1.5 resize-y"
                        />
                        <div className="mt-1.5 flex items-center justify-between">
                          <FieldError message={fieldErrors.message} />
                          <span className="ml-auto text-[11px] text-muted-foreground">{message.length}/4000</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="space-y-7">
                      <StepHeader title="Budget and timeline" text="Ranges are fine — they help me propose the right scope." />
                      <div>
                        <p className="mb-2 text-sm font-medium">Budget range</p>
                        <div className="grid gap-2.5 sm:grid-cols-3" role="radiogroup" aria-label="Budget range">
                          {BUDGETS.map(({ value, label }) => (
                            <OptionCard key={value} selected={budget === value} onSelect={() => setBudget(value)} title={label} compact />
                          ))}
                        </div>
                        <FieldError message={fieldErrors.budget} />
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium">Timeline</p>
                        <div className="grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Timeline">
                          {TIMELINES.map(({ value, label, hint }) => (
                            <OptionCard
                              key={value}
                              selected={timeline === value}
                              onSelect={() => setTimeline(value)}
                              title={label}
                              hint={hint}
                              icon={<Clock size={16} aria-hidden="true" />}
                            />
                          ))}
                        </div>
                        <FieldError message={fieldErrors.timeline} />
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="space-y-5">
                      <StepHeader title="Your details" text="Where should I send the quotation?" />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field id="quote-name" label="Full name" error={fieldErrors.name}>
                          <Input id="quote-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(fieldErrors.name)} />
                        </Field>
                        <Field id="quote-email" label="Email" error={fieldErrors.email}>
                          <Input id="quote-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(fieldErrors.email)} />
                        </Field>
                        <Field id="quote-phone" label="Phone" optional error={fieldErrors.phone}>
                          <Input id="quote-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+92 3xx xxxxxxx" aria-invalid={Boolean(fieldErrors.phone)} />
                        </Field>
                        <Field id="quote-company" label="Company" optional>
                          <Input id="quote-company" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Company or personal" />
                        </Field>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {status === "authenticated" ? (
                          "You're signed in — this request will be linked to your account."
                        ) : (
                          <>
                            Submitting as a guest.{" "}
                            <button type="button" onClick={() => navigate("/register")} className="font-medium text-gold hover:underline">
                              Create an account
                            </button>{" "}
                            to track request status.
                          </>
                        )}
                      </p>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="space-y-5">
                      <StepHeader title="Review and submit" text="Check the details below. You can edit any section." />
                      <dl className="divide-y divide-border rounded-lg border border-border">
                        <ReviewRow label="Project type" value={typeLabel} onEdit={() => setStep(1)} />
                        <ReviewRow label="Brief" value={message} onEdit={() => setStep(1)} multiline />
                        <ReviewRow label="Budget" value={budgetLabel} onEdit={() => setStep(2)} />
                        <ReviewRow label="Timeline" value={timelineLabel} onEdit={() => setStep(2)} />
                        <ReviewRow
                          label="Contact"
                          value={[name, email, phone, company].filter(Boolean).join(" · ")}
                          onEdit={() => setStep(3)}
                        />
                      </dl>
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
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={back} className="h-10 px-4 font-medium">
                    <ArrowLeft size={15} aria-hidden="true" /> Back
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">Step 1 of 4</span>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-10 rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                >
                  {step < 4 ? (
                    <>
                      Continue <ArrowRight size={15} aria-hidden="true" />
                    </>
                  ) : submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" /> Submit request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Summary sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label="Request summary">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold">Your request</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <SummaryRow label="Project" value={typeLabel} />
                <SummaryRow label="Budget" value={budgetLabel} />
                <SummaryRow label="Timeline" value={timelineLabel} />
                <SummaryRow label="Contact" value={email || undefined} />
              </dl>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-300"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">Step {step} of 4</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold">What happens next</h2>
              <ul className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
                <li className="flex gap-2.5">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  Your brief is reviewed personally — never shared.
                </li>
                <li className="flex gap-2.5">
                  <FileText size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  You receive a written scope, milestones and a fixed price.
                </li>
                <li className="flex gap-2.5">
                  <Clock size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  Typical reply within one business day.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-6">
              <h2 className="text-sm font-semibold">Prefer to talk first?</h2>
              <div className="mt-3 space-y-2 text-xs">
                <a href={`mailto:${identity.email}?subject=Quotation%20enquiry`} className="flex items-center gap-2 text-foreground hover:text-gold">
                  <Mail size={14} aria-hidden="true" /> {identity.email}
                </a>
                <a href={`tel:${identity.phone.replace(/-/g, "")}`} className="flex items-center gap-2 text-foreground hover:text-gold">
                  <Phone size={14} aria-hidden="true" /> {identity.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

/* ── Small presentational helpers ───────────────────────────────────────── */

function StepHeader({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function OptionCard({
  selected,
  onSelect,
  title,
  hint,
  icon,
  compact,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint?: string;
  icon?: ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={[
        "relative flex w-full items-start gap-3 rounded-lg border text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        compact ? "px-4 py-3" : "p-4",
        selected ? "border-gold bg-accent" : "border-border bg-background hover:border-foreground/25",
      ].join(" ")}
    >
      {icon ? (
        <span className={`mt-0.5 shrink-0 ${selected ? "text-gold" : "text-muted-foreground"}`}>{icon}</span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">{title}</span>
        {hint ? <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span> : null}
      </span>
      {selected ? (
        <span className="absolute right-3 top-3 grid size-4 place-items-center rounded-full bg-gold text-white dark:text-[#052E16]">
          <Check size={10} aria-hidden="true" />
        </span>
      ) : null}
    </button>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {optional ? <span className="font-normal text-muted-foreground">(optional)</span> : null}
      </Label>
      <div className="mt-1.5">{children}</div>
      <FieldError message={error} />
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
  multiline,
}: {
  label: string;
  value?: string;
  onEdit: () => void;
  multiline?: boolean;
}) {
  return (
    <div className="flex gap-4 px-4 py-3.5">
      <dt className="w-24 shrink-0 text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className={`min-w-0 flex-1 text-sm text-foreground ${multiline ? "whitespace-pre-wrap line-clamp-4" : "truncate"}`}>
        {value || <span className="text-muted-foreground">—</span>}
      </dd>
      <button type="button" onClick={onEdit} className="shrink-0 text-xs font-medium text-gold hover:underline">
        Edit
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`truncate text-right font-medium ${value ? "text-foreground" : "text-muted-foreground/60"}`}>
        {value ?? "Not set"}
      </dd>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle size={12} aria-hidden="true" /> {message}
    </p>
  );
}
