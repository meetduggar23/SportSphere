"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const nflMatches = allMatches.filter((m) => m.sport === "american_football");

const nflPlayers: Player[] = [
  { id: "af1", name: "Patrick Mahomes", photo: "", team: "Kansas City Chiefs", teamId: "", teamLogo: "🏈", position: "QB", sport: "american_football", nationality: "USA", age: 28, stat: "4,183", statLabel: "Pass Yards", rating: 96 },
  { id: "af2", name: "Josh Allen", photo: "", team: "Buffalo Bills", teamId: "", teamLogo: "🏈", position: "QB", sport: "american_football", nationality: "USA", age: 27, stat: "3,987", statLabel: "Pass Yards", rating: 94 },
  { id: "af3", name: "Jalen Hurts", photo: "", team: "Philadelphia Eagles", teamId: "", teamLogo: "🏈", position: "QB", sport: "american_football", nationality: "USA", age: 25, stat: "3,765", statLabel: "Pass Yards", rating: 92 },
  { id: "af4", name: "Lamar Jackson", photo: "", team: "Baltimore Ravens", teamId: "", teamLogo: "🏈", position: "QB", sport: "american_football", nationality: "USA", age: 27, stat: "3,520", statLabel: "Pass Yards", rating: 93 },
];

export default function AmericanFootballPage() {
  return (
    <SportPage
      sport="american_football"
      icon={<SportIcon sport="american-football" className="w-5 h-5" />}
      matches={nflMatches}
      fixtures={[
        { id: "nfl1", sport: "american_football", league: "NFL", title: "Week 1", homeTeam: { id: "kc", name: "Kansas City Chiefs", shortName: "KC", logo: "🏈", sport: "american_football", country: "USA" }, dateTime: "Sep 5", time: "8:20 PM" },
        { id: "nfl2", sport: "american_football", league: "NFL", title: "Week 1", homeTeam: { id: "buf", name: "Buffalo Bills", shortName: "BUF", logo: "🏈", sport: "american_football", country: "USA" }, dateTime: "Sep 8", time: "1:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "kc", name: "Kansas City Chiefs", shortName: "KC", logo: "🏈", sport: "american_football", country: "USA" }, played: 17, won: 14, drawn: 0, lost: 3, goalDifference: 156, points: 0 },
        { position: 2, team: { id: "sf", name: "San Francisco 49ers", shortName: "SF", logo: "🏈", sport: "american_football", country: "USA" }, played: 17, won: 12, drawn: 0, lost: 5, goalDifference: 142, points: 0 },
        { position: 3, team: { id: "buf", name: "Buffalo Bills", shortName: "BUF", logo: "🏈", sport: "american_football", country: "USA" }, played: 17, won: 11, drawn: 0, lost: 6, goalDifference: 98, points: 0 },
        { position: 4, team: { id: "phi", name: "Philadelphia Eagles", shortName: "PHI", logo: "🏈", sport: "american_football", country: "USA" }, played: 17, won: 11, drawn: 0, lost: 6, goalDifference: 87, points: 0 },
      ]}
      news={[]}
      players={nflPlayers}
      competitions={["NFL", "Super Bowl", "NFC", "AFC", "College Football"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-amber-700/10 via-orange-600/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏈</div>
              <p className="text-sm font-bold">Kansas City</p>
              <p className="text-xs text-muted">AFC Champions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-amber-700">38-35</p>
              <p className="text-xs text-muted mt-1">Super Bowl LVIII</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏈</div>
              <p className="text-sm font-bold">San Francisco</p>
              <p className="text-xs text-muted">NFC Champions</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-amber-700">🏆 Back-to-Back!</p>
              <p className="text-xs text-muted mt-1">Chiefs win Super Bowl in OT</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
