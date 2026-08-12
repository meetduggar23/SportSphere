import { NextRequest } from "next/server";
import { getCricketSeries } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";
import { normalizeName } from "@/sports/cricket/utils/cricketFormat";

/** GET /api/cricket/series?search=<substring> — series/tournament list. */
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";

  return cricketEnvelope(async () => {
    const list = await getCricketSeries();
    return list
      .filter((s) => !search || normalizeName(s.name).includes(normalizeName(search)))
      .slice(0, 60);
  });
}
