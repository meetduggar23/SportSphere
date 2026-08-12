import { NextRequest } from "next/server";
import { CRICKET_FORMATS, RECORD_CATEGORIES } from "@/sports/cricket/config/cricketConfig";
import { queryRecords } from "@/sports/cricket/services/cricketRecords";
import { cricketJson } from "@/sports/cricket/services/serverResponse";
import type {
  CricketFormatId,
  CricketRecordCategory,
} from "@/sports/cricket/types/cricketTypes";

/**
 * GET /api/cricket/records
 * Query params: format, category, recordType, season, team, player, search,
 * page, pageSize. Returns a CricketRecordsResult — records (when a provider
 * supplies them) plus the data-driven catalog and source metadata.
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const format = sp.get("format") as CricketFormatId | null;
  const category = sp.get("category") as CricketRecordCategory | null;
  if (!format || !CRICKET_FORMATS.some((f) => f.id === format)) {
    return cricketJson({ error: `Unknown format: ${format}` }, 400);
  }
  if (!category || !RECORD_CATEGORIES.some((c) => c.id === category)) {
    return cricketJson({ error: `Unknown category: ${category}` }, 400);
  }

  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(sp.get("pageSize") ?? 10)));

  const result = await queryRecords({
    format,
    category,
    recordType: sp.get("recordType") ?? undefined,
    season: sp.get("season") ?? undefined,
    team: sp.get("team") ?? undefined,
    player: sp.get("player") ?? undefined,
    search: sp.get("search") ?? undefined,
    page,
    pageSize,
  });

  return cricketJson(result);
}
