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
  W: "bg-secondary/15 text-secondary",
  D: "bg-deep/30 text-muted-strong",
  L: "bg-blue/20 text-muted",
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
<div className="overflow-hidden  arena-card rounded-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-navy px-6 py-5">
        <div>
          <h2 className="heading text-lg text-foreground">{title}</h2>
          <p className="meta mt-0.5">Latest league table</p>
        </div>
        {tabs && (
          <div className="flex gap-1  border border-border bg-blue/10 p-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  " px-3 py-1.5 text-xs font-semibold transition-all duration-200 rounded-md",
                  activeTab === i
                    ? "bg-blue/50 text-foreground"
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
            <tr className="border-b border-border bg-blue/10 text-[11px] uppercase tracking-wider text-muted">
              <th className="px-6 py-3 text-left font-semibold">#</th>
              <th className="px-2 py-3 text-left font-semibold">Team</th>
              <th className="px-2 py-3 text-center font-semibold">P</th>
              <th className="px-2 py-3 text-center font-semibold">W</th>
              <th className="px-2 py-3 text-center font-semibold">D</th>
              <th className="px-2 py-3 text-center font-semibold">L</th>
              <th className="px-2 py-3 text-center font-semibold">GD</th>
              {!compact && <th className="hidden px-2 py-3 text-center font-semibold sm:table-cell">Form</th>}
              <th className="px-6 py-3 text-center font-semibold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.slice(0, compact ? 6 : undefined).map((row) => (
<tr
                key={row.position}
                className="border-b border-border-navy transition-colors last:border-0 hover:bg-blue/30"
              >
                <td className="px-6 py-3.5">
                  <span
                    className={cn(
                      "inline-flex h-7 w-7 items-center justify-center  text-xs font-bold tabular-nums rounded-full",
                      row.position === 1
                        ? "bg-primary text-navy"
                        : row.position <= 4
                          ? "bg-blue/50 text-muted-strong"
                          : "text-muted"
                    )}
                  >
                    {row.position}
                  </span>
                </td>
<td className="px-2 py-3.5">
                  <Link href={`/team/${row.team.id}`} className="group flex items-center gap-2.5">
                    <TeamLogo logo={row.team.logo} name={row.team.name} size="sm" />
                    <span className="max-w-[150px] truncate text-sm font-medium text-foreground-soft transition-colors group-hover:text-foreground">
                      {row.team.name}
                    </span>
                  </Link>
                </td>
                <td className="px-2 py-3.5 text-center text-sm tabular-nums text-muted">{row.played}</td>
                <td className="px-2 py-3.5 text-center text-sm tabular-nums">{row.won}</td>
                <td className="px-2 py-3.5 text-center text-sm tabular-nums">{row.drawn}</td>
                <td className="px-2 py-3.5 text-center text-sm tabular-nums">{row.lost}</td>
                <td className="px-2 py-3.5 text-center text-sm tabular-nums text-muted">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                {!compact && (
                  <td className="hidden px-2 py-3.5 sm:table-cell">
                    <div className="flex justify-center gap-1">
                      {row.form?.map((f, i) => (
                        <span
                          key={i}
                          className={cn(
                            "flex h-5 w-5 items-center justify-center  text-[9px] font-bold shadow-sm rounded-full",
                            formColors[f]
                          )}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                )}
                <td className="px-6 py-3.5 text-center">
                  <span className="display text-sm font-bold text-foreground tabular-nums">{row.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<div className="border-t border-border-navy px-6 py-4">
        <Link
          href={href}
          className="block w-full  py-2.5 text-center text-sm font-semibold text-muted-strong transition-colors hover:bg-blue/40 hover:text-foreground"
        >
          View Full Table
        </Link>
      </div>
    </div>
  );
}
