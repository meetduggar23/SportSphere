import { Match, Fixture, Standing, Sport, Team } from "@/types";
import { sportApiConfigs, SportApiConfig } from "@/config/sport-apis";

/* ---- API-SPORTS response shapes (verified via live probes) ---- */

interface ApiTeamRef {
  id?: number;
  name?: string;
  logo?: string;
  winner?: boolean;
}

interface ApiGame {
  id?: number;
  date?: string;
  time?: string;
  timestamp?: number;
  venue?: string | null;
  status?: { long?: string; short?: string };
  league?: { id?: number; name?: string; logo?: string; season?: number };
  country?: { name?: string };
  teams?: { home?: ApiTeamRef; away?: ApiTeamRef };
  scores?: { home?: { total?: number }; away?: { total?: number } };
}

interface ApiFight {
  id?: number;
  date?: string;
  timestamp?: number;
  slug?: string;
  category?: string;
  status?: { long?: string; short?: string };
  fighters?: { first?: ApiTeamRef; second?: ApiTeamRef };
}

interface ApiRace {
  id?: number;
  date?: string;
  type?: string;
  competition?: {
    id?: number;
    name?: string;
    location?: { country?: string; city?: string };
  };
  circuit?: { id?: number; name?: string; image?: string };
}

interface ApiStandingRow {
  position?: number;
  rank?: number;
  team?: ApiTeamRef;
  country?: { name?: string };
  games?: {
    played?: number;
    win?: { total?: number } | number;
    win_overtime?: { total?: number } | number;
    lose?: { total?: number } | number;
    lose_overtime?: { total?: number } | number;
    draw?: { total?: number } | number;
  };
  points?: { for?: number; against?: number; total?: number } | number;
  form?: string;
}

/* ---- Helpers ---- */

async function fetchSport(apiId: string, type: string): Promise<unknown[]> {
  // Browsers can use a relative URL; the server cannot resolve one, so it
  // self-fetches against an absolute base (NEXT_PUBLIC_SITE_URL, Vercel's
  // auto-injected VERCEL_URL, or localhost as a last resort).
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000"
      : "";
  const res = await fetch(`${base}/api/sport/${apiId}?type=${type}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? (data as unknown[]) : [];
}

function shortName(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function toTeam(t: ApiTeamRef | undefined, sport: Sport, country?: string): Team {
  const name = t?.name ?? "TBD";
  return {
    id: String(t?.id ?? name),
    name,
    shortName: shortName(name),
    logo: t?.logo ?? "",
    sport,
    country: country ?? "",
  };
}

/** Generic status mapping for all team sports + MMA. */
function mapStatus(short?: string | null): "live" | "upcoming" | "finished" {
  if (!short) return "upcoming";
  const s = short.toUpperCase();
  if (["NS", "TBA", "PST", "DEL", "SUS", "ABD", "WO", "CANC"].includes(s)) return "upcoming";
  if (["FT", "AET", "PEN", "SO", "AP", "AOT", "CO", "POD", "POST"].includes(s)) return "finished";
  return "live";
}

function total(v: { total?: number } | number | undefined): number {
  return typeof v === "number" ? v : (v?.total ?? 0);
}

function fallbackId(id: unknown, name: string): string {
  return String(id ?? (name || "item"));
}

/* ---- Team-sport game mappers ---- */

function toMatchFromGame(g: ApiGame, cfg: SportApiConfig): Match {
  const status = mapStatus(g.status?.short);
  const home = g.scores?.home?.total ?? 0;
  const away = g.scores?.away?.total ?? 0;
  return {
    id: fallbackId(g.id, `${g.timestamp ?? ""}-${g.league?.name ?? ""}`),
    sport: cfg.sport,
    league: g.league?.name ?? "",
    leagueLogo: g.league?.logo,
    status,
    statusDetail: g.status?.short,
    period: status === "live" ? g.status?.long : undefined,
    winner:
      status === "finished"
        ? home > away
          ? "home"
          : away > home
            ? "away"
            : "draw"
        : null,
    minute: g.status?.long ?? (status === "live" ? g.status?.short : undefined),
    homeTeam: toTeam(g.teams?.home, cfg.sport, g.country?.name),
    awayTeam: toTeam(g.teams?.away, cfg.sport, g.country?.name),
    homeScore: home,
    awayScore: away,
    venue: g.venue ?? "",
    date: g.date,
    competition: g.league?.name,
  };
}

function toFixtureFromGame(g: ApiGame, cfg: SportApiConfig): Fixture {
  const d = new Date(g.date ?? "");
  return {
    id: fallbackId(g.id, String(d.getTime())),
    sport: cfg.sport,
    league: g.league?.name ?? "",
    title: g.league?.name ?? "Game",
    homeTeam: toTeam(g.teams?.home, cfg.sport, g.country?.name),
    awayTeam: toTeam(g.teams?.away, cfg.sport, g.country?.name),
    dateTime: isNaN(d.getTime())
      ? g.date ?? ""
      : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    time: isNaN(d.getTime())
      ? ""
      : d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    isLive: mapStatus(g.status?.short) === "live",
  };
}

/* ---- MMA fight mapper ---- */

function toMatchFromFight(f: ApiFight, cfg: SportApiConfig): Match {
  const status = mapStatus(f.status?.short);
  const first = f.fighters?.first;
  const second = f.fighters?.second;
  const homeWin = Boolean(first?.winner);
  const awayWin = Boolean(second?.winner);
  return {
    id: fallbackId(f.id, String(f.timestamp ?? "")),
    sport: cfg.sport,
    league: f.slug?.split(":")[0]?.trim() ?? "UFC",
    status,
    statusDetail: f.status?.short,
    period: status === "live" ? f.status?.long : undefined,
    winner: status === "finished" ? (homeWin ? "home" : awayWin ? "away" : null) : null,
    minute: f.status?.long,
    homeTeam: toTeam(first, cfg.sport),
    awayTeam: toTeam(second, cfg.sport),
    homeScore: homeWin ? 1 : 0,
    awayScore: awayWin ? 1 : 0,
    venue: f.slug,
    date: f.date,
    competition: f.category,
  };
}

/* ---- F1 race mapper (race calendar only) ---- */

function toFixtureFromRace(r: ApiRace, cfg: SportApiConfig): Fixture {
  const d = new Date(r.date ?? "");
  return {
    id: fallbackId(r.id, String(d.getTime())),
    sport: cfg.sport,
    league: "FIA Formula 1",
    title: r.type === "Race" ? "Race" : r.type ?? "Session",
    homeTeam: {
      id: fallbackId(r.competition?.id, String(r.id ?? "")),
      name: r.competition?.name ?? "Grand Prix",
      shortName: shortName(r.competition?.name ?? "GP"),
      logo: r.circuit?.image ?? "",
      sport: cfg.sport,
      country: r.competition?.location?.country ?? "",
    },
    awayTeam: {
      id: fallbackId(r.circuit?.id, String(r.id ?? "")),
      name: r.circuit?.name ?? "",
      shortName: shortName(r.circuit?.name ?? "CIR"),
      logo: "",
      sport: cfg.sport,
      country: r.competition?.location?.city ?? "",
    },
    dateTime: isNaN(d.getTime())
      ? r.date ?? ""
      : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    time: isNaN(d.getTime())
      ? ""
      : d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    isLive: false,
  };
}

/* ---- Standings mapper (handles flat, nested-group and football-style shapes) ---- */

function flattenStandings(resp: unknown[]): ApiStandingRow[] {
  const rows: ApiStandingRow[] = [];
  const visit = (item: unknown) => {
    if (Array.isArray(item)) {
      item.forEach(visit);
    } else if (item && typeof item === "object") {
      const obj = item as Record<string, unknown>;
      if (Array.isArray(obj.standings)) {
        (obj.standings as unknown[]).forEach(visit);
      } else if (obj.team || obj.position || obj.rank) {
        rows.push(item as ApiStandingRow);
      } else {
        Object.values(obj).forEach(visit);
      }
    }
  };
  resp.forEach(visit);
  return rows;
}

function toStanding(s: ApiStandingRow, cfg: SportApiConfig): Standing {
  const games = s.games ?? {};
  const win = total(games.win);
  const winOt = total(games.win_overtime);
  const lose = total(games.lose);
  const loseOt = total(games.lose_overtime);
  const draw = total(games.draw);
  const played = games.played ?? win + lose + draw;
  const pointsFor = typeof s.points === "number" ? 0 : (s.points?.for ?? 0);
  const pointsAgainst = typeof s.points === "number" ? 0 : (s.points?.against ?? 0);
  const pointsRaw =
    typeof s.points === "number" ? s.points : (s.points?.total ?? null);
  const points = pointsRaw ?? win * 2 + winOt * 2 + loseOt * 1 + draw * 1;
  return {
    position: s.position ?? s.rank ?? 0,
    team: toTeam(s.team, cfg.sport, s.country?.name),
    played,
    won: win + winOt,
    drawn: draw,
    lost: lose + loseOt,
    goalDifference: pointsFor - pointsAgainst,
    points,
    form: (s.form ?? "").split("").slice(-5) as ("W" | "D" | "L")[],
    goalsFor: pointsFor,
    goalsAgainst: pointsAgainst,
  };
}

/* ---- Public API ---- */

export async function getSportMatches(sport: Sport): Promise<Match[]> {
  const cfg = sportApiConfigs[sport];
  if (!cfg) return [];
  const raw = await fetchSport(cfg.apiId, "matches");
  if (cfg.kind === "mma") {
    return (raw as ApiFight[])
      .slice(0, 24)
      .map((f) => toMatchFromFight(f, cfg));
  }
  if (cfg.kind === "f1") return [];
  return (raw as ApiGame[]).map((g) => toMatchFromGame(g, cfg));
}

export async function getSportFixtures(sport: Sport): Promise<Fixture[]> {
  const cfg = sportApiConfigs[sport];
  if (!cfg) return [];
  const raw = await fetchSport(cfg.apiId, "fixtures");
  if (cfg.kind === "f1") {
    return (raw as ApiRace[])
      .filter(
        (r) =>
          r.type === "Race" &&
          new Date(r.date ?? "").getTime() >= Date.now() - 6 * 3600 * 1000
      )
      .sort(
        (a, b) =>
          new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime()
      )
      .slice(0, 15)
      .map((r) => toFixtureFromRace(r, cfg));
  }
  if (cfg.kind === "mma") return [];
  return (raw as ApiGame[])
    .filter(
      (g) =>
        new Date(g.date ?? "").getTime() >= Date.now() - 6 * 3600 * 1000
    )
    .sort(
      (a, b) =>
        new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime()
    )
    .slice(0, 15)
    .map((g) => toFixtureFromGame(g, cfg));
}

export async function getSportStandings(sport: Sport): Promise<Standing[]> {
  const cfg = sportApiConfigs[sport];
  if (!cfg || cfg.kind !== "team") return [];
  const raw = await fetchSport(cfg.apiId, "standings");
  return flattenStandings(raw)
    .slice(0, 20)
    .map((s) => toStanding(s, cfg));
}
