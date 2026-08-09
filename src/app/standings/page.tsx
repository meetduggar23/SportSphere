"use client";

import { Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { DataStatus } from "@/components/ui/DataStatus";
import { useEffect, useState } from "react";
import { getStandings } from "@/lib/api";
import { Standing } from "@/types";

const leagueTabs = [
  { label: "Premier League", value: "39" },
  { label: "La Liga", value: "140" },
  { label: "Serie A", value: "135" },
  { label: "Bundesliga", value: "78" },
  { label: "Ligue 1", value: "61" },
];

const seasonTabs = [
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
];

export default function StandingsPage() {
  const [leagueId, setLeagueId] = useState("39");
  const [season, setSeason] = useState("2024");
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(undefined);
      try {
        const data = await getStandings(leagueId, season);
        setStandings(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
        setStandings([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [leagueId, season]);

  const leagueName = leagueTabs.find((l) => l.value === leagueId)?.label ?? "League";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent  animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading standings...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Trophy className="h-5 w-5" />}
          title="Standings"
          subtitle="Live league tables from top competitions"
        />

        {error ? (
          <DataStatus
            status="unavailable"
            dataSource="API-Football"
            lastUpdated={null}
            error={error}
            onRetry={() => {
              setLoading(true);
              setError(undefined);
              getStandings(leagueId, season)
                .then((d) => setStandings(d))
                .catch((e) => setError(e instanceof Error ? e.message : "Unknown error"))
                .finally(() => setLoading(false));
            }}
          />
        ) : (
          <p className="mb-6 -mt-2 text-xs text-muted">API-Football • Live</p>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <SportTabs
            tabs={leagueTabs}
            active={leagueId}
            onChange={setLeagueId}
          />
          <SportTabs
            tabs={seasonTabs}
            active={season}
            onChange={setSeason}
          />
        </div>

        {standings.length > 0 ? (
          <StandingsTable standings={standings} title={`${leagueName} ${season}`} />
        ) : (
          <div className="arena-card text-center py-20">
            <p className="text-4xl mb-4">📊</p>
            <p className="font-medium">No standings available</p>
            <p className="text-sm text-muted mt-1">Try a different league or season</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
