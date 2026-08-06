"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const hockeyMatches = allMatches.filter((m) => m.sport === "hockey");

const hockeyPlayers: Player[] = [
  { id: "hh1", name: "Connor McDavid", photo: "", team: "Edmonton Oilers", teamId: "", teamLogo: "🏒", position: "Center", sport: "hockey", nationality: "Canada", age: 27, stat: "132", statLabel: "Points", rating: 97 },
  { id: "hh2", name: "Nathan MacKinnon", photo: "", team: "Colorado Avalanche", teamId: "", teamLogo: "🏒", position: "Center", sport: "hockey", nationality: "Canada", age: 28, stat: "128", statLabel: "Points", rating: 95 },
  { id: "hh3", name: "Auston Matthews", photo: "", team: "Toronto Maple Leafs", teamId: "", teamLogo: "🏒", position: "Center", sport: "hockey", nationality: "USA", age: 26, stat: "112", statLabel: "Points", rating: 93 },
  { id: "hh4", name: "Leon Draisaitl", photo: "", team: "Edmonton Oilers", teamId: "", teamLogo: "🏒", position: "Center", sport: "hockey", nationality: "Germany", age: 28, stat: "108", statLabel: "Points", rating: 92 },
];

export default function HockeyPage() {
  return (
    <SportPage
      sport="hockey"
      icon={<SportIcon sport="hockey" className="w-5 h-5" />}
      matches={hockeyMatches}
      fixtures={[
        { id: "nhl1", sport: "hockey", league: "NHL", title: "Game", homeTeam: { id: "edm", name: "Edmonton Oilers", shortName: "EDM", logo: "🏒", sport: "hockey", country: "Canada" }, dateTime: "Oct 12", time: "9:00 PM" },
        { id: "nhl2", sport: "hockey", league: "NHL", title: "Game", homeTeam: { id: "col", name: "Colorado Avalanche", shortName: "COL", logo: "🏒", sport: "hockey", country: "USA" }, dateTime: "Oct 12", time: "7:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "edm", name: "Edmonton Oilers", shortName: "EDM", logo: "🏒", sport: "hockey", country: "Canada" }, played: 82, won: 50, drawn: 0, lost: 32, goalDifference: 68, points: 106 },
        { position: 2, team: { id: "col", name: "Colorado Avalanche", shortName: "COL", logo: "🏒", sport: "hockey", country: "USA" }, played: 82, won: 48, drawn: 0, lost: 34, goalDifference: 52, points: 102 },
        { position: 3, team: { id: "tor", name: "Toronto Maple Leafs", shortName: "TOR", logo: "🏒", sport: "hockey", country: "Canada" }, played: 82, won: 46, drawn: 0, lost: 36, goalDifference: 44, points: 98 },
        { position: 4, team: { id: "nya", name: "NY Rangers", shortName: "NYR", logo: "🏒", sport: "hockey", country: "USA" }, played: 82, won: 45, drawn: 0, lost: 37, goalDifference: 38, points: 96 },
      ]}
      news={[]}
      players={hockeyPlayers}
      competitions={["NHL", "Stanley Cup", "AHL", "IIHF", "World Juniors"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏒</div>
              <p className="text-sm font-bold">Edmonton</p>
              <p className="text-xs text-muted">1st • 106 pts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-cyan-600">Champs</p>
              <p className="text-xs text-muted mt-1">Stanley Cup 2024</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏒</div>
              <p className="text-sm font-bold">Florida</p>
              <p className="text-xs text-muted">Finals</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-cyan-600">🏆 NHL Season</p>
              <p className="text-xs text-muted mt-1">Oilers dominate the standings</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
