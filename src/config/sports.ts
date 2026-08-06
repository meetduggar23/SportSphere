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
    gradient: "from-sky-500/20 to-blue-500/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "football",
    name: "Football (Soccer)",
    shortName: "Football",
    description: "Leagues, live scores, transfers",
    href: "/football",
    gradient: "from-emerald-500/20 to-green-500/10",
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
    gradient: "from-orange-500/20 to-amber-500/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "nfl",
    name: "NFL",
    shortName: "NFL",
    description: "Super Bowl, AFC & NFC",
    href: "/nfl",
    gradient: "from-amber-700/20 to-orange-600/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "hockey",
    name: "Hockey",
    shortName: "Hockey",
    description: "NHL, Stanley Cup",
    href: "/hockey",
    gradient: "from-cyan-500/20 to-teal-500/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "formula-1",
    name: "Formula 1",
    shortName: "F1",
    description: "Races, standings, drivers",
    href: "/f1",
    gradient: "from-red-500/20 to-rose-500/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "rugby",
    name: "Rugby",
    shortName: "Rugby",
    description: "Six Nations, World Cup",
    href: "/rugby",
    gradient: "from-teal-500/20 to-cyan-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "baseball",
    name: "Baseball",
    shortName: "Baseball",
    description: "MLB, World Series",
    href: "/baseball",
    gradient: "from-indigo-500/20 to-blue-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "volleyball",
    name: "Volleyball",
    shortName: "Volleyball",
    description: "VNL, Olympics",
    href: "/volleyball",
    gradient: "from-yellow-500/20 to-amber-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "mma",
    name: "MMA",
    shortName: "MMA",
    description: "UFC, fight nights, rankings",
    href: "/mma",
    gradient: "from-red-500/20 to-pink-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "handball",
    name: "Handball",
    shortName: "Handball",
    description: "World Championships, club leagues",
    href: "/handball",
    gradient: "from-blue-500/20 to-indigo-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "afl",
    name: "Australian Rules Football",
    shortName: "AFL",
    description: "AFL, Grand Final",
    href: "/afl",
    gradient: "from-yellow-600/20 to-red-600/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "nba",
    name: "NBA",
    shortName: "NBA",
    description: "Finals, playoffs, draft",
    href: "/nba",
    gradient: "from-orange-600/20 to-red-500/10",
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
  football: { accent: "#22c55e", soft: "rgba(34, 197, 94, 0.14)", gradient: "linear-gradient(135deg, rgba(34,197,94,0.22), rgba(16,185,129,0.06))" },
  cricket: { accent: "#3b82f6", soft: "rgba(59, 130, 246, 0.14)", gradient: "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(14,165,233,0.06))" },
  basketball: { accent: "#f97316", soft: "rgba(249, 115, 22, 0.14)", gradient: "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(251,146,60,0.06))" },
  nba: { accent: "#a855f7", soft: "rgba(168, 85, 247, 0.14)", gradient: "linear-gradient(135deg, rgba(168,85,247,0.22), rgba(217,70,239,0.06))" },
  f1: { accent: "#ef4444", soft: "rgba(239, 68, 68, 0.14)", gradient: "linear-gradient(135deg, rgba(239,68,68,0.22), rgba(244,63,94,0.06))" },
  nfl: { accent: "#2563eb", soft: "rgba(37, 99, 235, 0.14)", gradient: "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(59,130,246,0.06))" },
  mma: { accent: "#f59e0b", soft: "rgba(245, 158, 11, 0.14)", gradient: "linear-gradient(135deg, rgba(245,158,11,0.22), rgba(251,191,36,0.06))" },
  hockey: { accent: "#06b6d4", soft: "rgba(6, 182, 212, 0.14)", gradient: "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(34,211,238,0.06))" },
  rugby: { accent: "#14b8a6", soft: "rgba(20, 184, 166, 0.14)", gradient: "linear-gradient(135deg, rgba(20,184,166,0.22), rgba(45,212,191,0.06))" },
  baseball: { accent: "#6366f1", soft: "rgba(99, 102, 241, 0.14)", gradient: "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(129,140,248,0.06))" },
  volleyball: { accent: "#eab308", soft: "rgba(234, 179, 8, 0.14)", gradient: "linear-gradient(135deg, rgba(234,179,8,0.22), rgba(250,204,21,0.06))" },
  handball: { accent: "#0ea5e9", soft: "rgba(14, 165, 233, 0.14)", gradient: "linear-gradient(135deg, rgba(14,165,233,0.22), rgba(56,189,248,0.06))" },
  afl: { accent: "#f43f5e", soft: "rgba(244, 63, 94, 0.14)", gradient: "linear-gradient(135deg, rgba(244,63,94,0.22), rgba(251,113,133,0.06))" },
};

export function getSportAccent(id: string): SportAccent {
  return sportAccents[id] ?? {
    accent: "#f97316",
    soft: "rgba(249, 115, 22, 0.14)",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(251,146,60,0.06))",
  };
}
