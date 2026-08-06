"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import { allMatches } from "@/data/mock";
import { Player } from "@/types";

const mmaMatches = allMatches.filter((m) => m.sport === "mma");

const mmaPlayers: Player[] = [
  { id: "uf1", name: "Islam Makhachev", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Lightweight", sport: "mma", nationality: "Russia", age: 32, stat: "25-1", statLabel: "Record", rating: 96 },
  { id: "uf2", name: "Alex Pereira", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Light Heavyweight", sport: "mma", nationality: "Brazil", age: 36, stat: "10-2", statLabel: "Record", rating: 94 },
  { id: "uf3", name: "Jon Jones", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Heavyweight", sport: "mma", nationality: "USA", age: 36, stat: "27-1", statLabel: "Record", rating: 95 },
  { id: "uf4", name: "Sean O'Malley", photo: "", team: "UFC", teamId: "", teamLogo: "🥋", position: "Bantamweight", sport: "mma", nationality: "USA", age: 29, stat: "18-1", statLabel: "Record", rating: 92 },
];

export default function MMAPage() {
  return (
    <SportPage
      sport="mma"
      icon={<SportIcon sport="mma" className="w-5 h-5" />}
      matches={mmaMatches}
      fixtures={[
        { id: "ufc1", sport: "mma", league: "UFC", title: "UFC 305", homeTeam: { id: "islam", name: "I. Makhachev", shortName: "ISL", logo: "🥋", sport: "mma", country: "Russia" }, dateTime: "Aug 18", time: "8:00 PM" },
        { id: "ufc2", sport: "mma", league: "UFC", title: "UFC 306", homeTeam: { id: "pereira", name: "A. Pereira", shortName: "PER", logo: "🥋", sport: "mma", country: "Brazil" }, dateTime: "Sep 14", time: "8:00 PM" },
      ]}
      standings={[
        { position: 1, team: { id: "islam", name: "I. Makhachev", shortName: "ISL", logo: "🥋", sport: "mma", country: "Russia" }, played: 25, won: 24, drawn: 0, lost: 1, goalDifference: 0, points: 0 },
        { position: 2, team: { id: "pereira", name: "A. Pereira", shortName: "PER", logo: "🥋", sport: "mma", country: "Brazil" }, played: 12, won: 10, drawn: 0, lost: 2, goalDifference: 0, points: 0 },
        { position: 3, team: { id: "jones", name: "J. Jones", shortName: "JON", logo: "🥋", sport: "mma", country: "USA" }, played: 28, won: 27, drawn: 0, lost: 1, goalDifference: 0, points: 0 },
        { position: 4, team: { id: "somm", name: "S. O'Malley", shortName: "SOM", logo: "🥋", sport: "mma", country: "USA" }, played: 19, won: 18, drawn: 0, lost: 1, goalDifference: 0, points: 0 },
      ]}
      news={[]}
      players={mmaPlayers}
      competitions={["UFC", "PFL", "Bellator", "ONE Championship", "Fight Night"]}
      hero={
        <SportHero
          sport="mma"
          kicker="UFC 304 • Main Event"
          ctaHref="/match/m12"
          home={{ name: "Islam Makhachev", logo: "🥋", score: "TKO", sub: "Round 4" }}
          away={{ name: "Renato Moicano", logo: "🥋", score: "—", sub: "Challenger" }}
          headline="Makhachev cements his lightweight dynasty at UFC 304"
          venue="Co-op Live, Manchester"
        />
      }
    />
  );
}
