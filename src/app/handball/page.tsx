"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
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
        <SportHero
          sport="handball"
          kicker="IHF World Championship • Final"
          live
          ctaHref="/match/m13"
          home={{ name: "Denmark", logo: "🤾", score: "24", sub: "1st • 16 pts" }}
          away={{ name: "France", logo: "🤾", score: "22", sub: "2nd • 12 pts" }}
          headline="Denmark eye another world title in Herning"
          venue="Boxen, Herning"
        />
      }
    />
  );
}
