"use client";

import { SportPage } from "@/components/sports/SportPage";
import {
  allMatches,
  tennisNews,
} from "@/data/mock";
import { Player } from "@/types";

const tennisMatches = allMatches.filter((m) => m.sport === "tennis");

const tennisPlayers: Player[] = [
  { id: "tp1", name: "Jannik Sinner", photo: "", team: "ATP", teamId: "", teamLogo: "🎾", position: "Singles", sport: "tennis", nationality: "Italy", age: 22, stat: "8920", statLabel: "ATP Points", rating: 95 },
  { id: "tp2", name: "Carlos Alcaraz", photo: "", team: "ATP", teamId: "", teamLogo: "🎾", position: "Singles", sport: "tennis", nationality: "Spain", age: 21, stat: "8485", statLabel: "ATP Points", rating: 94 },
  { id: "tp3", name: "Novak Djokovic", photo: "", team: "ATP", teamId: "", teamLogo: "🎾", position: "Singles", sport: "tennis", nationality: "Serbia", age: 37, stat: "7030", statLabel: "ATP Points", rating: 93 },
  { id: "tp4", name: "Daniil Medvedev", photo: "", team: "ATP", teamId: "", teamLogo: "🎾", position: "Singles", sport: "tennis", nationality: "Russia", age: 28, stat: "6815", statLabel: "ATP Points", rating: 88 },
];

export default function TennisPage() {
  return (
    <SportPage
      sport="tennis"
      icon={<span className="text-xl">🎾</span>}
      matches={tennisMatches}
      fixtures={[
        { id: "t1", sport: "tennis", league: "Italian Open", title: "Final", homeTeam: { id: "sin", name: "J. Sinner", shortName: "SIN", logo: "🎾", sport: "tennis", country: "Italy" }, dateTime: "May 5", time: "4:00 PM" },
        { id: "t2", sport: "tennis", league: "French Open", title: "R1", homeTeam: { id: "alcaraz", name: "C. Alcaraz", shortName: "ALC", logo: "🎾", sport: "tennis", country: "Spain" }, dateTime: "May 26", time: "11:00 AM" },
        { id: "t3", sport: "tennis", league: "Wimbledon", title: "R1", homeTeam: { id: "djok", name: "N. Djokovic", shortName: "DJO", logo: "🎾", sport: "tennis", country: "Serbia" }, dateTime: "Jul 1", time: "12:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "sin", name: "J. Sinner", shortName: "SIN", logo: "🎾", sport: "tennis", country: "Italy" }, played: 38, won: 34, drawn: 0, lost: 4, goalDifference: 0, points: 8920 },
        { position: 2, team: { id: "alca", name: "C. Alcaraz", shortName: "ALC", logo: "🎾", sport: "tennis", country: "Spain" }, played: 35, won: 30, drawn: 0, lost: 5, goalDifference: 0, points: 8485 },
        { position: 3, team: { id: "djo", name: "N. Djokovic", shortName: "DJO", logo: "🎾", sport: "tennis", country: "Serbia" }, played: 32, won: 27, drawn: 0, lost: 5, goalDifference: 0, points: 7030 },
        { position: 4, team: { id: "med", name: "D. Medvedev", shortName: "MED", logo: "🎾", sport: "tennis", country: "Russia" }, played: 36, won: 28, drawn: 0, lost: 8, goalDifference: 0, points: 6815 },
      ]}
      news={tennisNews}
      players={tennisPlayers}
      competitions={["Grand Slams", "ATP Tour", "WTA Tour", "Masters 1000", "Davis Cup"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-lime-500/10 via-emerald-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                🇷🇸
              </div>
              <p className="text-sm font-bold">N. Djokovic</p>
              <p className="text-xs text-muted">6-4, 3-2</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-green-600">2nd Set</p>
              <p className="text-xs text-muted mt-1">Italian Open Semi-Final</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                🇮🇹
              </div>
              <p className="text-sm font-bold">J. Sinner</p>
              <p className="text-xs text-muted">On serve</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">🔥 Sinner fighting back</p>
              <p className="text-xs text-muted mt-1">Foro Italico, Rome</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
