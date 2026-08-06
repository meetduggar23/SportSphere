"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Match, Player } from "@/types";

const nbaMatches: Match[] = [
  {
    id: "nba1",
    sport: "nba",
    league: "NBA Finals",
    status: "live",
    minute: "Q3 08:15",
    homeTeam: { id: "bos", name: "Boston Celtics", shortName: "BOS", logo: "🏀", sport: "nba", country: "USA" },
    awayTeam: { id: "lal", name: "LA Lakers", shortName: "LAL", logo: "🏀", sport: "nba", country: "USA" },
    homeScore: 82,
    awayScore: 76,
    venue: "TD Garden, Boston",
    competition: "Game 4 • Finals",
    date: "Tonight",
  },
  ...allMatches.filter((m) => m.sport === "nba"),
];

const nbaPlayers: Player[] = [
  { id: "nba1", name: "LeBron James", photo: "", team: "Lakers", teamId: "lal", teamLogo: "🏀", position: "Forward", sport: "nba", nationality: "USA", age: 39, stat: "25.7", statLabel: "PPG", rating: 94 },
  { id: "nba2", name: "Nikola Jokić", photo: "", team: "Nuggets", teamId: "", teamLogo: "⛰️", position: "Center", sport: "nba", nationality: "Serbia", age: 29, stat: "26.5", statLabel: "PPG", rating: 95 },
  { id: "nba3", name: "Jayson Tatum", photo: "", team: "Celtics", teamId: "bos", teamLogo: "🏀", position: "Forward", sport: "nba", nationality: "USA", age: 26, stat: "26.9", statLabel: "PPG", rating: 93 },
  { id: "nba4", name: "Shai Gilgeous-Alexander", photo: "", team: "Thunder", teamId: "", teamLogo: "⚡", position: "Guard", sport: "nba", nationality: "Canada", age: 25, stat: "30.1", statLabel: "PPG", rating: 94 },
];

export default function NBAPage() {
  return (
    <SportPage
      sport="nba"
      icon={<SportIcon sport="nba" className="w-5 h-5" />}
      matches={nbaMatches}
      fixtures={[
        { id: "nb1", sport: "nba", league: "NBA Finals", title: "Game 4", homeTeam: { id: "bos", name: "Boston Celtics", shortName: "BOS", logo: "🏀", sport: "nba", country: "USA" }, dateTime: "Tonight", time: "8:30 PM" },
        { id: "nb2", sport: "nba", league: "NBA Finals", title: "Game 5", homeTeam: { id: "lal", name: "LA Lakers", shortName: "LAL", logo: "🏀", sport: "nba", country: "USA" }, dateTime: "Jun 15", time: "9:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "bos", name: "Boston Celtics", shortName: "BOS", logo: "🏀", sport: "nba", country: "USA" }, played: 82, won: 64, drawn: 0, lost: 18, goalDifference: 0, points: 0 },
        { position: 2, team: { id: "okc", name: "OKC Thunder", shortName: "OKC", logo: "⚡", sport: "nba", country: "USA" }, played: 82, won: 57, drawn: 0, lost: 25, goalDifference: 0, points: 0 },
        { position: 3, team: { id: "min", name: "Minnesota Timberwolves", shortName: "MIN", logo: "🐺", sport: "nba", country: "USA" }, played: 82, won: 56, drawn: 0, lost: 26, goalDifference: 0, points: 0 },
        { position: 4, team: { id: "lal", name: "LA Lakers", shortName: "LAL", logo: "🏀", sport: "nba", country: "USA" }, played: 82, won: 47, drawn: 0, lost: 35, goalDifference: 0, points: 0 },
      ]}
      news={[]}
      players={nbaPlayers}
      competitions={["NBA Finals", "NBA Playoffs", "NBA Draft", "NBA Cup", "Summer League"]}
      hero={
        <SportHero
          sport="nba"
          kicker="NBA Finals • Game 4"
          live
          ctaHref="/match/m4"
          home={{ name: "Boston Celtics", logo: "🏀", score: "82", sub: "1st • 64-18" }}
          away={{ name: "LA Lakers", logo: "🏀", score: "76", sub: "4th • 47-35" }}
          headline="Celtics lead the Finals series 2-1 at the Garden"
          venue="TD Garden, Boston"
        />
      }
    />
  );
}
