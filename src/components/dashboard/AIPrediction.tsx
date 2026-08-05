"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Prediction } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";

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

  const bars: { key: "home" | "draw" | "away"; label: string; color: string; bg: string }[] = [
    { key: "home", label: prediction.homeTeam.shortName, color: "bg-blue-600", bg: "bg-blue-600" },
    { key: "draw", label: "Draw", color: "bg-muted", bg: "bg-muted" },
    { key: "away", label: prediction.awayTeam.shortName, color: "bg-red-600", bg: "bg-red-600" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> AI Prediction
        </h2>
        <Link href="/predictions" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
          See All
        </Link>
      </div>

      <div className="p-4">
        <div className="text-center mb-4">
          <p className="font-bold">{prediction.homeTeam.shortName} vs {prediction.awayTeam.shortName}</p>
          <p className="text-xs text-muted mt-1">{prediction.league} • {prediction.date}</p>
        </div>

        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex flex-col items-center gap-2 flex-1">
            <TeamLogo logo={prediction.homeTeam.logo} name={prediction.homeTeam.name} size="lg" />
            <span className="text-xs font-medium text-center">{prediction.homeTeam.shortName}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted">vs</span>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <TeamLogo logo={prediction.awayTeam.logo} name={prediction.awayTeam.name} size="lg" />
            <span className="text-xs font-medium text-center">{prediction.awayTeam.shortName}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {bars.map((bar) => (
            <div key={bar.key} className="text-center">
              <p className="text-lg font-bold">{votes[bar.key]}%</p>
              <p className="text-[10px] text-muted uppercase tracking-wide">{bar.label}</p>
              <div className="h-1.5 bg-muted/20 rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full ${bar.bg} rounded-full transition-all duration-500`}
                  style={{ width: `${votes[bar.key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-center mb-4">
          <span className="text-xs text-muted">Confidence</span>
          <div className="flex-1 max-w-[120px] h-1.5 bg-muted/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
          <span className="text-xs font-bold text-green-600">{prediction.confidence}%</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleVote("home")}
            disabled={!!selected}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              selected === "home"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-border hover:bg-muted/10"
            }`}
          >
            {prediction.homeTeam.shortName}
          </button>
          <button
            onClick={() => handleVote("draw")}
            disabled={!!selected}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              selected === "draw"
                ? "bg-muted text-white border-muted"
                : "border-border hover:bg-muted/10"
            }`}
          >
            Draw
          </button>
          <button
            onClick={() => handleVote("away")}
            disabled={!!selected}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              selected === "away"
                ? "bg-red-600 text-white border-red-600"
                : "border-border hover:bg-muted/10"
            }`}
          >
            {prediction.awayTeam.shortName}
          </button>
        </div>
      </div>
    </div>
  );
}
