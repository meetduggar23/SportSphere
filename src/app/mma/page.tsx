"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const mmaMatches = allMatches.filter((m) => m.sport === "mma");

const mmaPlayers: Player[] = [
  { id: "uf1", name: "Islam Makhachev", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Lightweight", sport: "mma", nationality: "Russia", age: 32, stat: "25-1", statLabel: "Record", rating: 96 },
  { id: "uf2", name: "Alex Pereira", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Light Heavyweight", sport: "mma", nationality: "Brazil", age: 36, stat: "10-2", statLabel: "Record", rating: 94 },
  { id: "uf3", name: "Jon Jones", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Heavyweight", sport: "mma", nationality: "USA", age: 36, stat: "27-1", statLabel: "Record", rating: 95 },
  { id: "uf4", name: "Sean O'Malley", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Bantamweight", sport: "mma", nationality: "USA", age: 29, stat: "18-1", statLabel: "Record", rating: 92 },
];

export default function MMAPage() {
  return (
    <SportPage
      sport="mma"
      icon={<SportIcon sport="mma" className="w-5 h-5" />}
      matches={mmaMatches}
      fixtures={[
        { id: "ufc1", sport: "mma", league: "UFC", title: "UFC 305", homeTeam: { id: "islam", name: "I. Makhachev", shortName: "ISL", logo: "🥋", sport: "mma", country: "Russia" }, dateTime: "Aug 18", time: "8:00 PM" },
        { id: "ufc2", sport: "mma", league: "UFC", title: "UFC 306", homeTeam: { id: "pereira", name: "A. Pereira", shortName: "PER", logo: "🥋", sport: "mma", country: "Brazil" }, dateTime: "Sep 14", time: "8:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "islam", name: "I. Makhachev", shortName: "ISL", logo: "🥋", sport: "mma", country: "Russia" }, played: 25, won: 24, drawn: 0, lost: 1, goalDifference: 0, points: 0 },
        { position: 2, team: { id: "pereira", name: "A. Pereira", shortName: "PER", logo: "🥋", sport: "mma", country: "Brazil" }, played: 12, won: 10, drawn: 0, lost: 2, goalDifference: 0, points: 0 },
        { position: 3, team: { id: "jones", name: "J. Jones", shortName: "JON", logo: "🥋", sport: "mma", country: "USA" }, played: 28, won: 27, drawn: 0, lost: 1, goalDifference: 0, points: 0 },
        { position: 4, team: { id: "somm", name: "S. O'Malley", shortName: "SOM", logo: "🥋", sport: "mma", country: "USA" }, played: 19, won: 18, drawn: 0, lost: 1, goalDifference: 0, points: 0 },
      ]}
      news={[]}
      players={mmaPlayers}
      competitions={["UFC", "PFL", "Bellator", "ONE Championship", "Fight Night"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-red-500/10 via-pink-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🥋</div>
              <p className="text-sm font-bold">Makhachev</p>
              <p className="text-xs text-muted">LHW Champion</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-red-600">TKO 4</p>
              <p className="text-xs text-muted mt-1">UFC 304</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🥋</div>
              <p className="text-sm font-bold">Moicano</p>
              <p className="text-xs text-muted">Challenger</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-red-600">🥋 UFC Rankings</p>
              <p className="text-xs text-muted mt-1">Makhachev cements dynasty</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
