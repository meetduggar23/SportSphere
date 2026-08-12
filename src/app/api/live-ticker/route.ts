import { NextResponse } from "next/server";
import { matchHref } from "@/lib/utils";
import { Sport } from "@/types";
import { getProvider } from "@/lib/providers/registry";
import { sportIds } from "@/sports/registry";

/** All supported sports, in canonical editorial order (from the registry). */
const SPORTS: Sport[] = sportIds();

/**
 * Always run at request time — never prerendered at build (which would fire
 * live API calls during `next build`). Upstream /api/sport routes dedupe the
 * actual provider calls via their own 120s data-cache revalidation.
 */
export const dynamic = "force-dynamic";

interface TickerItem {
  id: string;
  sport: Sport;
  href: string;
  homeShort: string;
  awayShort: string;
  homeScore: number | string;
  awayScore: number | string;
  minute: string;
}

interface TickerResponse {
  items: TickerItem[];
  updatedAt: number;
}

/**
 * Aggregated live ticker feed: collects currently-live events from every
 * configured sport provider, normalized into a compact ticker shape.
 * A failing sport contributes nothing — it never takes the whole ticker down.
 */
async function collect(): Promise<TickerResponse> {
  const settled = await Promise.allSettled(
    SPORTS.map(async (sport) => {
      const snap = await getProvider(sport).getMatches();
      return { sport, snap };
    })
  );

  const items: TickerItem[] = [];
  const seen = new Set<string>();

  for (const result of settled) {
    if (result.status !== "fulfilled") continue;
    const { sport, snap } = result.value;
    if (snap.status !== "ready") continue;
    for (const match of snap.data) {
      if (match.status !== "live") continue;
      // Match ids are only unique per sport (e.g. football #493475 and
      // hockey #493475 collide) — namespace the key with the sport so the
      // ticker never renders duplicate React keys.
      const key = `${sport}:${match.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        id: key,
        sport,
        href: matchHref(match),
        homeShort: match.homeTeam.shortName,
        awayShort: match.awayTeam.shortName,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        minute: match.minute ?? match.period ?? "",
      });
    }
  }

  return { items, updatedAt: Date.now() };
}

/* ---- In-memory TTL cache ------------------------------------------------ */

// The ticker is polled by every open tab, but live scores don't need a fresh
// provider fan-out more often than this. Polls within the window reuse the
// last aggregation — respecting free-tier provider quotas.
const CACHE_TTL_MS = 60_000;
let cached: { at: number; data: TickerResponse } | null = null;
// In-flight dedup: concurrent first requests share one collection instead of
// each running the 13-provider fan-out independently.
let pending: Promise<TickerResponse> | null = null;

export async function GET() {
  if (!cached || Date.now() - cached.at > CACHE_TTL_MS) {
    if (!pending) {
      pending = collect().finally(() => {
        pending = null;
      });
    }
    const data = await pending;
    cached = { at: Date.now(), data };
  }

  return NextResponse.json(cached.data, {
    headers: {
      // Browsers can reuse the last poll while the tab is open.
      "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
