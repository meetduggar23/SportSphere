import { allSportsSidebarOrder } from "@/config/sidebar";
import { Sport } from "@/types";

export interface SportConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  href: string;
  gradient: string;
  category: "primary" | "secondary";
  enabled: boolean;
  apiId?: number;
}

export const sportsConfig: SportConfig[] = [
  {
    id: "cricket",
    name: "Cricket",
    shortName: "Cricket",
    description: "Tests, T20, IPL & more",
    href: "/cricket",
gradient: "from-brand-navy/25 to-brand/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "football",
    name: "Football (Soccer)",
    shortName: "Football",
    description: "Leagues, live scores, transfers",
    href: "/football",
    gradient: "from-brand/25 to-brand-maroon/10",
    category: "primary",
    enabled: true,
    apiId: 39,
  },
  {
    id: "basketball",
    name: "Basketball",
    shortName: "Basketball",
    description: "Playoffs, EuroLeague & more",
    href: "/basketball",
    gradient: "from-brand-purple/25 to-brand-maroon/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "nfl",
    name: "NFL",
    shortName: "NFL",
    description: "Super Bowl, AFC & NFC",
    href: "/nfl",
    gradient: "from-brand-navy/25 to-brand-purple/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "hockey",
    name: "Hockey",
    shortName: "Hockey",
    description: "NHL, Stanley Cup",
    href: "/hockey",
    gradient: "from-brand-maroon/25 to-brand-navy/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "formula-1",
    name: "Formula 1",
    shortName: "F1",
    description: "Races, standings, drivers",
    href: "/f1",
    gradient: "from-brand/25 to-brand-purple/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "rugby",
    name: "Rugby",
    shortName: "Rugby",
    description: "Six Nations, World Cup",
    href: "/rugby",
    gradient: "from-brand-purple/25 to-brand-navy/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "baseball",
    name: "Baseball",
    shortName: "Baseball",
    description: "MLB, World Series",
    href: "/baseball",
    gradient: "from-brand-maroon/25 to-brand/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "volleyball",
    name: "Volleyball",
    shortName: "Volleyball",
    description: "VNL, Olympics",
    href: "/volleyball",
    gradient: "from-brand/25 to-brand-navy/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "mma",
    name: "MMA",
    shortName: "MMA",
    description: "UFC, fight nights, rankings",
    href: "/mma",
    gradient: "from-brand/25 to-brand-maroon/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "handball",
    name: "Handball",
    shortName: "Handball",
    description: "World Championships, club leagues",
    href: "/handball",
    gradient: "from-brand-navy/25 to-brand-maroon/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "afl",
    name: "Australian Rules Football",
    shortName: "AFL",
    description: "AFL, Grand Final",
    href: "/afl",
    gradient: "from-brand-maroon/25 to-brand-purple/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "nba",
    name: "NBA",
    shortName: "NBA",
    description: "Finals, playoffs, draft",
    href: "/nba",
    gradient: "from-brand-maroon/25 to-brand/10",
    category: "secondary",
    enabled: true,
  },
];

export const primarySports = sportsConfig.filter((s) => s.category === "primary");
export const secondarySports = sportsConfig.filter((s) => s.category === "secondary");
export const allSports = sportsConfig;

export function getSportConfig(id: string): SportConfig | undefined {
  return sportsConfig.find((s) => s.id === id);
}

export interface SportAccent {
  accent: string;
  soft: string;
  gradient: string;
}

/**
 * Theme-adaptive hero accents — built entirely from the live design tokens
 * (var(--sport-accent) / var(--sport-surface)) so the same value resolves
 * to light-blue in the light theme and gold in the dark theme.
 */
const ACCENT_WASH: SportAccent = {
  accent: "var(--sport-accent)",
  soft: "color-mix(in srgb, var(--sport-accent) 28%, transparent)",
  gradient:
    "linear-gradient(135deg, color-mix(in srgb, var(--sport-accent) 32%, transparent) 0%, var(--surface-1) 55%, var(--surface-2) 100%)",
};

const DEEP_WASH: SportAccent = {
  accent: "var(--sport-accent)",
  soft: "color-mix(in srgb, var(--sport-accent) 44%, transparent)",
  gradient:
    "linear-gradient(135deg, color-mix(in srgb, var(--sport-accent) 48%, transparent) 0%, var(--surface-1) 60%, var(--surface-2) 100%)",
};

export const sportAccents: Record<string, SportAccent> = {
  football: ACCENT_WASH,
  cricket: ACCENT_WASH,
  f1: ACCENT_WASH,
  mma: ACCENT_WASH,
  baseball: ACCENT_WASH,
  basketball: DEEP_WASH,
  nba: DEEP_WASH,
  nfl: DEEP_WASH,
  hockey: DEEP_WASH,
  rugby: DEEP_WASH,
  volleyball: DEEP_WASH,
  handball: DEEP_WASH,
  afl: DEEP_WASH,
};

export function getSportAccent(id: string): SportAccent {
  return sportAccents[id] ?? ACCENT_WASH;
}

/**
 * All supported sports in the canonical editorial order (cricket-first,
 * never football-biased) — used by the top navigation and sports surfaces.
 */
export const orderedSports: SportConfig[] = allSportsSidebarOrder
  .map((id) => sportsConfig.find((s) => s.id === id))
  .filter((s): s is SportConfig => Boolean(s));

/** Display label for a sport id, special-casing "formula-1". */
export function sportLabel(id: string, shortName: string): string {
  return id === "formula-1" ? "Formula 1" : shortName;
}
