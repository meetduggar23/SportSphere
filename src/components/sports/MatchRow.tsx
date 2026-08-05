"use client";

import Link from "next/link";
import { Match, sportIcons } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { cn } from "@/lib/utils";

interface MatchRowProps {
  match: Match;
  className?: string;
}

export function MatchRow({ match, className }: MatchRowProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  return (
    <Link
      href={`/match/${match.id}`}
      className={cn(
        "block bg-card rounded-xl border border-border px-4 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{sportIcons[match.sport]}</span>
        <span className="text-xs text-muted truncate">{match.league}</span>
        {isLive && <LiveBadge />}
        {!isLive && (
          <span className="text-xs text-muted ml-auto">
            {match.status === "upcoming" ? match.minute : match.minute ?? "FT"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0 flex items-center justify-end gap-2">
          <span className="font-medium text-sm truncate">{match.homeTeam.name}</span>
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="sm" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={cn("font-bold text-base min-w-[28px] text-right", isLive && "text-primary")}>
            {match.homeScore}
          </span>
          <span className="text-xs text-muted">-</span>
          <span className={cn("font-bold text-base min-w-[28px]", isLive && "text-primary")}>
            {match.awayScore}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="sm" />
          <span className="font-medium text-sm truncate">{match.awayTeam.name}</span>
        </div>
      </div>
    </Link>
  );
}
