import { Player, Sport } from "@/types";
import { SportProvider, ProviderSnapshot } from "./types";

/**
 * Placeholder provider for sports without a connected data source.
 * Always reports "unavailable" — the UI shows a clear empty state instead of
 * fabricated data.
 */
export function createUnavailableProvider(
  sport: Sport,
  reason = "No data provider configured for this sport yet."
): SportProvider {
  const unavailable = async (): Promise<ProviderSnapshot<[]>> => ({
    status: "unavailable",
    data: [],
    dataSource: "Not connected",
    lastUpdated: null,
    error: reason,
  });

  return {
    sport,
    dataSource: "Not connected",
    getMatches: unavailable,
    getFixtures: unavailable,
    getStandings: unavailable,
    getPlayers: unavailable as () => Promise<ProviderSnapshot<Player[]>>,
  };
}
