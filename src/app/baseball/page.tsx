"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
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
        <SportHero
          sport="baseball"
          kicker="MLB Regular Season"
          ctaHref="/match/m10"
          home={{ name: "LA Dodgers", logo: "⚾", score: "9", sub: "NL West Leaders" }}
          away={{ name: "Atlanta Braves", logo: "⚾", score: "3", sub: "NL East Leaders" }}
          headline="Dodgers surge as the race to the World Series heats up"
          venue="Dodger Stadium"
        />
      }
    />
  );
}
