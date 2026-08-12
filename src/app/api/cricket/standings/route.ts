import { NextRequest } from "next/server";
import {
  getCricketSeries,
  getCricketSeriesInfo,
  toAppStanding,
} from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/standings?series=<id>
 * Without ?series, auto-selects the current IPL series (the default league
 * table). Returns shared Standing[] rows built from real points tables.
 */
export async function GET(request: NextRequest) {
  const seriesId = request.nextUrl.searchParams.get("series") ?? "";

  return cricketEnvelope(async () => {
    let id = seriesId;
    if (!id) {
      const list = await getCricketSeries();
      const currentYear = String(new Date().getFullYear());
      const ipl =
        list.find((s) => s.current && s.format === "ipl") ??
        list.find((s) => s.format === "ipl" && s.name.includes(currentYear)) ??
        list.find((s) => s.format === "ipl");
      id = ipl?.id ?? "";
      if (!id) {
        throw new Error("No IPL series found. Pass ?series=<series id> to view standings.");
      }
    }

    const { points } = await getCricketSeriesInfo(id);
    if (points.length === 0) {
      throw new Error("Points table not available for this series.");
    }
    return points.map((row, i) => toAppStanding(row, i + 1));
  });
}
