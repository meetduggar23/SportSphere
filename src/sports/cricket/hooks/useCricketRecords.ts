"use client";

import { useCricketData } from "@/sports/cricket/hooks/useCricketData";
import type {
  CricketFormatId,
  CricketRecordCategory,
  CricketRecordsResult,
} from "@/sports/cricket/types/cricketTypes";

export interface RecordsQuery {
  format: CricketFormatId;
  category: CricketRecordCategory;
  recordType?: string;
  season?: string;
  team?: string;
  player?: string;
  search?: string;
  page: number;
  pageSize: number;
}

function buildQuery(q: RecordsQuery): string {
  const params = new URLSearchParams({
    format: q.format,
    category: q.category,
    page: String(q.page),
    pageSize: String(q.pageSize),
  });
  if (q.recordType) params.set("recordType", q.recordType);
  if (q.season) params.set("season", q.season);
  if (q.team) params.set("team", q.team);
  if (q.player) params.set("player", q.player);
  if (q.search) params.set("search", q.search);
  return `?${params.toString()}`;
}

/** Records explorer data for a format + category (Statsguru-style query). */
export function useCricketRecords(query: RecordsQuery) {
  const path = `/api/cricket/records${buildQuery(query)}`;
  return useCricketData<CricketRecordsResult>(path);
}
