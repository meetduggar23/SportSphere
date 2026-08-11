import { NextResponse } from "next/server";
import { Sport } from "@/types";
import { getProvider } from "@/lib/providers/registry";

/** All supported sports, in canonical editorial order. */
const SPORTS: Sport[] = [
  "cricket",
  "football",
  "basketball",
  "baseball",
  "hockey",
  "volleyball",
  "rugby",
  "f1",
  "mma",
  "nfl",
  "nba",
  "handball",
  "afl",
];

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

/**
 * Aggregated live ticker feed: collects currently-live events from every
 * configured sport provider, normalized into a compact ticker shape.
 * A failing sport contributes nothing — it never takes the whole ticker down.
 */
export async function GET() {
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
        href: `/match/${match.id}`,
        homeShort: match.homeTeam.shortName,
        awayShort: match.awayTeam.shortName,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        minute: match.minute ?? match.period ?? "",
      });
    }
  }

  return NextResponse.json({ items, updatedAt: Date.now() });
}
