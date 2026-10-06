// POST /api/contact — Send contact inquiry and auto-reply confirmation email.
// Envelope: { success, data | error }. Zod validation at the boundary.

import { z } from "zod";
import { fail, ok, zodDetails } from "@/lib/api";
import { sendContactEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Please provide a valid email address"),
  subject: z.string().trim().max(120, "Subject is too long").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000, "Message is too long"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ code: "INVALID_JSON", message: "Request body must be valid JSON" }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return fail(
      {
        code: "VALIDATION_ERROR",
        message: "Please check your input fields",
        details: zodDetails(parsed.error),
      },
      422
    );
  }

  try {
    const result = await sendContactEmail(parsed.data);
    return ok(
      {
        message: "Your message has been sent successfully. A confirmation email has been sent to your inbox.",
        delivered: result,
      },
      { source: "POST /api/contact" },
      200
    );
  } catch (error: unknown) {
    console.error("Error in POST /api/contact:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to send email";
    return fail(
      {
        code: "SMTP_ERROR",
        message: `Failed to deliver email: ${errMessage}. Please try emailing directly or via WhatsApp/Phone.`,
      },
      500
    );
  }
}
