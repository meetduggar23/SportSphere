import {
  getCricketDataPlayer,
  searchCricketDataPlayers,
  type PlayerSearchResult,
} from "@/sports/cricket/services/cricketDataApi";
import { CRICKET_API } from "@/sports/cricket/config/cricketConfig";
import type { CricketCareerStats, CricketPlayer, CricketPlayerRef } from "@/sports/cricket/types/cricketTypes";

/**
 * PLAYER PROVIDER ABSTRACTION
 *
 * The UI talks only to `CricketPlayerProvider`. The provider of record today
 * is CricketData.org (CricAPI) via `CricketDataProvider`; a future provider
 * implements the same interface and can be swapped in without touching any
 * component. No other cricket provider is mixed into player responses.
 */
export interface CricketPlayerProvider {
  readonly name: string;
  readonly sourceName: string;
  readonly sourceUrl: string;
  /** True when the provider is configured and ready (server-side). */
  isConfigured(): boolean;
  /** Search players globally (all countries). Empty query = directory page. */
  searchPlayers(query: string, offset: number): Promise<PlayerSearchResult>;
  /** Full player profile with real career stats where the provider has them. */
  getPlayer(playerId: string): Promise<{ player: CricketPlayer; stats: CricketCareerStats[] }>;
}

/** CricketData.org (api.cricapi.com) player provider — the configured source. */
export class CricketDataProvider implements CricketPlayerProvider {
  readonly name = "cricketdata";
  readonly sourceName = CRICKET_API.sourceName;
  readonly sourceUrl = CRICKET_API.sourceUrl;

  isConfigured(): boolean {
    // The raw client throws a descriptive error when the key is missing; the
    // routes surface that as a clear configuration message for development.
    return Boolean(process.env.CRICKETDATA_API_KEY || process.env.CRICAPI_API_KEY);
  }

  searchPlayers(query: string, offset: number): Promise<PlayerSearchResult> {
    return searchCricketDataPlayers(query, offset);
  }

  getPlayer(playerId: string): Promise<{ player: CricketPlayer; stats: CricketCareerStats[] }> {
    return getCricketDataPlayer(playerId);
  }
}

/** Convenience: players search results are CricketPlayerRef shaped. */
export type { CricketPlayerRef };
export type { PlayerSearchResult };

/** The active player provider (single source of truth for player data). */
export function getCricketPlayerProvider(): CricketPlayerProvider {
  return new CricketDataProvider();
}
