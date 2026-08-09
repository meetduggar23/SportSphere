"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { Prediction } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { cn } from "@/lib/utils";

interface AIPredictionProps {
  prediction: Prediction;
}

export function AIPrediction({ prediction }: AIPredictionProps) {
  const [selected, setSelected] = useState<"home" | "draw" | "away" | null>(null);
  const [votes, setVotes] = useState({
    home: prediction.homeWin,
    draw: prediction.draw,
    away: prediction.awayWin,
  });

  const handleVote = (key: "home" | "draw" | "away") => {
    if (selected) return;
    setSelected(key);
    setVotes((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const bars: { key: "home" | "draw" | "away"; label: string; bar: string; chip: string }[] = [
    {
      key: "home",
      label: prediction.homeTeam.shortName,
      bar: "bg-gradient-to-r from-primary to-brand-purple",
      chip: "bg-primary/10 text-primary",
    },
    { key: "draw", label: "Draw", bar: "bg-muted", chip: "bg-muted/10 text-muted" },
    {
      key: "away",
      label: prediction.awayTeam.shortName,
      bar: "bg-gradient-to-r from-brand-navy to-brand-purple",
      chip: "bg-brand-navy/10 text-brand-navy",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="px-6 py-5 border-b border-border flex items-center justify-between relative">
        <h2 className="font-display text-lg font-bold tracking-tight flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Sparkles className="h-4 w-4" />
          </span>
          AI Prediction
        </h2>
        <Link
          href="/predictions"
          className="group inline-flex items-center gap-0.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          See All
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="p-6">
        <div className="text-center mb-5">
          <p className="font-display text-base font-bold">
            {prediction.homeTeam.shortName} vs {prediction.awayTeam.shortName}
          </p>
          <p className="text-xs text-muted mt-1">{prediction.league} • {prediction.date}</p>
        </div>

        <div className="flex items-center justify-between mb-5 gap-2">
          <div className="flex flex-col items-center gap-2.5 flex-1">
            <TeamLogo logo={prediction.homeTeam.logo} name={prediction.homeTeam.name} size="lg" />
            <span className="text-xs font-medium text-center">{prediction.homeTeam.shortName}</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="font-display text-sm font-bold text-muted">VS</span>
          </div>
          <div className="flex flex-col items-center gap-2.5 flex-1">
            <TeamLogo logo={prediction.awayTeam.logo} name={prediction.awayTeam.name} size="lg" />
            <span className="text-xs font-medium text-center">{prediction.awayTeam.shortName}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {bars.map((bar) => (
            <div key={bar.key} className="text-center">
              <p className="font-display text-lg font-bold tabular-nums">{votes[bar.key]}%</p>
              <p className="text-[10px] text-muted uppercase tracking-wide mt-0.5">{bar.label}</p>
              <div className="h-1.5 bg-muted/15 rounded-full mt-2 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", bar.bar)}
                  style={{ width: `${votes[bar.key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-center mb-5">
          <span className="text-xs text-muted">Confidence</span>
          <div className="flex-1 max-w-[130px] h-1.5 bg-muted/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-brand-maroon rounded-full transition-all duration-500"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
          <span className="text-xs font-bold text-brand tabular-nums">{prediction.confidence}%</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleVote("home")}
            disabled={!!selected}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200",
              selected === "home"
                ? "bg-primary text-white border-primary shadow-card"
                : "border-border hover:bg-muted/10"
            )}
          >
            {prediction.homeTeam.shortName}
          </button>
          <button
            onClick={() => handleVote("draw")}
            disabled={!!selected}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200",
              selected === "draw"
                ? "bg-muted text-white border-muted"
                : "border-border hover:bg-muted/10"
            )}
          >
            Draw
          </button>
          <button
            onClick={() => handleVote("away")}
            disabled={!!selected}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200",
              selected === "away"
                ? "bg-brand-navy text-white border-brand-navy shadow-card"
                : "border-border hover:bg-muted/10"
            )}
          >
            {prediction.awayTeam.shortName}
          </button>
        </div>
      </div>
    </div>
  );
}
