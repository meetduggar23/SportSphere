"use client";

import { useCricketData } from "@/sports/cricket/hooks/useCricketData";
import type { CricketMatch } from "@/sports/cricket/types/cricketTypes";

export interface CricketMatchFilters {
  status?: string[];
  series?: string;
  team?: string;
  limit?: number;
}

function buildQuery(filters: CricketMatchFilters): string {
  const params = new URLSearchParams();
  if (filters.status?.length) params.set("status", filters.status.join(","));
  if (filters.series) params.set("series", filters.series);
  if (filters.team) params.set("team", filters.team);
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/** Live/upcoming/recent cricket matches from the app API (cached). */
export function useCricketMatches(filters: CricketMatchFilters = {}) {
  const path = `/api/cricket/matches${buildQuery(filters)}`;
  const result = useCricketData<CricketMatch[]>(path);
  return { ...result, matches: result.data ?? [] };
}
