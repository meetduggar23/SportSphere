import type { Player, Standing } from "@/types";
import type { SportProvider } from "@/lib/providers/types";
import { snapshot, validateMatches, validateFixtures, validateStandings } from "@/lib/providers/validate";
import type { CricketMatch } from "@/sports/cricket/types/cricketTypes";
import { toAppFixture, toAppMatch } from "@/sports/cricket/services/cricketApi";

/**
 * CRICKET PROVIDER — SportProvider integration backed by CricAPI.
 *
 * Like every other sport, the client never talks to CricAPI directly: it
 * fetches the app's own /api/cricket routes (which cache upstream calls and
 * hold the API key server-side), then normalizes to shared Match/Fixture/
 * Standing shapes. Missing key or upstream failure → "unavailable" snapshot.
 */

interface ApiEnvelope<T> {
  status: "ready" | "unavailable";
  data: T | null;
  error?: string;
}

async function fetchCricket<T>(path: string): Promise<ApiEnvelope<T>> {
  // Browsers use a relative URL; the server self-fetches against an absolute
  // base (mirrors lib/sport-api.ts).
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000"
      : "";
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error(`Cricket API error: ${res.status}`);
  return (await res.json()) as ApiEnvelope<T>;
}

export function createCricketProvider(): SportProvider {
  return {
    sport: "cricket",
    dataSource: "CricAPI",
    getMatches: () =>
      snapshot("CricAPI", async () => {
        const res = await fetchCricket<CricketMatch[]>("/api/cricket/matches?status=live,upcoming");
        if (res.status !== "ready" || !res.data) throw new Error(res.error ?? "No cricket matches");
        return validateMatches(res.data.map(toAppMatch));
      }),
    getFixtures: () =>
      snapshot("CricAPI", async () => {
        const res = await fetchCricket<CricketMatch[]>("/api/cricket/matches?status=upcoming");
        if (res.status !== "ready" || !res.data) throw new Error(res.error ?? "No cricket fixtures");
        return validateFixtures(res.data.map(toAppFixture));
      }),
    getStandings: () =>
      snapshot("CricAPI", async () => {
        const res = await fetchCricket<Standing[]>("/api/cricket/standings");
        if (res.status !== "ready" || !res.data) throw new Error(res.error ?? "No cricket standings");
        return validateStandings(res.data);
      }),
    getPlayers: () =>
      snapshot("CricAPI", async () => {
        const res = await fetchCricket<Player[]>("/api/cricket/players");
        if (res.status !== "ready" || !res.data) throw new Error(res.error ?? "No cricket players");
        return res.data;
      }),
  };
}
