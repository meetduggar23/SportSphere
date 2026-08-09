import { Sport } from "@/types";
import { sportApiConfigs } from "@/config/sport-apis";
import { getSportMatches, getSportFixtures, getSportStandings } from "@/lib/sport-api";
import { SportProvider } from "./types";
import { snapshot, validateMatches, validateFixtures, validateStandings } from "./validate";

/**
 * Provider for the 10 API-SPORTS (api-sports.io) sport APIs.
 * Returns null when the sport has no API-SPORTS config.
 */
export function createApiSportsProvider(sport: Sport): SportProvider | null {
  const cfg = sportApiConfigs[sport];
  if (!cfg) return null;

  return {
    sport,
    dataSource: "API-SPORTS",
    getMatches: () =>
      snapshot("API-SPORTS", async () => validateMatches(await getSportMatches(sport))),
    getFixtures: () =>
      snapshot("API-SPORTS", async () => validateFixtures(await getSportFixtures(sport))),
    getStandings: () =>
      snapshot("API-SPORTS", async () => validateStandings(await getSportStandings(sport))),
    getPlayers: () =>
      Promise.resolve({
        status: "unavailable" as const,
        data: [],
        dataSource: "API-SPORTS",
        lastUpdated: null,
        error: "Player statistics are not mapped for this sport yet.",
      }),
  };
}
