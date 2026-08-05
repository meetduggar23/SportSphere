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
  W: "bg-green-500 text-white",
  D: "bg-slate-400 text-white",
  L: "bg-red-500 text-white",
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
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-bold text-lg">{title}</h2>
          {tabs && (
            <div className="flex gap-1 bg-muted/10 rounded-lg p-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    activeTab === i
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted border-b border-border">
              <th className="text-left py-3 px-4 font-medium">#</th>
              <th className="text-left py-3 px-2 font-medium">Team</th>
              <th className="text-center py-3 px-2 font-medium">P</th>
              <th className="text-center py-3 px-2 font-medium">W</th>
              <th className="text-center py-3 px-2 font-medium">D</th>
              <th className="text-center py-3 px-2 font-medium">L</th>
              <th className="text-center py-3 px-2 font-medium">GD</th>
              {!compact && <th className="text-center py-3 px-2 font-medium hidden sm:table-cell">Form</th>}
              <th className="text-center py-3 px-4 font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.slice(0, compact ? 6 : undefined).map((row) => (
              <tr
                key={row.position}
                className="border-b border-border last:border-0 hover:bg-muted/5 transition-colors"
              >
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded",
                      row.position <= 4
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                        : "text-muted"
                    )}
                  >
                    {row.position}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <Link href={`/team/${row.team.id}`} className="flex items-center gap-2.5">
                    <TeamLogo logo={row.team.logo} name={row.team.name} size="sm" />
                    <span className="font-medium text-sm truncate max-w-[140px]">{row.team.name}</span>
                  </Link>
                </td>
                <td className="text-center py-3 px-2 text-sm">{row.played}</td>
                <td className="text-center py-3 px-2 text-sm">{row.won}</td>
                <td className="text-center py-3 px-2 text-sm">{row.drawn}</td>
                <td className="text-center py-3 px-2 text-sm">{row.lost}</td>
                <td className="text-center py-3 px-2 text-sm text-muted">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                {!compact && (
                  <td className="py-3 px-2 hidden sm:table-cell">
                    <div className="flex gap-1 justify-center">
                      {row.form?.map((f, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-4 h-4 text-[9px] font-bold rounded flex items-center justify-center",
                            formColors[f]
                          )}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                )}
                <td className="text-center py-3 px-4 text-sm font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-border">
        <Link
          href={href}
          className="w-full block text-center text-sm font-medium text-primary hover:bg-primary/10 py-2 rounded-lg transition-colors"
        >
          View Full Table
        </Link>
      </div>
    </div>
  );
}
