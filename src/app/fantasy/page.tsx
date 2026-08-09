"use client";

import { useState } from "react";
import { Wand2, Crown, ShieldAlert, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fantasyPicks } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function FantasyPage() {
  const [selected, setSelected] = useState<string[]>(["fp1", "fp2", "fp3"]);
  const [captain, setCaptain] = useState("fp1");

  const totalValue = selected.reduce((sum, id) => {
    const pick = fantasyPicks.find((p) => p.id === id);
    return sum + (pick ? parseFloat(pick.price.replace(/[€$]/g, "").replace("M", "")) : 0);
  }, 0);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 15 ? [...prev, id] : prev
    );
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Wand2 className="h-5 w-5" />}
          title="Fantasy Sports"
          subtitle="Build your dream team with AI-powered suggestions"
        />

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="arena-card p-5 text-center">
            <p className="headline text-3xl text-foreground">{selected.length}/15</p>
            <p className="meta mt-1">Players Selected</p>
          </div>
          <div className="arena-card p-5 text-center">
            <p className="headline text-3xl text-foreground">€{totalValue.toFixed(1)}M</p>
            <p className="meta mt-1">Team Value (Budget €100M)</p>
          </div>
          <div className="arena-card p-5 text-center">            <p className="headline text-3xl text-foreground">1,245</p>
            <p className="meta mt-1">Projected Points (GW 35)</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <SectionHeader title="AI Suggested Picks" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fantasyPicks.map((pick) => {
                const isSelected = selected.includes(pick.id);
                const isCaptain = captain === pick.id;
                return (
                  <div
                    key={pick.id}
                    className={cn(
                      "bg-card rounded-xl border p-4 transition-all cursor-pointer hover:shadow-lg",                      isSelected ? "border-secondary ring-1 ring-secondary/30" : "border-border",
                      isCaptain && "ring-2 ring-secondary/50"
                    )}
                    onClick={() => toggle(pick.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-muted/10">
                        {pick.position}
                      </span>
                      {pick.suggested && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                          <Wand2 className="h-2.5 w-2.5" /> AI Pick
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center text-lg">
                        {pick.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{pick.name}</p>
                        <p className="text-xs text-muted">{pick.team}</p>
                      </div>
                      <p className="text-sm font-bold">{pick.points}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted">{pick.price}</span>
                      <div className="flex gap-1.5">
                        {isCaptain && (
                          <button                            className="text-[10px] font-bold px-2 py-1 rounded-full bg-secondary/10 text-secondary"
                            title="Captain"
                          >
                            <Crown className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSelected) setCaptain(pick.id);
                          }}
                          disabled={!isSelected}
                          className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full transition-colors",
                            isSelected
                              ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                              : "bg-muted/10 text-muted cursor-not-allowed"
                          )}
                          title="Make captain"
                        >
                          <Crown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">                <Crown className="h-4 w-4 text-secondary" /> Captain Suggestions
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Erling Haaland", reason: "3 home games, form 92", pts: 142 },
                  { name: "Jude Bellingham", reason: "2 home games, set-piece threat", pts: 131 },
                ].map((s) => (
                  <div key={s.name} className="bg-muted/10 rounded-lg p-3">
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{s.name}</p>
                      <span className="text-xs font-bold text-muted-strong">{s.pts} pts</span>
                    </div>
                    <p className="text-xs text-muted mt-1">💡 {s.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" /> Differential Picks
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Cole Palmer", owned: "4.2%", reason: "Penalty duties + form" },
                  { name: "Phil Foden", owned: "8.1%", reason: "Double gameweek" },
                ].map((s) => (
                  <div key={s.name} className="bg-muted/10 rounded-lg p-3">
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{s.name}</p>
                      <span className="text-xs text-muted">{s.owned} owned</span>
                    </div>
                    <p className="text-xs text-muted mt-1">🎯 {s.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">                <ShieldAlert className="h-4 w-4 text-secondary" /> Injury Alerts
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Mohamed Salah", status: "Doubtful (Muscle)", risk: "High" },
                  { name: "Kevin De Bruyne", status: "Fit (Hamstring)", risk: "Low" },
                ].map((s) => (
                  <div key={s.name} className="bg-muted/10 rounded-lg p-3">
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{s.name}</p>                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", s.risk === "High" ? "bg-secondary/10 text-secondary" : "bg-brand-maroon/10 text-brand-maroon")}>
                        {s.risk} Risk
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1">🩹 {s.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
