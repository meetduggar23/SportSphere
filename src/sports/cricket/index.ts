import { getSport } from "@/sports/registry";
import type { SportDefinition } from "@/sports/registry";
import { iplTeams } from "@/data/mock";

/**
 * CRICKET MODULE
 * Sport-specific identity, configuration and extras. Everything generic lives
 * in the shared layer (@/sports/shared); this barrel is the composition root.
 *
 * Routes under /sports/cricket/* are backed by the CricAPI provider
 * (src/sports/cricket/services) — permitted, official, never scraped.
 */
export const definition: SportDefinition = getSport("cricket");

export { iplTeams };

/* ---- Components ---- */
export { CricketExtra } from "./components/CricketExtra";
export { CricketRecords } from "./components/CricketRecords";
export { CricketScorecard } from "./components/CricketScorecard";
export { PlayerStats } from "./components/PlayerStats";
export { CricketMatchRow } from "./components/CricketMatchRow";
export { CricketMatchList } from "./components/CricketMatchList";
export { CricketFilterBar } from "./components/CricketFilterBar";
export { CricketRecordTable } from "./components/CricketRecordTable";
export { BattingTable } from "./components/BattingTable";
export { BowlingTable } from "./components/BowlingTable";
export { RecordsUnavailable } from "./components/RecordsUnavailable";
export { InningsSummary } from "./components/InningsSummary";

/* ---- Config (data-driven records system) ---- */
export {
  CRICKET_API,
  CRICKET_FORMATS,
  RECORD_CATEGORIES,
  RECORD_DEFINITIONS,
  cricketFormat,
  cricketFormats,
  recordCategory,
  recordsFor,
  IPL_TEAMS,
  IPL_TEAM_NAMES,
  IPL_SEASONS,
  KNOWN_TEAMS,
} from "./config/cricketConfig";

/* ---- Services ---- */
export {
  isCricketConfigured,
  getCricketCurrentMatches,
  getCricketMatches,
  getCricketSeries,
  getCricketSeriesInfo,
  searchCricketPlayers,
  listCricketPlayers,
  getCricketPlayer,
  getCricketScorecard,
  getCricketSquads,
  getCricketTeams,
  getCricketTeam,
  getCricketPlayersForTeam,
  toAppMatch,
  toAppFixture,
  toAppStanding,
} from "./services/cricketApi";
export { queryRecords, getRecordCatalog, findRecordDefinition } from "./services/cricketRecords";
export { getPlayerCareerStats } from "./services/cricketStats";

/* ---- Types ---- */
export type {
  CricketFormatDef,
  CricketFormatId,
  CricketRecordCategory,
  CricketRecordCategoryDef,
  RecordColumn,
  RecordDefinition,
  CricketPlayer,
  CricketPlayerRef,
  CricketTeam,
  CricketTeamType,
  CricketTeamRef,
  CricketCareerStats,
  CricketRecord,
  CricketInnings,
  CricketMatch,
  CricketSeries,
  CricketPointsRow,
  BattingLine,
  BowlingLine,
  CricketScorecardInnings,
  CricketRecordQuery,
  CricketRecordsResult,
} from "./types/cricketTypes";
export { CricketCountrySelector } from "./components/CricketCountrySelector";
