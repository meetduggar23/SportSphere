import { Match, Standing, Team, Fixture, Player, Sport } from "@/types";

/* ---- API-Football v3 response shapes ---- */
interface APITeam {
  id: number;
  name: string;
  logo: string;
}

interface APIFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; long?: string; elapsed?: number | null };
  };
  league: { name: string; logo?: string };
  teams: { home: APITeam; away: APITeam };
  goals: { home: number | null; away: number | null };
  venue?: { name?: string };
}

interface APIStandingRow {
  rank: number;
  team: APITeam;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: { for: number; against: number };
  };
  goalsDiff: number;
  points: number;
  form?: string;
}

interface APIPlayer {
  player: { id: number; name: string; photo: string; nationality?: string; age?: number };
  statistics?: Array<{
    team?: { id?: number; name?: string; logo?: string };
    games?: { position?: string; rating?: string };
    goals?: { total?: number | null; assists?: number | null };
  }>;
}

interface APITeamResponse {
  team: APITeam;
}

function apiTeam(t: APITeam): Team {
  return {
    id: String(t.id),
    name: t.name,
    shortName: t.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase(),
    logo: t.logo,
    sport: "football",
    country: "",
  };
}

function mapStatus(status: string): "live" | "upcoming" | "finished" {
  if (["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"].includes(status)) return "live";
  if (["FT", "AET", "PEN"].includes(status)) return "finished";
  return "upcoming";
}

export function toMatch(f: APIFixture): Match {
  const status = mapStatus(f.fixture.status.short);
  const home = f.goals.home ?? 0;
  const away = f.goals.away ?? 0;
  return {
    id: String(f.fixture.id),
    sport: "football" as Sport,
    league: f.league.name,
    leagueLogo: f.league.logo,
    status,
    statusDetail: f.fixture.status.long,
    period: status === "live" ? f.fixture.status.long : undefined,
    winner:
      status === "finished"
        ? home > away
          ? "home"
          : away > home
            ? "away"
            : "draw"
        : null,
    minute: f.fixture.status.elapsed ? `${f.fixture.status.elapsed}'` : f.fixture.status.long,
    homeTeam: apiTeam(f.teams.home),
    awayTeam: apiTeam(f.teams.away),
    homeScore: home,
    awayScore: away,
    venue: f.venue?.name,
    date: f.fixture.date,
    competition: f.league.name,
  };
}

export function toFixture(f: APIFixture): Fixture {
  return {
    id: String(f.fixture.id),
    sport: "football" as Sport,
    league: f.league.name,
    title: `${f.teams.home.name} vs ${f.teams.away.name}`,
    homeTeam: apiTeam(f.teams.home),
    awayTeam: apiTeam(f.teams.away),
    dateTime: new Date(f.fixture.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    time: new Date(f.fixture.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    isLive: mapStatus(f.fixture.status.short) === "live",
  };
}

export function toStanding(s: APIStandingRow): Standing {
  return {
    position: s.rank,
    team: {
      id: String(s.team.id),
      name: s.team.name,
      shortName: s.team.name.split(" ").map((w: string) => w[0]).join("").slice(0, 3).toUpperCase(),
      logo: s.team.logo,
      sport: "football" as Sport,
      country: "",
    },
    played: s.all.played,
    won: s.all.win,
    drawn: s.all.draw,
    lost: s.all.lose,
    goalDifference: s.goalsDiff,
    points: s.points,
    form: s.form?.split("").slice(-5) as ("W" | "D" | "L")[] || [],
    goalsFor: s.all.goals.for,
    goalsAgainst: s.all.goals.against,
  };
}

export function toPlayer(p: APIPlayer): Player {
  const stats = p.statistics?.[0];
  return {
    id: String(p.player.id),
    name: p.player.name,
    photo: p.player.photo,
    team: stats?.team?.name ?? "",
    teamId: String(stats?.team?.id ?? ""),
    teamLogo: stats?.team?.logo ?? "",
    position: stats?.games?.position ?? "",
    sport: "football" as Sport,
    nationality: p.player.nationality ?? "",
    age: p.player.age ?? 0,
    stat: String(stats?.goals?.total ?? stats?.goals?.assists ?? "-"),
    statLabel: stats?.goals?.total != null ? "Goals" : stats?.goals?.assists != null ? "Assists" : "-",
    marketValue: undefined,
    rating: stats?.games?.rating ? Math.round(parseFloat(stats.games.rating)) : undefined,
  };
}

async function fetchAPI(type: string, params: Record<string, string> = {}) {
  const sp = new URLSearchParams({ type, ...params });
  const res = await fetch(`/api/football?${sp}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getLiveMatches(): Promise<Match[]> {
  const data = await fetchAPI("live");
  return data.map(toMatch);
}

export async function getFixtures(league = "39", season = "2024", next = "15"): Promise<Fixture[]> {
  const data = await fetchAPI("fixtures", { league, season, next });
  return data.map(toFixture);
}

export async function getStandings(league = "39", season = "2024"): Promise<Standing[]> {
  const data = await fetchAPI("standings", { league, season });
  if (data.length > 0 && data[0].league?.standings?.[0]) {
    return data[0].league.standings[0].map(toStanding);
  }
  return [];
}

export async function getTeams(league = "39", season = "2024"): Promise<Team[]> {
  const data = await fetchAPI("teams", { league, season });
  return data.map((t: APITeamResponse) => apiTeam(t.team));
}

export async function getTopScorers(league = "39", season = "2024"): Promise<Player[]> {
  const data = await fetchAPI("topscorers", { league, season });
  return data.map(toPlayer);
}
