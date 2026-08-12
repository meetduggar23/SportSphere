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

/** Player search (CricAPI). */
export function useCricketPlayers(search: string) {
  const path = `/api/cricket/players${search ? `?search=${encodeURIComponent(search)}` : ""}`;
  return useCricketData<{ id: string; name: string; country?: string }[]>(path);
}

/** Players of one national side (filtered by country — never another team's). */
export function useCricketPlayersTeam(teamId: string | undefined) {
  const path = teamId ? `/api/cricket/players?team=${encodeURIComponent(teamId)}` : "";
  return useCricketData<{ id: string; name: string; country?: string }[]>(path);
}
