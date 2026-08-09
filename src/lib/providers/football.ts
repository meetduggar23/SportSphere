import { SportProvider } from "./types";
import { getLiveMatches, getFixtures, getStandings, getTopScorers } from "@/lib/api";
import { snapshot, validateMatches, validateFixtures, validateStandings } from "./validate";

/**
 * Provider for football, backed by API-Football (v3.football.api-sports.io).
 * Defaults to Premier League (league 39) / current season 2025.
 */
export function createFootballProvider(): SportProvider {
  return {
    sport: "football",
    dataSource: "API-Football",
    getMatches: () =>
      snapshot("API-Football", async () => validateMatches(await getLiveMatches())),
    getFixtures: () =>
      snapshot("API-Football", async () =>
        validateFixtures(await getFixtures("39", "2024", "15"))
      ),
    getStandings: () =>
      snapshot("API-Football", async () =>
        validateStandings(await getStandings("39", "2024"))
      ),
    getPlayers: () =>
      snapshot("API-Football", async () => await getTopScorers("39", "2024")),
  };
}
