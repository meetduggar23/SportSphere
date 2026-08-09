"use client";

import { ArrowLeftRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { transfers } from "@/data/mock";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  confirmed: "bg-secondary/10 text-secondary",
  rumored: "bg-brand-purple/10 text-brand-purple",
  completed: "bg-brand-navy/10 text-brand-navy",
};

export default function TransfersPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<ArrowLeftRight className="h-5 w-5" />}
          title="Transfer News"
          subtitle="The latest confirmed, rumored, and completed transfers across all sports"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {transfers.map((transfer) => (
            <div
              key={transfer.id}
className="arena-card arena-card-hover p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full capitalize", statusColors[transfer.status])}>
                  {transfer.status}
                </span>
                <span className="text-xs text-muted">{transfer.date}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center flex-1 gap-2">
                  <img
                    src={transfer.playerPhoto}
                    alt={transfer.playerName}
                    className="w-16 h-16 rounded-full object-cover bg-muted/20"
                  />
                  <p className="font-bold text-sm text-center">{transfer.playerName}</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{transfer.fromTeamLogo}</span>
                    <ArrowLeftRight className="h-5 w-5 text-secondary rotate-180" />
                    <span className="text-lg">{transfer.toTeamLogo}</span>
                  </div>
                  <p className="text-xs text-muted text-center">
                    {transfer.fromTeam} → {transfer.toTeam}
                  </p>
                  <p className="text-sm font-bold text-foreground">{transfer.fee}</p>
                </div>

                <div className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
