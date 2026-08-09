"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Match, Fixture, Standing, Sport } from "@/types";
import type { ProviderSnapshot } from "@/lib/providers/types";
import { getProvider } from "@/lib/providers/registry";

/**
 * All 13 supported sports — deliberately ordered as a neutral editorial list,
 * NOT football-first. The home feed is sport-agnostic: whatever is actually
 * live/upcoming/finished across these sports is what gets shown.
 */
export const homeSports: Sport[] = [
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

export type HomeFeedStatus = "loading" | "ready" | "unavailable";

export interface HomeFeed {
  /** Currently live events across all sports, sorted live → recently updated → priority */
  live: Match[];
  /** Next upcoming events across all sports */
  upcoming: Match[];
  /** Recently completed events across all sports */
  results: Match[];
  /** Standings for available competitions, grouped by sport via team.sport */
  standings: Standing[];
  status: HomeFeedStatus;
  /** Epoch ms of the last successful provider fetch */
  lastUpdated: number | null;
  error?: string;
  retry: () => void;
}

const initial: Omit<HomeFeed, "retry"> = {
  live: [],
  upcoming: [],
  results: [],
  standings: [],
  status: "loading",
  lastUpdated: null,
};

function fixtureToMatch(fx: Fixture): Match {
  return {
    id: fx.id,
    sport: fx.sport,
    league: fx.league,
    status: "upcoming",
    minute: fx.time,
    homeTeam: fx.homeTeam,
    awayTeam: fx.awayTeam ?? fx.homeTeam,
    homeScore: "-",
    awayScore: "-",
    date: fx.dateTime,
    competition: fx.league,
  };
}

interface SportSlice {
  sport: Sport;
  matches: ProviderSnapshot<Match[]>;
  fixtures: ProviderSnapshot<Fixture[]>;
  standings: ProviderSnapshot<Standing[]>;
}

function buildFeed(slices: SportSlice[]): Omit<HomeFeed, "retry"> {
  const live: Match[] = [];
  const results: Match[] = [];
  const upcoming: Match[] = [];
  const standings: Standing[] = [];
  const seenLive = new Set<string>();
  const seenResults = new Set<string>();
  const seenUpcoming = new Set<string>();
  const seenStandings = new Set<string>();
  const lastUpdatedBySport = new Map<Sport, number>();
  let anyReady = false;
  let maxUpdated = 0;

  for (const { sport, matches, fixtures, standings: stRows } of slices) {
    if (matches.status === "ready") {
      anyReady = true;
      maxUpdated = Math.max(maxUpdated, matches.lastUpdated ?? 0);
      lastUpdatedBySport.set(sport, Math.max(lastUpdatedBySport.get(sport) ?? 0, matches.lastUpdated ?? 0));
      for (const match of matches.data) {
        const key = `${sport}:${match.id}`;
        if (match.status === "live" && !seenLive.has(key)) {
          seenLive.add(key);
          live.push(match);
        } else if (match.status === "finished" && !seenResults.has(key)) {
          seenResults.add(key);
          results.push(match);
        } else if (match.status === "upcoming" && !seenUpcoming.has(key)) {
          seenUpcoming.add(key);
          upcoming.push(match);
        }
      }
    }
    if (fixtures.status === "ready") {
      anyReady = true;
      maxUpdated = Math.max(maxUpdated, fixtures.lastUpdated ?? 0);
      lastUpdatedBySport.set(sport, Math.max(lastUpdatedBySport.get(sport) ?? 0, fixtures.lastUpdated ?? 0));
      for (const fx of fixtures.data) {
        const key = `${sport}:${fx.id}`;
        if (seenUpcoming.has(key)) continue;
        seenUpcoming.add(key);
        upcoming.push(fixtureToMatch(fx));
      }
    }
    if (stRows.status === "ready") {
      anyReady = true;
      maxUpdated = Math.max(maxUpdated, stRows.lastUpdated ?? 0);
      lastUpdatedBySport.set(sport, Math.max(lastUpdatedBySport.get(sport) ?? 0, stRows.lastUpdated ?? 0));
      for (const row of stRows.data) {
        const key = `${sport}:${row.team.id}`;
        if (seenStandings.has(key)) continue;
        seenStandings.add(key);
        standings.push(row);
      }
    }
  }

  const priority = new Map<Sport, number>(homeSports.map((s, i) => [s, i]));

  // Sort live: most recently updated first, then editorial priority.
  // Only actually-live events reach this list — nothing is fabricated.
  live.sort((a, b) => {
    const ua = lastUpdatedBySport.get(a.sport) ?? 0;
    const ub = lastUpdatedBySport.get(b.sport) ?? 0;
    if (ub !== ua) return ub - ua;
    return (priority.get(a.sport) ?? 99) - (priority.get(b.sport) ?? 99);
  });

  // Results: most recent first (fall back to provider order for unparseable dates).
  results.sort((a, b) => {
    const ta = new Date(a.date ?? "").getTime();
    const tb = new Date(b.date ?? "").getTime();
    if (!isNaN(ta) && !isNaN(tb) && ta !== tb) return tb - ta;
    return (priority.get(a.sport) ?? 99) - (priority.get(b.sport) ?? 99);
  });

  // Upcoming: keep API chronological order per sport, interleave by priority.
  upcoming.sort((a, b) => {
    const ta = new Date(a.date ?? "").getTime();
    const tb = new Date(b.date ?? "").getTime();
    if (!isNaN(ta) && !isNaN(tb) && ta !== tb) return ta - tb;
    return (priority.get(a.sport) ?? 99) - (priority.get(b.sport) ?? 99);
  });

  return {
    live: live.slice(0, 12),
    upcoming: upcoming.slice(0, 12),
    results: results.slice(0, 8),
    standings: standings.slice(0, 14),
    status: anyReady ? "ready" : "unavailable",
    lastUpdated: maxUpdated || null,
  };
}

/**
 * Picks the single most relevant event right now, sport-agnostically:
 *   1. highest-priority currently-live event,
 *   2. otherwise the nearest upcoming event,
 *   3. otherwise the latest completed result.
 * The UI never knows which sport will win beforehand — whatever is actually
 * happening wins.
 */
export function getFeaturedLiveEvent(
  feed: Pick<HomeFeed, "live" | "upcoming" | "results">
): Match | undefined {
  if (feed.live.length > 0) return feed.live[0];
  if (feed.upcoming.length > 0) return feed.upcoming[0];
  return feed.results[0];
}

/**
 * Queries every configured sport provider and returns a unified, deduped,
 * sorted snapshot of what is actually happening right now across all sports.
 * Never falls back to fabricated data — unavailable providers contribute nothing.
 */
export async function getAllLiveEvents(): Promise<Omit<HomeFeed, "retry">> {
  const slices = await Promise.all(
    homeSports.map(async (sport): Promise<SportSlice> => {
      const provider = getProvider(sport);
      const [matches, fixtures, standings] = await Promise.all([
        provider.getMatches(),
        provider.getFixtures(),
        provider.getStandings(),
      ]);
      return { sport, matches, fixtures, standings };
    })
  );
  return buildFeed(slices);
}

/**
 * Like getAllLiveEvents but resilient: a failing sport contributes nothing
 * instead of taking the whole feed down. Use for surfaces where partial data
 * is better than a fully unavailable state.
 */
export async function getAllLiveEventsResilient(): Promise<Omit<HomeFeed, "retry">> {
  const results = await Promise.allSettled(
    homeSports.map(async (sport): Promise<SportSlice> => {
      const provider = getProvider(sport);
      const [matches, fixtures, standings] = await Promise.all([
        provider.getMatches(),
        provider.getFixtures(),
        provider.getStandings(),
      ]);
      return { sport, matches, fixtures, standings };
    })
  );
  const slices = results
    .filter((r): r is PromiseFulfilledResult<SportSlice> => r.status === "fulfilled")
    .map((r) => r.value);
  return buildFeed(slices);
}

/**
 * Home-page hook. Fetches once on mount (server routes cache upstream calls,
 * so repeated visits are cheap) and exposes a manual retry. No polling here —
 * the free-tier quota is protected by fetch-on-demand only.
 */
export function useHomeFeed(): HomeFeed {
  const [state, setState] = useState<Omit<HomeFeed, "retry">>(initial);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    // Resilient variant: one failed sport must not blank the whole home feed.
    const next = await getAllLiveEventsResilient();
    if (!mounted.current) return;
    setState(next);
  }, []);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: "loading" }));
    void load();
  }, [load]);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return { ...state, retry };
}
