"use client";

import { Player } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { TeamLogo } from "@/components/ui/TeamLogo";

interface TopPlayersSidebarProps {
  players: Player[];
  title?: string;
}

export function TopPlayersSidebar({ players, title = "Top Players" }: TopPlayersSidebarProps) {
  return (
<div className="overflow-hidden  arena-card">
      <div className="flex items-center justify-between border-b border-border-navy px-6 py-5">
        <h2 className="heading text-lg text-foreground">{title}</h2>
        <Link
          href="/players"
          className="text-sm font-semibold text-muted-strong transition-colors hover:text-foreground"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-border-navy">
        {players.map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.id}`}
            className="group block px-6 py-4 transition-colors hover:bg-blue/30"
          >
            <div className="flex items-center gap-3.5">
              {player.photo ? (
                <Image
                  src={player.photo}
                  alt={player.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 shrink-0  object-cover ring-1 ring-border-navy"
                />
              ) : (
                <TeamLogo logo={player.teamLogo} name={player.team} size="md" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground-soft transition-colors group-hover:text-foreground">
                  {player.name}
                </p>
                <p className="meta truncate">
                  {player.team} • {player.position}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="display text-base tabular-nums leading-none">{player.stat}</p>
                <p className="label mt-1">{player.statLabel}</p>
              </div>
              {player.rating !== undefined && (
                <span className="shrink-0  bg-blue/50 px-2 py-1 text-[11px] font-bold text-muted-strong rounded-full">
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
