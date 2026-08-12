import { getCricketScorecard } from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/** GET /api/cricket/scorecard/<matchId> — full innings/batting/bowling. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return cricketEnvelope(async () => getCricketScorecard(id));
}
