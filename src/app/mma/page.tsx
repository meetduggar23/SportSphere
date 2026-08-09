"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { DataStatus } from "@/components/ui/DataStatus";
import { useSportData } from "@/lib/useSportData";

export default function MMAPage() {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData("mma");

  return (
    <SportPage
      sport="mma"
      icon={<SportIcon sport="mma" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["UFC", "PFL", "Bellator", "ONE Championship", "Fight Night"]}
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
