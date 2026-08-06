"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const nflMatches = allMatches.filter((m) => m.sport === "nfl");

const nflPlayers: Player[] = [
  { id: "af1", name: "Patrick Mahomes", photo: "", team: "Kansas City Chiefs", teamId: "", teamLogo: "🏈", position: "QB", sport: "nfl", nationality: "USA", age: 28, stat: "4,183", statLabel: "Pass Yards", rating: 96 },
  { id: "af2", name: "Josh Allen", photo: "", team: "Buffalo Bills", teamId: "", teamLogo: "🏈", position: "QB", sport: "nfl", nationality: "USA", age: 27, stat: "3,987", statLabel: "Pass Yards", rating: 94 },
  { id: "af3", name: "Jalen Hurts", photo: "", team: "Philadelphia Eagles", teamId: "", teamLogo: "🏈", position: "QB", sport: "nfl", nationality: "USA", age: 25, stat: "3,765", statLabel: "Pass Yards", rating: 92 },
  { id: "af4", name: "Lamar Jackson", photo: "", team: "Baltimore Ravens", teamId: "", teamLogo: "🏈", position: "QB", sport: "nfl", nationality: "USA", age: 27, stat: "3,520", statLabel: "Pass Yards", rating: 93 },
];

export default function NFLPage() {
  return (
    <SportPage
      sport="nfl"
      icon={<SportIcon sport="nfl" className="w-5 h-5" />}
      matches={nflMatches}
      fixtures={[
        { id: "nfl1", sport: "nfl", league: "NFL", title: "Week 1", homeTeam: { id: "kc", name: "Kansas City Chiefs", shortName: "KC", logo: "🏈", sport: "nfl", country: "USA" }, dateTime: "Sep 5", time: "8:20 PM" },
        { id: "nfl2", sport: "nfl", league: "NFL", title: "Week 1", homeTeam: { id: "buf", name: "Buffalo Bills", shortName: "BUF", logo: "🏈", sport: "nfl", country: "USA" }, dateTime: "Sep 8", time: "1:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "kc", name: "Kansas City Chiefs", shortName: "KC", logo: "🏈", sport: "nfl", country: "USA" }, played: 17, won: 14, drawn: 0, lost: 3, goalDifference: 156, points: 0 },
        { position: 2, team: { id: "sf", name: "San Francisco 49ers", shortName: "SF", logo: "🏈", sport: "nfl", country: "USA" }, played: 17, won: 12, drawn: 0, lost: 5, goalDifference: 142, points: 0 },
        { position: 3, team: { id: "buf", name: "Buffalo Bills", shortName: "BUF", logo: "🏈", sport: "nfl", country: "USA" }, played: 17, won: 11, drawn: 0, lost: 6, goalDifference: 98, points: 0 },
        { position: 4, team: { id: "phi", name: "Philadelphia Eagles", shortName: "PHI", logo: "🏈", sport: "nfl", country: "USA" }, played: 17, won: 11, drawn: 0, lost: 6, goalDifference: 87, points: 0 },
      ]}
      news={[]}
      players={nflPlayers}
      competitions={["NFL", "Super Bowl", "NFC", "AFC", "College Football"]}
      hero={
        <SportHero
          sport="nfl"
          kicker="Super Bowl LVIII"
          ctaHref="/match/m7"
          home={{ name: "Kansas City Chiefs", logo: "🏈", score: "38", sub: "AFC Champions" }}
          away={{ name: "San Francisco 49ers", logo: "🏈", score: "35", sub: "NFC Champions" }}
          headline="Chiefs win Super Bowl in overtime — back-to-back!"
        />
      }
    />
  );
}
