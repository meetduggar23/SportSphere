"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const baseballMatches = allMatches.filter((m) => m.sport === "baseball");

const baseballPlayers: Player[] = [
  { id: "bb1", name: "Shohei Ohtani", photo: "", team: "Los Angeles Dodgers", teamId: "", teamLogo: "⚾", position: "DH/P", sport: "baseball", nationality: "Japan", age: 29, stat: "54", statLabel: "HR", rating: 97 },
  { id: "bb2", name: "Ronald Acuna Jr.", photo: "", team: "Atlanta Braves", teamId: "", teamLogo: "⚾", position: "OF", sport: "baseball", nationality: "Venezuela", age: 26, stat: "41", statLabel: "HR", rating: 94 },
  { id: "bb3", name: "Mookie Betts", photo: "", team: "Los Angeles Dodgers", teamId: "", teamLogo: "⚾", position: "SS/OF", sport: "baseball", nationality: "USA", age: 31, stat: "39", statLabel: "HR", rating: 93 },
  { id: "bb4", name: "Freddie Freeman", photo: "", team: "Los Angeles Dodgers", teamId: "", teamLogo: "⚾", position: "1B", sport: "baseball", nationality: "USA", age: 34, stat: "29", statLabel: "HR", rating: 91 },
];

export default function BaseballPage() {
  return (
    <SportPage
      sport="baseball"
      icon={<SportIcon sport="baseball" className="w-5 h-5" />}
      matches={baseballMatches}
      fixtures={[
        { id: "mlb1", sport: "baseball", league: "MLB", title: "Game", homeTeam: { id: "lad", name: "LA Dodgers", shortName: "LAD", logo: "⚾", sport: "baseball", country: "USA" }, dateTime: "Aug 7", time: "7:10 PM" },
        { id: "mlb2", sport: "baseball", league: "MLB", title: "Game", homeTeam: { id: "nyy", name: "NY Yankees", shortName: "NYY", logo: "⚾", sport: "baseball", country: "USA" }, dateTime: "Aug 7", time: "7:05 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "lad", name: "LA Dodgers", shortName: "LAD", logo: "⚾", sport: "baseball", country: "USA" }, played: 120, won: 72, drawn: 0, lost: 48, goalDifference: 156, points: 0 },
        { position: 2, team: { id: "atl", name: "Atlanta Braves", shortName: "ATL", logo: "⚾", sport: "baseball", country: "USA" }, played: 120, won: 68, drawn: 0, lost: 52, goalDifference: 134, points: 0 },
        { position: 3, team: { id: "nyy", name: "NY Yankees", shortName: "NYY", logo: "⚾", sport: "baseball", country: "USA" }, played: 120, won: 65, drawn: 0, lost: 55, goalDifference: 98, points: 0 },
        { position: 4, team: { id: "hou", name: "Houston Astros", shortName: "HOU", logo: "⚾", sport: "baseball", country: "USA" }, played: 120, won: 62, drawn: 0, lost: 58, goalDifference: 67, points: 0 },
      ]}
      news={[]}
      players={baseballPlayers}
      competitions={["MLB", "World Series", "AL", "NL", "Minor Leagues"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">⚾</div>
              <p className="text-sm font-bold">LA Dodgers</p>
              <p className="text-xs text-muted">NL West Leaders</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-indigo-600">9-3</p>
              <p className="text-xs text-muted mt-1">vs Atlanta</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">⚾</div>
              <p className="text-sm font-bold">Atlanta Braves</p>
              <p className="text-xs text-muted">NL East Leaders</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-indigo-600">⚾ MLB Season</p>
              <p className="text-xs text-muted mt-1">Race to the World Series</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
