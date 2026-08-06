"use client";

import { SportPage } from "@/components/sports/SportPage";
import {
  allMatches,
  f1News,
} from "@/data/mock";
import { Player } from "@/types";

const f1Matches = allMatches.filter((m) => m.sport === "f1");

const f1Drivers: Player[] = [
  { id: "d1", name: "Max Verstappen", photo: "", team: "Red Bull", teamId: "rb", teamLogo: "🔵", position: "Driver", sport: "f1", nationality: "Netherlands", age: 26, stat: "261", statLabel: "Points", rating: 96 },
  { id: "d2", name: "Sergio Pérez", photo: "", team: "Red Bull", teamId: "rb", teamLogo: "🔵", position: "Driver", sport: "f1", nationality: "Mexico", age: 34, stat: "156", statLabel: "Points", rating: 85 },
  { id: "d3", name: "Charles Leclerc", photo: "", team: "Ferrari", teamId: "fer", teamLogo: "🔴", position: "Driver", sport: "f1", nationality: "Monaco", age: 26, stat: "150", statLabel: "Points", rating: 89 },
  { id: "d4", name: "Lando Norris", photo: "", team: "McLaren", teamId: "mcl", teamLogo: "🟠", position: "Driver", sport: "f1", nationality: "UK", age: 24, stat: "144", statLabel: "Points", rating: 88 },
  { id: "d5", name: "Lewis Hamilton", photo: "", team: "Mercedes", teamId: "mer", teamLogo: "⚫", position: "Driver", sport: "f1", nationality: "UK", age: 39, stat: "132", statLabel: "Points", rating: 90 },
];

export default function F1Page() {
  return (
    <SportPage
      sport="f1"
      icon={<span className="text-xl">🏎️</span>}
      matches={f1Matches}
      fixtures={[
        { id: "f1x", sport: "f1", league: "FIA Formula 1", title: "Race", homeTeam: { id: "imola", name: "Emilia Romagna GP", shortName: "IMO", logo: "🏁", sport: "f1", country: "Italy" }, dateTime: "Today", time: "3:00 PM" },
        { id: "f2x", sport: "f1", league: "FIA Formula 1", title: "Qualifying", homeTeam: { id: "monaco", name: "Monaco GP", shortName: "MON", logo: "🏎️", sport: "f1", country: "Monaco" }, dateTime: "May 25", time: "4:00 PM" },
        { id: "f3x", sport: "f1", league: "FIA Formula 1", title: "Practice", homeTeam: { id: "canada", name: "Canadian GP", shortName: "CAN", logo: "🍁", sport: "f1", country: "Canada" }, dateTime: "Jun 7", time: "12:30 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "ver", name: "M. Verstappen", shortName: "VER", logo: "🔵", sport: "f1", country: "Netherlands" }, played: 7, won: 5, drawn: 0, lost: 0, goalDifference: 0, points: 261 },
        { position: 2, team: { id: "per", name: "S. Pérez", shortName: "PER", logo: "🔵", sport: "f1", country: "Mexico" }, played: 7, won: 1, drawn: 0, lost: 0, goalDifference: 0, points: 156 },
        { position: 3, team: { id: "lec", name: "C. Leclerc", shortName: "LEC", logo: "🔴", sport: "f1", country: "Monaco" }, played: 7, won: 1, drawn: 0, lost: 0, goalDifference: 0, points: 150 },
        { position: 4, team: { id: "nor", name: "L. Norris", shortName: "NOR", logo: "🟠", sport: "f1", country: "UK" }, played: 7, won: 0, drawn: 0, lost: 0, goalDifference: 0, points: 144 },
        { position: 5, team: { id: "ham", name: "L. Hamilton", shortName: "HAM", logo: "⚫", sport: "f1", country: "UK" }, played: 7, won: 0, drawn: 0, lost: 0, goalDifference: 0, points: 132 },
      ]}
      news={f1News}
      players={f1Drivers}
      competitions={["Formula 1", "F1 Sprint", "F2 Championship", "F1 Academy"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                🟠
              </div>
              <p className="text-sm font-bold">L. Norris</p>
              <p className="text-xs text-muted">P1</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-red-600">45/63</p>
              <p className="text-xs text-muted mt-1">Emilia Romagna GP</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                🔵
              </div>
              <p className="text-sm font-bold">M. Verstappen</p>
              <p className="text-xs text-muted">P2 • +1.2s</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-red-600">🏁 Norris leads at Imola</p>
              <p className="text-xs text-muted mt-1">Verstappen closing fast on softs</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
