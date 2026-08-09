"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { DataStatus } from "@/components/ui/DataStatus";
import { useSportData } from "@/lib/useSportData";

export default function NBAPage() {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData("nba");

  return (
    <SportPage
      sport="nba"
      icon={<SportIcon sport="nba" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["NBA Finals", "NBA Playoffs", "NBA Draft", "NBA Cup", "Summer League"]}
      dataStatus={
        <DataStatus
          status={status}
          dataSource={dataSource}
          lastUpdated={lastUpdated}
          error={error}
          onRetry={retry}
        />
      }
    />
  );
}
