"use client";

import { SportPage } from "@/components/sports/SportPage";
import {
  allMatches,
  upcomingFixtures,
  basketballNews,
  teams,
} from "@/data/mock";

const basketballMatches = allMatches.filter((m) => m.sport === "basketball");

export default function BasketballPage() {
  return (
    <SportPage
      sport="basketball"
      icon={<span className="text-xl">🏀</span>}
      matches={basketballMatches}
      fixtures={upcomingFixtures.filter((f) => f.sport === "basketball")}
      standings={[
        { position: 1, team: teams.bos, played: 82, won: 64, drawn: 0, lost: 18, goalDifference: 420, points: 0 },
        { position: 2, team: teams.gsw, played: 82, won: 51, drawn: 0, lost: 31, goalDifference: 150, points: 0 },
        { position: 3, team: teams.lal, played: 82, won: 47, drawn: 0, lost: 35, goalDifference: 89, points: 0 },
        { position: 4, team: teams.mia, played: 82, won: 45, drawn: 0, lost: 37, goalDifference: -12, points: 0 },
      ]}
      news={basketballNews}
      players={[
        { id: "p3", name: "Luka Dončić", photo: "", team: "Lakers", teamId: "lal", teamLogo: teams.lal.logo, position: "Guard", sport: "basketball", nationality: "Slovenia", age: 25, stat: "28.7", statLabel: "PPG", rating: 94 },
        { id: "p7", name: "Stephen Curry", photo: "", team: "Warriors", teamId: "gsw", teamLogo: teams.gsw.logo, position: "Guard", sport: "basketball", nationality: "USA", age: 36, stat: "26.4", statLabel: "PPG", rating: 92 },
        { id: "p11", name: "Giannis Antetokounmpo", photo: "", team: "Bucks", teamId: "", teamLogo: "🦌", position: "Forward", sport: "basketball", nationality: "Greece", age: 29, stat: "30.1", statLabel: "PPG", rating: 93 },
        { id: "p12", name: "Nikola Jokić", photo: "", team: "Nuggets", teamId: "", teamLogo: "⛰️", position: "Center", sport: "basketball", nationality: "Serbia", age: 29, stat: "26.5", statLabel: "PPG", rating: 95 },
      ]}
      competitions={["NBA", "NBA Playoffs", "EuroLeague", "FIBA World Cup", "WNBA"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                {teams.bos.logo}
              </div>
              <p className="text-sm font-bold">{teams.bos.name}</p>
              <p className="text-xs text-muted">78</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-orange-600">Q3</p>
              <p className="text-xs text-muted mt-1">Playoffs • Game 5</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                {teams.mia.logo}
              </div>
              <p className="text-sm font-bold">{teams.mia.name}</p>
              <p className="text-xs text-muted">65</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-orange-600">🔥 Celtics lead series 3-2</p>
              <p className="text-xs text-muted mt-1">TD Garden, Boston</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
