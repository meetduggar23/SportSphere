"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const volleyballMatches = allMatches.filter((m) => m.sport === "volleyball");

const volleyballPlayers: Player[] = [
  { id: "vb1", name: "Wilfredo Leon", photo: "", team: "Sir Safety Perugia", teamId: "", teamLogo: "🏐", position: "Outside Hitter", sport: "volleyball", nationality: "Poland", age: 31, stat: "287", statLabel: "Points", rating: 94 },
  { id: "vb2", name: "Ivan Zaytsev", photo: "", team: "Vero Volley Monza", teamId: "", teamLogo: "🏐", position: "Opposite", sport: "volleyball", nationality: "Italy", age: 35, stat: "256", statLabel: "Points", rating: 92 },
  { id: "vb3", name: "Yuji Nishida", photo: "", team: "Panasonic Panthers", teamId: "", teamLogo: "🏐", position: "Opposite", sport: "volleyball", nationality: "Japan", age: 24, stat: "234", statLabel: "Points", rating: 90 },
  { id: "vb4", name: "Earvin N'Gapeth", photo: "", team: "Paykan Tehran", teamId: "", teamLogo: "🏐", position: "Outside Hitter", sport: "volleyball", nationality: "France", age: 33, stat: "221", statLabel: "Points", rating: 91 },
];

export default function VolleyballPage() {
  return (
    <SportPage
      sport="volleyball"
      icon={<SportIcon sport="volleyball" className="w-5 h-5" />}
      matches={volleyballMatches}
      fixtures={[
        { id: "vb1", sport: "volleyball", league: "VNL", title: "Final", homeTeam: { id: "pol", name: "Poland", shortName: "POL", logo: "🏐", sport: "volleyball", country: "Poland" }, dateTime: "Aug 10", time: "7:00 PM" },
        { id: "vb2", sport: "volleyball", league: "VNL", title: "3rd Place", homeTeam: { id: "ita", name: "Italy", shortName: "ITA", logo: "🏐", sport: "volleyball", country: "Italy" }, dateTime: "Aug 10", time: "4:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "pol", name: "Poland", shortName: "POL", logo: "🏐", sport: "volleyball", country: "Poland" }, played: 12, won: 10, drawn: 0, lost: 2, goalDifference: 18, points: 30 },
        { position: 2, team: { id: "ita", name: "Italy", shortName: "ITA", logo: "🏐", sport: "volleyball", country: "Italy" }, played: 12, won: 9, drawn: 0, lost: 3, goalDifference: 14, points: 27 },
        { position: 3, team: { id: "jpn", name: "Japan", shortName: "JPN", logo: "🏐", sport: "volleyball", country: "Japan" }, played: 12, won: 8, drawn: 0, lost: 4, goalDifference: 10, points: 24 },
        { position: 4, team: { id: "usa", name: "USA", shortName: "USA", logo: "🏐", sport: "volleyball", country: "USA" }, played: 12, won: 7, drawn: 0, lost: 5, goalDifference: 8, points: 21 },
      ]}
      news={[]}
      players={volleyballPlayers}
      competitions={["VNL", "Olympics", "World Championship", "CEV Champions League", "AVC Championship"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏐</div>
              <p className="text-sm font-bold">Poland</p>
              <p className="text-xs text-muted">VNL Champions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-yellow-600">3-1</p>
              <p className="text-xs text-muted mt-1">vs Italy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏐</div>
              <p className="text-sm font-bold">Italy</p>
              <p className="text-xs text-muted">Runners-up</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-yellow-600">🏐 VNL 2024</p>
              <p className="text-xs text-muted mt-1">Poland dominate the finals</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
