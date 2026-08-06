"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
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
        <SportHero
          sport="afl"
          kicker="AFL 2024 Season"
          ctaHref="/match/m14"
          home={{ name: "Melbourne", logo: "🏉", score: "1st", sub: "14W • 4L" }}
          away={{ name: "Port Adelaide", logo: "🏉", score: "2nd", sub: "13W • 5L" }}
          headline="Melbourne lead the AFL ladder heading into finals"
          venue="MCG, Melbourne"
        />
      }
    />
  );
}
