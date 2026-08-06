export type Sport =
  | "football"
  | "cricket"
  | "basketball"
  | "f1"
  | "nfl"
  | "baseball"
  | "hockey"
  | "mma"
  | "rugby"
  | "volleyball"
  | "handball"
  | "afl"
  | "nba";

export const sportLabels: Record<Sport, string> = {
  football: "Football (Soccer)",
  cricket: "Cricket",
  basketball: "Basketball",
  f1: "Formula 1",
  nfl: "NFL",
  baseball: "Baseball",
  hockey: "Hockey",
  mma: "MMA",
  rugby: "Rugby",
  volleyball: "Volleyball",
  handball: "Handball",
  afl: "Australian Rules Football",
  nba: "NBA",
};

export const sportIcons: Record<Sport, string> = {
  football: "⚽",
  cricket: "🏏",
  basketball: "🏀",
  f1: "🏎️",
  nfl: "🏈",
  baseball: "⚾",
  hockey: "🏒",
  mma: "🥋",
  rugby: "🏉",
  volleyball: "🏐",
  handball: "🤾",
  afl: "🏉",
  nba: "🏀",
};

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  sport: Sport;
  country: string;
  city?: string;
  founded?: number;
  coach?: string;
  stadium?: string;
  capacity?: number;
  colors?: string[];
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  team: string;
  teamId: string;
  teamLogo: string;
  position: string;
  sport: Sport;
  nationality: string;
  age: number;
  stat: string;
  statLabel: string;
  marketValue?: string;
  rating?: number;
}

export interface Match {
  id: string;
  sport: Sport;
  league: string;
  leagueLogo?: string;
  status: "live" | "upcoming" | "finished";
  time?: string;
  minute?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | string;
  awayScore: number | string;
  venue?: string;
  details?: string;
  date?: string;
  competition?: string;
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  sport: Sport;
  category: string;
  timeAgo: string;
  isBreaking?: boolean;
  author?: string;
  views?: string;
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  points: number;
  form?: ("W" | "D" | "L")[];
  goalsFor?: number;
  goalsAgainst?: number;
}

export interface Fixture {
  id: string;
  sport: Sport;
  league: string;
  title: string;
  homeTeam: Team;
  awayTeam?: Team;
  dateTime: string;
  time: string;
  isLive?: boolean;
}

export interface TrendingItem {
  id: string;
  rank: number;
  title: string;
  subtitle: string;
  logos: string[];
  trend: "up" | "down" | "steady";
}

export interface StatsCard {
  label: string;
  value: number | string;
  subtitle: string;
  icon: string;
  color: string;
}

export interface Tournament {
  id: string;
  name: string;
  sport: Sport;
  country: string;
  season: string;
  logo?: string;
  prizePool?: string;
  teams?: number;
  matches?: number;
  status: "active" | "upcoming" | "finished";
  format?: string;
}

export interface Transfer {
  id: string;
  playerName: string;
  playerPhoto: string;
  fromTeam: string;
  fromTeamLogo: string;
  toTeam: string;
  toTeamLogo: string;
  fee: string;
  date: string;
  status: "confirmed" | "rumored" | "completed";
  sport: Sport;
}

export interface Prediction {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeWin: number;
  draw: number;
  awayWin: number;
  confidence: number;
  sport: Sport;
  league: string;
  date: string;
  reason: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  sport: Sport;
  category: string;
  date: string;
}

export interface TimelineEvent {
  minute: string;
  type: "goal" | "yellow" | "red" | "sub" | "var" | "info";
  team: "home" | "away";
  player: string;
  detail?: string;
  icon?: string;
}

export interface MatchComment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

export interface MatchStats {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  offsides: number;
  passes: number;
  passAccuracy: number;
  xg: number;
}

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SidebarSubMenuItem {
  label: string;
  href: string;
}

export interface SidebarGroupItem {
  label: string;
  children: SidebarSubMenuItem[];
}
