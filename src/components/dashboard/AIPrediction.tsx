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
      bar: "bg-gradient-to-r from-secondary to-deep",
      chip: "bg-secondary/10 text-secondary",
    },
    { key: "draw", label: "Draw", bar: "bg-muted", chip: "bg-muted/10 text-muted" },
    {
      key: "away",
      label: prediction.awayTeam.shortName,
      bar: "bg-gradient-to-r from-blue to-deep",
      chip: "bg-blue/40 text-muted-strong",
    },
  ];

  return (
    <div className="relative overflow-hidden  arena-card">
      <div className="absolute -right-16 -top-16 h-40 w-40  bg-secondary/10 blur-3xl" />
<div className="relative flex items-center justify-between border-b border-border-navy px-6 py-5">
        <h2 className="heading flex items-center gap-2.5 text-lg text-foreground">
          <span className="flex h-8 w-8 items-center justify-center  bg-blue/50 text-muted-strong ring-1 ring-border-navy rounded-md">
            <Sparkles className="h-4 w-4" />
          </span>
          AI Prediction
        </h2>
        <Link
          href="/predictions"
          className="group inline-flex items-center gap-0.5 text-sm font-semibold text-muted-strong transition-colors hover:text-foreground"
        >
          See All
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="p-6">
        <div className="mb-5 text-center">
          <p className="heading text-base text-foreground">
            {prediction.homeTeam.shortName} vs {prediction.awayTeam.shortName}
          </p>
          <p className="meta mt-1">{prediction.league} • {prediction.date}</p>
        </div>

        <div className="mb-5 flex items-center justify-between gap-2">
          <div className="flex flex-1 flex-col items-center gap-2.5">
            <TeamLogo logo={prediction.homeTeam.logo} name={prediction.homeTeam.name} size="lg" />
            <span className="text-xs font-medium text-center">{prediction.homeTeam.shortName}</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="display text-sm text-muted">VS</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2.5">
            <TeamLogo logo={prediction.awayTeam.logo} name={prediction.awayTeam.name} size="lg" />
            <span className="text-xs font-medium text-center">{prediction.awayTeam.shortName}</span>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-3">
          {bars.map((bar) => (
            <div key={bar.key} className="text-center">
              <p className="display text-lg tabular-nums">{votes[bar.key]}%</p>
              <p className="label mt-0.5">{bar.label}</p>
              <div className="mt-2 h-1.5 overflow-hidden  bg-muted/15">
                <div
                  className={cn("h-full  transition-all duration-500", bar.bar)}
                  style={{ width: `${votes[bar.key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="meta">Confidence</span>
          <div className="h-1.5 max-w-[130px] flex-1 overflow-hidden  bg-muted/15">
            <div
              className="h-full  bg-gradient-to-r from-secondary to-deep transition-all duration-500"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
          <span className="text-xs font-bold text-secondary tabular-nums">{prediction.confidence}%</span>
        </div>

        <div className="flex gap-2">
<button
            onClick={() => handleVote("home")}
            disabled={!!selected}
            className={cn(
              "flex-1  border py-2.5 text-xs font-semibold transition-all duration-200 rounded-md",
              selected === "home"
                ? "border-primary bg-primary text-navy"
                : "border-border-navy text-muted-strong hover:bg-blue/40 hover:text-foreground"
            )}
          >
            {prediction.homeTeam.shortName}
          </button>
          <button
            onClick={() => handleVote("draw")}
            disabled={!!selected}
            className={cn(
              "flex-1  border py-2.5 text-xs font-semibold transition-all duration-200 rounded-md",
              selected === "draw"
                ? "border-muted bg-muted text-navy"
                : "border-border-navy text-muted-strong hover:bg-blue/40 hover:text-foreground"
            )}
          >
            Draw
          </button>
          <button
            onClick={() => handleVote("away")}
            disabled={!!selected}
            className={cn(
              "flex-1  border py-2.5 text-xs font-semibold transition-all duration-200 rounded-md",
              selected === "away"
                ? "border-primary bg-primary text-navy"
                : "border-border-navy text-muted-strong hover:bg-blue/40 hover:text-foreground"
            )}
          >
            {prediction.awayTeam.shortName}
          </button>
        </div>
      </div>
    </div>
  );
}
