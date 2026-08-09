"use client";

import Link from "next/link";
import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import {
  allMatches,
  upcomingFixtures,
  cricketNews,
  teams,
  iplTeams,
} from "@/data/mock";

const cricketMatches = allMatches.filter((m) => m.sport === "cricket");
const cricketStandings = [
  { position: 1, team: teams.kkr, played: 14, won: 9, drawn: 2, lost: 3, goalDifference: 94, points: 20, form: ["W", "W", "L", "W", "W"] as const },
  { position: 2, team: teams.rr, played: 14, won: 8, drawn: 1, lost: 5, goalDifference: 58, points: 17, form: ["W", "L", "L", "W", "W"] as const },
  { position: 3, team: teams.srh, played: 14, won: 8, drawn: 0, lost: 6, goalDifference: 86, points: 16, form: ["L", "W", "W", "L", "W"] as const },
  { position: 4, team: teams.rcb, played: 14, won: 7, drawn: 0, lost: 7, goalDifference: 57, points: 14, form: ["W", "W", "L", "W", "L"] as const },
  { position: 5, team: teams.csk, played: 14, won: 7, drawn: 0, lost: 7, goalDifference: 3, points: 14, form: ["L", "L", "W", "L", "L"] as const },
  { position: 6, team: teams.dc, played: 14, won: 7, drawn: 0, lost: 7, goalDifference: -12, points: 14, form: ["L", "W", "L", "L", "L"] as const },
  { position: 7, team: teams.lsg, played: 14, won: 6, drawn: 1, lost: 7, goalDifference: -30, points: 13, form: ["W", "L", "L", "L", "W"] as const },
  { position: 8, team: teams.gt, played: 14, won: 5, drawn: 1, lost: 8, goalDifference: -39, points: 11, form: ["L", "L", "W", "L", "L"] as const },
  { position: 9, team: teams.pbks, played: 14, won: 5, drawn: 1, lost: 8, goalDifference: -31, points: 11, form: ["L", "L", "L", "L", "W"] as const },
  { position: 10, team: teams.mi, played: 14, won: 4, drawn: 0, lost: 10, goalDifference: -186, points: 8, form: ["W", "L", "L", "L", "L"] as const },
].map((row, i) => ({ ...row, position: i + 1, form: [...row.form] }));

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
      extra={
        <section className="mb-8">
          <SectionHeader title="IPL Teams" href="/standings" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {iplTeams.map((t) => (
              <Link
                key={t.id}
                href={`/team/${t.id}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop"
              >
                <div className="flex flex-col items-center gap-3 p-5">
                  <TeamLogo logo={t.logo} name={t.name} size="lg" />
                  <div className="text-center">
                    <p className="font-display text-sm font-bold truncate group-hover:text-foreground transition-colors">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{t.city}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      }
    />
  );
}
