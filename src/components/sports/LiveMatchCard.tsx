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
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop",
        isLive && "ring-1 ring-primary/25",
        className
      )}
    >
      {isLive && (
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/10 text-muted shrink-0">
            <span className="text-sm">{sportIcons[match.sport]}</span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted truncate">
            {match.league}
          </span>
        </div>
        {isLive && <LiveBadge />}
        {isUpcoming && (
          <span className="text-xs font-semibold text-muted tabular-nums shrink-0">{match.minute}</span>
        )}
        {isFinished && (
          <span className="text-xs font-semibold text-muted tabular-nums shrink-0">
            {match.minute ?? "FT"}
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="sm" />
            <span className="font-medium text-sm truncate">{match.homeTeam.name}</span>
          </div>
          <span
            className={cn(
              "font-display text-xl font-bold tabular-nums shrink-0",
              isLive ? "text-primary" : "text-foreground"
            )}
          >
            {match.homeScore}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="sm" />
            <span className="font-medium text-sm truncate">{match.awayTeam.name}</span>
          </div>
          <span
            className={cn(
              "font-display text-xl font-bold tabular-nums shrink-0",
              isLive ? "text-primary" : "text-foreground"
            )}
          >
            {match.awayScore}
          </span>
        </div>
      </div>

      {isLive && match.minute && (
        <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-primary/10 py-1.5 text-xs font-bold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-live" />
          {match.minute}
        </div>
      )}

      {match.details && <p className="text-xs text-muted mt-3 text-center">{match.details}</p>}

      {match.venue && (
        <div className="mt-4 flex items-center gap-1.5 pt-3.5 border-t border-border">
          <MapPin className="h-3 w-3 text-muted shrink-0" />
          <span className="text-xs text-muted truncate">{match.venue}</span>
        </div>
      )}
    </Link>
  );
}
