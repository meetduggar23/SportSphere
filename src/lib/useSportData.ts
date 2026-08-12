"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SportProvider, ProviderSnapshot } from "@/lib/providers/types";
import { Match, Fixture, Standing, Player, Sport } from "@/types";
import { getProvider } from "@/lib/providers/registry";

export type SportDataStatus = "loading" | "ready" | "unavailable";

export interface SportData {
  matches: Match[];
  fixtures: Fixture[];
  standings: Standing[];
  players: Player[];
  status: SportDataStatus;
  dataSource: string;
  /** Epoch ms of the last successful provider fetch */
  lastUpdated: number | null;
  error?: string;
}

const initial: SportData = {
  matches: [],
  fixtures: [],
  standings: [],
  players: [],
  status: "loading",
  dataSource: "",
  lastUpdated: null,
};

/**
 * Loads live data for a sport page through its provider.
 * NEVER falls back to mock data — providers return real data or an explicit
 * "unavailable" snapshot which the UI renders as an empty state.
 */
export function useSportData(sport: Sport) {
  const [state, setState] = useState<SportData>(initial);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const provider: SportProvider = getProvider(sport);

    // allSettled: one rejected provider call must never leave the sport page
    // stuck on "loading live data…" forever (a provider that throws escapes
    // the snapshot contract and would otherwise reject the Promise.all).
    const [m, f, st, p] = await Promise.allSettled([
      provider.getMatches(),
      provider.getFixtures(),
      provider.getStandings(),
      provider.getPlayers(),
    ]);
    if (!mounted.current) return;

    const value = (r: PromiseSettledResult<ProviderSnapshot<Match[] | Fixture[] | Standing[] | Player[]>>) =>
      r.status === "fulfilled" ? r.value : undefined;
    const mm = value(m);
    const ff = value(f);
    const ss = value(st);
    const pp = value(p);

    const ready = [mm, ff, ss, pp].some((x) => x?.status === "ready");
    setState({
      matches: mm?.status === "ready" ? (mm.data as Match[]) : [],
      fixtures: ff?.status === "ready" ? (ff.data as Fixture[]) : [],
      standings: ss?.status === "ready" ? (ss.data as Standing[]) : [],
      players: pp?.status === "ready" ? (pp.data as Player[]) : [],
      status: ready ? "ready" : "unavailable",
      dataSource:
        mm?.dataSource ||
        ff?.dataSource ||
        ss?.dataSource ||
        pp?.dataSource ||
        provider.dataSource,
      lastUpdated:
        Math.max(
          mm?.lastUpdated ?? 0,
          ff?.lastUpdated ?? 0,
          ss?.lastUpdated ?? 0,
          pp?.lastUpdated ?? 0
        ) || null,
      error: [mm?.error, ff?.error, ss?.error, pp?.error].find((e) => e),
    });
  }, [sport]);

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
