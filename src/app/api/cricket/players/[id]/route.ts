import { getCricketPlayer } from "@/sports/cricket/services/cricketApi";
import { getPlayerCareerStats } from "@/sports/cricket/services/cricketStats";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";
import type { CricketFormatId } from "@/sports/cricket/types/cricketTypes";

/**
 * GET /api/cricket/players/<id>
 * Returns { player, stats } where stats maps every supported format to a
 * career-stats result (unavailable when the provider can't supply aggregates).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return cricketEnvelope(async () => {
    const player = await getCricketPlayer(id);
    const formats: CricketFormatId[] = ["test", "odi", "t20i", "ipl"];
    const stats = await Promise.all(
      formats.map(async (format) => await getPlayerCareerStats(id, format))
    );
    return { player, stats };
  });
}
