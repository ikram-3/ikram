"use client";

// VIEWS — Admin dashboard: incoming quotation requests with status & estimate management.
// RBAC: session.user.role === "admin". Data: GET /api/quotes · PATCH /api/quotes/[id].

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Gavel,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  Save,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { enterProps, PageHero, Section, StatCard } from "@/design";
import { useRouterStore } from "@/store/router";

interface AdminQuote {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  company?: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  adminNotes?: string | null;
  estimatedCost?: string | null;
  createdAt: string;
  user: { name: string; email: string } | null;
}

interface Counts {
  new: number;
  reviewing: number;
  quoted: number;
  closed: number;
}

const STATUS_OPTIONS = ["new", "reviewing", "quoted", "closed"] as const;

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

export function AdminPage() {
  const reduce = useReducedMotion();
  const navigate = useRouterStore((s) => s.navigate);
  const { data: session, status: sessionStatus } = useSession();

  const [quotes, setQuotes] = useState<AdminQuote[] | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [patching, setPatching] = useState<string | null>(null);

  const isAdmin = session?.user?.role === "admin";

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/quotes");
      const json = (await res.json()) as {
        success: boolean;
        data?: { quotes: AdminQuote[]; counts: Counts };
        error?: { message: string };
      };
      if (!res.ok || !json.success || !json.data) {
        setError(json.error?.message ?? "Failed to load quotation requests");
        setQuotes([]);
        return;
      }
      setQuotes(json.data.quotes);
      setCounts(json.data.counts);
    } catch {
      setError("Network error — couldn't fetch quotes");
      setQuotes([]);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  async function updateStatus(id: string, status: string) {
    setPatching(id);
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = (await res.json()) as { success: boolean; data?: { quote: AdminQuote } };
      if (res.ok && json.success && json.data) {
        setQuotes((prev) =>
          prev ? prev.map((q) => (q.id === json.data!.quote.id ? { ...q, ...json.data!.quote } : q)) : prev
        );
        setCounts((prev) => {
          if (!prev) return prev;
          const target = quotes?.find((q) => q.id === id);
          const oldStatus = (target?.status ?? "new") as keyof Counts;
          const next = { ...prev };
          next[oldStatus] = Math.max(0, next[oldStatus] - 1);
          next[status as keyof Counts] = next[status as keyof Counts] + 1;
          return next;
        });
      }
    } finally {
      setPatching(null);
    }
  }

  async function updateDetails(id: string, updates: { estimatedCost?: string | null; adminNotes?: string | null }) {
    setPatching(id);
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = (await res.json()) as { success: boolean; data?: { quote: AdminQuote } };
      if (res.ok && json.success && json.data) {
        setQuotes((prev) =>
          prev ? prev.map((q) => (q.id === json.data!.quote.id ? { ...q, ...json.data!.quote } : q)) : prev
        );
      }
    } finally {
      setPatching(null);
    }
  }

  /* ── Gate: not signed in / not admin ────────────────────────────────────── */
  if (sessionStatus !== "authenticated" || !isAdmin) {
    return (
      <Section ariaLabel="Admin access required" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-md rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-8 text-center shadow-sm">
          <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-gold/10 text-gold" aria-hidden="true">
            <Lock size={20} />
          </span>
          <h2 className="text-lg font-bold tracking-tight">Admin access only</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {sessionStatus === "authenticated"
              ? "This account doesn't have the admin role. Sign in with the site-owner account to manage quotation requests."
              : "Sign in with the site-owner (admin) account to review and manage incoming quotation requests."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => navigate("/login")}
              className="h-10 rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-md"
            >
              Sign in
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="h-10 rounded-md border-gold/50 px-5 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
            >
              Back to site
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  /* ── Authenticated admin view ───────────────────────────────────────────── */
  return (
    <>
      <PageHero
        eyebrow="Admin Dashboard"
        title={
          <>
            Quotation <span className="text-gradient-gold">pipeline</span>
          </>
        }
        description="Review inbound scopes, update review stages, save client estimates, and manage incoming leads powered by PostgreSQL."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Admin" }]}
      />

      <Section ariaLabel="Pipeline metrics" className="pt-0 md:pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={counts?.new ?? 0} label="New requests" icon={ClipboardList} />
          <StatCard value={counts?.reviewing ?? 0} label="Reviewing" icon={Eye} delay={0.05} />
          <StatCard value={counts?.quoted ?? 0} label="Quoted" icon={CheckCircle2} delay={0.1} />
          <StatCard value={counts?.closed ?? 0} label="Closed" icon={Gavel} delay={0.15} />
        </div>

        <motion.div {...enterProps(reduce, 0.1)} className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {quotes ? `${quotes.length} request${quotes.length === 1 ? "" : "s"} total` : "Loading…"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void load()}
            disabled={quotes === null}
            className="h-9 rounded-md border-gold/50 font-semibold text-foreground hover:bg-gold/10 hover:text-gold"
          >
            <RefreshCw size={13} aria-hidden="true" /> Refresh
          </Button>
        </motion.div>
      </Section>

      <Section ariaLabel="Quotation requests" className="pt-0 md:pt-0">
        {error ? (
          <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : quotes === null ? (
          <div className="space-y-3">
            <Skeleton className="h-36 w-full rounded-xl" />
            <Skeleton className="h-36 w-full rounded-xl" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
            <ClipboardList size={26} aria-hidden="true" className="mx-auto mb-3 text-muted-foreground/60" />
            <p className="text-sm font-medium">No quotation requests yet</p>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Submissions from the Get a Quote page will appear here the moment they arrive.
            </p>
            <Button
              onClick={() => navigate("/quotation")}
              className="mt-5 h-10 rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-md"
            >
              Open the quote page <ArrowRight size={14} aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <ul className="space-y-4" aria-label="All quotation requests">
            {quotes.map((q, i) => (
              <AdminQuoteItem
                key={q.id}
                quote={q}
                index={i}
                reduce={reduce}
                isPatching={patching === q.id}
                onUpdateStatus={(s) => void updateStatus(q.id, s)}
                onUpdateDetails={(u) => void updateDetails(q.id, u)}
              />
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}

function AdminQuoteItem({
  quote: q,
  index: i,
  reduce,
  isPatching,
  onUpdateStatus,
  onUpdateDetails,
}: {
  quote: AdminQuote;
  index: number;
  reduce: boolean | null;
  isPatching: boolean;
  onUpdateStatus: (status: string) => void;
  onUpdateDetails: (updates: { estimatedCost?: string | null; adminNotes?: string | null }) => void;
}) {
  const badge = STATUS_STYLES[q.status] ?? STATUS_STYLES.new;
  const [estCost, setEstCost] = useState(q.estimatedCost ?? "");
  const [notes, setNotes] = useState(q.adminNotes ?? "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setEstCost(q.estimatedCost ?? "");
    setNotes(q.adminNotes ?? "");
  }, [q.estimatedCost, q.adminNotes]);

  function handleSaveDetails() {
    onUpdateDetails({
      estimatedCost: estCost.trim() ? estCost.trim() : null,
      adminNotes: notes.trim() ? notes.trim() : null,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  }

  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduce ? { duration: 0.15 } : { duration: 0.35, delay: Math.min(i * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-6"
    >
      {/* Row 1: reference + status control */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-mono text-sm font-bold tracking-wider text-gold">{q.reference}</span>
          <Badge variant="outline" className={`rounded-full text-[11px] font-medium ${badge.className}`}>
            {badge.label}
          </Badge>
          {q.company ? (
            <Badge variant="secondary" className="flex items-center gap-1 rounded-full text-[11px]">
              <Building2 size={11} aria-hidden="true" />
              {q.company}
            </Badge>
          ) : null}
          {q.user ? (
            <Badge variant="outline" className="rounded-full text-[11px] font-normal text-muted-foreground">
              Account: {q.user.name}
            </Badge>
          ) : (
            <Badge variant="outline" className="rounded-full text-[11px] font-normal text-muted-foreground">
              Guest
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
            <Clock size={12} aria-hidden="true" />
            {new Date(q.createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <Select value={q.status} onValueChange={onUpdateStatus} disabled={isPatching}>
            <SelectTrigger
              aria-label={`Update status for ${q.reference}`}
              className="h-8 w-[130px] rounded-md text-xs"
              size="sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_STYLES[s].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2: requester + facts */}
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="text-sm font-semibold">{q.name}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <a
              href={`mailto:${q.email}`}
              className="flex items-center gap-1.5 font-medium text-gold transition-colors duration-200 hover:text-gold-light"
            >
              <Mail size={12} aria-hidden="true" /> {q.email}
            </a>
            {q.phone ? (
              <a
                href={`tel:${q.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-1.5 transition-colors duration-200 hover:text-gold"
              >
                <Phone size={12} aria-hidden="true" /> {q.phone}
              </a>
            ) : null}
          </div>
          <p className="mt-3 max-w-2xl whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
            {q.message}
          </p>
        </div>

        <dl className="flex flex-row flex-wrap gap-x-5 gap-y-2 text-xs md:flex-col md:gap-y-2.5 md:text-right">
          <div className="flex items-center gap-1.5 md:justify-end">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Tag size={11} aria-hidden="true" /> Type
            </dt>
            <dd className="font-medium">{TYPE_LABELS[q.projectType] ?? q.projectType}</dd>
          </div>
          <div className="flex items-center gap-1.5 md:justify-end">
            <dt className="text-muted-foreground">Budget</dt>
            <dd className="font-medium">{BUDGET_LABELS[q.budget] ?? q.budget}</dd>
          </div>
          <div className="flex items-center gap-1.5 md:justify-end">
            <dt className="text-muted-foreground">Timeline</dt>
            <dd className="font-medium">{TIMELINE_LABELS[q.timeline] ?? q.timeline}</dd>
          </div>
        </dl>
      </div>

      {/* Row 3: Admin estimate & internal notes */}
      <div className="mt-4 rounded-lg border border-border/70 bg-secondary/30 p-3.5 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <FileText size={13} className="text-gold" aria-hidden="true" />
            <span>Admin Quote & Notes</span>
          </div>
          {savedSuccess && (
            <span className="flex items-center gap-1 text-emerald-500 font-semibold">
              <CheckCircle2 size={12} /> Saved!
            </span>
          )}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[180px_1fr_auto]">
          <div>
            <label className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
              <DollarSign size={11} /> Quote Estimate
            </label>
            <Input
              value={estCost}
              onChange={(e) => setEstCost(e.target.value)}
              placeholder="e.g. $2,500"
              className="mt-1 h-8 text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
              <FileText size={11} /> Internal Review Notes
            </label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add client follow-up, deliverables notes..."
              className="mt-1 h-8 text-xs"
            />
          </div>
          <div className="flex items-end">
            <Button
              size="sm"
              onClick={handleSaveDetails}
              disabled={isPatching}
              className="h-8 gap-1.5 rounded-md bg-gold px-3 text-xs font-semibold text-black hover:bg-gold-light"
            >
              <Save size={12} /> Save
            </Button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
