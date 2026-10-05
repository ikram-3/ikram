"use client";

// VIEWS — Register & Login pages (separate hash routes, shared auth shell).
// POST /api/register (Zod + envelope) then auto sign-in via NextAuth credentials.

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enterProps, PageHero, Section } from "@/design";
import { identity } from "@/profile";
import { useRouterStore } from "@/store/router";

type FieldErrors = Record<string, string>;

/* ── Shared visual shell ─────────────────────────────────────────────────── */

function AuthShell({
  kind,
  title,
  description,
  children,
  switchTo,
}: {
  kind: "register" | "login";
  title: ReactNode;
  description: string;
  children: ReactNode;
  switchTo: { label: string; prompt: string; path: string };
}) {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);

  const perks =
    kind === "register"
      ? [
          { Icon: ShieldCheck, text: "Track every quotation request in one place" },
          { Icon: User, text: "Your details pre-filled on every new quote" },
          { Icon: CheckCircle2, text: "Status updates as your request moves forward" },
        ]
      : [
          { Icon: ShieldCheck, text: "Pick up where you left off — requests and statuses" },
          { Icon: User, text: "One account across quotations and updates" },
          { Icon: CheckCircle2, text: "Admins land directly on the request dashboard" },
        ];

  return (
    <>
      <PageHero
        eyebrow={kind === "register" ? "Create Account" : "Sign In"}
        title={title}
        description={description}
        breadcrumb={[{ label: "Home", path: "/" }, { label: kind === "register" ? "Register" : "Login" }]}
      />

      <Section ariaLabel={kind === "register" ? "Registration form" : "Sign in form"} className="pt-0 md:pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div {...enterProps(reduce, 0.05)} className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            {children}
          </motion.div>

          <motion.div
            {...enterProps(reduce, 0.1)}
            className="flex flex-col justify-between gap-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm md:p-8"
          >
            <div>
              <h2 className="text-lg font-bold tracking-tight md:text-xl">
                Why <span className="text-gradient-gold">register?</span>
              </h2>
              <ul className="mt-5 space-y-4">
                {perks.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
                      <Icon size={15} />
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background/60 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Prefer email? Reach out directly at{" "}
                <a
                  href={`mailto:${identity.email}`}
                  className="font-medium text-gold transition-colors duration-200 hover:text-gold-light"
                >
                  {identity.email}
                </a>{" "}
                — but a registered quote is tracked end-to-end.
              </p>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {switchTo.prompt}{" "}
          <button
            onClick={() => navigate(switchTo.path)}
            className="font-semibold text-gold underline-offset-4 transition-colors duration-200 hover:text-gold-light hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {switchTo.label} <ArrowRight size={13} className="inline" aria-hidden="true" />
          </button>
        </p>
      </Section>
    </>
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

function PasswordInput({
  value,
  onChange,
  id,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  id: string;
  autoComplete: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required
        placeholder={autoComplete === "new-password" ? "At least 8 characters" : "Your password"}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors duration-200 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {show ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}

/* ── Register page ───────────────────────────────────────────────────────── */

// Local Zod schema kept beside the form (mirrors the API boundary).
const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password needs at least one letter")
    .regex(/[0-9]/, "Password needs at least one number"),
});

export function RegisterPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const { status } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) errors[String(issue.path[0] ?? "form")] = issue.message;
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { success: boolean; error?: { message: string; details?: FieldErrors } };

      if (!res.ok || !json.success) {
        if (json.error?.details) setFieldErrors(json.error.details);
        setFormError(json.error?.message ?? "Registration failed — please try again");
        return;
      }

      // Auto sign-in, then land on the quotation flow.
      const login = await signIn("credentials", { redirect: false, email: parsed.data.email, password: parsed.data.password });
      if (login?.error) {
        navigate("/login");
        return;
      }
      navigate("/quotation");
    } catch {
      setFormError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "authenticated") {
    return <AlreadyAuthed kind="register" />;
  }

  return (
    <AuthShell
      kind="register"
      title={
        <>
          Create your <span className="text-gradient-gold">account</span>
        </>
      }
      description="Register to submit quotation requests and follow each one from 'new' to 'quoted'."
      switchTo={{ prompt: "Already have an account?", label: "Sign in", path: "/login" }}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <Label htmlFor="register-name">Full name</Label>
          <div className="relative mt-1.5">
            <User size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              placeholder="Your name"
              aria-invalid={Boolean(fieldErrors.name)}
              className="pl-9"
            />
          </div>
          <FieldError message={fieldErrors.name} />
        </div>

        <div>
          <Label htmlFor="register-email">Email</Label>
          <div className="relative mt-1.5">
            <Mail size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              placeholder="you@example.com"
              aria-invalid={Boolean(fieldErrors.email)}
              className="pl-9"
            />
          </div>
          <FieldError message={fieldErrors.email} />
        </div>

        <div>
          <Label htmlFor="register-password">Password</Label>
          <div className="relative mt-1.5">
            <Lock size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <PasswordInput
              value={password}
              onChange={setPassword}
              id="register-password"
              autoComplete="new-password"
            />
          </div>
          <FieldError message={fieldErrors.password} />
          <p className="mt-1.5 text-[11px] text-muted-foreground">At least 8 characters, with a letter and a number.</p>
        </div>

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

        <Button
          type="submit"
          disabled={submitting}
          size="lg"
          className="h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        >
          {submitting ? (
            "Creating account…"
          ) : (
            <>
              <UserPlus size={16} aria-hidden="true" /> Create account
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
}

/* ── Login page ──────────────────────────────────────────────────────────── */

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginPage() {
  const navigate = useRouterStore((s) => s.navigate);
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) errors[String(issue.path[0] ?? "form")] = issue.message;
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      const login = await signIn("credentials", { redirect: false, ...parsed.data });
      if (login?.error) {
        setFormError("Email or password is incorrect");
        return;
      }
      navigate("/account");
    } catch {
      setFormError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "authenticated") {
    return <AlreadyAuthed kind="login" />;
  }

  return (
    <AuthShell
      kind="login"
      title={
        <>
          Welcome <span className="text-gradient-gold">back</span>
        </>
      }
      description="Sign in to submit quotation requests and track the ones already in motion."
      switchTo={{ prompt: "New here?", label: "Create an account", path: "/register" }}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <Label htmlFor="login-email">Email</Label>
          <div className="relative mt-1.5">
            <Mail size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              placeholder="you@example.com"
              aria-invalid={Boolean(fieldErrors.email)}
              className="pl-9"
            />
          </div>
          <FieldError message={fieldErrors.email} />
        </div>

        <div>
          <Label htmlFor="login-password">Password</Label>
          <div className="relative mt-1.5">
            <Lock size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <PasswordInput
              value={password}
              onChange={setPassword}
              id="login-password"
              autoComplete="current-password"
            />
          </div>
          <FieldError message={fieldErrors.password} />
        </div>

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

        <Button
          type="submit"
          disabled={submitting}
          size="lg"
          className="h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        >
          {submitting ? (
            "Signing in…"
          ) : (
            <>
              <LogIn size={16} aria-hidden="true" /> Sign in
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          New here? Register first —{" "}
          <Link href="#/register" className="font-medium text-gold hover:text-gold-light">
            it takes a minute
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}

/* ── Already signed in ───────────────────────────────────────────────────── */

function AlreadyAuthed({ kind }: { kind: "register" | "login" }) {
  const navigate = useRouterStore((s) => s.navigate);
  return (
    <Section ariaLabel="Already signed in" className="pt-0 md:pt-0">
      <div className="mx-auto max-w-md rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-8 text-center shadow-sm">
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
          <CheckCircle2 size={22} />
        </span>
        <h2 className="text-lg font-bold tracking-tight">You&apos;re already signed in</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {kind === "register"
            ? "This browser already has an active account — head to your dashboard or start a new quotation."
            : "No need to sign in again — your dashboard is one click away."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate("/account")} className="h-10 rounded-md bg-primary font-semibold text-primary-foreground shadow-md">
            My account
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/quotation")}
            className="h-10 rounded-md border-gold/50 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
          >
            Get a quote
          </Button>
        </div>
      </div>
    </Section>
  );
}
