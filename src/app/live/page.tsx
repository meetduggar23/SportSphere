"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { DataStatus } from "@/components/ui/DataStatus";
import { getAllLiveEventsResilient, homeSports } from "@/lib/homeFeed";
import { Match, sportIcons, sportLabels } from "@/types";

// Only live matches are shown here; upcoming/finished data would need
// separate requests, so only expose the tab that has data.
const statusTabs = [{ label: "Live Now", value: "live" }];

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string>();
  const [sport, setSport] = useState("all");
  const [statusFilter, setStatusFilter] = useState("live");

  const mounted = useRef(true);

  const load = useCallback(async () => {
    // Aggregates currently-live events from every configured sport provider
    // (same resilient aggregator the home feed uses).
    const feed = await getAllLiveEventsResilient();
    if (!mounted.current) return;
    setStatus(feed.status === "ready" ? "ready" : "unavailable");
    setMatches(feed.live);
    setLastUpdated(feed.lastUpdated);
    setError(feed.error);
  }, []);

  const retry = () => {
    setStatus("loading");
    void load();
  };

  useEffect(() => {
    mounted.current = true;
    void load();
    // Poll every 10 minutes — the free tier allows ~100 req/day, and each
    // poll hits the provider. Keep the page from exhausting the quota.
    const interval = setInterval(() => {
      void load();
    }, 600000);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [load]);

  const filterTabs = useMemo(
    () => [
      { label: "All Sports", value: "all" },
      ...homeSports.map((s) => ({
        label: `${sportIcons[s]} ${sportLabels[s]}`,
        value: s,
      })),
    ],
    []
  );

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
          dataSource={status === "ready" ? "Live providers" : undefined}
          lastUpdated={lastUpdated}
          error={error}
          onRetry={retry}
        />

        <div className="flex flex-col gap-4 mb-6">
          <SportTabs tabs={filterTabs} active={sport} onChange={setSport} />
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
              <LiveMatchCard key={`${match.sport}:${match.id}`} match={match} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
