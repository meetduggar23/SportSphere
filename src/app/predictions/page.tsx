"use client";

import { Target, Trophy, Medal, Award, Flame } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { AIPrediction } from "@/components/dashboard/AIPrediction";
import { predictions } from "@/data/mock";
import { cn } from "@/lib/utils";

const leaderboard = [
  { rank: 1, user: "GoalMachine99", points: 2840, accuracy: 78, trend: "up" },
  { rank: 2, user: "SportSpherePro", points: 2712, accuracy: 74, trend: "up" },
  { rank: 3, user: "SixerKing", points: 2655, accuracy: 72, trend: "steady" },
  { rank: 4, user: "MatchPointMaster", points: 2588, accuracy: 70, trend: "down" },
  { rank: 5, user: "You", points: 2410, accuracy: 68, trend: "up" },
];

export default function PredictionsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Target className="h-5 w-5" />}
          title="Prediction Game"
          subtitle="Predict match outcomes, compete on the leaderboard, and earn badges"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Trophy, label: "Season Rank", value: "#5", color: "text-brand" },
            { icon: Target, label: "Accuracy", value: "68%", color: "text-primary" },
            { icon: Medal, label: "Badges", value: "12", color: "text-brand-maroon" },
            { icon: Flame, label: "Streak", value: "6", color: "text-brand-light" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <s.icon className={cn("h-6 w-6", s.color)} />
              <div>
                <p className="text-xl font-extrabold">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            <h2 className="font-bold text-lg">Open Predictions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {predictions.map((p) => (
                <AIPrediction key={p.id} prediction={p} />
              ))}
            </div>
          </div>

          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-bold flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-brand" /> Season Leaderboard
                </h3>
              </div>
              <div className="divide-y divide-border">
                {leaderboard.map((row) => (
                  <div key={row.rank} className="flex items-center gap-3 p-3">
                    <span
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                        row.rank === 1
                          ? "bg-brand/20 text-brand"
                          : row.rank === 2
                          ? "bg-brand-maroon/20 text-brand-maroon"
                          : row.rank === 3
                          ? "bg-brand-purple/20 text-brand-purple"
                          : "bg-muted/10 text-muted"
                      )}
                    >
                      {row.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium truncate", row.user === "You" && "text-primary font-bold")}>
                        {row.user}
                      </p>
                      <p className="text-xs text-muted">{row.accuracy}% accuracy</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {row.trend === "up" && <Flame className="h-3.5 w-3.5 text-brand" />}
                      <span className="text-sm font-bold">{row.points}</span>
                    </div>
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
