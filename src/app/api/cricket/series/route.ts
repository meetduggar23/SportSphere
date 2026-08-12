import { NextRequest } from "next/server";
import { getCricketSeries } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";
import { normalizeName } from "@/sports/cricket/utils/cricketFormat";

/**
 * GET /api/cricket/series?search=<substring>&team=<teamName>
 * search: substring filter on series name.
 * team:   series whose name mentions the team/country (e.g. "India tour of…").
 */
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const team = request.nextUrl.searchParams.get("team") ?? "";

  return cricketEnvelope(async () => {
    const list = await getCricketSeries();
    return list
      .filter((s) => !search || normalizeName(s.name).includes(normalizeName(search)))
      .filter((s) => !team || normalizeName(s.name).includes(normalizeName(team)))
      .slice(0, 60);
  });
}
