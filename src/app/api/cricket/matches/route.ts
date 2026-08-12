import { NextRequest } from "next/server";
import { getCricketCurrentMatches } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";
import { normalizeName } from "@/sports/cricket/utils/cricketFormat";

/**
 * GET /api/cricket/matches
 * Query params:
 *   status  — comma-separated ("live,upcoming") filter on match status
 *   series  — substring filter on series name
 *   team    — substring filter on team names
 *   limit   — max matches returned (default 50)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const statusFilter = (searchParams.get("status") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const series = searchParams.get("series") ?? "";
  const team = searchParams.get("team") ?? "";
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 50));

  return cricketEnvelope(async () => {
    const all = await getCricketCurrentMatches();
    return all
      .filter((m) => statusFilter.length === 0 || statusFilter.includes(m.status))
      .filter((m) => !series || normalizeName(m.series).includes(normalizeName(series)))
      .filter(
        (m) => !team || m.teams.some((t) => normalizeName(t).includes(normalizeName(team)))
      )
      .slice(0, limit);
  });
}
