"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { getLiveMatches } from "@/lib/api";
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
  const [loading, setLoading] = useState(true);
  const [sport, setSport] = useState("all");
  const [status, setStatus] = useState("live");

  useEffect(() => {
    async function load() {
      try {
        const data = await getLiveMatches();
        setMatches(data);
      } catch (e) {
        console.error("Failed to load live matches:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered = matches.filter(
    (m) =>
      (sport === "all" || m.sport === sport) &&
      (status === "all" || m.status === status)
  );

  const liveCount = matches.filter((m) => m.status === "live").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading live matches...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Zap className="h-5 w-5" />}
          title="Live Scores"
          subtitle={
            liveCount > 0
              ? `${liveCount} matches live right now across all sports`
              : "Scores from all sports in real time"
          }
        />

        <div className="flex flex-col gap-4 mb-6">
          <SportTabs tabs={tabs} active={sport} onChange={setSport} />
          <SportTabs tabs={statusTabs} active={status} onChange={setStatus} />
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
