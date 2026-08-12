import { NextRequest } from "next/server";
import {
  listCricketPlayers,
  searchCricketPlayers,
} from "@/sports/cricket/services/cricketApi";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/players?search=<name>
 * With search: CricAPI player search. Without: first page of the player list.
 */
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";

  return cricketEnvelope(async () => {
    const players = search ? await searchCricketPlayers(search) : await listCricketPlayers();
    return players.slice(0, 60);
  });
}
