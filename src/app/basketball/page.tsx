"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import {
  allMatches,
  upcomingFixtures,
  basketballNews,
  teams,
} from "@/data/mock";

const basketballMatches = allMatches.filter((m) => m.sport === "basketball");

export default function BasketballPage() {
  return (
    <SportPage
      sport="basketball"
      icon={<SportIcon sport="basketball" className="w-5 h-5" />}
      matches={basketballMatches}
      fixtures={upcomingFixtures.filter((f) => f.sport === "basketball")}
      standings={[
        { position: 1, team: teams.bos, played: 82, won: 64, drawn: 0, lost: 18, goalDifference: 420, points: 0 },
        { position: 2, team: teams.gsw, played: 82, won: 51, drawn: 0, lost: 31, goalDifference: 150, points: 0 },
        { position: 3, team: teams.lal, played: 82, won: 47, drawn: 0, lost: 35, goalDifference: 89, points: 0 },
        { position: 4, team: teams.mia, played: 82, won: 45, drawn: 0, lost: 37, goalDifference: -12, points: 0 },
      ]}
      news={basketballNews}
      players={[
        { id: "p3", name: "Luka Dončić", photo: "", team: "Lakers", teamId: "lal", teamLogo: teams.lal.logo, position: "Guard", sport: "basketball", nationality: "Slovenia", age: 25, stat: "28.7", statLabel: "PPG", rating: 94 },
        { id: "p7", name: "Stephen Curry", photo: "", team: "Warriors", teamId: "gsw", teamLogo: teams.gsw.logo, position: "Guard", sport: "basketball", nationality: "USA", age: 36, stat: "26.4", statLabel: "PPG", rating: 92 },
        { id: "p11", name: "Giannis Antetokounmpo", photo: "", team: "Bucks", teamId: "", teamLogo: "🦌", position: "Forward", sport: "basketball", nationality: "Greece", age: 29, stat: "30.1", statLabel: "PPG", rating: 93 },
        { id: "p12", name: "Nikola Jokić", photo: "", team: "Nuggets", teamId: "", teamLogo: "⛰️", position: "Center", sport: "basketball", nationality: "Serbia", age: 29, stat: "26.5", statLabel: "PPG", rating: 95 },
      ]}
      competitions={["NBA", "NBA Playoffs", "EuroLeague", "FIBA World Cup", "WNBA"]}
      hero={
        <SportHero
          sport="basketball"
          kicker="NBA Playoffs • Game 5"
          live
          ctaHref="/match/m3"
          home={{ name: teams.bos.name, logo: teams.bos.logo, score: 78, sub: "Series lead 3-2" }}
          away={{ name: teams.mia.name, logo: teams.mia.logo, score: 65, sub: "Eastern Conference" }}
          headline="Celtics take control at TD Garden"
          venue="TD Garden, Boston"
        />
      }
    />
  );
}
