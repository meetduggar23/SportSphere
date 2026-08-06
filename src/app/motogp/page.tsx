"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const motoMatches = allMatches.filter((m) => m.sport === "motogp");

const motogpPlayers: Player[] = [
  { id: "mp1", name: "Francesco Bagnaia", photo: "", team: "Ducati", teamId: "", teamLogo: "🏍️", position: "Rider", sport: "motogp", nationality: "Italy", age: 27, stat: "327", statLabel: "Points", rating: 95 },
  { id: "mp2", name: "Jorge Martin", photo: "", team: "Ducati", teamId: "", teamLogo: "🏍️", position: "Rider", sport: "motogp", nationality: "Spain", age: 26, stat: "312", statLabel: "Points", rating: 93 },
  { id: "mp3", name: "Marc Marquez", photo: "", team: "Ducati", teamId: "", teamLogo: "🏍️", position: "Rider", sport: "motogp", nationality: "Spain", age: 31, stat: "298", statLabel: "Points", rating: 92 },
  { id: "mp4", name: "Marco Bezzecchi", photo: "", team: "Aprilia", teamId: "", teamLogo: "🏍️", position: "Rider", sport: "motogp", nationality: "Italy", age: 25, stat: "245", statLabel: "Points", rating: 88 },
];

export default function MotoGPPage() {
  return (
    <SportPage
      sport="motogp"
      icon={<SportIcon sport="motogp" className="w-5 h-5" />}
      matches={motoMatches}
      fixtures={[
        { id: "mg1", sport: "motogp", league: "MotoGP World Championship", title: "Race", homeTeam: { id: "duc", name: "Ducati Lenovo", shortName: "DUC", logo: "🏍️", sport: "motogp", country: "Italy" }, dateTime: "Aug 10", time: "14:00" },
        { id: "mg2", sport: "motogp", league: "MotoGP World Championship", title: "Race", homeTeam: { id: "apr", name: "Aprilia Racing", shortName: "APR", logo: "🏍️", sport: "motogp", country: "Italy" }, dateTime: "Aug 24", time: "14:00" },
      ]}
      standings={[
        { position: 1, team: { id: "bag", name: "F. Bagnaia", shortName: "BAG", logo: "🏍️", sport: "motogp", country: "Italy" }, played: 12, won: 7, drawn: 0, lost: 5, goalDifference: 0, points: 327 },
        { position: 2, team: { id: "mar", name: "J. Martin", shortName: "MAR", logo: "🏍️", sport: "motogp", country: "Spain" }, played: 12, won: 6, drawn: 0, lost: 6, goalDifference: 0, points: 312 },
        { position: 3, team: { id: "mm93", name: "M. Marquez", shortName: "MM93", logo: "🏍️", sport: "motogp", country: "Spain" }, played: 12, won: 5, drawn: 0, lost: 7, goalDifference: 0, points: 298 },
        { position: 4, team: { id: "bez", name: "M. Bezzecchi", shortName: "BEZ", logo: "🏍️", sport: "motogp", country: "Italy" }, played: 12, won: 4, drawn: 0, lost: 8, goalDifference: 0, points: 245 },
      ]}
      news={[]}
      players={motogpPlayers}
      competitions={["MotoGP World Championship", "Moto2", "Moto3", "MotoE", "WSBK"]}
      hero={
        <div className="rounded-2xl border border-border bg-gradient-to-r from-red-600/10 via-orange-500/5 to-transparent p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🇮🇹</div>
              <p className="text-sm font-bold">F. Bagnaia</p>
              <p className="text-xs text-muted">1st • 327 pts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-red-600">P1</p>
              <p className="text-xs text-muted mt-1">Austrian GP</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-2xl mb-2 mx-auto">🇪🇸</div>
              <p className="text-sm font-bold">J. Martin</p>
              <p className="text-xs text-muted">2nd • 312 pts</p>
            </div>
            <div className="flex-1" />
            <div className="text-right">
              <p className="text-sm font-semibold text-red-600">🏁 MotoGP Championship</p>
              <p className="text-xs text-muted mt-1">Bagnaia extends lead at Red Bull Ring</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
