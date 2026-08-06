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
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
        <Link
          href="/players"
          className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-border">
        {players.map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.id}`}
            className="group block px-6 py-4 hover:bg-card-hover transition-colors"
          >
            <div className="flex items-center gap-3.5">
              {player.photo ? (
                <img
                  src={player.photo}
                  alt={player.name}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 rounded-xl object-cover ring-1 ring-border shrink-0"
                />
              ) : (
                <TeamLogo logo={player.teamLogo} name={player.team} size="md" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                  {player.name}
                </p>
                <p className="text-xs text-muted truncate">
                  {player.team} • {player.position}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-base font-bold tabular-nums leading-none">
                  {player.stat}
                </p>
                <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
                  {player.statLabel}
                </p>
              </div>
              {player.rating !== undefined && (
                <span className="shrink-0 rounded-full bg-primary/10 text-primary text-[11px] font-bold px-2 py-1">
                  {player.rating}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
