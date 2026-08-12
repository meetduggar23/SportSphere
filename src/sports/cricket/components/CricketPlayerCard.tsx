"use client";

import Link from "next/link";
import { CricketPlayerRef } from "@/sports/cricket/types/cricketTypes";
import { CricketPlayerAvatar } from "@/sports/cricket/components/CricketPlayerAvatar";

interface CricketPlayerCardProps {
  player: CricketPlayerRef;
}

/**
 * One cricket player in search/directory results. The search API returns
 * id/name/country only — role comes from the profile page, so cards stay
 * honest and never invent details. A real photo is shown when the image
 * provider resolved one; otherwise the initials avatar renders.
 */
export function CricketPlayerCard({ player }: CricketPlayerCardProps) {
  return (
    <Link
      href={`/sports/cricket/players/${player.id}`}
      className="group flex items-center justify-between bg-score-surface border border-score-border p-4 hover:bg-score-elevated transition-colors rounded-md"
    >
      <div className="flex min-w-0 items-center gap-3">
        <CricketPlayerAvatar
          name={player.name}
          src={player.photo}
          className="h-10 w-10"
          sizes="40px"
        />
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
