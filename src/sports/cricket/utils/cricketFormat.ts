import type { CricketFormatId, CricketInnings } from "@/sports/cricket/types/cricketTypes";
import {
  CRICAPI_MATCH_TYPE_MAP,
  IPL_SERIES_MARKERS,
  IPL_TEAM_NAMES,
} from "@/sports/cricket/config/cricketConfig";

/**
 * CRICKET UTILITIES — pure helpers shared across services and components.
 * No data lives here; everything is derived from provider payloads + config.
 */

/** Normalize a team/series name for comparisons. */
export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

/** True when a match/series belongs to the IPL franchise league. */
export function isIplName(series: string, teams: string[] = []): boolean {
  const haystack = normalizeName(series);
  if (IPL_SERIES_MARKERS.some((m) => haystack.includes(m))) return true;
  return teams.some((t) => IPL_TEAM_NAMES.has(normalizeName(t)));
}

/**
 * Classify a CricAPI match into a canonical format.
 * - IPL is its own format, never confused with T20I/T20.
 * - Explicit international types (test/odi/t20i) win over series heuristics.
 */
export function classifyFormat(
  matchType?: string,
  series?: string,
  teams: string[] = []
): CricketFormatId {
  const direct = matchType ? CRICAPI_MATCH_TYPE_MAP[normalizeName(matchType)] : undefined;
  if (direct === "t20i") return "t20i";
  if (direct === "test") return "test";
  if (direct === "odi") return "odi";
  if (isIplName(series ?? "", teams)) return "ipl";
  if (direct === "t20") return "t20";
  return "t20";
}

/**
 * Map a CricAPI match to a UI status using only provider facts:
 * - explicit matchStarted/matchEnded flags when present,
 * - the result text when it clearly describes a completed match,
 * - otherwise the date (future = upcoming, past = finished).
 */
export function mapMatchStatus(
  statusText: string,
  date: string,
  matchStarted?: boolean,
  matchEnded?: boolean
): "live" | "upcoming" | "finished" {
  if (matchEnded === true) return "finished";
  if (matchStarted === true) {
    // A started match that is not ended is live — unless the text proves it
    // finished without the flag.
    if (/won by|drawn|match tied|tied$|abandoned|no result|cancelled/i.test(statusText)) {
      return "finished";
    }
    return "live";
  }
  if (matchStarted === false && /won by|drawn|match tied|abandoned|no result/i.test(statusText)) {
    return "finished";
  }
  // No explicit flags: date + result text decide.
  if (/won by|drawn|match tied|abandoned|no result|cancelled/i.test(statusText)) {
    return "finished";
  }
  if (date) {
    const d = new Date(`${date}T23:59:59Z`).getTime();
    if (!Number.isNaN(d) && d > Date.now()) return "upcoming";
  }
  return "live";
}

/** Render a score line, e.g. "287/6" or "287" (no wickets lost). */
export function formatInningsScore(innings: CricketInnings): string {
  if (!innings || innings.runs == null) return "";
  return innings.wickets == null || innings.wickets === 0
    ? String(innings.runs)
    : `${innings.runs}/${innings.wickets}`;
}

/** Render an innings summary line: "India 287/6 (52.0 ov)". */
export function formatInningsSummary(innings: CricketInnings): string {
  const score = formatInningsScore(innings);
  const overs = innings.overs != null ? ` (${Number(innings.overs).toFixed(1)} ov)` : "";
  return `${innings.team} ${score}${overs}`;
}

/** Format a large number with thousands separators: 15921 → "15,921". */
export function formatNumber(value?: number): string {
  if (value == null || Number.isNaN(value)) return "-";
  return Math.round(value).toLocaleString("en-US");
}

/** Format a decimal to the given precision (default 2). */
export function formatDecimal(value?: number, digits = 2): string {
  if (value == null || Number.isNaN(value)) return "-";
  return value.toFixed(digits);
}

/** Short initials for a team name, e.g. "Mumbai Indians" → "MI". */
export function teamInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

/** Stable id from a name — used to dedupe teams/players by identity. */
export function idFromName(name: string): string {
  return `c-${normalizeName(name).replace(/[^a-z0-9]+/g, "-")}`;
}

/**
 * Stable URL slug for a team identity, e.g. "India" → "india",
 * "Papua New Guinea" → "papua-new-guinea". Kept separate from idFromName so
 * team routes read naturally (/sports/cricket/team/india).
 */
export function teamSlug(name: string): string {
  return normalizeName(name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Dedupe a list by a key function, preserving first occurrence order. */
export function dedupeBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

/** ISO timestamp for provenance metadata. */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Parse an ISO timestamp into a friendly "Updated 2h ago" label. */
export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "never";
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return "never";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/** Format an ISO date into "12 Aug 2026". */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}
