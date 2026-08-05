"use client";

import { useState } from "react";
import { Standing } from "@/types";
import { cn } from "@/lib/utils";

interface StandingsTableProps {
  standings: Standing[];
}

const tabs = ["Football", "Cricket", "NBA", "F1"];

export function StandingsTable({ standings }: StandingsTableProps) {
  const [activeTab, setActiveTab] = useState("Football");

  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Standings</h2>
          <div className="flex gap-1 bg-muted/10 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                  activeTab === tab
                    ? "bg-card-bg shadow-sm text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted border-b border-border">
              <th className="text-left py-3 px-4 font-medium">Team</th>
              <th className="text-center py-3 px-2 font-medium">P</th>
              <th className="text-center py-3 px-2 font-medium">W</th>
              <th className="text-center py-3 px-2 font-medium">D</th>
              <th className="text-center py-3 px-2 font-medium">L</th>
              <th className="text-center py-3 px-2 font-medium">GD</th>
              <th className="text-center py-3 px-4 font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.position} className="border-b border-border last:border-0 hover:bg-muted/5 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted w-5">{row.position}</span>
                    <span className="text-lg">{row.team.logo}</span>
                    <span className="font-medium text-sm">{row.team.name}</span>
                  </div>
                </td>
                <td className="text-center py-3 px-2 text-sm">{row.played}</td>
                <td className="text-center py-3 px-2 text-sm">{row.won}</td>
                <td className="text-center py-3 px-2 text-sm">{row.drawn}</td>
                <td className="text-center py-3 px-2 text-sm">{row.lost}</td>
                <td className="text-center py-3 px-2 text-sm text-green-600">+{row.goalDifference}</td>
                <td className="text-center py-3 px-4 text-sm font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-border">
        <button className="w-full text-center text-sm font-medium text-primary hover:bg-primary/10 py-2 rounded-lg transition-colors">
          View Full Table
        </button>
      </div>
    </div>
  );
}
