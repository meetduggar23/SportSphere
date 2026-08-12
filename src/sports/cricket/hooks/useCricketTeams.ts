"use client";

import { useCricketData } from "@/sports/cricket/hooks/useCricketData";
import type { CricketTeam } from "@/sports/cricket/types/cricketTypes";

/** All supported cricket countries/teams (identity only). */
export function useCricketTeams() {
  return useCricketData<CricketTeam[]>("/api/cricket/teams");
}

/** One country/team resolved by stable slug id. */
export function useCricketTeam(teamId: string | undefined) {
  const path = teamId ? `/api/cricket/teams/${encodeURIComponent(teamId)}` : "";
  const result = useCricketData<{ team: CricketTeam }>(path);
  return {
    ...result,
    team: result.status === "ready" ? result.data?.team : undefined,
  };
}
