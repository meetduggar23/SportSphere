"use client";

import { Player } from "@/types";
import Link from "next/link";
import { TeamLogo } from "@/components/ui/TeamLogo";

interface TopPlayersSidebarProps {
  players: Player[];
  title?: string;
}

export function TopPlayersSidebar({ players, title = "Top Players" }: TopPlayersSidebarProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <Link href="/players" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
            View All
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {players.map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.id}`}
            className="block p-3 hover:bg-muted/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TeamLogo logo={player.teamLogo} name={player.team} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{player.name}</p>
                <p className="text-xs text-muted truncate">
                  {player.team} • {player.position}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">{player.stat}</p>
                <p className="text-[10px] text-muted uppercase tracking-wide">{player.statLabel}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
