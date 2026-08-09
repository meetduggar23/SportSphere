"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { DataStatus } from "@/components/ui/DataStatus";
import { useSportData } from "@/lib/useSportData";

export default function VolleyballPage() {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData("volleyball");

  return (
    <SportPage
      sport="volleyball"
      icon={<SportIcon sport="volleyball" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["VNL", "Olympics", "World Championship", "CEV Champions League", "AVC Championship"]}
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
