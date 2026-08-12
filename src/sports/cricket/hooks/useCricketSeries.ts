"use client";

import { useCricketData } from "@/sports/cricket/hooks/useCricketData";
import type { Standing } from "@/types";
import type {
  CricketMatch,
  CricketPointsRow,
  CricketScorecard,
  CricketSeries,
} from "@/sports/cricket/types/cricketTypes";

export interface CricketSeriesDetail {
  series: CricketSeries;
  points: CricketPointsRow[];
  matches: CricketMatch[];
}

/** Series/tournament list. */
export function useCricketSeries(search = "") {
  const path = `/api/cricket/series${search ? `?search=${encodeURIComponent(search)}` : ""}`;
  return useCricketData<CricketSeries[]>(path);
}

/** Series detail: points table + matches. */
export function useCricketSeriesInfo(id: string | undefined) {
  const path = id ? `/api/cricket/series/${encodeURIComponent(id)}` : "";
  return useCricketData<CricketSeriesDetail>(path);
}

/** Match scorecard. */
export function useCricketScorecard(id: string | undefined) {
  const path = id ? `/api/cricket/scorecard/${encodeURIComponent(id)}` : "";
  return useCricketData<CricketScorecard>(path);
}

/** Points table as shared Standing[] rows (auto-selects current IPL). */
export function useCricketStandings(seriesId?: string) {
  const path = `/api/cricket/standings${seriesId ? `?series=${encodeURIComponent(seriesId)}` : ""}`;
  return useCricketData<Standing[]>(path);
}
