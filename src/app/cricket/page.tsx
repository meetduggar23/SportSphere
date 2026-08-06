"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
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
      icon={<SportIcon sport="cricket" className="w-5 h-5" />}
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
        <SportHero
          sport="cricket"
          kicker="Border-Gavaskar Trophy • Test Match"
          live
          ctaHref="/match/m2"
          home={{ name: teams.ind.name, logo: teams.ind.logo, score: "256/4", sub: "Day 2" }}
          away={{ name: teams.aus.name, logo: teams.aus.logo, score: "201", sub: "All out" }}
          headline="Kohli 143* • India lead by 55 runs at the MCG"
          venue="MCG, Melbourne"
        />
      }
    />
  );
}
