// GET /api/quotes/mine — the signed-in user's own quotation requests.

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fail, ok } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return fail({ code: "UNAUTHORIZED", message: "Sign in to view your requests" }, 401);
  }

  const quotes = await db.quoteRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      reference: true,
      projectType: true,
      company: true,
      budget: true,
      timeline: true,
      message: true,
      status: true,
      estimatedCost: true,
      createdAt: true,
    },
  });

  return ok({ quotes }, { source: "GET /api/quotes/mine" });
}
