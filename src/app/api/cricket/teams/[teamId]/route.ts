import { CricketApiError, getCricketTeam } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/teams/:teamId
 * Resolve a single country/team identity (e.g. /api/cricket/teams/india).
 * Unknown ids return an unavailable envelope — never a fallback country.
 * Cache key for the client: "cricket:team:{teamId}".
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  return cricketEnvelope(async () => {
    const team = await getCricketTeam(teamId);
    if (!team) throw new CricketApiError("Team not found", 404);
    return { team };
  });
}
