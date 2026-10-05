// Quotation requests.
// POST /api/quotes — public submit (guest or logged-in; logged-in gets userId linked).
// GET  /api/quotes — admin only (RBAC): list newest first.

import { z } from "zod";
import { randomBytes } from "node:crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fail, ok, zodDetails } from "@/lib/api";

export const dynamic = "force-dynamic";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .union([z.string().trim().regex(/^[+\d][\d\s\-()]{6,20}$/, "Enter a valid phone number"), z.literal("")])
    .optional(),
  company: z.string().trim().max(120, "Company name is too long").optional(),
  projectType: z.enum(["website", "webapp", "ai-agent", "automation", "mobile", "other"], {
    message: "Pick a project type",
  }),
  budget: z.enum(["under-1k", "1k-3k", "3k-10k", "10k-plus", "flexible"], {
    message: "Pick a budget range",
  }),
  timeline: z.enum(["asap", "1-month", "1-3-months", "flexible"], {
    message: "Pick a timeline",
  }),
  message: z
    .string()
    .trim()
    .min(30, "Tell me a bit more — at least 30 characters")
    .max(4000, "Message is too long (max 4000 characters)"),
});

function makeReference() {
  return `Q-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ code: "INVALID_JSON", message: "Request body must be valid JSON" }, 400);
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return fail(
      { code: "VALIDATION_ERROR", message: "Please fix the highlighted fields", details: zodDetails(parsed.error) },
      422
    );
  }

  const session = await getServerSession(authOptions);
  const { phone, company, ...rest } = parsed.data;

  const quote = await db.quoteRequest.create({
    data: {
      ...rest,
      phone: phone ? phone : null,
      company: company ? company : null,
      userId: session?.user?.id || null,
      reference: makeReference(),
    },
    select: { id: true, reference: true, status: true, createdAt: true },
  });

  return ok({ quote }, { source: "POST /api/quotes" }, 201);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return fail({ code: "FORBIDDEN", message: "Admin access required" }, 403);
  }

  const quotes = await db.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  const [newCount, reviewingCount, quotedCount, closedCount] = await Promise.all([
    db.quoteRequest.count({ where: { status: "new" } }),
    db.quoteRequest.count({ where: { status: "reviewing" } }),
    db.quoteRequest.count({ where: { status: "quoted" } }),
    db.quoteRequest.count({ where: { status: "closed" } }),
  ]);

  return ok(
    { quotes, counts: { new: newCount, reviewing: reviewingCount, quoted: quotedCount, closed: closedCount } },
    { source: "GET /api/quotes" }
  );
}
