"use client";

import { Player } from "@/types";
import Link from "next/link";

interface TopPlayersSidebarProps {
  players: Player[];
}

export function TopPlayersSidebar({ players }: TopPlayersSidebarProps) {
  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Top Players</h2>
          <Link href="/players" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {players.map((player) => (
          <div key={player.id} className="p-3 hover:bg-muted/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-muted w-5">{player.id}</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="text-lg">{player.teamLogo}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{player.name}</p>
                <p className="text-xs text-muted">{player.team} • {player.position}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{player.stat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
