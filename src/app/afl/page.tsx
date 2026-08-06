"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const aflMatches = allMatches.filter((m) => m.sport === "afl");

const aflPlayers: Player[] = [
  { id: "afl1", name: "Dustin Martin", photo: "", team: "Richmond", teamId: "", teamLogo: "🏉", position: "Midfield", sport: "afl", nationality: "Australia", age: 32, stat: "32", statLabel: "Goals", rating: 92 },
  { id: "afl2", name: "Patrick Cripps", photo: "", team: "Carlton", teamId: "", teamLogo: "🏉", position: "Midfield", sport: "afl", nationality: "Australia", age: 29, stat: "28", statLabel: "Goals", rating: 91 },
  { id: "afl3", name: "Marcus Bontempelli", photo: "", team: "Western Bulldogs", teamId: "", teamLogo: "🏉", position: "Midfield", sport: "afl", nationality: "Australia", age: 28, stat: "25", statLabel: "Goals", rating: 90 },
  { id: "afl4", name: "Christian Petracca", photo: "", team: "Melbourne", teamId: "", teamLogo: "🏉", position: "Midfield", sport: "afl", nationality: "Australia", age: 28, stat: "22", statLabel: "Goals", rating: 89 },
];

export default function AFLPage() {
  return (
    <SportPage
      sport="afl"
      icon={<SportIcon sport="afl" className="w-5 h-5" />}
      matches={aflMatches}
      fixtures={[
        { id: "afl1", sport: "afl", league: "AFL", title: "Round 20", homeTeam: { id: "rich", name: "Richmond Tigers", shortName: "RIC", logo: "🏉", sport: "afl", country: "Australia" }, dateTime: "Aug 10", time: "7:25 PM" },
        { id: "afl2", sport: "afl", league: "AFL", title: "Round 20", homeTeam: { id: "carl", name: "Carlton Blues", shortName: "CAR", logo: "🏉", sport: "afl", country: "Australia" }, dateTime: "Aug 11", time: "3:20 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "melb", name: "Melbourne", shortName: "MEL", logo: "🏉", sport: "afl", country: "Australia" }, played: 18, won: 14, drawn: 0, lost: 4, goalDifference: 245, points: 56 },
        { position: 2, team: { id: "port", name: "Port Adelaide", shortName: "PA", logo: "🏉", sport: "afl", country: "Australia" }, played: 18, won: 13, drawn: 0, lost: 5, goalDifference: 198, points: 52 },
        { position: 3, team: { id: "gws", name: "GWS Giants", shortName: "GWS", logo: "🏉", sport: "afl", country: "Australia" }, played: 18, won: 12, drawn: 0, lost: 6, goalDifference: 156, points: 48 },
        { position: 4, team: { id: "carl", name: "Carlton", shortName: "CAR", logo: "🏉", sport: "afl", country: "Australia" }, played: 18, won: 11, drawn: 0, lost: 7, goalDifference: 134, points: 44 },
      ]}
      news={[]}
      players={aflPlayers}
      competitions={["AFL", "AFLW", "Pre-Season", "Finals Series", "Grand Final"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-yellow-600/10 via-red-600/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏉</div>
              <p className="text-sm font-bold">Melbourne</p>
              <p className="text-xs text-muted">1st • 56 pts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-yellow-600">Premiers</p>
              <p className="text-xs text-muted mt-1">AFL 2024 Season</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🏉</div>
              <p className="text-sm font-bold">Port Adelaide</p>
              <p className="text-xs text-muted">2nd • 52 pts</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-yellow-600">🏆 AFL Ladder</p>
              <p className="text-xs text-muted mt-1">Melbourne leads the pack</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
