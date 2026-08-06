"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const boxingMatches = allMatches.filter((m) => m.sport === "boxing");

const boxingPlayers: Player[] = [
  { id: "bx1", name: "Canelo Alvarez", photo: "", team: "PBC", teamId: "", teamLogo: "🥊", position: "Super Middleweight", sport: "boxing", nationality: "Mexico", age: 34, stat: "61-2-2", statLabel: "Record", rating: 96 },
  { id: "bx2", name: "Oleksandr Usyk", photo: "", team: "Queensberry", teamId: "", teamLogo: "🥊", position: "Heavyweight", sport: "boxing", nationality: "Ukraine", age: 37, stat: "22-0", statLabel: "Record", rating: 95 },
  { id: "bx3", name: "Tyson Fury", photo: "", team: "Queensberry", teamId: "", teamLogo: "🥊", position: "Heavyweight", sport: "boxing", nationality: "UK", age: 35, stat: "34-1-1", statLabel: "Record", rating: 94 },
  { id: "bx4", name: "Terence Crawford", photo: "", team: "PBC", teamId: "", teamLogo: "🥊", position: "Welterweight", sport: "boxing", nationality: "USA", age: 36, stat: "41-0", statLabel: "Record", rating: 95 },
];

export default function BoxingPage() {
  return (
    <SportPage
      sport="boxing"
      icon={<SportIcon sport="boxing" className="w-5 h-5" />}
      matches={boxingMatches}
      fixtures={[
        { id: "bx1", sport: "boxing", league: "PBC", title: "Title Fight", homeTeam: { id: "canelo", name: "Canelo Alvarez", shortName: "CAN", logo: "🥊", sport: "boxing", country: "Mexico" }, dateTime: "Sep 14", time: "9:00 PM" },
        { id: "bx2", sport: "boxing", league: "Queensberry", title: "Undisputed", homeTeam: { id: "usyk", name: "O. Usyk", shortName: "USYK", logo: "🥊", sport: "boxing", country: "Ukraine" }, dateTime: "Oct 12", time: "8:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "canelo", name: "Canelo Alvarez", shortName: "CAN", logo: "🥊", sport: "boxing", country: "Mexico" }, played: 65, won: 61, drawn: 2, lost: 2, goalDifference: 0, points: 0 },
        { position: 2, team: { id: "usyk", name: "O. Usyk", shortName: "USYK", logo: "🥊", sport: "boxing", country: "Ukraine" }, played: 22, won: 22, drawn: 0, lost: 0, goalDifference: 0, points: 0 },
        { position: 3, team: { id: "fury", name: "T. Fury", shortName: "FURY", logo: "🥊", sport: "boxing", country: "UK" }, played: 36, won: 34, drawn: 1, lost: 1, goalDifference: 0, points: 0 },
        { position: 4, team: { id: "crawford", name: "T. Crawford", shortName: "TC", logo: "🥊", sport: "boxing", country: "USA" }, played: 41, won: 41, drawn: 0, lost: 0, goalDifference: 0, points: 0 },
      ]}
      news={[]}
      players={boxingPlayers}
      competitions={["WBC", "WBA", "IBF", "WBO", "PBC", "Queensberry"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-purple-500/10 via-fuchsia-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🥊</div>
              <p className="text-sm font-bold">Usyk</p>
              <p className="text-xs text-muted">Undisputed HW</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-purple-600">KO 11</p>
              <p className="text-xs text-muted mt-1">vs Fury</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🥊</div>
              <p className="text-sm font-bold">Fury</p>
              <p className="text-xs text-muted">Heavyweight</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-purple-600">🥊 Boxing Elite</p>
              <p className="text-xs text-muted mt-1">Usyk becomes undisputed heavyweight champ</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
