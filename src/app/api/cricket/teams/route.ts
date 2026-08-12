import { getCricketTeams } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/teams
 * Every supported cricket country/team (identity only — names, codes, kinds).
 * Built from the factual seed merged with teams observed in provider match
 * data, so it covers any country the provider supports. Cache key for the
 * client: "cricket:teams".
 */
export async function GET() {
  return cricketEnvelope(async () => getCricketTeams());
}
