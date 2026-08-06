import {
  Match,
  News,
  Standing,
  Fixture,
  TrendingItem,
  Player,
  StatsCard,
  Tournament,
  Transfer,
  Prediction,
  VideoItem,
  TimelineEvent,
  MatchStats,
  NavItem,
  Team,
  MatchComment,
} from "@/types";

export const statsCards: StatsCard[] = [
  { label: "Live Matches", value: 24, subtitle: "Across all sports", icon: "live", color: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" },
  { label: "Upcoming", value: 57, subtitle: "Next 7 days", icon: "calendar", color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },
  { label: "News Updates", value: 128, subtitle: "Today", icon: "news", color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400" },
  { label: "Your Predictions", value: 12, subtitle: "Active", icon: "predictions", color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" },
];

interface TeamExtra {
  city?: string;
  founded?: number;
  coach?: string;
  stadium?: string;
  capacity?: number;
}

const team = (
  id: string,
  name: string,
  shortName: string,
  logo: string,
  sport: Match["sport"],
  country: string,
  extra?: Partial<TeamExtra>
): Team => ({ id, name, shortName, logo, sport, country, ...extra });

export const teams: Record<string, Team> = {
  rm: team("rm", "Real Madrid", "RMA", "/logos/football/real-madrid.png", "football", "Spain", { city: "Madrid", founded: 1902, coach: "Carlo Ancelotti", stadium: "Santiago Bernabéu", capacity: 81044 }),
  bay: team("bay", "Bayern Munich", "FCB", "/logos/football/bayern-munich.png", "football", "Germany", { city: "Munich", founded: 1900, coach: "Thomas Tuchel", stadium: "Allianz Arena", capacity: 75000 }),
  bar: team("bar", "Barcelona", "BAR", "/logos/football/fc-barcelona.png", "football", "Spain", { city: "Barcelona", founded: 1899, coach: "Xavi Hernández", stadium: "Camp Nou", capacity: 99354 }),
  mci: team("mci", "Man City", "MCI", "/logos/football/manchester-city.png", "football", "England", { city: "Manchester", founded: 1880, coach: "Pep Guardiola", stadium: "Etihad Stadium", capacity: 53400 }),
  ars: team("ars", "Arsenal", "ARS", "/logos/football/arsenal.png", "football", "England", { city: "London", founded: 1886, coach: "Mikel Arteta", stadium: "Emirates Stadium", capacity: 60704 }),
  liv: team("liv", "Liverpool", "LIV", "/logos/football/liverpool-fc.png", "football", "England", { city: "Liverpool", founded: 1892, coach: "Jürgen Klopp", stadium: "Anfield", capacity: 61112 }),
  gir: team("gir", "Girona", "GIR", "/logos/football/girona-fc.png", "football", "Spain", { city: "Girona", founded: 1930, stadium: "Estadi Montilivi", capacity: 13286 }),
  atl: team("atl", "Atlético Madrid", "ATM", "/logos/football/atletico-madrid.png", "football", "Spain", { city: "Madrid", founded: 1903, stadium: "Metropolitano", capacity: 68456 }),
  ath: team("ath", "Athletic Club", "ATH", "/logos/football/athletic-club-bilbao.png", "football", "Spain", { city: "Bilbao", founded: 1898, stadium: "San Mamés", capacity: 53289 }),
  ind: team("ind", "India", "IND", "/logos/cricket/india.png", "cricket", "India", { coach: "Rahul Dravid" }),
  aus: team("aus", "Australia", "AUS", "/logos/cricket/australia.png", "cricket", "Australia", { coach: "Andrew McDonald" }),
  eng: team("eng", "England", "ENG", "/logos/cricket/england.png", "cricket", "England", { coach: "Brendon McCullum" }),
  mi: team("mi", "Mumbai Indians", "MI", "/logos/ipl/mi.jpg", "cricket", "India", { city: "Mumbai", founded: 2008, coach: "Mahela Jayawardene" }),
  csk: team("csk", "Chennai Super Kings", "CSK", "/logos/ipl/csk.jpg", "cricket", "India", { city: "Chennai", founded: 2008, coach: "Stephen Fleming" }),
  rcb: team("rcb", "Royal Challengers", "RCB", "/logos/ipl/rcb.jpg", "cricket", "India", { city: "Bengaluru", founded: 2008 }),
  kkr: team("kkr", "Kolkata Knight Riders", "KKR", "/logos/ipl/kkr.png", "cricket", "India", { city: "Kolkata", founded: 2008, coach: "Chandrakant Pandit" }),
  rr: team("rr", "Rajasthan Royals", "RR", "/logos/ipl/rr.jpg", "cricket", "India", { city: "Jaipur", founded: 2008 }),
  gt: team("gt", "Gujarat Titans", "GT", "/logos/ipl/gt.jpg", "cricket", "India", { city: "Ahmedabad", founded: 2021 }),
  srh: team("srh", "Sunrisers Hyderabad", "SRH", "/logos/ipl/srh.jpg", "cricket", "India", { city: "Hyderabad", founded: 2014 }),
  pbks: team("pbks", "Punjab Kings", "PBKS", "/logos/ipl/pbks.jpg", "cricket", "India", { city: "Chandigarh", founded: 2008 }),
  dc: team("dc", "Delhi Capitals", "DC", "/logos/ipl/dc.jpg", "cricket", "India", { city: "Delhi", founded: 2008 }),
  lsg: team("lsg", "Lucknow Super Giants", "LSG", "/logos/ipl/lsg.jpg", "cricket", "India", { city: "Lucknow", founded: 2021 }),
  ipl: team("ipl", "Indian Premier League", "IPL", "/logos/ipl/ipl.jpg", "cricket", "India"),
  bos: team("bos", "Celtics", "BOS", "https://api.dicebear.com/7.x/initials/svg?seed=BOS", "basketball", "USA", { city: "Boston", founded: 1946, stadium: "TD Garden", capacity: 19156 }),
  mia: team("mia", "Heat", "MIA", "https://api.dicebear.com/7.x/initials/svg?seed=MIA", "basketball", "USA", { city: "Miami", founded: 1988, stadium: "Kaseya Center", capacity: 19600 }),
  lal: team("lal", "Lakers", "LAL", "https://api.dicebear.com/7.x/initials/svg?seed=LAL", "basketball", "USA", { city: "Los Angeles", founded: 1947, stadium: "Crypto.com Arena", capacity: 18997 }),
  gsw: team("gsw", "Warriors", "GSW", "https://api.dicebear.com/7.x/initials/svg?seed=GSW", "basketball", "USA", { city: "San Francisco", founded: 1946, stadium: "Chase Center", capacity: 18064 }),
};

export const iplTeams: Team[] = [
  teams.mi,
  teams.csk,
  teams.rcb,
  teams.kkr,
  teams.rr,
  teams.gt,
  teams.srh,
  teams.pbks,
  teams.dc,
  teams.lsg,
];

export const liveMatches: Match[] = [
  {
    id: "m1",
    sport: "football",
    league: "UEFA Champions League",
    status: "live",
    minute: "72'",
    homeTeam: teams.rm,
    awayTeam: teams.bay,
    homeScore: 2,
    awayScore: 1,
    venue: "Santiago Bernabéu",
    competition: "Semi-Final",
    date: "Today",
  },
  {
    id: "m2",
    sport: "cricket",
    league: "Border-Gavaskar Trophy",
    status: "live",
    minute: "Day 2",
    homeTeam: teams.ind,
    awayTeam: teams.aus,
    homeScore: "256/4",
    awayScore: "201",
    venue: "MCG, Melbourne",
    details: "IND 256/4 (67.2 ov) • AUS 201 (70.0 ov)",
    competition: "Test Match",
    date: "Day 2 of 5",
  },
  {
    id: "m3",
    sport: "basketball",
    league: "NBA Playoffs",
    status: "live",
    minute: "Q3 04:22",
    homeTeam: teams.bos,
    awayTeam: teams.mia,
    homeScore: 78,
    awayScore: 65,
    venue: "TD Garden, Boston",
    competition: "Game 5 • Eastern Conf",
    date: "Tonight",
  },
  {
    id: "m4",
    sport: "f1",
    league: "FIA Formula 1",
    status: "live",
    minute: "Lap 45/63",
    homeTeam: { id: "nor", name: "L. Norris", shortName: "NOR", logo: "https://api.dicebear.com/7.x/initials/svg?seed=NOR", sport: "f1", country: "UK" },
    awayTeam: { id: "ver", name: "M. Verstappen", shortName: "VER", logo: "https://api.dicebear.com/7.x/initials/svg?seed=VER", sport: "f1", country: "Netherlands" },
    homeScore: 1,
    awayScore: 2,
    venue: "Imola",
    details: "Emilia Romagna Grand Prix",
    competition: "Race",
    date: "Today",
  },
];

export const allMatches: Match[] = [
  ...liveMatches,
  {
    id: "m5",
    sport: "football",
    league: "Premier League",
    status: "upcoming",
    homeTeam: teams.mci,
    awayTeam: teams.ars,
    homeScore: "-",
    awayScore: "-",
    venue: "Etihad Stadium",
    competition: "Matchday 35",
    date: "Tomorrow",
    minute: "9:00 PM",
  },
  {
    id: "m6",
    sport: "cricket",
    league: "IPL 2024",
    status: "upcoming",
    homeTeam: teams.mi,
    awayTeam: teams.csk,
    homeScore: "-",
    awayScore: "-",
    venue: "Wankhede Stadium",
    competition: "Group Stage",
    date: "May 5",
    minute: "7:30 PM",
  },
  {
    id: "m7",
    sport: "football",
    league: "La Liga",
    status: "upcoming",
    homeTeam: teams.bar,
    awayTeam: teams.rm,
    homeScore: "-",
    awayScore: "-",
    venue: "Camp Nou",
    competition: "El Clásico",
    date: "May 12",
    minute: "10:15 PM",
  },
  {
    id: "m8",
    sport: "basketball",
    league: "NBA Playoffs",
    status: "upcoming",
    homeTeam: teams.lal,
    awayTeam: teams.gsw,
    homeScore: "-",
    awayScore: "-",
    venue: "Crypto.com Arena",
    competition: "Game 6 • West Conf",
    date: "May 4",
    minute: "10:30 PM",
  },
  {
    id: "m9",
    sport: "football",
    league: "Premier League",
    status: "finished",
    homeTeam: teams.liv,
    awayTeam: teams.ars,
    homeScore: 3,
    awayScore: 1,
    venue: "Anfield",
    competition: "Matchday 34",
    date: "Yesterday",
  },
];

export const upcomingFixtures: Fixture[] = [
  {
    id: "f1",
    sport: "football",
    league: "La Liga",
    title: "El Clásico",
    homeTeam: teams.bar,
    awayTeam: teams.rm,
    dateTime: "May 12",
    time: "10:15 PM",
  },
  {
    id: "f2",
    sport: "cricket",
    league: "IPL 2024",
    title: "MI vs CSK",
    homeTeam: teams.mi,
    awayTeam: teams.csk,
    dateTime: "May 5",
    time: "7:30 PM",
  },
  {
    id: "f3",
    sport: "basketball",
    league: "NBA",
    title: "Lakers vs Warriors",
    homeTeam: teams.lal,
    awayTeam: teams.gsw,
    dateTime: "May 4",
    time: "10:30 PM",
  },
  {
    id: "f4",
    sport: "football",
    league: "Premier League",
    title: "Title Decider",
    homeTeam: teams.mci,
    awayTeam: teams.ars,
    dateTime: "Tomorrow",
    time: "9:00 PM",
  },
];

export const topNews: News[] = [
  {
    id: "n1",
    title: "Real Madrid edge past Bayern in thrilling UCL semi-final",
    excerpt: "A dramatic night at the Bernabéu as Real Madrid secure a crucial victory with a late winner.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop",
    sport: "football",
    category: "FOOTBALL",
    timeAgo: "2h ago",
    isBreaking: true,
    author: "Carlos Mendez",
    views: "1.2M",
  },
  {
    id: "n2",
    title: "Kohli century puts India in command on Day 2",
    excerpt: "Virat Kohli's masterful 143 puts India in a dominant position in the Boxing Day Test.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=250&fit=crop",
    sport: "cricket",
    category: "CRICKET",
    timeAgo: "4h ago",
    author: "Ankit Sharma",
    views: "890K",
  },
  {
    id: "n3",
    title: "Norris leads as Verstappen closes in at Imola",
    excerpt: "Lando Norris leads the Emilia Romagna GP as Max Verstappen applies late pressure.",
    image: "https://images.unsplash.com/photo-1541889413-fce7e29015db?w=400&h=250&fit=crop",
    sport: "f1",
    category: "F1",
    timeAgo: "1h ago",
    author: "Sofia Ricci",
    views: "640K",
  },
  {
    id: "n4",
    title: "Celtics take control in Game 5 against Heat",
    excerpt: "Boston Celtics dominate Miami Heat 78-65 to take a commanding 3-2 lead in the series.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
    sport: "basketball",
    category: "NBA",
    timeAgo: "3h ago",
    author: "Mike Johnson",
    views: "980K",
  },
  {
    id: "n6",
    title: "Transfer round-up: Record summer window expected",
    excerpt: "Clubs prepare for a record-breaking transfer window as the market heats up.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
    sport: "football",
    category: "TRANSFERS",
    timeAgo: "8h ago",
    author: "Lucas Pereira",
    views: "1.5M",
  },
];

export const standings: Standing[] = [
  { position: 1, team: teams.rm, played: 33, won: 25, drawn: 6, lost: 2, goalDifference: 51, points: 81, goalsFor: 74, goalsAgainst: 23, form: ["W", "W", "D", "W", "W"] },
  { position: 2, team: teams.bar, played: 33, won: 22, drawn: 7, lost: 4, goalDifference: 38, points: 73, goalsFor: 68, goalsAgainst: 30, form: ["W", "W", "W", "D", "L"] },
  { position: 3, team: teams.gir, played: 33, won: 22, drawn: 5, lost: 6, goalDifference: 26, points: 71, goalsFor: 67, goalsAgainst: 41, form: ["W", "L", "W", "W", "D"] },
  { position: 4, team: teams.atl, played: 33, won: 19, drawn: 4, lost: 10, goalDifference: 21, points: 61, goalsFor: 59, goalsAgainst: 38, form: ["D", "W", "L", "W", "W"] },
  { position: 5, team: teams.ath, played: 33, won: 16, drawn: 8, lost: 9, goalDifference: 15, points: 56, goalsFor: 53, goalsAgainst: 38, form: ["W", "D", "D", "W", "L"] },
  { position: 6, team: teams.liv, played: 33, won: 15, drawn: 10, lost: 8, goalDifference: 18, points: 55, goalsFor: 65, goalsAgainst: 47, form: ["W", "W", "D", "L", "W"] },
];

export const trendingNow: TrendingItem[] = [
  { id: "t1", rank: 1, title: "Real Madrid vs Bayern", subtitle: "UEFA Champions League", logos: ["⚪", "🔴"], trend: "up" },
  { id: "t2", rank: 2, title: "India vs Australia", subtitle: "Border-Gavaskar Trophy", logos: ["🔵", "🟡"], trend: "up" },
  { id: "t3", rank: 3, title: "Lakers vs Warriors", subtitle: "NBA Playoffs", logos: ["🟣", "🔵"], trend: "steady" },
  { id: "t4", rank: 4, title: "Max Verstappen", subtitle: "Emilia Romagna GP", logos: ["🏎️"], trend: "down" },
];

export const topPlayers: Player[] = [
  { id: "p1", name: "Erling Haaland", photo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop", team: "Man City", teamId: "mci", teamLogo: teams.mci.logo, position: "Forward", sport: "football", nationality: "Norway", age: 23, stat: "52", statLabel: "Goals", marketValue: "€180M", rating: 91 },
  { id: "p2", name: "Virat Kohli", photo: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=200&h=200&fit=crop", team: "India", teamId: "ind", teamLogo: teams.ind.logo, position: "Batter", sport: "cricket", nationality: "India", age: 35, stat: "1324", statLabel: "Runs", marketValue: "₹150 Cr", rating: 92 },
  { id: "p3", name: "Luka Dončić", photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop", team: "Lakers", teamId: "lal", teamLogo: teams.lal.logo, position: "Guard", sport: "basketball", nationality: "Slovenia", age: 25, stat: "28.7", statLabel: "PPG", marketValue: "$120M", rating: 94 },
  { id: "p4", name: "Kylian Mbappé", photo: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=200&h=200&fit=crop", team: "PSG", teamId: "", teamLogo: "🔵", position: "Forward", sport: "football", nationality: "France", age: 25, stat: "48", statLabel: "Goals", marketValue: "€180M", rating: 93 },
  { id: "p6", name: "Jasprit Bumrah", photo: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop", team: "India", teamId: "ind", teamLogo: teams.ind.logo, position: "Bowler", sport: "cricket", nationality: "India", age: 30, stat: "165", statLabel: "Wickets", marketValue: "₹120 Cr", rating: 93 },
  { id: "p7", name: "Stephen Curry", photo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=200&h=200&fit=crop", team: "Warriors", teamId: "gsw", teamLogo: teams.gsw.logo, position: "Guard", sport: "basketball", nationality: "USA", age: 36, stat: "26.4", statLabel: "PPG", marketValue: "$50M", rating: 92 },
  { id: "p8", name: "Jude Bellingham", photo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop", team: "Real Madrid", teamId: "rm", teamLogo: teams.rm.logo, position: "Midfielder", sport: "football", nationality: "England", age: 20, stat: "22", statLabel: "Goals", marketValue: "€180M", rating: 89 },
];

export const followedTeams = [
  { id: "rm", name: "Real Madrid", sport: "Football", logo: teams.rm.logo },
  { id: "ind", name: "India", sport: "Cricket", logo: teams.ind.logo },
  { id: "mi", name: "Mumbai Indians", sport: "Cricket", logo: teams.mi.logo },
  { id: "kkr", name: "Kolkata Knight Riders", sport: "Cricket", logo: teams.kkr.logo },
  { id: "rcb", name: "Royal Challengers", sport: "Cricket", logo: teams.rcb.logo },
  { id: "lal", name: "Los Angeles Lakers", sport: "Basketball", logo: teams.lal.logo },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Live", href: "/live" },
  { label: "News", href: "/news" },
  { label: "Standings", href: "/standings" },
  { label: "Fantasy", href: "/fantasy" },
  { label: "AI Insights", href: "/ai-insights" },
];

export const tournaments: Tournament[] = [
  { id: "t1", name: "UEFA Champions League", sport: "football", country: "Europe", season: "2023-24", teams: 32, matches: 125, status: "active", format: "Knockout", prizePool: "€2.0B" },
  { id: "t2", name: "Premier League", sport: "football", country: "England", season: "2023-24", teams: 20, matches: 380, status: "active", format: "League" },
  { id: "t3", name: "La Liga", sport: "football", country: "Spain", season: "2023-24", teams: 20, matches: 380, status: "active", format: "League" },
  { id: "t4", name: "Indian Premier League", sport: "cricket", country: "India", season: "2024", teams: 10, matches: 74, status: "active", format: "T20", prizePool: "₹100 Cr" },
  { id: "t5", name: "Border-Gavaskar Trophy", sport: "cricket", country: "Australia", season: "2023-24", teams: 2, matches: 5, status: "active", format: "Test Series" },
  { id: "t6", name: "NBA Playoffs", sport: "nba", country: "USA", season: "2023-24", teams: 16, matches: 105, status: "active", format: "Knockout" },
  { id: "t7", name: "F1 World Championship", sport: "f1", country: "Global", season: "2024", teams: 10, matches: 24, status: "active", format: "Points System", prizePool: "$500M" },
  { id: "t8", name: "IHF World Championship", sport: "handball", country: "Global", season: "2025", teams: 32, matches: 96, status: "active", format: "Knockout", prizePool: "€8M" },
];

export const transfers: Transfer[] = [
  { id: "x1", playerName: "Kylian Mbappé", playerPhoto: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=200&h=200&fit=crop", fromTeam: "PSG", fromTeamLogo: "🔵", toTeam: "Real Madrid", toTeamLogo: "⚪", fee: "Free Transfer", date: "July 2024", status: "rumored", sport: "football" },
  { id: "x2", playerName: "Alphonso Davies", playerPhoto: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop", fromTeam: "Bayern Munich", fromTeamLogo: "🔴", toTeam: "Real Madrid", toTeamLogo: "⚪", fee: "€50M", date: "June 2024", status: "rumored", sport: "football" },
  { id: "x3", playerName: "Dani Olmo", playerPhoto: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=200&fit=crop", fromTeam: "RB Leipzig", fromTeamLogo: "⚪", toTeam: "Barcelona", toTeamLogo: "🔵", fee: "€60M", date: "May 2024", status: "confirmed", sport: "football" },
  { id: "x4", playerName: "Leny Yoro", playerPhoto: "https://images.unsplash.com/photo-1541889413-fce7e29015db?w=200&h=200&fit=crop", fromTeam: "Lille", fromTeamLogo: "🔴", toTeam: "Man United", toTeamLogo: "🔴", fee: "€70M", date: "June 2024", status: "completed", sport: "football" },
];

export const predictions: Prediction[] = [
  {
    id: "pr1",
    homeTeam: teams.mci,
    awayTeam: teams.ars,
    homeWin: 62,
    draw: 22,
    awayWin: 16,
    confidence: 78,
    sport: "football",
    league: "Premier League",
    date: "Tomorrow",
    reason: "Man City have won 14 of their last 16 home games and lead the head-to-head 3-1 this season.",
  },
  {
    id: "pr2",
    homeTeam: teams.bar,
    awayTeam: teams.rm,
    homeWin: 45,
    draw: 26,
    awayWin: 29,
    confidence: 65,
    sport: "football",
    league: "La Liga",
    date: "May 12",
    reason: "El Clásico at Camp Nou historically favors the home side, but Real Madrid are in red-hot form.",
  },
  {
    id: "pr3",
    homeTeam: teams.ind,
    awayTeam: teams.aus,
    homeWin: 55,
    draw: 0,
    awayWin: 45,
    confidence: 71,
    sport: "cricket",
    league: "Border-Gavaskar Trophy",
    date: "Day 3",
    reason: "India's batting depth and Bumrah's form give them the edge, but Australia's home conditions favor pace.",
  },
];

export const videos: VideoItem[] = [
  { id: "v1", title: "All Goals: Real Madrid 2-1 Bayern Munich | UCL Semi-Final", thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop", duration: "12:34", views: "2.1M", sport: "football", category: "Highlights", date: "Today" },
  { id: "v2", title: "Kohli's Masterclass: 143 vs Australia | Day 2 Highlights", thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=250&fit=crop", duration: "08:12", views: "1.8M", sport: "cricket", category: "Highlights", date: "Today" },
  { id: "v3", title: "Lakers vs Warriors: Full Game 5 Highlights", thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop", duration: "15:47", views: "1.2M", sport: "basketball", category: "Game Recaps", date: "Yesterday" },
  { id: "v4", title: "Verstappen's Imola Qualifying Lap | Onboard", thumbnail: "https://images.unsplash.com/photo-1541889413-fce7e29015db?w=400&h=250&fit=crop", duration: "05:23", views: "890K", sport: "f1", category: "Onboard", date: "Yesterday" },
];

export const matchTimeline: TimelineEvent[] = [
  { minute: "12'", type: "goal", team: "home", player: "Vinícius Júnior", detail: "Assist: Bellingham", icon: "⚽" },
  { minute: "28'", type: "yellow", team: "away", player: "Leroy Sané", detail: "Tactical foul", icon: "🟨" },
  { minute: "39'", type: "goal", team: "away", player: "Harry Kane", detail: "Penalty", icon: "⚽" },
  { minute: "45+2'", type: "sub", team: "home", player: "Joselu ↑ • Camavinga ↓", detail: "Tactical", icon: "🔄" },
  { minute: "55'", type: "yellow", team: "home", player: "Eduardo Camavinga", detail: "Late challenge", icon: "🟨" },
  { minute: "68'", type: "var", team: "home", player: "Goal disallowed", detail: "Handball in build-up", icon: "🖥️" },
  { minute: "74'", type: "goal", team: "home", player: "Rodrygo", detail: "Assist: Valverde", icon: "⚽" },
  { minute: "81'", type: "sub", team: "away", player: "Müller ↑ • Kimmich ↓", detail: "Tactical", icon: "🔄" },
];

export const matchStats: Record<string, MatchStats> = {
  m1: {
    possession: 58,
    shots: 14,
    shotsOnTarget: 6,
    corners: 7,
    fouls: 11,
    yellowCards: 2,
    redCards: 0,
    offsides: 3,
    passes: 542,
    passAccuracy: 89,
    xg: 2.1,
  },
};

export const matchComments: MatchComment[] = [
  { id: "c1", user: "Madridista_7", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=M7", text: "RODRYGO!!! What a finish! Vamos! 🔥🔥🔥", time: "2m ago", likes: 156 },
  { id: "c2", user: "KaneBeyond", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=KB", text: "Kane is inevitable. That penalty was ice cold.", time: "5m ago", likes: 89 },
  { id: "c3", user: "BernabeuDreams", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BD", text: "Bellingham is running the midfield tonight. Unreal composure.", time: "8m ago", likes: 210 },
  { id: "c4", user: "GermanEfficiency", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=GE", text: "We need Neuer to pull off another miracle save. Come on Bayern!", time: "12m ago", likes: 45 },
];

export const recentSearches = [
  "Real Madrid",
  "Virat Kohli",
  "IPL 2024",
  "NBA Playoffs",
  "Max Verstappen",
  "El Clásico",
];

export const trendingSearches = [
  "Man City vs Arsenal",
  "F1 Imola",
  "Mbappé transfer",
  "Champions League",
];

export const chatSuggestions = [
  "Show today's IPL matches",
  "Compare Messi and Ronaldo",
  "Who scored the fastest century?",
  "Which NBA games start tonight?",
  "AI prediction for El Clásico",
];

export const fantasyPicks = [
  { id: "fp1", name: "Erling Haaland", team: "Man City", logo: "🔵", points: 142, price: "€14.5M", position: "FWD", suggested: true },
  { id: "fp2", name: "Mohamed Salah", team: "Liverpool", logo: "🔴", points: 138, price: "€13.8M", position: "FWD", suggested: true },
  { id: "fp3", name: "Jude Bellingham", team: "Real Madrid", logo: "⚪", points: 131, price: "€11.2M", position: "MID", suggested: true },
  { id: "fp4", name: "Bukayo Saka", team: "Arsenal", logo: "🔴", points: 126, price: "€10.5M", position: "MID", suggested: false },
  { id: "fp5", name: "Rúben Dias", team: "Man City", logo: "🔵", points: 98, price: "€6.2M", position: "DEF", suggested: false },
  { id: "fp6", name: "Alisson Becker", team: "Liverpool", logo: "🔴", points: 115, price: "€5.5M", position: "GK", suggested: false },
];

export const footballMatches = allMatches.filter((m) => m.sport === "football" && (m.status === "live" || m.status === "upcoming"));
export const footballNews = topNews.filter((n) => n.sport === "football");
export const footballPlayers = topPlayers.filter((p) => p.sport === "football");
export const cricketNews = topNews.filter((n) => n.sport === "cricket");
export const basketballNews = topNews.filter((n) => n.sport === "basketball");
export const f1News = topNews.filter((n) => n.sport === "f1");
