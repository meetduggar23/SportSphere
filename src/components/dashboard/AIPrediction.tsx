"use client";

import { useState } from "react";

export function AIPrediction() {
  const [votes, setVotes] = useState({ home: 58, draw: 20, away: 22 });
  const [totalVotes] = useState(4326);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  const handleVote = (team: string) => {
    if (selectedVote) return;
    setSelectedVote(team);
    setVotes((prev) => ({
      ...prev,
      [team === "home" ? "home" : team === "draw" ? "draw" : "away"]:
        prev[team === "home" ? "home" : team === "draw" ? "draw" : "away"] + 1,
    }));
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">AI Match Prediction</h2>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            See All
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-center mb-4">
          <p className="font-bold">Man City vs Arsenal</p>
          <p className="text-xs text-muted mt-1">Premier League • Tomorrow, 9:00 PM</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🔵</span>
            <span className="text-sm font-medium">Man City</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted">Draw</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🔴</span>
            <span className="text-sm font-medium">Arsenal</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 text-center">
            <p className="text-xl font-bold text-blue-600">{votes.home}%</p>
            <div className="h-1.5 bg-muted/20 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${votes.home}%` }} />
            </div>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xl font-bold text-muted">{votes.draw}%</p>
            <div className="h-1.5 bg-muted/20 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-muted rounded-full" style={{ width: `${votes.draw}%` }} />
            </div>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xl font-bold text-red-600">{votes.away}%</p>
            <div className="h-1.5 bg-muted/20 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: `${votes.away}%` }} />
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted mb-4">
          Who Will Win? • {totalVotes.toLocaleString()} Votes
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleVote("home")}
            disabled={!!selectedVote}
            className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedVote === "home"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-border hover:bg-muted/10"
            }`}
          >
            Man City
          </button>
          <button
            onClick={() => handleVote("draw")}
            disabled={!!selectedVote}
            className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedVote === "draw"
                ? "bg-muted text-white border-muted"
                : "border-border hover:bg-muted/10"
            }`}
          >
            Draw
          </button>
          <button
            onClick={() => handleVote("away")}
            disabled={!!selectedVote}
            className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedVote === "away"
                ? "bg-red-600 text-white border-red-600"
                : "border-border hover:bg-muted/10"
            }`}
          >
            Arsenal
          </button>
        </div>
      </div>
    </div>
  );
}
