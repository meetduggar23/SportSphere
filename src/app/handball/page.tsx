"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Match, Player } from "@/types";

const handballMatches: Match[] = [
  {
    id: "hb1",
    sport: "handball",
    league: "IHF World Championship",
    status: "live",
    minute: "2nd Half",
    homeTeam: { id: "den", name: "Denmark", shortName: "DEN", logo: "🤾", sport: "handball", country: "Denmark" },
    awayTeam: { id: "fra", name: "France", shortName: "FRA", logo: "🤾", sport: "handball", country: "France" },
    homeScore: 24,
    awayScore: 22,
    venue: "Boxen, Herning",
    competition: "Final",
    date: "Today",
  },
  ...allMatches.filter((m) => m.sport === "handball"),
];

const handballPlayers: Player[] = [
  { id: "hbl1", name: "Niklas Landin", photo: "", team: "Denmark", teamId: "", teamLogo: "🤾", position: "Goalkeeper", sport: "handball", nationality: "Denmark", age: 35, stat: "38", statLabel: "Saves", rating: 95 },
  { id: "hbl2", name: "Mathias Gidsel", photo: "", team: "Denmark", teamId: "", teamLogo: "🤾", position: "Right Back", sport: "handball", nationality: "Denmark", age: 25, stat: "76", statLabel: "Goals", rating: 94 },
  { id: "hbl3", name: "Dika Mem", photo: "", team: "France", teamId: "", teamLogo: "🤾", position: "Right Back", sport: "handball", nationality: "France", age: 26, stat: "58", statLabel: "Goals", rating: 91 },
  { id: "hbl4", name: "Sander Sagosen", photo: "", team: "Norway", teamId: "", teamLogo: "🤾", position: "Center Back", sport: "handball", nationality: "Norway", age: 28, stat: "52", statLabel: "Goals", rating: 92 },
];

export default function HandballPage() {
  return (
    <SportPage
      sport="handball"
      icon={<SportIcon sport="handball" className="w-5 h-5" />}
      matches={handballMatches}
      fixtures={[
        { id: "hb1", sport: "handball", league: "IHF World Championship", title: "Final", homeTeam: { id: "den", name: "Denmark", shortName: "DEN", logo: "🤾", sport: "handball", country: "Denmark" }, dateTime: "Today", time: "6:30 PM" },
        { id: "hb2", sport: "handball", league: "EHF Champions League", title: "Semi-Final", homeTeam: { id: "bar", name: "Barcelona", shortName: "BAR", logo: "🤾", sport: "handball", country: "Spain" }, dateTime: "May 18", time: "8:45 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "den", name: "Denmark", shortName: "DEN", logo: "🤾", sport: "handball", country: "Denmark" }, played: 8, won: 8, drawn: 0, lost: 0, goalDifference: 74, points: 16 },
        { position: 2, team: { id: "fra", name: "France", shortName: "FRA", logo: "🤾", sport: "handball", country: "France" }, played: 8, won: 6, drawn: 0, lost: 2, goalDifference: 41, points: 12 },
        { position: 3, team: { id: "nor", name: "Norway", shortName: "NOR", logo: "🤾", sport: "handball", country: "Norway" }, played: 8, won: 5, drawn: 0, lost: 3, goalDifference: 28, points: 10 },
        { position: 4, team: { id: "swe", name: "Sweden", shortName: "SWE", logo: "🤾", sport: "handball", country: "Sweden" }, played: 8, won: 4, drawn: 0, lost: 4, goalDifference: 12, points: 8 },
      ]}
      news={[]}
      players={handballPlayers}
      competitions={["IHF World Championship", "EHF Champions League", "Olympic Games", "European Championship", "World League"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🤾</div>
              <p className="text-sm font-bold">Denmark</p>
              <p className="text-xs text-muted">1st • 16 pts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-blue-600">World</p>
              <p className="text-xs text-muted mt-1">IHF Championship 2025</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🤾</div>
              <p className="text-sm font-bold">France</p>
              <p className="text-xs text-muted">2nd • 12 pts</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-600">🤾 IHF World Rankings</p>
              <p className="text-xs text-muted mt-1">Denmark eye another title</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
