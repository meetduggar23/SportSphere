import {
  LayoutDashboard,
  Zap,
  Star,
  Calendar,
  CalendarClock,
  Trophy,
  Shield,
  Users,
  ArrowLeftRight,
  Settings,
  Activity,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export const sidebarIcons = {
  overview: LayoutDashboard,
  live: Zap,
  favorites: Star,
  calendar: Calendar,
  schedules: CalendarClock,
  fixtures: Calendar,
  schedule: Calendar,
  races: CalendarClock,
  series: Trophy,
  leagues: Trophy,
  teams: Shield,
  constructors: Shield,
  players: Users,
  drivers: Users,
  fighters: Users,
  transfers: ArrowLeftRight,
  myteams: Users,
  settings: Settings,
  fights: Activity,
  rankings: Trophy,
  stats: BarChart3,
} satisfies Record<string, LucideIcon>;

export interface SidebarItem {
  label: string;
  href: string;
  icon: keyof typeof sidebarIcons;
}

export interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

export const homeSidebar: SidebarSection = {
  label: "Menu",
  items: [
    { label: "Overview", href: "/", icon: "overview" },
    { label: "Favorites", href: "/favorites", icon: "favorites" },
    { label: "Calendar", href: "/calendar", icon: "calendar" },
    { label: "My Teams", href: "/my-teams", icon: "myteams" },
    { label: "Settings", href: "/settings", icon: "settings" },
  ],
};

export const sportSidebars: Record<string, SidebarSection> = {
  cricket: {
    label: "Cricket",
    items: [
      { label: "Overview", href: "/cricket", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Schedules", href: "/calendar", icon: "schedules" },
      { label: "Series", href: "/competitions", icon: "series" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  football: {
    label: "Football",
    items: [
      { label: "Overview", href: "/football", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Fixtures", href: "/calendar", icon: "fixtures" },
      { label: "Leagues", href: "/competitions", icon: "leagues" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
      { label: "Transfers", href: "/transfers", icon: "transfers" },
    ],
  },
  basketball: {
    label: "Basketball",
    items: [
      { label: "Overview", href: "/basketball", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Schedule", href: "/calendar", icon: "schedule" },
      { label: "Leagues", href: "/competitions", icon: "leagues" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  nba: {
    label: "NBA",
    items: [
      { label: "Overview", href: "/nba", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Schedule", href: "/calendar", icon: "schedule" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  nfl: {
    label: "NFL",
    items: [
      { label: "Overview", href: "/nfl", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Schedule", href: "/calendar", icon: "schedule" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  hockey: {
    label: "Hockey",
    items: [
      { label: "Overview", href: "/hockey", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Schedule", href: "/calendar", icon: "schedule" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  rugby: {
    label: "Rugby",
    items: [
      { label: "Overview", href: "/rugby", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Fixtures", href: "/calendar", icon: "fixtures" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  baseball: {
    label: "Baseball",
    items: [
      { label: "Overview", href: "/baseball", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Schedule", href: "/calendar", icon: "schedule" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  volleyball: {
    label: "Volleyball",
    items: [
      { label: "Overview", href: "/volleyball", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Fixtures", href: "/calendar", icon: "fixtures" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  handball: {
    label: "Handball",
    items: [
      { label: "Overview", href: "/handball", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Fixtures", href: "/calendar", icon: "fixtures" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  afl: {
    label: "AFL",
    items: [
      { label: "Overview", href: "/afl", icon: "overview" },
      { label: "Live Scores", href: "/live", icon: "live" },
      { label: "Fixtures", href: "/calendar", icon: "fixtures" },
      { label: "Teams", href: "/teams", icon: "teams" },
      { label: "Players", href: "/players", icon: "players" },
    ],
  },
  mma: {
    label: "MMA",
    items: [
      { label: "Overview", href: "/mma", icon: "overview" },
      { label: "Upcoming Fights", href: "/calendar", icon: "fights" },
      { label: "Fighters", href: "/players", icon: "fighters" },
      { label: "Rankings", href: "/teams", icon: "rankings" },
      { label: "Stats", href: "/statistics", icon: "stats" },
    ],
  },
  "formula-1": {
    label: "Formula 1",
    items: [
      { label: "Overview", href: "/f1", icon: "overview" },
      { label: "Live Timing", href: "/live", icon: "live" },
      { label: "Race Calendar", href: "/calendar", icon: "races" },
      { label: "Drivers", href: "/players", icon: "drivers" },
      { label: "Constructors", href: "/teams", icon: "constructors" },
    ],
  },
};

export const allSportsSidebarOrder = [
  "cricket",
  "football",
  "basketball",
  "baseball",
  "hockey",
  "volleyball",
  "rugby",
  "formula-1",
  "mma",
  "nfl",
  "nba",
  "handball",
  "afl",
];
