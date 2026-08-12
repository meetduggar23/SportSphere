import { NextRequest } from "next/server";
import { getCricketPlayersForTeam } from "@/sports/cricket/services/cricketApi";
import { getCricketPlayerProvider } from "@/sports/cricket/services/playerProvider";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/players?search=<name>&offset=<n>&team=<teamId>
 *
 * search: CricketData.org player search (global — every country).
 * offset: pagination into the search / directory results (verified API param).
 * team:   players of one national side, filtered by the player's country
 *         field (never another country's players).
 * Without search: first page of the global player directory.
 */
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const offsetParam = request.nextUrl.searchParams.get("offset");
  const offset = Math.max(0, Number.parseInt(offsetParam ?? "0", 10) || 0);
  const teamId = request.nextUrl.searchParams.get("team") ?? "";

  const provider = getCricketPlayerProvider();

  return cricketEnvelope(async () => {
    // Team roster path keeps its country-filtered behaviour (uses player info).
    if (teamId) {
      const refs: { id: string; name: string; country?: string }[] = await getCricketPlayersForTeam(teamId);
      return { players: refs, total: refs.length, offset: 0, hasMore: false };
    }

    const result = await provider.searchPlayers(search, offset);
    return {
      players: result.players,
      total: result.total,
      offset: result.offset,
      hasMore: result.hasMore,
    };
  });
}
