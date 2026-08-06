"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const esportsMatches = allMatches.filter((m) => m.sport === "esports");

const esportsPlayers: Player[] = [
  { id: "es1", name: "s1mple", photo: "", team: "NAVI", teamId: "", teamLogo: "🎮", position: "AWPer", sport: "esports", nationality: "Ukraine", age: 26, stat: "1.32", statLabel: "Rating", rating: 96 },
  { id: "es2", name: "ZywOo", photo: "", team: "Vitality", teamId: "", teamLogo: "🎮", position: "AWPer", sport: "esports", nationality: "France", age: 23, stat: "1.30", statLabel: "Rating", rating: 95 },
  { id: "es3", name: "NiKo", photo: "", team: "G2", teamId: "", teamLogo: "🎮", position: "Rifler", sport: "esports", nationality: "Bosnia", age: 27, stat: "1.28", statLabel: "Rating", rating: 94 },
  { id: "es4", name: "TenZ", photo: "", team: "Sentinels", teamId: "", teamLogo: "🎮", position: "Duelist", sport: "esports", nationality: "Canada", age: 23, stat: "1.24", statLabel: "Rating", rating: 92 },
];

export default function EsportsPage() {
  return (
    <SportPage
      sport="esports"
      icon={<SportIcon sport="esports" className="w-5 h-5" />}
      matches={esportsMatches}
      fixtures={[
        { id: "es1", sport: "esports", league: "BLAST Premier", title: "Final", homeTeam: { id: "navi", name: "NAVI", shortName: "NAVI", logo: "🎮", sport: "esports", country: "Ukraine" }, dateTime: "Aug 10", time: "6:00 PM" },
        { id: "es2", sport: "esports", league: "VCT Champions", title: "Playoffs", homeTeam: { id: "sen", name: "Sentinels", shortName: "SEN", logo: "🎮", sport: "esports", country: "USA" }, dateTime: "Aug 15", time: "8:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "navi", name: "NAVI", shortName: "NAVI", logo: "🎮", sport: "esports", country: "Ukraine" }, played: 45, won: 38, drawn: 0, lost: 7, goalDifference: 0, points: 0 },
        { position: 2, team: { id: "vit", name: "Vitality", shortName: "VIT", logo: "🎮", sport: "esports", country: "France" }, played: 45, won: 35, drawn: 0, lost: 10, goalDifference: 0, points: 0 },
        { position: 3, team: { id: "g2", name: "G2 Esports", shortName: "G2", logo: "🎮", sport: "esports", country: "Germany" }, played: 45, won: 32, drawn: 0, lost: 13, goalDifference: 0, points: 0 },
        { position: 4, team: { id: "faze", name: "FaZe Clan", shortName: "FAZE", logo: "🎮", sport: "esports", country: "Europe" }, played: 45, won: 30, drawn: 0, lost: 15, goalDifference: 0, points: 0 },
      ]}
      news={[]}
      players={esportsPlayers}
      competitions={["CS2", "Valorant", "League of Legends", "Dota 2", "Overwatch"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🎮</div>
              <p className="text-sm font-bold">NAVI</p>
              <p className="text-xs text-muted">BLAST Champions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-violet-600">2-1</p>
              <p className="text-xs text-muted mt-1">vs Vitality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🎮</div>
              <p className="text-sm font-bold">Vitality</p>
              <p className="text-xs text-muted">Runners-up</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-violet-600">🎮 Esports Arena</p>
              <p className="text-xs text-muted mt-1">NAVI claim BLAST Premier title</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
