import { getCricketSeriesInfo } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/series/<id>
 * Returns { series, points, matches } — points is the real points table.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return cricketEnvelope(async () => getCricketSeriesInfo(id));
}
