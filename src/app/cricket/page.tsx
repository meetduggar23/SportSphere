"use client";

import { SportPage } from "@/components/sports/SportPage";
import {
  allMatches,
  upcomingFixtures,
  cricketNews,
  teams,
} from "@/data/mock";

const cricketMatches = allMatches.filter((m) => m.sport === "cricket");
const cricketStandings = [
  { position: 1, team: teams.ind, played: 5, won: 4, drawn: 1, lost: 0, goalDifference: 320, points: 8 },
  { position: 2, team: teams.aus, played: 5, won: 2, drawn: 1, lost: 2, goalDifference: 110, points: 5 },
  { position: 3, team: teams.eng, played: 4, won: 1, drawn: 0, lost: 3, goalDifference: -180, points: 2 },
].map((row, i) => ({ ...row, position: i + 1 }));

export default function CricketPage() {
  return (
    <SportPage
      sport="cricket"
      icon={<span className="text-xl">🏏</span>}
      matches={cricketMatches}
      fixtures={upcomingFixtures.filter((f) => f.sport === "cricket")}
      standings={cricketStandings}
      news={cricketNews}
      players={[
        { id: "p2", name: "Virat Kohli", photo: "", team: "India", teamId: "ind", teamLogo: teams.ind.logo, position: "Batter", sport: "cricket", nationality: "India", age: 35, stat: "1324", statLabel: "Runs", rating: 92 },
        { id: "p6", name: "Jasprit Bumrah", photo: "", team: "India", teamId: "ind", teamLogo: teams.ind.logo, position: "Bowler", sport: "cricket", nationality: "India", age: 30, stat: "165", statLabel: "Wickets", rating: 93 },
        { id: "p9", name: "Rohit Sharma", photo: "", team: "India", teamId: "ind", teamLogo: teams.ind.logo, position: "Batter", sport: "cricket", nationality: "India", age: 37, stat: "980", statLabel: "Runs", rating: 88 },
        { id: "p10", name: "Pat Cummins", photo: "", team: "Australia", teamId: "aus", teamLogo: teams.aus.logo, position: "All-rounder", sport: "cricket", nationality: "Australia", age: 31, stat: "72", statLabel: "Wickets", rating: 90 },
      ]}
      competitions={["IPL 2024", "Border-Gavaskar Trophy", "World Cup 2023", "The Ashes", "T20 World Cup", "Champions Trophy"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                {teams.ind.logo}
              </div>
              <p className="text-sm font-bold">{teams.ind.shortName}</p>
              <p className="text-xs text-muted">256/4</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-green-600">vs</p>
              <p className="text-xs text-muted mt-1">Day 2 • Test Match</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">
                {teams.aus.logo}
              </div>
              <p className="text-sm font-bold">{teams.aus.shortName}</p>
              <p className="text-xs text-muted">201 all out</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">🔥 Kohli 143*</p>
              <p className="text-xs text-muted mt-1">India lead by 55 runs • MCG Melbourne</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
