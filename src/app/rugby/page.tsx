"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const rugbyMatches = allMatches.filter((m) => m.sport === "rugby");

const rugbyPlayers: Player[] = [
  { id: "rg1", name: "Antoine Dupont", photo: "", team: "Toulouse", teamId: "", teamLogo: "🏉", position: "Scrum-half", sport: "rugby", nationality: "France", age: 27, stat: "12", statLabel: "Tries", rating: 96 },
  { id: "rg2", name: "Siya Kolisi", photo: "", team: "Sharks", teamId: "", teamLogo: "🏉", position: "Flanker", sport: "rugby", nationality: "South Africa", age: 33, stat: "8", statLabel: "Tries", rating: 93 },
  { id: "rg3", name: "Ardie Savea", photo: "", team: "Hurricanes", teamId: "", teamLogo: "🏉", position: "Number 8", sport: "rugby", nationality: "New Zealand", age: 30, stat: "10", statLabel: "Tries", rating: 94 },
  { id: "rg4", name: "Johnny Sexton", photo: "", team: "Leinster", teamId: "", teamLogo: "🏉", position: "Fly-half", sport: "rugby", nationality: "Ireland", age: 38, stat: "1,789", statLabel: "Points", rating: 92 },
];

export default function RugbyPage() {
  return (
    <SportPage
      sport="rugby"
      icon={<SportIcon sport="rugby" className="w-5 h-5" />}
      matches={rugbyMatches}
      fixtures={[
        { id: "rg1", sport: "rugby", league: "Six Nations", title: "Round 5", homeTeam: { id: "irl", name: "Ireland", shortName: "IRE", logo: "🏉", sport: "rugby", country: "Ireland" }, dateTime: "Mar 16", time: "3:00 PM" },
        { id: "rg2", sport: "rugby", league: "Rugby Championship", title: "Round 1", homeTeam: { id: "nz", name: "New Zealand", shortName: "NZL", logo: "🏉", sport: "rugby", country: "New Zealand" }, dateTime: "Aug 10", time: "7:35 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "irl", name: "Ireland", shortName: "IRE", logo: "🏉", sport: "rugby", country: "Ireland" }, played: 5, won: 4, drawn: 0, lost: 1, goalDifference: 78, points: 20 },
        { position: 2, team: { id: "eng", name: "England", shortName: "ENG", logo: "🏉", sport: "rugby", country: "England" }, played: 5, won: 3, drawn: 0, lost: 2, goalDifference: 45, points: 15 },
        { position: 3, team: { id: "fra", name: "France", shortName: "FRA", logo: "🏉", sport: "rugby", country: "France" }, played: 5, won: 3, drawn: 0, lost: 2, goalDifference: 38, points: 14 },
        { position: 4, team: { id: "wal", name: "Wales", shortName: "WAL", logo: "🏉", sport: "rugby", country: "Wales" }, played: 5, won: 2, drawn: 0, lost: 3, goalDifference: -12, points: 10 },
      ]}
      news={[]}
      players={rugbyPlayers}
      competitions={["Six Nations", "Rugby Championship", "World Cup", "Premiership", "Top 14"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏉</div>
              <p className="text-sm font-bold">Ireland</p>
              <p className="text-xs text-muted">Grand Slam</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-teal-600">38-17</p>
              <p className="text-xs text-muted mt-1">vs England</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏉</div>
              <p className="text-sm font-bold">England</p>
              <p className="text-xs text-muted">Six Nations</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-teal-600">🏉 Six Nations</p>
              <p className="text-xs text-muted mt-1">Ireland clinch Grand Slam at Aviva Stadium</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
