"use client";

import { SportPage } from "@/components/sports/SportPage";
import {
  footballMatches,
  upcomingFixtures,
  standings,
  footballNews,
  footballPlayers,
  teams,
} from "@/data/mock";

export default function FootballPage() {
  return (
    <SportPage
      sport="football"
      icon={<span className="text-xl">⚽</span>}
      matches={footballMatches}
      fixtures={upcomingFixtures.filter((f) => f.sport === "football")}
      standings={standings}
      news={footballNews}
      players={footballPlayers}
      competitions={["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "UEFA Champions League", "Europa League", "FIFA World Cup"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                {teams.rm.logo}
              </div>
              <p className="text-sm font-bold">{teams.rm.shortName}</p>
              <p className="text-xs text-muted">1st • 81 pts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-primary">2-1</p>
              <p className="text-xs text-muted mt-1">FT • UCL Semi-Final</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                {teams.bay.logo}
              </div>
              <p className="text-sm font-bold">{teams.bay.shortName}</p>
              <p className="text-xs text-muted">Semi-Final 1st Leg</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">🚨 UEFA Champions League</p>
              <p className="text-xs text-muted mt-1">Real Madrid take the advantage to Munich</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
