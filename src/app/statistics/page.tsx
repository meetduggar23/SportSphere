"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { topPlayers } from "@/data/mock";

// Only sports with curated leaderboard data are exposed. The values shown
// come from the player records themselves — no aggregate season numbers are
// invented, because no statistics provider is connected yet.
const tabs = [
  { label: "Football", value: "football" },
  { label: "Cricket", value: "cricket" },
];

export default function StatisticsPage() {
  const [sport, setSport] = useState("football");
  const players = topPlayers
    .filter((p) => p.sport === sport)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<BarChart3 className="h-5 w-5" />}
          title="Statistics"
          subtitle="Leaderboards built from curated player data"
        />

        <div className="mb-6">
          <DemoBadge label="Demo statistics — values come from curated sample data" />
        </div>

        <SportTabs tabs={tabs} active={sport} onChange={setSport} className="mb-6" />

        {players.length === 0 ? (
          <div className="bg-card  border border-border text-center py-16">
            <p className="font-medium">Statistics currently unavailable</p>
            <p className="text-sm text-muted mt-1">No leaderboard data is connected for this sport yet.</p>
          </div>
        ) : (
          <div className="bg-card  border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Trophy className="h-4 w-4 text-secondary" />
              <h3 className="font-bold">Top Players — {sport === "cricket" ? "Cricket" : "Football"}</h3>
            </div>
            <div className="divide-y divide-border">
              {players.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/player/${p.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/5 transition-colors group"
                >
                  <span className="text-sm font-bold text-muted w-6">{i + 1}</span>
                  <div className="relative w-10 h-10  bg-muted/10 overflow-hidden shrink-0 rounded-md">
                    <Image src={p.photo} alt={p.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">{p.name}</p>
                    <p className="text-xs text-muted truncate">{p.team} • {p.position}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">{p.stat} <span className="text-xs font-medium text-muted">{p.statLabel}</span></p>
                    <p className="text-xs text-secondary font-semibold">{p.rating}★</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted mt-6">
          Season aggregates (totals, averages, streaks) require a connected statistics provider
          and are shown only where available.
        </p>
      </div>
    </AppShell>
  );
}
