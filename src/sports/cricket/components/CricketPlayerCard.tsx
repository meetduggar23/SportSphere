"use client";

import Link from "next/link";
import { CricketPlayerRef } from "@/sports/cricket/types/cricketTypes";

interface CricketPlayerCardProps {
  player: CricketPlayerRef;
}

/**
 * One cricket player in search/directory results. The search API returns
 * id/name/country only — role and photo come from the profile page, so cards
 * stay honest and never invent details.
 */
export function CricketPlayerCard({ player }: CricketPlayerCardProps) {
  const initials = (player.name ?? "?").slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/sports/cricket/players/${player.id}`}
      className="group flex items-center justify-between bg-score-surface border border-score-border p-4 hover:bg-score-elevated transition-colors rounded-md"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-score-elevated text-sm font-bold text-score-muted rounded-md">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-score-text">{player.name}</p>
          {player.country && <p className="text-xs text-score-muted">{player.country}</p>}
        </div>
      </div>
      <span className="text-score-muted transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
