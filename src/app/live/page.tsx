"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { allMatches } from "@/data/mock";

const tabs = [
  { label: "All Sports", value: "all", count: allMatches.length },
  { label: "⚽ Football", value: "football", count: allMatches.filter((m) => m.sport === "football").length },
  { label: "🏏 Cricket", value: "cricket", count: allMatches.filter((m) => m.sport === "cricket").length },
  { label: "🏀 Basketball", value: "basketball", count: allMatches.filter((m) => m.sport === "basketball").length },
  { label: "🏎️ F1", value: "f1", count: allMatches.filter((m) => m.sport === "f1").length },
  { label: "🎾 Tennis", value: "tennis", count: allMatches.filter((m) => m.sport === "tennis").length },
];

const statusTabs = [
  { label: "Live Now", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Finished", value: "finished" },
];

export default function LivePage() {
  const [sport, setSport] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = allMatches.filter(
    (m) =>
      (sport === "all" || m.sport === sport) &&
      (status === "all" || m.status === status)
  );

  const liveCount = allMatches.filter((m) => m.status === "live").length;

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
          <div className="text-center py-20 bg-card rounded-xl border border-border">
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
