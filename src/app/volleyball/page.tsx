"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const volleyballMatches = allMatches.filter((m) => m.sport === "volleyball");

const volleyballPlayers: Player[] = [
  { id: "vb1", name: "Wilfredo Leon", photo: "", team: "Sir Safety Perugia", teamId: "", teamLogo: "🏐", position: "Outside Hitter", sport: "volleyball", nationality: "Poland", age: 31, stat: "287", statLabel: "Points", rating: 94 },
  { id: "vb2", name: "Ivan Zaytsev", photo: "", team: "Vero Volley Monza", teamId: "", teamLogo: "🏐", position: "Opposite", sport: "volleyball", nationality: "Italy", age: 35, stat: "256", statLabel: "Points", rating: 92 },
  { id: "vb3", name: "Yuji Nishida", photo: "", team: "Panasonic Panthers", teamId: "", teamLogo: "🏐", position: "Opposite", sport: "volleyball", nationality: "Japan", age: 24, stat: "234", statLabel: "Points", rating: 90 },
  { id: "vb4", name: "Earvin N'Gapeth", photo: "", team: "Paykan Tehran", teamId: "", teamLogo: "🏐", position: "Outside Hitter", sport: "volleyball", nationality: "France", age: 33, stat: "221", statLabel: "Points", rating: 91 },
];

export default function VolleyballPage() {
  return (
    <SportPage
      sport="volleyball"
      icon={<SportIcon sport="volleyball" className="w-5 h-5" />}
      matches={volleyballMatches}
      fixtures={[
        { id: "vb1", sport: "volleyball", league: "VNL", title: "Final", homeTeam: { id: "pol", name: "Poland", shortName: "POL", logo: "🏐", sport: "volleyball", country: "Poland" }, dateTime: "Aug 10", time: "7:00 PM" },
        { id: "vb2", sport: "volleyball", league: "VNL", title: "3rd Place", homeTeam: { id: "ita", name: "Italy", shortName: "ITA", logo: "🏐", sport: "volleyball", country: "Italy" }, dateTime: "Aug 10", time: "4:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "pol", name: "Poland", shortName: "POL", logo: "🏐", sport: "volleyball", country: "Poland" }, played: 12, won: 10, drawn: 0, lost: 2, goalDifference: 18, points: 30 },
        { position: 2, team: { id: "ita", name: "Italy", shortName: "ITA", logo: "🏐", sport: "volleyball", country: "Italy" }, played: 12, won: 9, drawn: 0, lost: 3, goalDifference: 14, points: 27 },
        { position: 3, team: { id: "jpn", name: "Japan", shortName: "JPN", logo: "🏐", sport: "volleyball", country: "Japan" }, played: 12, won: 8, drawn: 0, lost: 4, goalDifference: 10, points: 24 },
        { position: 4, team: { id: "usa", name: "USA", shortName: "USA", logo: "🏐", sport: "volleyball", country: "USA" }, played: 12, won: 7, drawn: 0, lost: 5, goalDifference: 8, points: 21 },
      ]}
      news={[]}
      players={volleyballPlayers}
      competitions={["VNL", "Olympics", "World Championship", "CEV Champions League", "AVC Championship"]}
      hero={
        <SportHero
          sport="volleyball"
          kicker="VNL Final 2024"
          ctaHref="/match/m11"
          home={{ name: "Poland", logo: "🏐", score: "3", sub: "VNL Champions" }}
          away={{ name: "Italy", logo: "🏐", score: "1", sub: "Runners-up" }}
          headline="Poland dominate the finals to claim gold"
          venue="Ergo Arena, Gdańsk"
        />
      }
    />
  );
}
