/**
 * CRICKET MODULE — NORMALIZED DATA MODEL
 *
 * All cricket data flowing through SportsSphere is normalized into these
 * shapes. Providers (CricAPI today, others later) are responsible for mapping
 * their raw payloads onto these types — components never touch provider JSON.
 *
 * ACCURACY RULE: a field is only populated when the connected provider
 * actually returned a value for it. Everything else stays absent/empty and the
 * UI renders the "Statistics currently unavailable" state — never fabricated
 * numbers.
 */

export type CricketFormatId = "test" | "odi" | "t20i" | "t20" | "ipl";

export type CricketRecordCategory =
  | "batting"
  | "bowling"
  | "fielding"
  | "allround"
  | "team"
  | "captaincy"
  | "partnership";

export interface CricketFormatDef {
  id: CricketFormatId;
  /** Full label shown in tabs ("Test", "ODI", "T20I", "T20", "IPL"). */
  label: string;
  /** Short label for chips/rows. */
  shortLabel: string;
  /** True for ICC international formats (Test/ODI/T20I). */
  isInternational: boolean;
  /** True for the IPL franchise league (never grouped with internationals). */
  isIpl: boolean;
  /** One-line description used in page headers. */
  description: string;
}

export interface CricketRecordCategoryDef {
  id: CricketRecordCategory;
  label: string;
  description: string;
}

/** Dynamic table column — record tables render exactly these columns. */
export interface RecordColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Optional display suffix, e.g. "runs", "wickets". */
  suffix?: string;
  /** Number formatter: "integer" | "decimal" | "none" (default integer). */
  format?: "integer" | "decimal" | "none";
}

/**
 * One supported record type (e.g. "most-runs"). The catalog is fully
 * data-driven: adding a record here makes it appear in the Records UI with no
 * component changes. `sortKey` names the CareerStats field the record ranks
 * on; `unit` describes the value ("runs", "wickets").
 */
export interface RecordDefinition {
  key: string;
  label: string;
  category: CricketRecordCategory;
  /** Formats this record exists for. */
  formats: CricketFormatId[];
  /** CareerStats field used to rank records. */
  sortKey: keyof CricketCareerStats;
  /** Human unit for the ranked value. */
  unit: string;
  /** Dynamic columns shown in the results table. */
  columns: RecordColumn[];
  /** True when the largest value is the record (runs, wickets…). */
  isDescending: boolean;
  description: string;
}

export interface CricketPlayerRef {
  id: string;
  name: string;
  country?: string;
}

export interface CricketTeamRef {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
}

/** Player profile — biographical identity only (never stats). */
export interface CricketPlayer {
  id: string;
  name: string;
  fullName?: string;
  country: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  photo?: string;
  teams?: string[];
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string;
}

/**
 * Career statistics for one player in one format. Every value is nullable —
 * a value is only present when the connected provider supplied it.
 */
export interface CricketCareerStats {
  playerId: string;
  format: CricketFormatId;

  // ---- General ----
  matches?: number;
  innings?: number;
  /** Career span, e.g. "2010–2024". */
  careerSpan?: string;

  // ---- Batting ----
  runs?: number;
  ballsFaced?: number;
  notOuts?: number;
  highestScore?: number;
  highestScoreNotOut?: boolean;
  battingAverage?: number;
  strikeRate?: number;
  hundreds?: number;
  fifties?: number;
  doubleHundreds?: number;
  tripleHundreds?: number;
  ducks?: number;
  fours?: number;
  sixes?: number;

  // ---- Bowling ----
  ballsBowled?: number;
  maidens?: number;
  runsConceded?: number;
  wickets?: number;
  bowlingAverage?: number;
  economy?: number;
  bowlingStrikeRate?: number;
  bestBowlingInnings?: string;
  bestBowlingMatch?: string;
  fourWicketHauls?: number;
  fiveWicketHauls?: number;
  tenWicketHauls?: number;

  // ---- Fielding ----
  catches?: number;
  stumpings?: number;
  runOuts?: number;
  dismissals?: number;

  // ---- Captaincy ----
  matchesAsCaptain?: number;
  captainWins?: number;
  captainLosses?: number;
  captainDraws?: number;
  captainTies?: number;
  captainNoResults?: number;

  // ---- Provenance ----
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string;
}

/**
 * A single all-time / career record entry (e.g. "Sachin Tendulkar — 15,921
 * Test runs"). Only produced by a records-capable provider; never synthesized.
 */
export interface CricketRecord {
  id: string;
  format: CricketFormatId;
  category: CricketRecordCategory;
  recordType: string;
  player?: CricketPlayerRef;
  team?: CricketTeamRef;
  value: number | string;
  unit?: string;
  match?: string;
  competition?: string;
  date?: string;
  detail?: string;
  /** The holder's full stat line — powers dynamic record tables. */
  stats?: Partial<CricketCareerStats>;
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string;
}

/** One innings score line, e.g. "India — 287/6 (52.0 ov)". */
export interface CricketInnings {
  inning: string;
  team: string;
  runs: number;
  wickets: number;
  overs: number;
}

/** Normalized cricket match (live/upcoming/recent), provider-agnostic. */
export interface CricketMatch {
  id: string;
  format: CricketFormatId;
  series: string;
  seriesId?: string;
  name: string;
  status: "live" | "upcoming" | "finished";
  /** Provider result/status text verbatim, e.g. "India won by 5 wickets". */
  statusText: string;
  teams: string[];
  score: CricketInnings[];
  venue: string;
  date: string;
  dateTimeGMT?: string;
  matchStarted: boolean;
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string;
}

/** Cricket series / tournament (e.g. "Indian Premier League 2025"). */
export interface CricketSeries {
  id: string;
  name: string;
  type: string;
  season: string;
  startDate?: string;
  endDate?: string;
  matches?: number;
  /** True when the provider marks this as the current/active season. */
  current?: boolean;
  format: CricketFormatId;
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string;
}

/** Points-table row from a series (e.g. IPL standings). */
export interface CricketPointsRow {
  team: CricketTeamRef;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
  lastFive: string;
}

/** One batting line in a scorecard. */
export interface BattingLine {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  /** Dismissal text verbatim from provider ("" = not out). */
  outDesc: string;
}

/** One bowling line in a scorecard. */
export interface BowlingLine {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

/** Scorecard innings — batting + bowling tables for one team innings. */
export interface CricketScorecardInnings {
  id: string;
  team: string;
  innings: number;
  runs: number;
  wickets: number;
  overs: number;
  batting: BattingLine[];
  bowling: BowlingLine[];
}

/** Full scorecard for a match. */
export interface CricketScorecard {
  matchId: string;
  matchName: string;
  statusText: string;
  innings: CricketScorecardInnings[];
  source: string;
  sourceUrl?: string;
  provider: string;
  lastUpdated: string;
}

/** Statsguru-style query for the records/statistics engine. */
export interface CricketRecordQuery {
  format: CricketFormatId;
  category: CricketRecordCategory;
  /** Optional specific record type key (from RECORD_DEFINITIONS). */
  recordType?: string;
  season?: string;
  team?: string;
  player?: string;
  page: number;
  pageSize: number;
  search?: string;
}

/** Result of a records query — records plus the supported catalog. */
export interface CricketRecordsResult {
  status: "ready" | "unavailable";
  records: CricketRecord[];
  total: number;
  page: number;
  pageSize: number;
  /** Record types supported for the selected format + category. */
  catalog: RecordDefinition[];
  source: string;
  sourceUrl?: string;
  provider: string;
  /** ISO timestamp of the last successful provider fetch, or null. */
  lastUpdated: string | null;
  error?: string;
}
