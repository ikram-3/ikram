// PATCH /api/quotes/[id] — admin-only status, notes, & quote estimation update (RBAC).

import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fail, ok, zodDetails } from "@/lib/api";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  status: z.enum(["new", "reviewing", "quoted", "closed"], { message: "Invalid status" }).optional(),
  adminNotes: z.string().max(2000, "Notes too long").optional().nullable(),
  estimatedCost: z.string().max(60, "Estimated cost too long").optional().nullable(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return fail({ code: "FORBIDDEN", message: "Admin access required" }, 403);
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ code: "INVALID_JSON", message: "Request body must be valid JSON" }, 400);
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return fail(
      { code: "VALIDATION_ERROR", message: "Please fix the highlighted fields", details: zodDetails(parsed.error) },
      422
    );
  }

  const existing = await db.quoteRequest.findUnique({ where: { id } });
  if (!existing) {
    return fail({ code: "NOT_FOUND", message: "Quotation request not found" }, 404);
  }

  const dataToUpdate: Record<string, unknown> = {};
  if (parsed.data.status !== undefined) dataToUpdate.status = parsed.data.status;
  if (parsed.data.adminNotes !== undefined) dataToUpdate.adminNotes = parsed.data.adminNotes;
  if (parsed.data.estimatedCost !== undefined) dataToUpdate.estimatedCost = parsed.data.estimatedCost;

  const quote = await db.quoteRequest.update({
    where: { id },
    data: dataToUpdate,
    select: {
      id: true,
      reference: true,
      status: true,
      adminNotes: true,
      estimatedCost: true,
      updatedAt: true,
    },
  });

  return ok({ quote }, { source: `PATCH /api/quotes/${id}` });
}
