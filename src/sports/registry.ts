import type { Sport } from "@/types";

/**
 * SPORT REGISTRY — the single source of truth for all 13 sports.
 *
 * Every sport's identity (id, slug, route, name, category, scoring model,
 * features, competitions) lives here. Adding or renaming a sport means
 * editing THIS file — never a dozen scattered lists.
 *
 * Dependency direction: sport modules + configs import FROM here.
 * This file imports nothing but the shared Sport type.
 */

export type ScoringType = "team" | "f1" | "mma";

export interface SportFeatures {
  liveScore: boolean;
  standings: boolean;
  players: boolean;
  statistics: boolean;
}

export interface SportDefinition {
  /** Canonical data id — matches the Sport union used across providers/data. */
  id: Sport;
  /** URL slug for the /sports/<slug> route (e.g. "formula-1"). */
  slug: string;
  /** Full display name (e.g. "Formula 1"). */
  name: string;
  /** Compact nav label (e.g. "F1"). */
  shortName: string;
  description: string;
  gradient: string;
  category: "primary" | "secondary";
  enabled: boolean;
  /** Score shape kind — drives sport-specific rendering decisions. */
  scoringType: ScoringType;
  features: SportFeatures;
  /** Competitions shown on the sport page sidebar. */
  competitions: string[];
  /** Old top-level route that redirects to /sports/<slug>. */
  legacyPath: string;
  /** Canonical route: /sports/<slug>. */
  route: string;
  /** Optional provider league id (football). */
  apiId?: number;
}

export const SPORTS: SportDefinition[] = [
  {
    id: "cricket",
    slug: "cricket",
    name: "Cricket",
    shortName: "Cricket",
    description: "Tests, T20, IPL & more",
    gradient: "from-brand-navy/25 to-brand/10",
    category: "primary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["IPL", "T20 World Cup", "World Cup", "The Ashes", "Border-Gavaskar Trophy", "Champions Trophy"],
    legacyPath: "/cricket",
    route: "/sports/cricket",
  },
  {
    id: "football",
    slug: "football",
    name: "Football (Soccer)",
    shortName: "Football",
    description: "Leagues, live scores, transfers",
    gradient: "from-brand/25 to-brand-maroon/10",
    category: "primary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "UEFA Champions League", "Europa League", "FIFA World Cup"],
    legacyPath: "/football",
    route: "/sports/football",
    apiId: 39,
  },
  {
    id: "basketball",
    slug: "basketball",
    name: "Basketball",
    shortName: "Basketball",
    description: "Playoffs, EuroLeague & more",
    gradient: "from-brand-purple/25 to-brand-maroon/10",
    category: "primary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["NBA", "NBA Playoffs", "EuroLeague", "FIBA World Cup", "WNBA"],
    legacyPath: "/basketball",
    route: "/sports/basketball",
  },
  {
    id: "baseball",
    slug: "baseball",
    name: "Baseball",
    shortName: "Baseball",
    description: "MLB, World Series",
    gradient: "from-brand-maroon/25 to-brand/10",
    category: "secondary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["MLB", "World Series", "AL", "NL", "Minor Leagues"],
    legacyPath: "/baseball",
    route: "/sports/baseball",
  },
  {
    id: "hockey",
    slug: "hockey",
    name: "Hockey",
    shortName: "Hockey",
    description: "NHL, Stanley Cup",
    gradient: "from-brand-maroon/25 to-brand-navy/10",
    category: "primary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["NHL", "Stanley Cup", "AHL", "IIHF", "World Juniors"],
    legacyPath: "/hockey",
    route: "/sports/hockey",
  },
  {
    id: "volleyball",
    slug: "volleyball",
    name: "Volleyball",
    shortName: "Volleyball",
    description: "VNL, Olympics",
    gradient: "from-brand/25 to-brand-navy/10",
    category: "secondary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["VNL", "Olympics", "World Championship", "CEV Champions League", "AVC Championship"],
    legacyPath: "/volleyball",
    route: "/sports/volleyball",
  },
  {
    id: "rugby",
    slug: "rugby",
    name: "Rugby",
    shortName: "Rugby",
    description: "Six Nations, World Cup",
    gradient: "from-brand-purple/25 to-brand-navy/10",
    category: "secondary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["Six Nations", "Rugby Championship", "World Cup", "Premiership", "Top 14"],
    legacyPath: "/rugby",
    route: "/sports/rugby",
  },
  {
    id: "f1",
    slug: "formula-1",
    name: "Formula 1",
    shortName: "F1",
    description: "Races, standings, drivers",
    gradient: "from-brand/25 to-brand-purple/10",
    category: "primary",
    enabled: true,
    scoringType: "f1",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["Formula 1", "F1 Sprint", "F2 Championship", "F1 Academy"],
    legacyPath: "/f1",
    route: "/sports/formula-1",
  },
  {
    id: "mma",
    slug: "mma",
    name: "MMA",
    shortName: "MMA",
    description: "UFC, fight nights, rankings",
    gradient: "from-brand/25 to-brand-maroon/10",
    category: "secondary",
    enabled: true,
    scoringType: "mma",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["UFC", "PFL", "Bellator", "ONE Championship", "Fight Night"],
    legacyPath: "/mma",
    route: "/sports/mma",
  },
  {
    id: "nfl",
    slug: "nfl",
    name: "NFL",
    shortName: "NFL",
    description: "Super Bowl, AFC & NFC",
    gradient: "from-brand-navy/25 to-brand-purple/10",
    category: "primary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["NFL", "Super Bowl", "NFC", "AFC", "College Football"],
    legacyPath: "/nfl",
    route: "/sports/nfl",
  },
  {
    id: "nba",
    slug: "nba",
    name: "NBA",
    shortName: "NBA",
    description: "Finals, playoffs, draft",
    gradient: "from-brand-maroon/25 to-brand/10",
    category: "secondary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["NBA Finals", "NBA Playoffs", "NBA Draft", "NBA Cup", "Summer League"],
    legacyPath: "/nba",
    route: "/sports/nba",
  },
  {
    id: "handball",
    slug: "handball",
    name: "Handball",
    shortName: "Handball",
    description: "World Championships, club leagues",
    gradient: "from-brand-navy/25 to-brand-maroon/10",
    category: "secondary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["IHF World Championship", "EHF Champions League", "Olympic Games", "European Championship", "World League"],
    legacyPath: "/handball",
    route: "/sports/handball",
  },
  {
    id: "afl",
    slug: "afl",
    name: "Australian Rules Football",
    shortName: "AFL",
    description: "AFL, Grand Final",
    gradient: "from-brand-maroon/25 to-brand-purple/10",
    category: "secondary",
    enabled: true,
    scoringType: "team",
    features: { liveScore: true, standings: true, players: true, statistics: true },
    competitions: ["AFL", "AFLW", "Pre-Season", "Finals Series", "Grand Final"],
    legacyPath: "/afl",
    route: "/sports/afl",
  },
];

/** Canonical editorial order — cricket-first, never football-biased. */
export const sportIds = (): Sport[] => SPORTS.filter((s) => s.enabled).map((s) => s.id);

export const primarySports = SPORTS.filter((s) => s.category === "primary");
export const secondarySports = SPORTS.filter((s) => s.category === "secondary");

export function getSport(id: Sport): SportDefinition {
  return SPORTS.find((s) => s.id === id) ?? SPORTS[0];
}

export function getSportBySlug(slug: string): SportDefinition | undefined {
  return SPORTS.find((s) => s.slug === slug);
}

/** Display label for a sport definition, special-casing formula-1. */
export function sportLabel(id: Sport, shortName: string): string {
  return id === "f1" ? "Formula 1" : shortName;
}
