"use client";

import { MatchStats } from "@/types";
import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  home: number;
  away: number;
  homeSuffix?: string;
  awaySuffix?: string;
}

export function StatBar({ label, home, away, homeSuffix = "", awaySuffix = "" }: StatBarProps) {
  const total = home + away;
  const homePct = total === 0 ? 50 : Math.round((home / total) * 100);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold w-16 text-right tabular-nums">
          {home}
          {homeSuffix}
        </span>
        <span className="text-[11px] text-muted font-semibold uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm font-semibold w-16 tabular-nums">
          {away}
          {awaySuffix}
        </span>
      </div>
      <div className="flex gap-1">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-primary to-brand-purple transition-all duration-500"
          style={{ width: `${homePct}%` }}
        />
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-navy transition-all duration-500"
          style={{ width: `${100 - homePct}%` }}
        />
      </div>
    </div>
  );
}

interface MatchStatsCompareProps {
  stats: MatchStats;
  homeName: string;
  awayName: string;
}

export function MatchStatsCompare({ stats, homeName, awayName }: MatchStatsCompareProps) {
  const rows = [
    { label: "Possession", home: stats.possession, away: 100 - stats.possession, homeSuffix: "%", awaySuffix: "%" },
    { label: "Shots", home: stats.shots, away: Math.round(stats.shots * 0.7) },
    { label: "Shots on Target", home: stats.shotsOnTarget, away: Math.round(stats.shotsOnTarget * 0.5) },
    { label: "xG", home: stats.xg, away: Math.round(stats.xg * 0.62 * 10) / 10 },
    { label: "Corners", home: stats.corners, away: Math.round(stats.corners * 0.6) },
    { label: "Fouls", home: stats.fouls, away: Math.round(stats.fouls * 0.8) },
    { label: "Yellow Cards", home: stats.yellowCards, away: 1 },
    { label: "Red Cards", home: stats.redCards, away: 0 },
    { label: "Offsides", home: stats.offsides, away: 1 },
    { label: "Passes", home: stats.passes, away: Math.round(stats.passes * 0.65) },
    { label: "Pass Accuracy", home: stats.passAccuracy, away: 84, homeSuffix: "%", awaySuffix: "%" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-6 pt-2">
        <span className="text-sm font-bold truncate max-w-[130px]">{homeName}</span>
        <span className="text-[11px] text-muted uppercase tracking-wider font-semibold">Stats</span>
        <span className="text-sm font-bold truncate max-w-[130px]">{awayName}</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="px-6">
            <StatBar
              label={row.label}
              home={row.home}
              away={row.away}
              homeSuffix={row.homeSuffix}
              awaySuffix={row.awaySuffix}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function H2HSummary({ home, draw, away, className }: { home: number; draw: number; away: number; className?: string }) {
  const total = home + draw + away || 1;
  return (
    <div className={cn("flex gap-1.5 h-2.5 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-primary to-brand-purple transition-all duration-500"
        style={{ width: `${(home / total) * 100}%` }}
      />
      <div className="h-full bg-muted transition-all duration-500" style={{ width: `${(draw / total) * 100}%` }} />
      <div
        className="h-full bg-gradient-to-r from-brand-purple to-brand-navy transition-all duration-500"
        style={{ width: `${(away / total) * 100}%` }}
      />
    </div>
  );
}
