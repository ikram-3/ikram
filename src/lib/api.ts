// REST JSON envelope helpers (BACKEND_CONTEXT §2/§7):
// success → { success: true, data, meta? } · failure → { success: false, error: { code, message, details? } }

import { NextResponse } from "next/server";

export interface ApiErrorShape {
  code: string;
  message: string;
  details?: unknown;
}

export function ok<T>(data: T, meta?: Record<string, unknown>, status = 200) {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) }, { status });
}

export function fail(error: ApiErrorShape, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

/** Flatten a ZodError into { field: message } for form rendering. */
export function zodDetails(err: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  const details: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!details[key]) details[key] = issue.message;
  }
  return details;
}
