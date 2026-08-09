"use client";

import { useState } from "react";
import Link from "next/link";
import { Standing } from "@/types";
import { cn } from "@/lib/utils";
import { TeamLogo } from "@/components/ui/TeamLogo";

interface StandingsTableProps {
  standings: Standing[];
  title?: string;
  tabs?: string[];
  href?: string;
  compact?: boolean;
}

const formColors: Record<string, string> = {
  W: "bg-emerald-500/90 text-white",
  D: "bg-zinc-400/80 text-white",
  L: "bg-rose-500/90 text-white",
};

export function StandingsTable({
  standings,
  title = "Standings",
  tabs,
  href = "/standings",
  compact = false,
}: StandingsTableProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between gap-3 flex-wrap px-6 py-5 border-b border-border">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
          <p className="text-xs text-muted mt-0.5">Latest league table</p>
        </div>
        {tabs && (
          <div className="flex gap-1 bg-muted/10 rounded-xl p-1 border border-border/60">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200",
                  activeTab === i
                    ? "bg-card shadow-card text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted border-b border-border bg-muted/5">
              <th className="text-left py-3 px-6 font-semibold">#</th>
              <th className="text-left py-3 px-2 font-semibold">Team</th>
              <th className="text-center py-3 px-2 font-semibold">P</th>
              <th className="text-center py-3 px-2 font-semibold">W</th>
              <th className="text-center py-3 px-2 font-semibold">D</th>
              <th className="text-center py-3 px-2 font-semibold">L</th>
              <th className="text-center py-3 px-2 font-semibold">GD</th>
              {!compact && <th className="text-center py-3 px-2 font-semibold hidden sm:table-cell">Form</th>}
              <th className="text-center py-3 px-6 font-semibold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.slice(0, compact ? 6 : undefined).map((row) => (
              <tr
                key={row.position}
                className="border-b border-border last:border-0 transition-colors hover:bg-card-hover"
              >
                <td className="py-3.5 px-6">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-lg tabular-nums",
                      row.position === 1
                        ? "bg-primary text-white shadow-card"
                        : row.position <= 4
                          ? "bg-brand-maroon/15 text-brand-maroon"
                          : "text-muted"
                    )}
                  >
                    {row.position}
                  </span>
                </td>
                <td className="py-3.5 px-2">
                  <Link href={`/team/${row.team.id}`} className="flex items-center gap-2.5 group">
                    <TeamLogo logo={row.team.logo} name={row.team.name} size="sm" />
                    <span className="font-medium text-sm truncate max-w-[150px] group-hover:text-primary transition-colors">
                      {row.team.name}
                    </span>
                  </Link>
                </td>
                <td className="text-center py-3.5 px-2 text-sm tabular-nums text-muted">{row.played}</td>
                <td className="text-center py-3.5 px-2 text-sm tabular-nums">{row.won}</td>
                <td className="text-center py-3.5 px-2 text-sm tabular-nums">{row.drawn}</td>
                <td className="text-center py-3.5 px-2 text-sm tabular-nums">{row.lost}</td>
                <td className="text-center py-3.5 px-2 text-sm tabular-nums text-muted">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                {!compact && (
                  <td className="py-3.5 px-2 hidden sm:table-cell">
                    <div className="flex gap-1 justify-center">
                      {row.form?.map((f, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-5 h-5 text-[9px] font-bold rounded-md flex items-center justify-center shadow-sm",
                            formColors[f]
                          )}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                )}
                <td className="text-center py-3.5 px-6">
                  <span className="font-display text-sm font-bold tabular-nums">{row.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-border">
        <Link
          href={href}
          className="w-full block text-center text-sm font-semibold text-primary hover:bg-primary/10 py-2.5 rounded-xl transition-colors"
        >
          View Full Table
        </Link>
      </div>
    </div>
  );
}
