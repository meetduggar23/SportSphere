"use client";

import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { DataStatus } from "@/components/ui/DataStatus";
import { useSportData } from "@/lib/useSportData";
import { getSport } from "@/sports/registry";
import { sportShortLabels, type Sport } from "@/types";

// Sport-specific extras, wired at the module boundary (shared never imports
// sport-specific code — the composition root does).
import { CricketExtra } from "@/sports/cricket";

const sportExtras: Partial<Record<Sport, React.ComponentType>> = {
  cricket: CricketExtra,
};

interface SportModulePageProps {
  sport: Sport;
}

/**
 * SHARED SPORT PAGE COMPOSITION ROOT
 * Renders the shared <SportPage /> with registry-driven configuration and the
 * sport's own extras. Used by the dynamic /sports/[sport] route.
 */
export function SportModulePage({ sport }: SportModulePageProps) {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData(sport);
  const def = getSport(sport);
  const Extra = sportExtras[sport];

  return (
    <SportPage
      sport={sport}
      icon={<SportIcon sport={def.slug} className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={def.competitions}
      dataStatus={
        <DataStatus
          status={status}
          dataSource={dataSource}
          lastUpdated={lastUpdated}
          error={error}
          onRetry={retry}
        />
      }
      extra={Extra ? <Extra /> : undefined}
      title={def.name}
      subtitle={`Everything ${sportShortLabels[sport]}. Live scores, fixtures, standings, and more`}
    />
  );
}
