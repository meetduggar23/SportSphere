import type {
  CricketFormatDef,
  CricketFormatId,
  CricketRecordCategoryDef,
  CricketTeam,
  CricketTeamType,
  RecordDefinition,
} from "@/sports/cricket/types/cricketTypes";
import { iplTeams } from "@/data/mock";

/**
 * CRICKET MODULE — CONFIGURATION (single source of truth)
 *
 * Formats, record categories, record definitions, IPL metadata and provider
 * connection settings all live here. The Records UI is fully data-driven from
 * RECORD_DEFINITIONS: adding a record entry makes it appear across the app
 * with no component changes.
 */

/* ---- Provider connection ---- */

export const CRICKET_API = {
  /** CricAPI / CricketData.org (official, permitted developer API). */
  baseUrl: "https://api.cricapi.com/v1",
  /**
   * Env vars holding the API key, checked in order. The platform is branded
   * CricketData.org but served by api.cricapi.com — the same key works for
   * either name. Add to .env.local (git-ignored); never expose to the client.
   */
  envKeys: ["CRICKETDATA_API_KEY", "CRICAPI_API_KEY"] as const,
  provider: "CricAPI",
  sourceName: "CricAPI",
  sourceUrl: "https://www.cricapi.com",
  /** Server-side upstream cache (seconds) — respects CricAPI rate limits. */
  revalidateSeconds: 300,
} as const;

/** Resolve the configured CricketData API key (server-side only). */
export function getCricketApiKey(): string | undefined {
  for (const key of CRICKET_API.envKeys) {
    const value = process.env[key];
    if (value) return value;
  }
  return undefined;
}

/* ---- Formats ---- */

export const CRICKET_FORMATS: CricketFormatDef[] = [
  {
    id: "test",
    label: "Test",
    shortLabel: "TEST",
    isInternational: true,
    isIpl: false,
    description: "Five-day international cricket — the longest format.",
  },
  {
    id: "odi",
    label: "ODI",
    shortLabel: "ODI",
    isInternational: true,
    isIpl: false,
    description: "One-day internationals — 50 overs per side.",
  },
  {
    id: "t20i",
    label: "T20I",
    shortLabel: "T20I",
    isInternational: true,
    isIpl: false,
    description: "Twenty20 internationals — 20 overs per side.",
  },
  {
    id: "t20",
    label: "T20",
    shortLabel: "T20",
    isInternational: false,
    isIpl: false,
    description: "Domestic and franchise Twenty20 cricket.",
  },
  {
    id: "ipl",
    label: "IPL",
    shortLabel: "IPL",
    isInternational: false,
    isIpl: true,
    description: "Indian Premier League — a standalone franchise competition.",
  },
];

export const cricketFormat = (id: CricketFormatId): CricketFormatDef =>
  CRICKET_FORMATS.find((f) => f.id === id) ?? CRICKET_FORMATS[0];

export const cricketFormats = (): CricketFormatId[] =>
  CRICKET_FORMATS.map((f) => f.id);

/* ---- Record categories ---- */

export const RECORD_CATEGORIES: CricketRecordCategoryDef[] = [
  {
    id: "batting",
    label: "Batting",
    description: "Runs, averages, centuries and strike rates.",
  },
  {
    id: "bowling",
    label: "Bowling",
    description: "Wickets, averages, economies and best figures.",
  },
  {
    id: "fielding",
    label: "Fielding",
    description: "Catches, stumpings, run-outs and dismissals.",
  },
  {
    id: "allround",
    label: "All-round",
    description: "Combined batting and bowling performances.",
  },
  {
    id: "team",
    label: "Team",
    description: "Team totals, chases and margins of victory.",
  },
  {
    id: "captaincy",
    label: "Captaincy",
    description: "Matches led, wins and win percentage.",
  },
  {
    id: "partnership",
    label: "Partnership",
    description: "Largest and best stand partnerships.",
  },
];

export const recordCategory = (id: string): CricketRecordCategoryDef =>
  RECORD_CATEGORIES.find((c) => c.id === id) ?? RECORD_CATEGORIES[0];

/* ---- Record definitions (data-driven catalog) ---- */

const allFormats: CricketFormatId[] = ["test", "odi", "t20i", "t20", "ipl"];
const shortFormats: CricketFormatId[] = ["odi", "t20i", "t20", "ipl"];

/**
 * Every record the Records system can express. Extend this list to add new
 * records — the UI, tables and filters update automatically.
 */
export const RECORD_DEFINITIONS: RecordDefinition[] = [
  // ---- Batting ----
  {
    key: "most-runs",
    label: "Most career runs",
    category: "batting",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs",
    isDescending: true,
    description: "Most runs scored across a career.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "average", label: "Avg", align: "right", format: "decimal" },
      { key: "strikeRate", label: "SR", align: "right", format: "decimal" },
      { key: "hundreds", label: "100s", align: "center" },
      { key: "fifties", label: "50s", align: "center" },
    ],
  },
  {
    key: "most-runs-innings",
    label: "Most runs in an innings",
    category: "batting",
    formats: allFormats,
    sortKey: "highestScore",
    unit: "runs",
    isDescending: true,
    description: "Highest individual innings score.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "highestScore", label: "Score", align: "right" },
      { key: "match", label: "Match" },
      { key: "competition", label: "Competition" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "highest-average",
    label: "Highest batting average",
    category: "batting",
    formats: allFormats,
    sortKey: "battingAverage",
    unit: "avg",
    isDescending: true,
    description: "Best career batting average (minimum qualifying matches).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "average", label: "Avg", align: "right", format: "decimal" },
      { key: "hundreds", label: "100s", align: "center" },
    ],
  },
  {
    key: "highest-strike-rate",
    label: "Highest strike rate",
    category: "batting",
    formats: shortFormats,
    sortKey: "strikeRate",
    unit: "sr",
    isDescending: true,
    description: "Best batting strike rate (minimum qualifying balls).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "ballsFaced", label: "Balls", align: "right" },
      { key: "strikeRate", label: "SR", align: "right", format: "decimal" },
      { key: "sixes", label: "6s", align: "center" },
      { key: "fours", label: "4s", align: "center" },
    ],
  },
  {
    key: "most-hundreds",
    label: "Most hundreds",
    category: "batting",
    formats: allFormats,
    sortKey: "hundreds",
    unit: "100s",
    isDescending: true,
    description: "Most career centuries.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "hundreds", label: "100s", align: "right" },
      { key: "fifties", label: "50s", align: "right" },
    ],
  },
  {
    key: "most-fifties",
    label: "Most fifties",
    category: "batting",
    formats: allFormats,
    sortKey: "fifties",
    unit: "50s",
    isDescending: true,
    description: "Most career half-centuries.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "hundreds", label: "100s", align: "right" },
      { key: "fifties", label: "50s", align: "right" },
    ],
  },
  {
    key: "most-sixes",
    label: "Most sixes",
    category: "batting",
    formats: allFormats,
    sortKey: "sixes",
    unit: "6s",
    isDescending: true,
    description: "Most career sixes hit.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "sixes", label: "6s", align: "right" },
      { key: "fours", label: "4s", align: "right" },
    ],
  },
  {
    key: "most-fours",
    label: "Most fours",
    category: "batting",
    formats: allFormats,
    sortKey: "fours",
    unit: "4s",
    isDescending: true,
    description: "Most career boundaries hit.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "fours", label: "4s", align: "right" },
      { key: "sixes", label: "6s", align: "right" },
    ],
  },
  {
    key: "most-double-hundreds",
    label: "Most double hundreds",
    category: "batting",
    formats: ["test"],
    sortKey: "doubleHundreds",
    unit: "200s",
    isDescending: true,
    description: "Most career double centuries.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "doubleHundreds", label: "200s", align: "right" },
      { key: "hundreds", label: "100s", align: "right" },
    ],
  },
  {
    key: "most-triple-hundreds",
    label: "Most triple hundreds",
    category: "batting",
    formats: ["test"],
    sortKey: "tripleHundreds",
    unit: "300s",
    isDescending: true,
    description: "Most career triple centuries.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "tripleHundreds", label: "300s", align: "right" },
    ],
  },
  {
    key: "most-ducks",
    label: "Most ducks",
    category: "batting",
    formats: allFormats,
    sortKey: "ducks",
    unit: "ducks",
    isDescending: true,
    description: "Most career ducks (dismissals for 0).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "ducks", label: "Ducks", align: "right" },
    ],
  },
  {
    key: "most-not-outs",
    label: "Most not-outs",
    category: "batting",
    formats: allFormats,
    sortKey: "notOuts",
    unit: "not outs",
    isDescending: true,
    description: "Most career not-out innings.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "notOuts", label: "NO", align: "right" },
      { key: "runs", label: "Runs", align: "right" },
    ],
  },
  {
    key: "longest-career",
    label: "Longest career span",
    category: "batting",
    formats: allFormats,
    sortKey: "careerSpan",
    unit: "years",
    isDescending: false,
    description: "Players with the longest active careers.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "careerSpan", label: "Span", align: "right" },
    ],
  },

  // ---- Bowling ----
  {
    key: "most-wickets",
    label: "Most career wickets",
    category: "bowling",
    formats: allFormats,
    sortKey: "wickets",
    unit: "wickets",
    isDescending: true,
    description: "Most wickets taken in a career.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "bowlingAverage", label: "Avg", align: "right", format: "decimal" },
      { key: "economy", label: "Econ", align: "right", format: "decimal" },
      { key: "fiveWicketHauls", label: "5W", align: "center" },
    ],
  },
  {
    key: "best-bowling-innings",
    label: "Best bowling in an innings",
    category: "bowling",
    formats: allFormats,
    sortKey: "bestBowlingInnings",
    unit: "figures",
    isDescending: false,
    description: "Best single-innings bowling figures.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "bestBowlingInnings", label: "Figures", align: "right" },
      { key: "match", label: "Match" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "best-bowling-match",
    label: "Best match figures",
    category: "bowling",
    formats: allFormats,
    sortKey: "bestBowlingMatch",
    unit: "figures",
    isDescending: false,
    description: "Best combined match bowling figures.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "bestBowlingMatch", label: "Figures", align: "right" },
      { key: "match", label: "Match" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "best-bowling-average",
    label: "Best bowling average",
    category: "bowling",
    formats: allFormats,
    sortKey: "bowlingAverage",
    unit: "avg",
    isDescending: false,
    description: "Lowest career bowling average (minimum qualifying wickets).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "bowlingAverage", label: "Avg", align: "right", format: "decimal" },
      { key: "economy", label: "Econ", align: "right", format: "decimal" },
    ],
  },
  {
    key: "best-economy",
    label: "Best economy rate",
    category: "bowling",
    formats: shortFormats,
    sortKey: "economy",
    unit: "rpo",
    isDescending: false,
    description: "Lowest career economy rate (minimum qualifying overs).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "ballsBowled", label: "Balls", align: "right" },
      { key: "economy", label: "Econ", align: "right", format: "decimal" },
      { key: "wickets", label: "Wkts", align: "right" },
    ],
  },
  {
    key: "most-five-wicket-hauls",
    label: "Most 5-wicket hauls",
    category: "bowling",
    formats: allFormats,
    sortKey: "fiveWicketHauls",
    unit: "5W",
    isDescending: true,
    description: "Most career five-wicket hauls in an innings.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "innings", label: "Inns", align: "center" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "fiveWicketHauls", label: "5W", align: "right" },
      { key: "tenWicketHauls", label: "10W", align: "right" },
    ],
  },
  {
    key: "most-ten-wicket-hauls",
    label: "Most 10-wicket match hauls",
    category: "bowling",
    formats: ["test"],
    sortKey: "tenWicketHauls",
    unit: "10W",
    isDescending: true,
    description: "Most career ten-wicket match hauls.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "tenWicketHauls", label: "10W", align: "right" },
    ],
  },
  {
    key: "most-four-wicket-hauls",
    label: "Most 4-wicket hauls",
    category: "bowling",
    formats: allFormats,
    sortKey: "fourWicketHauls",
    unit: "4W",
    isDescending: true,
    description: "Most career four-wicket hauls in an innings.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "fourWicketHauls", label: "4W", align: "right" },
    ],
  },
  {
    key: "most-maidens",
    label: "Most maidens",
    category: "bowling",
    formats: allFormats,
    sortKey: "maidens",
    unit: "maidens",
    isDescending: true,
    description: "Most career maiden overs.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "ballsBowled", label: "Balls", align: "right" },
      { key: "maidens", label: "Mdns", align: "right" },
      { key: "wickets", label: "Wkts", align: "right" },
    ],
  },

  // ---- Fielding ----
  {
    key: "most-catches",
    label: "Most catches",
    category: "fielding",
    formats: allFormats,
    sortKey: "catches",
    unit: "catches",
    isDescending: true,
    description: "Most catches taken in a career (outfield).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "catches", label: "Ct", align: "right" },
      { key: "dismissals", label: "Dismissals", align: "right" },
    ],
  },
  {
    key: "most-dismissals",
    label: "Most dismissals",
    category: "fielding",
    formats: allFormats,
    sortKey: "dismissals",
    unit: "dismissals",
    isDescending: true,
    description: "Most dismissals in a career (catches + stumpings as keeper).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "catches", label: "Ct", align: "right" },
      { key: "stumpings", label: "St", align: "right" },
      { key: "dismissals", label: "Dismissals", align: "right" },
    ],
  },
  {
    key: "most-stumpings",
    label: "Most stumpings",
    category: "fielding",
    formats: allFormats,
    sortKey: "stumpings",
    unit: "stumpings",
    isDescending: true,
    description: "Most stumpings by a wicketkeeper.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "stumpings", label: "St", align: "right" },
      { key: "catches", label: "Ct", align: "right" },
    ],
  },
  {
    key: "most-run-outs",
    label: "Most run-outs",
    category: "fielding",
    formats: allFormats,
    sortKey: "runOuts",
    unit: "run outs",
    isDescending: true,
    description: "Most run-outs effected in a career.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runOuts", label: "Run outs", align: "right" },
    ],
  },

  // ---- All-round ----
  {
    key: "most-runs-and-wickets",
    label: "Most runs with most wickets",
    category: "allround",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs + wickets",
    isDescending: true,
    description: "All-rounders with the most combined runs and wickets.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "battingAverage", label: "Bat Avg", align: "right", format: "decimal" },
      { key: "bowlingAverage", label: "Bowl Avg", align: "right", format: "decimal" },
    ],
  },
  {
    key: "best-allround-average",
    label: "Best all-round averages",
    category: "allround",
    formats: allFormats,
    sortKey: "battingAverage",
    unit: "avg",
    isDescending: true,
    description: "Players combining a high batting average with a low bowling average.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matches", label: "Mat", align: "center" },
      { key: "runs", label: "Runs", align: "right" },
      { key: "battingAverage", label: "Bat Avg", align: "right", format: "decimal" },
      { key: "wickets", label: "Wkts", align: "right" },
      { key: "bowlingAverage", label: "Bowl Avg", align: "right", format: "decimal" },
    ],
  },

  // ---- Captaincy ----
  {
    key: "most-matches-captain",
    label: "Most matches as captain",
    category: "captaincy",
    formats: allFormats,
    sortKey: "matchesAsCaptain",
    unit: "matches",
    isDescending: true,
    description: "Most matches captained in a career.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matchesAsCaptain", label: "Captain", align: "right" },
      { key: "captainWins", label: "W", align: "right" },
      { key: "captainLosses", label: "L", align: "right" },
      { key: "captainDraws", label: "D", align: "right" },
    ],
  },
  {
    key: "most-wins-captain",
    label: "Most wins as captain",
    category: "captaincy",
    formats: allFormats,
    sortKey: "captainWins",
    unit: "wins",
    isDescending: true,
    description: "Most matches won as captain.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matchesAsCaptain", label: "Captain", align: "right" },
      { key: "captainWins", label: "W", align: "right" },
      { key: "captainLosses", label: "L", align: "right" },
    ],
  },
  {
    key: "best-win-percentage",
    label: "Best captaincy win percentage",
    category: "captaincy",
    formats: allFormats,
    sortKey: "captainWins",
    unit: "%",
    isDescending: true,
    description: "Highest win percentage as captain (minimum qualifying matches).",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "player", label: "Player" },
      { key: "matchesAsCaptain", label: "Captain", align: "right" },
      { key: "captainWins", label: "W", align: "right" },
      { key: "captainLosses", label: "L", align: "right" },
      { key: "winPercentage", label: "Win %", align: "right", format: "decimal" },
    ],
  },

  // ---- Team ----
  {
    key: "highest-team-total",
    label: "Highest innings total",
    category: "team",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs",
    isDescending: true,
    description: "Highest team innings total.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "team", label: "Team" },
      { key: "value", label: "Total", align: "right" },
      { key: "match", label: "Match" },
      { key: "competition", label: "Competition" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "lowest-team-total",
    label: "Lowest innings total",
    category: "team",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs",
    isDescending: false,
    description: "Lowest completed team innings total.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "team", label: "Team" },
      { key: "value", label: "Total", align: "right" },
      { key: "match", label: "Match" },
      { key: "competition", label: "Competition" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "highest-successful-chase",
    label: "Highest successful chase",
    category: "team",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs",
    isDescending: true,
    description: "Highest target successfully chased.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "team", label: "Team" },
      { key: "value", label: "Chased", align: "right" },
      { key: "match", label: "Match" },
      { key: "competition", label: "Competition" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "biggest-win-runs",
    label: "Biggest win by runs",
    category: "team",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs",
    isDescending: true,
    description: "Largest victory margin by runs.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "team", label: "Team" },
      { key: "value", label: "Margin", align: "right" },
      { key: "match", label: "Match" },
      { key: "competition", label: "Competition" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
  {
    key: "biggest-win-wickets",
    label: "Biggest win by wickets",
    category: "team",
    formats: allFormats,
    sortKey: "wickets",
    unit: "wickets",
    isDescending: true,
    description: "Largest victory margin by wickets.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "team", label: "Team" },
      { key: "value", label: "Margin", align: "right" },
      { key: "match", label: "Match" },
      { key: "competition", label: "Competition" },
      { key: "date", label: "Date", align: "right" },
    ],
  },

  // ---- Partnership ----
  {
    key: "highest-partnership",
    label: "Highest partnership",
    category: "partnership",
    formats: allFormats,
    sortKey: "runs",
    unit: "runs",
    isDescending: true,
    description: "Largest career partnership for any wicket.",
    columns: [
      { key: "rank", label: "Rank", align: "center" },
      { key: "partners", label: "Partners" },
      { key: "value", label: "Runs", align: "right" },
      { key: "wicket", label: "Wicket", align: "center" },
      { key: "match", label: "Match" },
      { key: "date", label: "Date", align: "right" },
    ],
  },
];

/** Records supported for a format + category combo. */
export function recordsFor(format: CricketFormatId, category: string): RecordDefinition[] {
  return RECORD_DEFINITIONS.filter(
    (r) => r.category === category && r.formats.includes(format)
  );
}

/* ---- IPL metadata ---- */

/** Official IPL franchise identities (names + local logos). Never stats. */
export const IPL_TEAMS = iplTeams;

/** Franchise names — used to classify CricAPI matches as IPL, never as India. */
export const IPL_TEAM_NAMES = new Set(iplTeams.map((t) => t.name.toLowerCase()));

/** Series-name markers used to detect IPL matches. */
export const IPL_SERIES_MARKERS = ["indian premier league", "ipl"];

export const IPL_SEASONS = ["2026", "2025", "2024", "2023", "2022"];

/* ---- Known teams / countries (identity seed) ---- */

/**
 * Stable URL slug for a team identity (mirrors utils/teamSlug — duplicated
 * here to avoid a config → utils → config import cycle).
 */
function teamSlugLocal(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function teamSeed(
  name: string,
  shortName: string,
  type: CricketTeamType,
  country: string,
  countryCode?: string,
  logo?: string
): CricketTeam {
  return {
    id: teamSlugLocal(name),
    name,
    shortName,
    type,
    country,
    countryCode,
    logo,
  };
}

/**
 * KNOWN_TEAMS — factual identity seed for every supported cricket country and
 * team. Names, codes and kinds only, NEVER statistics. CricAPI has no teams
 * endpoint, so this seed guarantees stable ids and a populated Countries
 * index; the provider-derived team list from match data is merged on top of
 * it at request time (see getCricketTeams). Any country supported by the
 * provider but absent here still appears in the merged list.
 */
export const KNOWN_TEAMS: CricketTeam[] = [
  // ---- ICC full members (national sides) ----
  teamSeed("India", "IND", "national", "India", "IN", "/logos/cricket/india.png"),
  teamSeed("Australia", "AUS", "national", "Australia", "AU", "/logos/cricket/australia.png"),
  teamSeed("England", "ENG", "national", "England", "GB", "/logos/cricket/england.png"),
  teamSeed("South Africa", "SA", "national", "South Africa", "ZA"),
  teamSeed("New Zealand", "NZ", "national", "New Zealand", "NZ"),
  teamSeed("Pakistan", "PAK", "national", "Pakistan", "PK"),
  teamSeed("Sri Lanka", "SL", "national", "Sri Lanka", "LK"),
  teamSeed("Bangladesh", "BAN", "national", "Bangladesh", "BD"),
  teamSeed("Afghanistan", "AFG", "national", "Afghanistan", "AF"),
  teamSeed("West Indies", "WI", "national", "West Indies"),
  teamSeed("Zimbabwe", "ZIM", "national", "Zimbabwe", "ZW"),
  teamSeed("Ireland", "IRE", "national", "Ireland", "IE"),
  // ---- ICC associate members (national sides) ----
  teamSeed("Scotland", "SCOT", "national", "Scotland", "GB"),
  teamSeed("Netherlands", "NED", "national", "Netherlands", "NL"),
  teamSeed("Nepal", "NEP", "national", "Nepal", "NP"),
  teamSeed("UAE", "UAE", "national", "United Arab Emirates", "AE"),
  teamSeed("Namibia", "NAM", "national", "Namibia", "NA"),
  teamSeed("USA", "USA", "national", "United States", "US"),
  teamSeed("Oman", "OMA", "national", "Oman", "OM"),
  teamSeed("Canada", "CAN", "national", "Canada", "CA"),
  teamSeed("Hong Kong", "HKG", "national", "Hong Kong", "HK"),
  teamSeed("Papua New Guinea", "PNG", "national", "Papua New Guinea", "PG"),
  // ---- IPL franchises (league competition — never national cricket) ----
  teamSeed("Mumbai Indians", "MI", "franchise", "India", "IN", "/logos/ipl/mi.jpg"),
  teamSeed("Chennai Super Kings", "CSK", "franchise", "India", "IN", "/logos/ipl/csk.jpg"),
  teamSeed("Royal Challengers Bengaluru", "RCB", "franchise", "India", "IN", "/logos/ipl/rcb.jpg"),
  teamSeed("Kolkata Knight Riders", "KKR", "franchise", "India", "IN", "/logos/ipl/kkr.png"),
  teamSeed("Rajasthan Royals", "RR", "franchise", "India", "IN", "/logos/ipl/rr.jpg"),
  teamSeed("Gujarat Titans", "GT", "franchise", "India", "IN", "/logos/ipl/gt.jpg"),
  teamSeed("Sunrisers Hyderabad", "SRH", "franchise", "India", "IN", "/logos/ipl/srh.jpg"),
  teamSeed("Punjab Kings", "PBKS", "franchise", "India", "IN", "/logos/ipl/pbks.jpg"),
  teamSeed("Delhi Capitals", "DC", "franchise", "India", "IN", "/logos/ipl/dc.jpg"),
  teamSeed("Lucknow Super Giants", "LSG", "franchise", "India", "IN", "/logos/ipl/lsg.jpg"),
];

/* ---- CricAPI format classification ---- */

/**
 * Map CricAPI matchType strings to canonical format ids. Unknown types
 * resolve to "t20" only when the series/teams identify a T20 league — the
 * classifier in utils owns that logic; this is the raw type mapping.
 */
export const CRICAPI_MATCH_TYPE_MAP: Record<string, CricketFormatId | undefined> = {
  test: "test",
  odi: "odi",
  t20: "t20",
  t20i: "t20i",
  t10: "t20",
  listA: "odi",
  firstclass: "test",
};
