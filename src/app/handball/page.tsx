"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { DataStatus } from "@/components/ui/DataStatus";
import { useSportData } from "@/lib/useSportData";

export default function HandballPage() {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData("handball");

  return (
    <SportPage
      sport="handball"
      icon={<SportIcon sport="handball" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["IHF World Championship", "EHF Champions League", "Olympic Games", "European Championship", "World League"]}
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
