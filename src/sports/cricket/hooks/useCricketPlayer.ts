"use client";

import { useCricketData } from "@/sports/cricket/hooks/useCricketData";
import type { CricketPlayer } from "@/sports/cricket/types/cricketTypes";
import type { PlayerStatsResult } from "@/sports/cricket/services/cricketStats";

export interface CricketPlayerProfile {
  player: CricketPlayer;
  stats: PlayerStatsResult[];
}

/** Player profile + per-format career stats results. */
export function useCricketPlayer(id: string | undefined) {
  const path = id ? `/api/cricket/players/${encodeURIComponent(id)}` : "";
  const result = useCricketData<CricketPlayerProfile>(path);
  return {
    ...result,
    // Convenience: profile data only when ready.
    profile: result.status === "ready" ? result.data : null,
  };
}

/** Player search (CricketData.org) — response envelope from the players route. */
export function useCricketPlayers(search: string) {
  const path = `/api/cricket/players${search ? `?search=${encodeURIComponent(search)}` : "?offset=0"}`;
  return useCricketData<{
    players: { id: string; name: string; country?: string }[];
    total: number;
    offset: number;
    hasMore: boolean;
  }>(path);
}

/** Players of one national side (filtered by country — never another team's). */
export function useCricketPlayersTeam(teamId: string | undefined) {
  const path = teamId ? `/api/cricket/players?team=${encodeURIComponent(teamId)}` : "";
  return useCricketData<{
    players: { id: string; name: string; country?: string }[];
    total: number;
    offset: number;
    hasMore: boolean;
  }>(path);
}
