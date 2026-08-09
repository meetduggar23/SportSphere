"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { DataStatus } from "@/components/ui/DataStatus";
import { useSportData } from "@/lib/useSportData";

export default function RugbyPage() {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData("rugby");

  return (
    <SportPage
      sport="rugby"
      icon={<SportIcon sport="rugby" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["Six Nations", "Rugby Championship", "World Cup", "Premiership", "Top 14"]}
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
