// POST /api/register — create an account (credentials).
// Envelope: { success, data | error }. Zod at the boundary.

import { z } from "zod";
import { db } from "@/lib/db";
import { fail, ok, zodDetails } from "@/lib/api";
import { hashPassword } from "@/lib/password";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long")
    .regex(/[A-Za-z]/, "Password needs at least one letter")
    .regex(/[0-9]/, "Password needs at least one number"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ code: "INVALID_JSON", message: "Request body must be valid JSON" }, 400);
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return fail(
      { code: "VALIDATION_ERROR", message: "Please fix the highlighted fields", details: zodDetails(parsed.error) },
      422
    );
  }

  const { name, email, password } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return fail(
      { code: "EMAIL_TAKEN", message: "An account with this email already exists — sign in instead" },
      409
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return ok({ user }, { source: "POST /api/register" }, 201);
}
