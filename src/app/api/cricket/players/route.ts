import { NextRequest } from "next/server";
import {
  getCricketPlayersForTeam,
  listCricketPlayers,
  searchCricketPlayers,
} from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/players?search=<name>&team=<teamId>
 * search: CricAPI player search (global — any country).
 * team:   players of one national side, filtered by the player's country
 *         field (never another country's players).
 * Without either: first page of the player list.
 */
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const teamId = request.nextUrl.searchParams.get("team") ?? "";

  return cricketEnvelope(async () => {
    const players = teamId
      ? await getCricketPlayersForTeam(teamId)
      : search
        ? await searchCricketPlayers(search)
        : await listCricketPlayers();
    return players.slice(0, 60);
  });
}
