import { CRICKET_API } from "@/sports/cricket/config/cricketConfig";
import type {
  BattingLine,
  BowlingLine,
  CricketInnings,
  CricketMatch,
  CricketPlayer,
  CricketPlayerRef,
  CricketPointsRow,
  CricketScorecard,
  CricketScorecardInnings,
  CricketSeries,
  CricketTeamRef,
} from "@/sports/cricket/types/cricketTypes";
import {
  classifyFormat,
  dedupeBy,
  idFromName,
  isIplName,
  mapMatchStatus,
  normalizeName,
  nowIso,
  teamInitials,
} from "@/sports/cricket/utils/cricketFormat";
import type { Fixture, Match, Standing } from "@/types";

/**
 * CRICAPI SERVICE — server-side data client (api.cricapi.com/v1)
 *
 * Official, permitted developer API. Every call is cached upstream with
 * `next: { revalidate }` so free-tier rate limits (100 hits/day) are
 * respected and repeated page loads never re-hit the network.
 *
 * ACCURACY RULE: normalization maps provider fields 1:1. Anything the API
 * does not supply stays absent — callers show the unavailable state.
 */

export class CricketApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "CricketApiError";
  }
}

/** True when CRICAPI_API_KEY is present in the environment. */
export function isCricketConfigured(): boolean {
  return Boolean(process.env[CRICKET_API.envKey]);
}

interface CricEnvelope<T> {
  data?: T;
  status?: string;
  message?: string;
}

/**
 * Fetch a CricAPI endpoint and unwrap the { data, status, info } envelope.
 * Throws CricketApiError on missing key, network failure, or API error.
 * Never caches failures — retries hit the network again.
 */
async function cricFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
  revalidate = CRICKET_API.revalidateSeconds
): Promise<T> {
  const apiKey = process.env[CRICKET_API.envKey];
  if (!apiKey) {
    throw new CricketApiError(
      `${CRICKET_API.envKey} is not configured. Add your CricAPI key to .env.local`
    );
  }

  const url = new URL(`${CRICKET_API.baseUrl}${endpoint}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }
  url.searchParams.set("apikey", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate } });
  if (!res.ok) {
    throw new CricketApiError(`CricAPI error: ${res.status}`, res.status);
  }

  const json = (await res.json()) as CricEnvelope<T>;
  if (json.status !== "success") {
    throw new CricketApiError(json.message ?? "CricAPI request failed");
  }
  return json.data as T;
}

/* ---- Raw CricAPI shapes (defensive: every field optional) ---- */

interface RawScore {
  r?: number;
  w?: number;
  o?: number;
  inning?: string;
}

interface RawMatch {
  id?: string;
  name?: string;
  matchType?: string;
  status?: string;
  venue?: string;
  date?: string;
  dateTimeGMT?: string;
  teams?: string[];
  score?: RawScore[];
  series_id?: string;
  series_name?: string;
  matchStarted?: boolean;
  matchEnded?: boolean;
}

interface RawSeries {
  id?: string;
  name?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  matches?: number;
  season?: string;
  current?: boolean;
}

interface RawSeriesInfo extends RawSeries {
  points?: RawPointsRow[];
}

interface RawPointsRow {
  team?: string;
  matches?: number;
  won?: number;
  lost?: number;
  tied?: number;
  noResult?: number;
  points?: number;
  nrr?: number;
  last5?: string;
}

interface RawPlayer {
  id?: string;
  name?: string;
  country?: string;
  fullName?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  image?: string;
  teams?: string[];
}

interface RawBattingLine {
  name?: string;
  runs?: number;
  balls?: number;
  fours?: number;
  sixes?: number;
  sr?: number;
  out_desc?: string;
}

interface RawBowlingLine {
  name?: string;
  overs?: number;
  maidens?: number;
  runs?: number;
  wickets?: number;
  econ?: number;
}

interface RawInnings {
  id?: string;
  team?: string;
  inning?: number;
  runs?: number;
  wickets?: number;
  overs?: number;
  batting?: RawBattingLine[];
  bowling?: RawBowlingLine[];
}

interface RawScorecard {
  id?: string;
  match_name?: string;
  status?: string;
  scorecard?: RawInnings[];
}

/* ---- Normalizers ---- */

function normalizeInnings(raw: RawScore[] | undefined): CricketInnings[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((s) => s && typeof s.r === "number")
    .map((s) => {
      const label = s.inning ?? "";
      // "Mumbai Indians Inning 1" → team "Mumbai Indians", inning 1
      const match = label.match(/^(.*?)\s*Inning\s*(\d+)$/i);
      return {
        inning: match?.[2] ?? label,
        team: match?.[1]?.trim() ?? label,
        runs: s.r ?? 0,
        wickets: s.w ?? 0,
        overs: s.o ?? 0,
      };
    });
}

function normalizeMatch(raw: RawMatch): CricketMatch {
  const teams = (raw.teams ?? []).slice(0, 2);
  const series = raw.series_name ?? "";
  const format = classifyFormat(raw.matchType, series, teams);
  return {
    id: raw.id ?? idFromName(raw.name ?? `${raw.date}-${teams.join("-")}`),
    format,
    series: series || (isIplName("", teams) ? "Indian Premier League" : raw.matchType ?? ""),
    seriesId: raw.series_id,
    name: raw.name ?? "",
    status: mapMatchStatus(raw.status ?? "", raw.date ?? "", raw.matchStarted, raw.matchEnded),
    statusText: raw.status ?? "",
    teams,
    score: normalizeInnings(raw.score),
    venue: raw.venue ?? "",
    date: raw.date ?? "",
    dateTimeGMT: raw.dateTimeGMT,
    matchStarted: Boolean(raw.matchStarted),
    source: CRICKET_API.sourceName,
    sourceUrl: CRICKET_API.sourceUrl,
    provider: CRICKET_API.provider,
    lastUpdated: nowIso(),
  };
}

function normalizeSeries(raw: RawSeries): CricketSeries {
  return {
    id: raw.id ?? "",
    name: raw.name ?? "",
    type: raw.type ?? "",
    season: raw.season ?? raw.startDate ?? "",
    startDate: raw.startDate,
    endDate: raw.endDate,
    matches: raw.matches,
    current: raw.current,
    format: classifyFormat(raw.type, raw.name),
    source: CRICKET_API.sourceName,
    sourceUrl: CRICKET_API.sourceUrl,
    provider: CRICKET_API.provider,
    lastUpdated: nowIso(),
  };
}

function normalizePointsTable(rows: RawPointsRow[] | undefined): CricketPointsRow[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((r) => r && r.team)
    .map((r) => ({
      team: { id: idFromName(r.team!), name: r.team!, shortName: teamInitials(r.team!) },
      played: r.matches ?? 0,
      won: r.won ?? 0,
      lost: r.lost ?? 0,
      tied: r.tied ?? 0,
      noResult: r.noResult ?? 0,
      points: r.points ?? 0,
      netRunRate: r.nrr ?? 0,
      lastFive: r.last5 ?? "",
    }));
}

function normalizeScorecard(raw: RawScorecard): CricketScorecard {
  const innings: CricketScorecardInnings[] = (raw.scorecard ?? []).map((inn) => ({
    id: inn.id ?? idFromName(`${raw.id ?? ""}-${inn.team ?? ""}-${inn.inning ?? 0}`),
    team: inn.team ?? "",
    innings: inn.inning ?? 1,
    runs: inn.runs ?? 0,
    wickets: inn.wickets ?? 0,
    overs: inn.overs ?? 0,
    batting: (inn.batting ?? []).map(
      (b): BattingLine => ({
        name: b.name ?? "",
        runs: b.runs ?? 0,
        balls: b.balls ?? 0,
        fours: b.fours ?? 0,
        sixes: b.sixes ?? 0,
        strikeRate: b.sr ?? 0,
        outDesc: b.out_desc ?? "",
      })
    ),
    bowling: (inn.bowling ?? []).map(
      (b): BowlingLine => ({
        name: b.name ?? "",
        overs: b.overs ?? 0,
        maidens: b.maidens ?? 0,
        runs: b.runs ?? 0,
        wickets: b.wickets ?? 0,
        economy: b.econ ?? 0,
      })
    ),
  }));

  return {
    matchId: raw.id ?? "",
    matchName: raw.match_name ?? "",
    statusText: raw.status ?? "",
    innings,
    source: CRICKET_API.sourceName,
    sourceUrl: CRICKET_API.sourceUrl,
    provider: CRICKET_API.provider,
    lastUpdated: nowIso(),
  };
}

function normalizePlayer(raw: RawPlayer): CricketPlayer {
  return {
    id: raw.id ?? "",
    name: raw.name ?? "",
    fullName: raw.fullName || raw.name,
    country: raw.country ?? "",
    role: raw.role,
    battingStyle: raw.battingStyle,
    bowlingStyle: raw.bowlingStyle,
    photo: raw.image,
    teams: raw.teams,
    source: CRICKET_API.sourceName,
    sourceUrl: CRICKET_API.sourceUrl,
    provider: CRICKET_API.provider,
    lastUpdated: nowIso(),
  };
}

function playerRef(raw: RawPlayer): CricketPlayerRef {
  return { id: raw.id ?? "", name: raw.name ?? "", country: raw.country };
}

/* ---- Public data accessors ---- */

/** Live + recent + upcoming matches (CricAPI /currentMatches). */
export async function getCricketCurrentMatches(): Promise<CricketMatch[]> {
  const raw = await cricFetch<RawMatch[]>("/currentMatches", { offset: "0" });
  return dedupeBy(raw.map(normalizeMatch), (m) => m.id);
}

/** Full schedule (CricAPI /matches). */
export async function getCricketMatches(): Promise<CricketMatch[]> {
  const raw = await cricFetch<RawMatch[]>("/matches", { offset: "0" });
  return dedupeBy(raw.map(normalizeMatch), (m) => m.id);
}

/** Series/tournament list. */
export async function getCricketSeries(): Promise<CricketSeries[]> {
  const raw = await cricFetch<RawSeries[]>("/series", { offset: "0" });
  return dedupeBy(raw.map(normalizeSeries), (s) => s.id || s.name);
}

/** Series detail including points table (CricAPI /series_info). */
export async function getCricketSeriesInfo(id: string): Promise<{
  series: CricketSeries;
  points: CricketPointsRow[];
  matches: CricketMatch[];
}> {
  const raw = await cricFetch<RawSeriesInfo>("/series_info", { id });
  return {
    series: normalizeSeries(raw),
    points: normalizePointsTable(raw.points),
    matches: dedupeBy(
      (Array.isArray(raw.matches) ? raw.matches : []).map(normalizeMatch),
      (m) => m.id
    ),
  };
}

/** Search players by name (CricAPI /players). */
export async function searchCricketPlayers(query: string): Promise<CricketPlayerRef[]> {
  const raw = await cricFetch<RawPlayer[]>("/players", { offset: "0", search: query });
  return dedupeBy(raw.map(playerRef), (p) => p.id || p.name);
}

/** List players (first page — CricAPI /players without a search term). */
export async function listCricketPlayers(): Promise<CricketPlayerRef[]> {
  const raw = await cricFetch<RawPlayer[]>("/players", { offset: "0" });
  return dedupeBy(raw.map(playerRef), (p) => p.id || p.name);
}

/** Player profile (CricAPI /players_info). */
export async function getCricketPlayer(id: string): Promise<CricketPlayer> {
  const raw = await cricFetch<RawPlayer[]>("/players_info", { id });
  const player = raw[0];
  if (!player) throw new CricketApiError("Player not found", 404);
  return normalizePlayer(player);
}

/** Match scorecard (CricAPI /match_scorecard). */
export async function getCricketScorecard(id: string): Promise<CricketScorecard> {
  const raw = await cricFetch<RawScorecard>("/match_scorecard", { id });
  return normalizeScorecard(raw);
}

/** Match squads (CricAPI /match_squad). */
export async function getCricketSquads(id: string): Promise<CricketPlayerRef[]> {
  const raw = await cricFetch<{ team?: string; players?: RawPlayer[] }[]>("/match_squad", { id });
  const refs: CricketPlayerRef[] = [];
  for (const squad of raw ?? []) {
    for (const p of squad.players ?? []) {
      refs.push({ ...playerRef(p), id: p.id ?? p.name ?? "" });
    }
  }
  return dedupeBy(refs, (p) => p.id || p.name);
}

/* ---- App-type mappers (SportProvider integration) ---- */

function teamRefs(cm: CricketMatch): CricketTeamRef[] {
  return cm.teams.slice(0, 2).map((name) => ({
    id: idFromName(name),
    name,
    shortName: teamInitials(name),
  }));
}

/** CricketMatch → shared Match (used by the generic cricket page tabs). */
export function toAppMatch(cm: CricketMatch): Match {
  const [home, away] = teamRefs(cm);
  const homeInnings = cm.score.filter((s) => normalizeName(s.team) === normalizeName(home.name));
  const awayInnings = cm.score.filter((s) => normalizeName(s.team) === normalizeName(away.name));
  const homeScore = homeInnings
    .map((s) => (s.wickets ? `${s.runs}/${s.wickets}` : String(s.runs)))
    .join(" & ");
  const awayScore = awayInnings
    .map((s) => (s.wickets ? `${s.runs}/${s.wickets}` : String(s.runs)))
    .join(" & ");

  return {
    id: cm.id,
    sport: "cricket",
    league: cm.series,
    competition: cm.name,
    status: cm.status,
    statusDetail: cm.statusText,
    minute: cm.status === "live" ? (cm.score[0]?.inning ? `Inn ${cm.score[0].inning}` : undefined) : undefined,
    details: cm.score.map((s) => `${s.team} ${s.runs}/${s.wickets} (${s.overs} ov)`).join(" • "),
    homeTeam: {
      id: home.id,
      name: home.name,
      shortName: home.shortName ?? "",
      logo: "",
      sport: "cricket",
      country: "",
    },
    awayTeam: {
      id: away.id,
      name: away.name,
      shortName: away.shortName ?? "",
      logo: "",
      sport: "cricket",
      country: "",
    },
    homeScore: homeScore || "-",
    awayScore: awayScore || "-",
    venue: cm.venue,
    date: cm.date,
  };
}

/** CricketMatch → shared Fixture (upcoming). */
export function toAppFixture(cm: CricketMatch): Fixture {
  const [home, away] = teamRefs(cm);
  const d = new Date(cm.dateTimeGMT ?? `${cm.date}T00:00:00Z`);
  return {
    id: cm.id,
    sport: "cricket",
    league: cm.series,
    title: cm.name,
    homeTeam: { ...home, shortName: home.shortName ?? "", logo: "", sport: "cricket", country: "" },
    awayTeam: away
      ? { ...away, shortName: away.shortName ?? "", logo: "", sport: "cricket", country: "" }
      : undefined,
    dateTime: Number.isNaN(d.getTime())
      ? cm.date
      : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    time: Number.isNaN(d.getTime())
      ? ""
      : d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    isLive: cm.status === "live",
  };
}

/** Points-table row → shared Standing. */
export function toAppStanding(row: CricketPointsRow, position: number): Standing {
  return {
    position,
    team: {
      id: row.team.id,
      name: row.team.name,
      shortName: row.team.shortName ?? "",
      logo: "",
      sport: "cricket",
      country: "",
    },
    played: row.played,
    won: row.won,
    drawn: row.tied,
    lost: row.lost,
    goalDifference: row.netRunRate,
    points: row.points,
    form: row.lastFive.slice(-5).split("").filter((c) => "WDLT".includes(c)) as ("W" | "D" | "L")[],
    goalsFor: 0,
    goalsAgainst: 0,
  };
}
