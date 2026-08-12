import { NextResponse } from "next/server";

/**
 * Shared JSON envelope for /api/cricket/* routes (server-only).
 * Cache headers apply to successful payloads only — errors stay uncached so
 * retries actually hit the network again.
 */
const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
} as const;

export function cricketJson(body: unknown, init?: number | ResponseInit) {
  const status = typeof init === "number" ? init : init?.status;
  const headers = status === undefined || status < 400 ? CACHE_HEADERS : undefined;
  if (typeof init === "number") {
    return NextResponse.json(body, { status: init, headers });
  }
  return NextResponse.json(body, { ...init, headers });
}

/**
 * Wrap a data accessor into the standard { status, data, source, provider,
 * lastUpdated, error } envelope. Failures become status "unavailable" with a
 * readable error — never fabricated data.
 */
export async function cricketEnvelope<T>(
  fn: () => Promise<T>,
  fallback?: { source?: string; provider?: string }
) {
  try {
    const data = await fn();
    return cricketJson({
      status: "ready",
      data,
      source: fallback?.source ?? "CricAPI",
      sourceUrl: "https://www.cricapi.com",
      provider: fallback?.provider ?? "CricAPI",
      lastUpdated: new Date().toISOString(),
      error: undefined,
    });
  } catch (e) {
    return cricketJson(
      {
        status: "unavailable",
        data: null,
        source: fallback?.source ?? "CricAPI",
        sourceUrl: "https://www.cricapi.com",
        provider: fallback?.provider ?? "CricAPI",
        lastUpdated: null,
        error: e instanceof Error ? e.message : "Unknown cricket data error",
      },
      200
    );
  }
}
