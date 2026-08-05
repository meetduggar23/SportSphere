import { Match, News, Standing, Fixture, TrendingItem, Player, StatsCard } from "@/types";

export const statsCards: StatsCard[] = [
  { label: "Live Matches", value: 24, subtitle: "Across all sports", icon: "live", color: "bg-red-100 text-red-600" },
  { label: "Upcoming", value: 57, subtitle: "Next 7 days", icon: "calendar", color: "bg-blue-100 text-blue-600" },
  { label: "News Updates", value: 128, subtitle: "Today", icon: "news", color: "bg-purple-100 text-purple-600" },
  { label: "Your Predictions", value: 12, subtitle: "Active", icon: "predictions", color: "bg-green-100 text-green-600" },
];

export const liveMatches: Match[] = [
  {
    id: "1",
    sport: "football",
    league: "UEFA CL",
    status: "live",
    time: "72'",
    homeTeam: { id: "rm", name: "Real Madrid", shortName: "RM", logo: "⚪", sport: "football", country: "Spain" },
    awayTeam: { id: "bay", name: "Bayern Munich", shortName: "BAY", logo: "🔴", sport: "football", country: "Germany" },
    homeScore: 2,
    awayScore: 1,
    venue: "Santiago Bernabéu",
  },
  {
    id: "2",
    sport: "cricket",
    league: "Test",
    status: "live",
    time: "Day 2",
    homeTeam: { id: "ind", name: "India", shortName: "IND", logo: "🔵", sport: "cricket", country: "India" },
    awayTeam: { id: "aus", name: "Australia", shortName: "AUS", logo: "🟡", sport: "cricket", country: "Australia" },
    homeScore: "256/4",
    awayScore: "201",
    venue: "MCG, Melbourne",
    details: "(67.2 ov) / (70.0 ov)",
  },
  {
    id: "3",
    sport: "basketball",
    league: "NBA • Playoffs",
    status: "live",
    time: "Q3",
    homeTeam: { id: "bos", name: "Boston Celtics", shortName: "BOS", logo: "🟢", sport: "basketball", country: "USA" },
    awayTeam: { id: "mia", name: "Miami Heat", shortName: "MIA", logo: "🔴", sport: "basketball", country: "USA" },
    homeScore: 78,
    awayScore: 65,
    venue: "TD Garden, Boston",
  },
  {
    id: "4",
    sport: "f1",
    league: "Race",
    status: "live",
    time: "Lap 45/63",
    homeTeam: { id: "nor", name: "L. Norris", shortName: "NOR", logo: "🟠", sport: "f1", country: "UK" },
    awayTeam: { id: "ver", name: "M. Verstappen", shortName: "VER", logo: "🔵", sport: "f1", country: "Netherlands" },
    homeScore: 1,
    awayScore: 2,
    venue: "Autodromo Enzo e Dino Ferrari",
    details: "Emilia Romagna GP",
  },
];

export const topNews: News[] = [
  {
    id: "1",
    title: "Real Madrid edge past Bayern in thrilling UCL semi-final",
    excerpt: "A dramatic night at the Bernabéu as Real Madrid secure a crucial victory",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop",
    sport: "football",
    category: "FOOTBALL",
    timeAgo: "2h ago",
  },
  {
    id: "2",
    title: "Kohli century puts India in command on Day 2",
    excerpt: "Virat Kohli's masterful innings puts India in a dominant position",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=250&fit=crop",
    sport: "cricket",
    category: "CRICKET",
    timeAgo: "4h ago",
  },
  {
    id: "3",
    title: "Norris takes lead as Verstappen closes in",
    excerpt: "Lando Norris leads the Emilia Romagna GP as Max Verstappen applies pressure",
    image: "https://images.unsplash.com/photo-1541889413-fce7e29015db?w=400&h=250&fit=crop",
    sport: "f1",
    category: "F1",
    timeAgo: "1h ago",
  },
  {
    id: "4",
    title: "Celtics take control in Game 5 against Heat",
    excerpt: "Boston Celtics dominate Miami Heat to take a commanding lead in the series",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
    sport: "basketball",
    category: "NBA",
    timeAgo: "3h ago",
  },
];

export const upcomingFixtures: Fixture[] = [
  {
    id: "1",
    sport: "football",
    league: "La Liga",
    title: "El Clasico",
    homeTeam: { id: "bar", name: "Barcelona", shortName: "BAR", logo: "🔵", sport: "football", country: "Spain" },
    awayTeam: { id: "rm", name: "Real Madrid", shortName: "RM", logo: "⚪", sport: "football", country: "Spain" },
    dateTime: "Tomorrow",
    time: "10:15 PM",
  },
  {
    id: "2",
    sport: "cricket",
    league: "IPL 2024",
    title: "MI vs CSK",
    homeTeam: { id: "mi", name: "Mumbai Indians", shortName: "MI", logo: "💙", sport: "cricket", country: "India" },
    awayTeam: { id: "csk", name: "Chennai Super Kings", shortName: "CSK", logo: "💛", sport: "cricket", country: "India" },
    dateTime: "May 5",
    time: "7:30 PM",
  },
  {
    id: "3",
    sport: "f1",
    league: "Miami GP",
    title: "Qualifying",
    homeTeam: { id: "f1", name: "Miami", shortName: "MIA", logo: "🏎️", sport: "f1", country: "USA" },
    dateTime: "May 4",
    time: "11:30 PM",
  },
];

export const standings: Standing[] = [
  { position: 1, team: { id: "rm", name: "Real Madrid", shortName: "RM", logo: "⚪", sport: "football", country: "Spain" }, played: 33, won: 25, drawn: 6, lost: 2, goalDifference: 51, points: 81 },
  { position: 2, team: { id: "bar", name: "Barcelona", shortName: "BAR", logo: "🔵", sport: "football", country: "Spain" }, played: 33, won: 22, drawn: 7, lost: 4, goalDifference: 38, points: 73 },
  { position: 3, team: { id: "gir", name: "Girona", shortName: "GIR", logo: "🔴", sport: "football", country: "Spain" }, played: 33, won: 22, drawn: 5, lost: 6, goalDifference: 26, points: 71 },
  { position: 4, team: { id: "atl", name: "Atletico Madrid", shortName: "ATL", logo: "🔴", sport: "football", country: "Spain" }, played: 33, won: 19, drawn: 4, lost: 10, goalDifference: 21, points: 61 },
  { position: 5, team: { id: "ath", name: "Athletic Club", shortName: "ATH", logo: "🔴", sport: "football", country: "Spain" }, played: 33, won: 16, drawn: 8, lost: 9, goalDifference: 15, points: 56 },
];

export const trendingNow: TrendingItem[] = [
  { id: "1", rank: 1, title: "Real Madrid vs Bayern", subtitle: "UEFA Champions League", logos: ["⚪", "🔴"] },
  { id: "2", rank: 2, title: "India vs Australia", subtitle: "Border-Gavaskar Trophy", logos: ["🔵", "🟡"] },
  { id: "3", rank: 3, title: "Lakers vs Warriors", subtitle: "NBA Playoffs", logos: ["🟡", "🔵"] },
  { id: "4", rank: 4, title: "Max Verstappen", subtitle: "Emilia Romagna GP", logos: ["🏎️"] },
  { id: "5", rank: 5, title: "Novak Djokovic", subtitle: "Italian Open", logos: ["🎾"] },
];

export const topPlayers: Player[] = [
  { id: "1", name: "Erling Haaland", photo: "", team: "Man City", teamLogo: "🔵", position: "Forward", sport: "football", stat: "52 Goals", statLabel: "Goals" },
  { id: "2", name: "Virat Kohli", photo: "", team: "India", teamLogo: "🔵", position: "Batter", sport: "cricket", stat: "1324 Runs", statLabel: "Runs" },
  { id: "3", name: "Luka Dončić", photo: "", team: "Lakers", teamLogo: "🟡", position: "Guard", sport: "basketball", stat: "28.7 PPG", statLabel: "PPG" },
  { id: "4", name: "Kylian Mbappé", photo: "", team: "PSG", teamLogo: "🔵", position: "Forward", sport: "football", stat: "48 Goals", statLabel: "Goals" },
  { id: "5", name: "Jannik Sinner", photo: "", team: "ATP", teamLogo: "🎾", position: "Tennis", sport: "tennis", stat: "892 Points", statLabel: "Points" },
];

export const followedTeams = [
  { id: "rm", name: "Real Madrid", sport: "Football", logo: "⚪" },
  { id: "ind", name: "India", sport: "Cricket", logo: "🔵" },
  { id: "mi", name: "Mumbai Indians", sport: "Cricket", logo: "💙" },
  { id: "lal", name: "Los Angeles Lakers", sport: "Basketball", logo: "🟡" },
];

export const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "Live Scores", href: "/live" },
  { label: "Football", href: "/football" },
  { label: "Cricket", href: "/cricket" },
  { label: "Basketball", href: "/basketball" },
  { label: "F1", href: "/f1" },
  { label: "Tennis", href: "/tennis" },
  { label: "News", href: "/news" },
  { label: "Stats", href: "/stats" },
  { label: "Fantasy", href: "/fantasy" },
];

export const sidebarNavItems = [
  { label: "Overview", href: "/", icon: "overview", active: true },
  { label: "Live Scores", href: "/live", icon: "live" },
  { label: "Favorites", href: "/favorites", icon: "favorites" },
  { label: "My Teams", href: "/my-teams", icon: "teams" },
  { label: "Calendar", href: "/calendar", icon: "calendar" },
  { label: "Standings", href: "/standings", icon: "standings" },
  { label: "News", href: "/news", icon: "news" },
  { label: "Transfers", href: "/transfers", icon: "transfers" },
  { label: "Videos", href: "/videos", icon: "videos" },
  { label: "AI Insights", href: "/ai-insights", icon: "ai", badge: "NEW" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
