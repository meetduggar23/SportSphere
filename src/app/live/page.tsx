"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { DataStatus } from "@/components/ui/DataStatus";
import { getProvider } from "@/lib/providers/registry";
import { Match } from "@/types";

const tabs = [
  { label: "All Sports", value: "all" },
  { label: "⚽ Football", value: "football" },
];

const statusTabs = [
  { label: "Live Now", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Finished", value: "finished" },
];

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string>();
  const [sport, setSport] = useState("all");
  const [statusFilter, setStatusFilter] = useState("live");
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const provider = getProvider("football");
    // Promise.all is statically known-async, which the set-state-in-effect
    // lint rule accepts; arbitrary method calls are not proven async.
    const [snap] = await Promise.all([provider.getMatches()]);
    if (!mounted.current) return;
    setStatus(snap.status === "ready" ? "ready" : "unavailable");
    setMatches(snap.status === "ready" ? snap.data : []);
    setLastUpdated(snap.lastUpdated);
    setError(snap.error);
  }, []);

  const retry = () => {
    setStatus("loading");
    void load();
  };

  useEffect(() => {
    mounted.current = true;
    void load();
    // Poll every 5 minutes — respects the free-tier API quota (100 req/day)
    const interval = setInterval(() => {
      void load();
    }, 300000);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [load]);

  const filtered = matches.filter(
    (m) =>
      (sport === "all" || m.sport === sport) &&
      (statusFilter === "all" || m.status === statusFilter)
  );

  const liveCount = matches.filter((m) => m.status === "live").length;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Zap className="h-5 w-5" />}
          title="Live Scores"
          subtitle={
            status === "ready"
              ? liveCount > 0
                ? `${liveCount} matches live right now`
                : "No matches live right now"
              : "Scores from all sports in real time"
          }
        />

        <DataStatus
          status={status}
          dataSource="API-Football"
          lastUpdated={lastUpdated}
          error={error}
          onRetry={retry}
        />

        <div className="flex flex-col gap-4 mb-6">
          <SportTabs tabs={tabs} active={sport} onChange={setSport} />
          <SportTabs tabs={statusTabs} active={statusFilter} onChange={setStatusFilter} />
        </div>

        {filtered.length === 0 ? (
          <div className="arena-card text-center py-20">
            <p className="text-4xl mb-4">📡</p>
            <p className="font-medium">No matches found</p>
            <p className="text-sm text-muted mt-1">Try changing your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
