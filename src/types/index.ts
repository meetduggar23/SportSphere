export type Sport = "football" | "cricket" | "basketball" | "f1" | "tennis" | "baseball" | "hockey";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  sport: Sport;
  country: string;
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  team: string;
  teamLogo: string;
  position: string;
  sport: Sport;
  stat: string;
  statLabel: string;
}

export interface Match {
  id: string;
  sport: Sport;
  league: string;
  leagueLogo?: string;
  status: "live" | "upcoming" | "finished";
  time?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | string;
  awayScore: number | string;
  venue?: string;
  matchTime?: string;
  details?: string;
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
  form?: string[];
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
}

export interface StatsCard {
  label: string;
  value: number | string;
  subtitle: string;
  icon: string;
  color: string;
}
