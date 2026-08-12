import { CRICKET_API } from "@/sports/cricket/config/cricketConfig";
import type {
  BattingLine,
  BowlingLine,
  CricketCareerStats,
  CricketFormatId,
  CricketScorecard,
} from "@/sports/cricket/types/cricketTypes";
import { normalizeName } from "@/sports/cricket/utils/cricketFormat";

/**
 * PLAYER CAREER STATISTICS ENGINE
 *
 * Career aggregates (batting average, hundreds, wickets…) are only ever
 * produced by a stats-capable provider. CricAPI supplies live match data and
 * player identities but not career aggregates, so the provider list is empty
 * today and every format returns an honest "unavailable" result.
 */

export interface PlayerStatsResult {
  status: "ready" | "unavailable";
  stats: CricketCareerStats | null;
  format: CricketFormatId;
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string | null;
  error?: string;
}

export interface CareerStatsProvider {
  readonly name: string;
  supports(playerId: string, format: CricketFormatId): boolean;
  getStats(playerId: string, format: CricketFormatId): Promise<CricketCareerStats>;
}

/** Register a career-stats provider here to populate player profiles. */
const statsProviders: CareerStatsProvider[] = [];

export function getPlayerCareerStats(
  playerId: string,
  format: CricketFormatId
): Promise<PlayerStatsResult> {
  return (async () => {
    for (const provider of statsProviders) {
      if (!provider.supports(playerId, format)) continue;
      try {
        const stats = await provider.getStats(playerId, format);
        return {
          status: "ready",
          stats,
          format,
          source: provider.name,
          provider: provider.name,
          lastUpdated: new Date().toISOString(),
        };
      } catch (e) {
        console.warn("[cricket] stats provider failed", e);
      }
    }
    return {
      status: "unavailable",
      stats: null,
      format,
      source: CRICKET_API.sourceName,
      sourceUrl: CRICKET_API.sourceUrl,
      provider: CRICKET_API.provider,
      lastUpdated: null,
      error: `Career ${format.toUpperCase()} statistics are not available from the connected provider (${CRICKET_API.sourceName}).`,
    };
  })();
}

/* ---- Match-level derivation (real data, computed from provider payloads) ---- */

/** Batting lines for a player from a provider scorecard (name match). */
export function battingFromScorecard(
  scorecard: CricketScorecard,
  playerName: string
): { innings: number; lines: BattingLine[] }[] {
  const name = normalizeName(playerName);
  return scorecard.innings
    .filter((inn) => inn.batting.some((b) => normalizeName(b.name) === name))
    .map((inn) => ({
      innings: inn.innings,
      lines: inn.batting.filter((b) => normalizeName(b.name) === name),
    }));
}

/** Bowling lines for a player from a provider scorecard (name match). */
export function bowlingFromScorecard(
  scorecard: CricketScorecard,
  playerName: string
): { innings: number; lines: BowlingLine[] }[] {
  const name = normalizeName(playerName);
  return scorecard.innings
    .filter((inn) => inn.bowling.some((b) => normalizeName(b.name) === name))
    .map((inn) => ({
      innings: inn.innings,
      lines: inn.bowling.filter((b) => normalizeName(b.name) === name),
    }));
}
