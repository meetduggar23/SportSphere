"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Match, sportIcons } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { cn } from "@/lib/utils";

interface LiveMatchCardProps {
  match: Match;
  className?: string;
}

export function LiveMatchCard({ match, className }: LiveMatchCardProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";
  const isFinished = match.status === "finished";

  return (
    <Link
      href={`/match/${match.id}`}
      className={cn(
        "bg-card rounded-xl border border-border p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group block",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">{sportIcons[match.sport]}</span>
          <span className="text-xs text-muted truncate">{match.league}</span>
        </div>
        {isLive && <LiveBadge />}
        {isUpcoming && (
          <span className="text-xs text-muted font-medium">{match.minute}</span>
        )}
        {isFinished && (
          <span className="text-xs text-muted font-medium">{match.minute ?? "FT"}</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="sm" />
            <span className="font-medium text-sm truncate">{match.homeTeam.name}</span>
          </div>
          <span className={cn("font-bold text-lg shrink-0", isLive && "text-primary")}>
            {match.homeScore}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="sm" />
            <span className="font-medium text-sm truncate">{match.awayTeam.name}</span>
          </div>
          <span className={cn("font-bold text-lg shrink-0", isLive && "text-primary")}>
            {match.awayScore}
          </span>
        </div>
      </div>

      {isLive && match.minute && (
        <p className="text-xs font-semibold text-primary mt-3 text-center bg-primary/10 rounded-full py-1">
          {match.minute}
        </p>
      )}

      {match.details && <p className="text-xs text-muted mt-2 text-center">{match.details}</p>}

      {match.venue && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
          <MapPin className="h-3 w-3 text-muted shrink-0" />
          <span className="text-xs text-muted truncate">{match.venue}</span>
        </div>
      )}
    </Link>
  );
}
