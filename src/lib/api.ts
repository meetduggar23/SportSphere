import { Match, Standing, Team, Fixture, Player, Sport } from "@/types";

function apiTeam(t: { id: number; name: string; logo: string }): Team {
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

export function toMatch(f: any): Match {
  return {
    id: String(f.fixture.id),
    sport: "football" as Sport,
    league: f.league.name,
    leagueLogo: f.league.logo,
    status: mapStatus(f.fixture.status.short),
    minute: f.fixture.status.elapsed ? `${f.fixture.status.elapsed}'` : f.fixture.status.long,
    homeTeam: apiTeam(f.teams.home),
    awayTeam: apiTeam(f.teams.away),
    homeScore: f.goals.home ?? 0,
    awayScore: f.goals.away ?? 0,
    venue: f.venue?.name,
    date: f.fixture.date,
    competition: f.league.name,
  };
}

export function toFixture(f: any): Fixture {
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

export function toStanding(s: any): Standing {
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
    form: s.form?.split("").slice(-5) || [],
    goalsFor: s.all.goals.for,
    goalsAgainst: s.all.goals.against,
  };
}

export function toPlayer(p: any): Player {
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
    nationality: p.player.nationality,
    age: p.player.age,
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

export async function getMatchesByDate(date: string): Promise<Match[]> {
  const data = await fetchAPI("matches", { date });
  return data.map(toMatch);
}

export async function getFixtures(league = "39", season = "2025", next = "15"): Promise<Fixture[]> {
  const data = await fetchAPI("fixtures", { league, season, next });
  return data.map(toFixture);
}

export async function getStandings(league = "39", season = "2025"): Promise<Standing[]> {
  const data = await fetchAPI("standings", { league, season });
  if (data.length > 0 && data[0].league?.standings?.[0]) {
    return data[0].league.standings[0].map(toStanding);
  }
  return [];
}

export async function getTeams(league = "39", season = "2025"): Promise<Team[]> {
  const data = await fetchAPI("teams", { league, season });
  return data.map((t: any) => apiTeam(t.team));
}

export async function getTopScorers(league = "39", season = "2025"): Promise<Player[]> {
  const data = await fetchAPI("topscorers", { league, season });
  return data.map(toPlayer);
}
