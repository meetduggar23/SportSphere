"use client";

import { Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { useState } from "react";
import { standings, teams } from "@/data/mock";

const cricketStandings = [
  { position: 1, team: teams.ind, played: 5, won: 4, drawn: 1, lost: 0, goalDifference: 320, points: 8 },
  { position: 2, team: teams.aus, played: 5, won: 2, drawn: 1, lost: 2, goalDifference: 110, points: 5 },
  { position: 3, team: teams.eng, played: 4, won: 1, drawn: 0, lost: 3, goalDifference: -180, points: 2 },
].map((row, i) => ({ ...row, position: i + 1 }));

const nbaStandings = [
  { position: 1, team: teams.bos, played: 82, won: 64, drawn: 0, lost: 18, goalDifference: 420, points: 0 },
  { position: 2, team: teams.gsw, played: 82, won: 51, drawn: 0, lost: 31, goalDifference: 150, points: 0 },
  { position: 3, team: teams.lal, played: 82, won: 47, drawn: 0, lost: 35, goalDifference: 89, points: 0 },
  { position: 4, team: teams.mia, played: 82, won: 45, drawn: 0, lost: 37, goalDifference: -12, points: 0 },
];

export default function StandingsPage() {
  const [league, setLeague] = useState("La Liga");

  const tables: Record<string, React.ReactNode> = {
    "La Liga": <StandingsTable standings={standings} title="La Liga 2023-24" />,
    "Premier League": <StandingsTable standings={[...standings].reverse()} title="Premier League 2023-24" />,
    Cricket: <StandingsTable standings={cricketStandings} title="Border-Gavaskar Trophy" />,
    NBA: <StandingsTable standings={nbaStandings} title="NBA 2023-24" />,
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Trophy className="h-5 w-5" />}
          title="Standings"
          subtitle="League tables and rankings for every competition"
        />

        <SportTabs
          tabs={["La Liga", "Premier League", "Cricket", "NBA"].map((l) => ({ label: l, value: l }))}
          active={league}
          onChange={setLeague}
          className="mb-6"
        />

        {tables[league]}
      </div>
    </AppShell>
  );
}
