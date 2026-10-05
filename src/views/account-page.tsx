"use client";

// VIEWS — Account page: profile summary + the signed-in user's quotation requests.
// Data: GET /api/quotes/mine (envelope).

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CircleDot,
  FileClock,
  Gavel,
  Inbox,
  Lock,
  LogIn,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { enterProps, PageHero, Section, SectionHeading } from "@/design";
import { identity } from "@/profile";
import { useRouterStore } from "@/store/router";

interface MyQuote {
  id: string;
  reference: string;
  projectType: string;
  company?: string | null;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  estimatedCost?: string | null;
  createdAt: string;
}

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "border-gold/40 bg-gold/10 text-gold" },
  reviewing: { label: "Reviewing", className: "border-amber-600/30 bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  quoted: { label: "Quoted", className: "border-emerald-700/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  closed: { label: "Closed", className: "border-border bg-secondary text-secondary-foreground" },
};

const TYPE_LABELS: Record<string, string> = {
  website: "Website",
  webapp: "Web app / business system",
  "ai-agent": "AI agent / RAG",
  automation: "Automation / bot",
  mobile: "Mobile app",
  other: "Other",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-1k": "Under $1,000",
  "1k-3k": "$1,000 – $3,000",
  "3k-10k": "$3,000 – $10,000",
  "10k-plus": "$10,000+",
  flexible: "Flexible",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP",
  "1-month": "Within a month",
  "1-3-months": "1–3 months",
  flexible: "Flexible",
};

export function AccountPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const { data: session, status: sessionStatus } = useSession();

  const [quotes, setQuotes] = useState<MyQuote[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/quotes/mine");
        const json = (await res.json()) as {
          success: boolean;
          data?: { quotes: MyQuote[] };
          error?: { message: string };
        };
        if (cancelled) return;
        if (!res.ok || !json.success || !json.data) {
          setError(json.error?.message ?? "Couldn't load your requests");
          setQuotes([]);
          return;
        }
        setQuotes(json.data.quotes);
      } catch {
        if (cancelled) return;
        setError("Network error — couldn't load your requests");
        setQuotes([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionStatus]);

  /* Not signed in → sign-in prompt */
  if (sessionStatus === "unauthenticated") {
    return (
      <Section ariaLabel="Sign in required" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-md rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-8 text-center shadow-sm">
          <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
            <Lock size={20} />
          </span>
          <h2 className="text-lg font-bold tracking-tight">Your account is one step away</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sign in to see your quotation requests and their statuses — or create an account in about a minute.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => navigate("/login")}
              className="h-10 rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-md"
            >
              <LogIn size={15} aria-hidden="true" /> Sign in
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/register")}
              className="h-10 rounded-md border-gold/50 px-5 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
            >
              <UserPlus size={15} aria-hidden="true" /> Register
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const isAdmin = session?.user?.role === "admin";

  return (
    <>
      <PageHero
        eyebrow="My Account"
        title={
          <>
            Hello, <span className="text-gradient-gold">{session?.user?.name?.split(" ")[0] ?? "there"}</span>
          </>
        }
        description="Your profile and every quotation request you've submitted — tracked from 'new' to 'quoted'."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Account" }]}
      />

      <Section ariaLabel="Profile summary" className="pt-0 md:pt-0">
        <motion.div
          {...enterProps(reduce, 0.05)}
          className="flex flex-col justify-between gap-6 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 shadow-sm md:flex-row md:items-center md:p-8"
        >
          <div className="flex items-center gap-4">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/10 font-mono text-lg font-bold text-gold"
              aria-hidden="true"
            >
              {(session?.user?.name ?? "U").slice(0, 1).toUpperCase()}
            </span>
            <div>
              <p className="text-base font-bold tracking-tight">{session?.user?.name}</p>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
              <Badge className="mt-1.5 rounded-full border-gold/40 bg-gold/10 text-[11px] font-medium text-gold" variant="outline">
                {isAdmin ? (
                  <>
                    <ShieldCheck size={11} className="mr-1 inline" aria-hidden="true" /> Admin
                  </>
                ) : (
                  <>
                    <CircleDot size={11} className="mr-1 inline" aria-hidden="true" /> Member
                  </>
                )}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {isAdmin ? (
              <Button
                onClick={() => navigate("/admin")}
                className="h-10 rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-md"
              >
                <Gavel size={15} aria-hidden="true" /> Quotation dashboard <ArrowRight size={14} aria-hidden="true" />
              </Button>
            ) : null}
            <Button
              variant="outline"
              onClick={() => navigate("/quotation")}
              className="h-10 rounded-md border-gold/50 px-5 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
            >
              New quote request
            </Button>
            <Button
              variant="ghost"
              onClick={() => void signOut({ redirect: false })}
              className="h-10 rounded-md px-4 text-muted-foreground hover:text-destructive"
            >
              Sign out
            </Button>
          </div>
        </motion.div>
      </Section>

      <Section ariaLabel="My quotation requests" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Requests"
          title="My quotation requests"
          description="Every request you've submitted, newest first."
        />

        {quotes === null && !error ? (
          <div className="space-y-3">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
        ) : error ? (
          <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : !quotes || quotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
            <Inbox size={26} aria-hidden="true" className="mx-auto mb-3 text-muted-foreground/60" />
            <p className="text-sm font-medium">No requests yet</p>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
              When you submit a quotation request it lands here with its reference code and live status.
            </p>
            <Button
              onClick={() => navigate("/quotation")}
              className="mt-5 h-10 rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-md"
            >
              Submit your first request <ArrowRight size={14} aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <ul className="space-y-3" aria-label="My quotation requests">
            {(quotes || []).map((q, i) => {
              const badge = STATUS_STYLES[q.status] ?? STATUS_STYLES.new;
              return (
                <motion.li
                  key={q.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduce ? { duration: 0.15 } : { duration: 0.35, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-gold/10 text-gold" aria-hidden="true">
                        <FileClock size={17} />
                      </span>
                      <div>
                        <p className="font-mono text-sm font-bold tracking-wider text-gold">{q.reference}</p>
                        <p className="text-xs text-muted-foreground">
                          {TYPE_LABELS[q.projectType] ?? q.projectType} · {BUDGET_LABELS[q.budget] ?? q.budget} ·{" "}
                          {TIMELINE_LABELS[q.timeline] ?? q.timeline}
                          {q.company ? ` · ${q.company}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <Badge variant="outline" className={`rounded-full text-[11px] font-medium ${badge.className}`}>
                        {badge.label}
                      </Badge>
                      {q.estimatedCost ? (
                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Estimate: {q.estimatedCost}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{q.message}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground/70">
                    Submitted {new Date(q.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        )}
      </Section>
    </>
  );
}
