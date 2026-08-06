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
    description: "NBA, playoffs, EuroLeague",
    href: "/basketball",
    gradient: "from-orange-500/20 to-amber-500/10",
    category: "primary",
    enabled: true,
  },
  {
    id: "tennis",
    name: "Tennis",
    shortName: "Tennis",
    description: "Grand Slams, ATP & WTA",
    href: "/tennis",
    gradient: "from-lime-500/20 to-green-500/10",
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
    id: "motogp",
    name: "MotoGP",
    shortName: "MotoGP",
    description: "MotoGP, races, standings",
    href: "/motogp",
    gradient: "from-red-600/20 to-orange-500/10",
    category: "primary",
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
    id: "american-football",
    name: "American Football",
    shortName: "NFL",
    description: "NFL, Super Bowl",
    href: "/american-football",
    gradient: "from-amber-700/20 to-orange-600/10",
    category: "secondary",
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
    id: "ice-hockey",
    name: "Ice Hockey",
    shortName: "NHL",
    description: "NHL, Stanley Cup",
    href: "/ice-hockey",
    gradient: "from-cyan-500/20 to-teal-500/10",
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
    id: "ufc-mma",
    name: "UFC / MMA",
    shortName: "UFC",
    description: "Fight nights, rankings",
    href: "/ufc-mma",
    gradient: "from-red-500/20 to-pink-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "boxing",
    name: "Boxing",
    shortName: "Boxing",
    description: "Title fights, rankings",
    href: "/boxing",
    gradient: "from-purple-500/20 to-fuchsia-500/10",
    category: "secondary",
    enabled: true,
  },
  {
    id: "esports",
    name: "Esports",
    shortName: "Esports",
    description: "CS2, Valorant, LoL",
    href: "/esports",
    gradient: "from-violet-500/20 to-purple-500/10",
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
];

export const primarySports = sportsConfig.filter((s) => s.category === "primary");
export const secondarySports = sportsConfig.filter((s) => s.category === "secondary");
export const allSports = sportsConfig;

export function getSportConfig(id: string): SportConfig | undefined {
  return sportsConfig.find((s) => s.id === id);
}
