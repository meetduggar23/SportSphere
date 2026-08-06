"use client";

import { Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { tournaments } from "@/data/mock";
import { sportIcons, sportLabels, Sport } from "@/types";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-600",
  upcoming: "bg-blue-500/10 text-blue-600",
  finished: "bg-muted/20 text-muted",
};

export default function CompetitionsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Trophy className="h-5 w-5" />}
          title="Competitions"
          subtitle="All tournaments, leagues, and championships across every sport"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
                    {sportIcons[tournament.sport]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{tournament.name}</p>
                    <p className="text-xs text-muted">
                      {sportLabels[tournament.sport]} • {tournament.country}
                    </p>
                  </div>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize", statusColors[tournament.status])}>
                  {tournament.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center bg-muted/10 rounded-lg p-3">
                <div>
                  <p className="text-sm font-bold">{tournament.season}</p>
                  <p className="text-[10px] text-muted uppercase">Season</p>
                </div>
                <div>
                  <p className="text-sm font-bold">{tournament.teams ?? "-"}</p>
                  <p className="text-[10px] text-muted uppercase">Teams</p>
                </div>
                <div>
                  <p className="text-sm font-bold">{tournament.format}</p>
                  <p className="text-[10px] text-muted uppercase">Format</p>
                </div>
              </div>

              {tournament.prizePool && (
                <p className="text-xs text-muted mt-3">
                  💰 Prize Pool: <span className="font-semibold text-primary">{tournament.prizePool}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
