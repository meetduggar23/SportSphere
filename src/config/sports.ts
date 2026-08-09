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

export const sportAccents: Record<string, SportAccent> = {
  football: { accent: "#d39d55", soft: "rgba(211, 157, 85, 0.16)", gradient: "linear-gradient(135deg, rgba(211,157,85,0.2), rgba(255,248,230,0.4))" },
  cricket: { accent: "#8d0b41", soft: "rgba(141, 11, 65, 0.12)", gradient: "linear-gradient(135deg, rgba(141,11,65,0.1), rgba(255,248,230,0.4))" },
  basketball: { accent: "#b7624d", soft: "rgba(183, 98, 77, 0.14)", gradient: "linear-gradient(135deg, rgba(183,98,77,0.16), rgba(255,248,230,0.4))" },
  nba: { accent: "#8d0b41", soft: "rgba(141, 11, 65, 0.12)", gradient: "linear-gradient(135deg, rgba(141,11,65,0.1), rgba(255,248,230,0.4))" },
  f1: { accent: "#d39d55", soft: "rgba(211, 157, 85, 0.16)", gradient: "linear-gradient(135deg, rgba(211,157,85,0.2), rgba(255,248,230,0.4))" },
  nfl: { accent: "#b7624d", soft: "rgba(183, 98, 77, 0.14)", gradient: "linear-gradient(135deg, rgba(183,98,77,0.16), rgba(255,248,230,0.4))" },
  mma: { accent: "#8d0b41", soft: "rgba(141, 11, 65, 0.12)", gradient: "linear-gradient(135deg, rgba(141,11,65,0.1), rgba(255,248,230,0.4))" },
  hockey: { accent: "#d39d55", soft: "rgba(211, 157, 85, 0.16)", gradient: "linear-gradient(135deg, rgba(211,157,85,0.2), rgba(255,248,230,0.4))" },
  rugby: { accent: "#b7624d", soft: "rgba(183, 98, 77, 0.14)", gradient: "linear-gradient(135deg, rgba(183,98,77,0.16), rgba(255,248,230,0.4))" },
  baseball: { accent: "#8d0b41", soft: "rgba(141, 11, 65, 0.12)", gradient: "linear-gradient(135deg, rgba(141,11,65,0.1), rgba(255,248,230,0.4))" },
  volleyball: { accent: "#d39d55", soft: "rgba(211, 157, 85, 0.16)", gradient: "linear-gradient(135deg, rgba(211,157,85,0.2), rgba(255,248,230,0.4))" },
  handball: { accent: "#b7624d", soft: "rgba(183, 98, 77, 0.14)", gradient: "linear-gradient(135deg, rgba(183,98,77,0.16), rgba(255,248,230,0.4))" },
  afl: { accent: "#d39d55", soft: "rgba(211, 157, 85, 0.16)", gradient: "linear-gradient(135deg, rgba(211,157,85,0.2), rgba(255,248,230,0.4))" },
};

export function getSportAccent(id: string): SportAccent {
  return sportAccents[id] ?? {
    accent: "#d39d55",
    soft: "rgba(211, 157, 85, 0.16)",
    gradient: "linear-gradient(135deg, rgba(211,157,85,0.2), rgba(255,248,230,0.4))",
  };
}
