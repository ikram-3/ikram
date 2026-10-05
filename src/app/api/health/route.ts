import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbStatus = "unknown";
  let dbLatencyMs = 0;

  try {
    const start = Date.now();
    await db.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - start;
    dbStatus = "connected";
  } catch (err: unknown) {
    dbStatus = "error: " + (err instanceof Error ? err.message : String(err));
  }

  return NextResponse.json({
    ok: dbStatus === "connected",
    data: {
      service: "ikram-portfolio",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      database: {
        provider: "postgresql",
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
    },
    meta: {
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
}
