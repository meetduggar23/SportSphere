"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SportProvider } from "@/lib/providers/types";
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

    const [m, f, st, p] = await Promise.all([
      provider.getMatches(),
      provider.getFixtures(),
      provider.getStandings(),
      provider.getPlayers(),
    ]);
    if (!mounted.current) return;

    const ready = [m, f, st, p].some((x) => x.status === "ready");
    setState({
      matches: m.status === "ready" ? m.data : [],
      fixtures: f.status === "ready" ? f.data : [],
      standings: st.status === "ready" ? st.data : [],
      players: p.status === "ready" ? p.data : [],
      status: ready ? "ready" : "unavailable",
      dataSource:
        m.dataSource ||
        f.dataSource ||
        st.dataSource ||
        p.dataSource ||
        provider.dataSource,
      lastUpdated:
        Math.max(
          m.lastUpdated ?? 0,
          f.lastUpdated ?? 0,
          st.lastUpdated ?? 0,
          p.lastUpdated ?? 0
        ) || null,
      error: [m.error, f.error, st.error, p.error].find((e) => e),
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
