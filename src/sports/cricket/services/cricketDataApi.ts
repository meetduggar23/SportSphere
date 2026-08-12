import { cachedFetch } from "@/lib/requestCache";
import { CRICKET_API, getCricketApiKey } from "@/sports/cricket/config/cricketConfig";
import type {
  CricketCareerStats,
  CricketFormatId,
  CricketPlayer,
  CricketPlayerRef,
} from "@/sports/cricket/types/cricketTypes";
import { nowIso } from "@/sports/cricket/utils/cricketFormat";

/**
 * CRICKETDATA.ORG PLAYER SERVICE — raw server-side client.
 *
 * Endpoints (verified against the live API):
 *   GET {base}/players        ?apikey&offset&search   → { data: [{id,name,country}], info:{totalRows} }
 *   GET {base}/players_info   ?apikey&id              → { data: {id,name,dateOfBirth,role,battingStyle,
 *                                                      bowlingStyle,placeOfBirth,country,playerImg,stats[]} }
 *
 * `stats[]` rows are { fn: "batting"|"bowling"|"fielding", matchtype, stat, value } — the real career
 * aggregates for that format. Every call is cached (in-flight dedup + TTL) and the upstream fetch uses
 * `next: { revalidate }`, so the 100-hits/day free tier is never wasted on duplicate requests.
 *
 * ACCURACY RULE: only fields the API actually returned are populated. Missing info stays absent —
 * the UI renders the honest "unavailable" state, never invented numbers.
 */

/* ---- Raw response shapes (defensive: every field optional) ---- */

interface RawSearchPlayer {
  id?: string;
  name?: string;
  country?: string;
}

interface RawStatRow {
  fn?: string;
  matchtype?: string;
  stat?: string;
  value?: string;
}

interface RawPlayerInfo {
  id?: string;
  name?: string;
  fullName?: string;
  dateOfBirth?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  placeOfBirth?: string;
  country?: string;
  playerImg?: string;
  alternateName?: string;
  teams?: string[];
  stats?: RawStatRow[];
}

interface CricEnvelope<T> {
  data?: T;
  status?: string;
  message?: string;
  info?: { totalRows?: number; offsetRows?: number };
}

/** Provider matchType → app format id. Unknown types are skipped (honest). */
const FORMAT_MAP: Record<string, CricketFormatId> = {
  test: "test",
  odi: "odi",
  t20i: "t20i",
  t20: "t20",
  ipl: "ipl",
};

/** `fn` + `stat` → CricketCareerStats field, per verified API contract. */
const STAT_MAP: Record<string, Record<string, { field: keyof CricketCareerStats; numeric?: boolean }>> = {
  batting: {
    m: { field: "matches" },
    inn: { field: "innings" },
    no: { field: "notOuts" },
    runs: { field: "runs" },
    hs: { field: "highestScore", numeric: true },
    avg: { field: "battingAverage", numeric: true },
    bf: { field: "ballsFaced" },
    sr: { field: "strikeRate", numeric: true },
    "100s": { field: "hundreds" },
    "200s": { field: "doubleHundreds" },
    "50s": { field: "fifties" },
    "4s": { field: "fours" },
    "6s": { field: "sixes" },
  },
  bowling: {
    m: { field: "matches" },
    inn: { field: "innings" },
    b: { field: "ballsBowled" },
    runs: { field: "runsConceded" },
    wkts: { field: "wickets" },
    bbi: { field: "bestBowlingInnings" },
    bbm: { field: "bestBowlingMatch" },
    econ: { field: "economy", numeric: true },
    avg: { field: "bowlingAverage", numeric: true },
    sr: { field: "bowlingStrikeRate", numeric: true },
    "5w": { field: "fiveWicketHauls" },
    "10w": { field: "tenWicketHauls" },
  },
  fielding: {
    ct: { field: "catches" },
    st: { field: "stumpings" },
    ro: { field: "runOuts" },
    dis: { field: "dismissals" },
  },
};

class CricketDataError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "CricketDataError";
  }
}

/** Raw upstream fetch with key check, cache headers and envelope validation. */
async function cricDataFetch<T>(
  endpoint: string,
  params: Record<string, string | number>
): Promise<{ data: T; info?: CricEnvelope<T>["info"] }> {
  const apiKey = getCricketApiKey();
  if (!apiKey) {
    throw new CricketDataError("CricketData API key is not configured. Add CRICKETDATA_API_KEY to .env.local");
  }

  const url = new URL(`${CRICKET_API.baseUrl}${endpoint}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }
  url.searchParams.set("apikey", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: CRICKET_API.revalidateSeconds } });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new CricketDataError("CricketData API key is invalid or expired.", res.status);
    }
    if (res.status === 429) {
      throw new CricketDataError("CricketData API rate limit reached. Try again later.", res.status);
    }
    throw new CricketDataError(`CricketData API error: ${res.status}`, res.status);
  }

  const json = (await res.json()) as CricEnvelope<T>;
  if (json.status !== "success") {
    throw new CricketDataError(json.message ?? "CricketData request failed");
  }
  return { data: json.data as T, info: json.info };
}

/* ---- Parsers ---- */

/**
 * Parse the verified `stats[]` rows into per-format CricketCareerStats.
 *
 * The provider's payload is a flat list of { fn, matchtype, stat, value } rows
 * with BOTH batting and bowling rows per format (they share stat keys like
 * `m`, `inn`, `runs`) plus occasional spaced duplicate rows. Two rules keep
 * the result correct: (1) the same field is only written once per format —
 * the first (cleanest) row wins, so bowling's `inn` never overwrites the
 * batting innings count; (2) unknown/duplicate rows are skipped silently.
 */
export function parseCareerStats(rows: RawStatRow[] | undefined, playerId = ""): CricketCareerStats[] {
  if (!Array.isArray(rows)) return [];

  const perFormat = new Map<CricketFormatId, { fields: Record<string, unknown>; written: Set<string>; seen: Set<string> }>();

  for (const row of rows) {
    const fn = row.fn?.trim();
    const matchtype = row.matchtype?.trim();
    const stat = row.stat?.trim();
    const value = row.value?.trim();
    if (!fn || !matchtype || !stat || !value || value === "N/A") continue;

    const format = FORMAT_MAP[matchtype];
    const mapping = STAT_MAP[fn]?.[stat];
    if (!format || !mapping) continue;

    const entry = perFormat.get(format) ?? { fields: {}, written: new Set<string>(), seen: new Set<string>() };

    // Skip duplicate/spaced rows for the same fn:stat (first wins).
    const rowKey = `${fn}:${stat}`;
    if (entry.seen.has(rowKey)) continue;
    entry.seen.add(rowKey);

    // Field-level first-write-wins: batting `inn` → innings, bowling `inn` is
    // the same field name but a different count — the batting row must win.
    const field = mapping.field as string;
    if (entry.written.has(field)) continue;

    // "6/45" style figures are preserved as strings for best bowling.
    if (stat === "bbi" || stat === "bbm") {
      entry.fields[field] = value;
      entry.written.add(field);
      perFormat.set(format, entry);
      continue;
    }

    const parsed = mapping.numeric ? Number(value) : Number(value.replace(/\D/g, ""));
    const out = Number.isFinite(parsed) ? parsed : undefined;
    if (out === undefined) continue;

    entry.fields[field] = out;
    // "254*" style not-out highest scores keep the flag the UI already renders.
    if (stat === "hs" && /\*$/.test(value)) {
      entry.fields.highestScoreNotOut = true;
      entry.written.add("highestScoreNotOut");
    }
    entry.written.add(field);
    perFormat.set(format, entry);
  }

  return [...perFormat.entries()].map(([format, entry]) => {
    const { fields } = entry;
    return {
      playerId,
      format,
      ...fields,
      source: CRICKET_API.sourceName,
      sourceUrl: CRICKET_API.sourceUrl,
      provider: CRICKET_API.provider,
      lastUpdated: nowIso(),
    } as CricketCareerStats;
  });
}

/** Compute age (whole years) from an ISO date of birth. */
function ageFromDateOfBirth(dateOfBirth?: string): number | undefined {
  if (!dateOfBirth) return undefined;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return undefined;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age >= 0 ? age : undefined;
}

/** Normalize a raw player-info payload into the shared CricketPlayer model. */
function normalizePlayerInfo(raw: RawPlayerInfo): CricketPlayer {
  const id = raw.id ?? "";
  const alternateNames = raw.alternateName ? raw.alternateName.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

  return {
    id,
    name: raw.name ?? "",
    fullName: raw.fullName || raw.name,
    country: raw.country ?? "",
    role: raw.role,
    battingStyle: raw.battingStyle,
    bowlingStyle: raw.bowlingStyle,
    dateOfBirth: raw.dateOfBirth,
    age: ageFromDateOfBirth(raw.dateOfBirth),
    placeOfBirth: raw.placeOfBirth,
    alternateNames,
    photo: raw.playerImg,
    teams: raw.teams,
    providerId: id,
    source: CRICKET_API.sourceName,
    sourceUrl: CRICKET_API.sourceUrl,
    provider: CRICKET_API.provider,
    lastUpdated: nowIso(),
  };
}

/* ---- Public accessors (cached, server-side) ---- */

/** Cache key scheme per requirement: cricket:players:search:<query>:<offset>. */
function searchKey(query: string, offset: number): string {
  return `cricket:players:search:${query.toLowerCase().trim()}:${offset}`;
}

export interface PlayerSearchResult {
  players: CricketPlayerRef[];
  total: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Search the CricketData.org player database (all countries). Empty query
 * returns the first page of the global directory. Responses are cached
 * (in-flight dedup + TTL) so repeated identical searches never burn quota.
 */
export async function searchCricketDataPlayers(
  query: string,
  offset = 0
): Promise<PlayerSearchResult> {
  const q = query.trim();
  return cachedFetch<PlayerSearchResult>(searchKey(q, offset), async () => {
    const { data: raw, info } = await cricDataFetch<RawSearchPlayer[]>("/players", { offset, search: q });

    // Validate defensively: drop rows without an id/name; never trust blindly.
    const players: CricketPlayerRef[] = (Array.isArray(raw) ? raw : [])
      .filter((p): p is RawSearchPlayer & { id: string; name: string } => Boolean(p?.id && p?.name))
      .map((p) => ({ id: p.id, name: p.name, country: p.country }));

    // Accurate pagination from the provider's info block (totalRows), not a
    // heuristic — “Load more” only shows when more rows actually exist.
    const totalRows = typeof info?.totalRows === "number" ? info.totalRows : players.length;
    const hasMore = offset + players.length < totalRows;
    return { players, total: totalRows, offset, hasMore };
  });
}

/** Player cache key (profiles are stable; no polling). */
function playerKey(id: string): string {
  return `cricket:players:info:${id}`;
}

/**
 * Full player profile: bio + REAL career stats parsed from the provider's
 * stats[] rows. Cached — profiles are stable data, refreshed only when stale.
 */
export async function getCricketDataPlayer(
  id: string
): Promise<{ player: CricketPlayer; stats: CricketCareerStats[] }> {
  return cachedFetch<{ player: CricketPlayer; stats: CricketCareerStats[] }>(playerKey(id), async () => {
    const { data: raw } = await cricDataFetch<RawPlayerInfo>("/players_info", { id });
    if (!raw?.id && !raw?.name) {
      throw new CricketDataError("Player not found", 404);
    }
    const stats = parseCareerStats(raw.stats, raw.id ?? "");
    const player = normalizePlayerInfo(raw);
    return { player, stats };
  });
}
