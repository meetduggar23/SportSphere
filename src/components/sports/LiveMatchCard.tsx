"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Match, sportIcons } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { cn } from "@/lib/utils";

interface LiveMatchCardProps {
  match: Match;
  className?: string;
}

export function LiveMatchCard({ match, className }: LiveMatchCardProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  return (
<Link
      href={`/match/${match.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden  arena-card arena-card-hover",
        isLive && "ring-1 ring-border-live/50",
        className
      )}
    >
      {/* Live top accent bar */}
      {isLive && (
        <div className="absolute inset-x-0 top-0 h-0.5 bg-live-gradient" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-5 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center  bg-blue/50 text-muted-strong rounded-sm">
            <span className="text-sm">{sportIcons[match.sport]}</span>
          </span>
          <span className="label truncate">{match.league}</span>
        </div>
        {isLive && (
          <span className="inline-flex shrink-0 items-center gap-1.5  bg-primary px-2.5 py-1 text-[10px] font-bold text-navy rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full  bg-navy animate-ping-ring" />
              <span className="relative inline-flex h-1.5 w-1.5  bg-navy" />
            </span>
            {match.minute}
          </span>
        )}
        {isUpcoming && (
          <span className="shrink-0 text-xs font-bold text-muted tabular-nums">
            {match.minute}
          </span>
        )}
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-between gap-3 px-5 py-5">
        <div className="flex flex-1 items-center gap-3">
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="md" />
          <span className="font-semibold text-sm leading-tight text-foreground-soft">{match.homeTeam.name}</span>
        </div>
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "display text-3xl tabular-nums",
                isLive ? "text-berry" : "text-foreground"
              )}
            >
              {match.homeScore}
            </span>
            <span className="text-sm text-muted">—</span>
            <span
              className={cn(
                "display text-3xl tabular-nums",
                isLive ? "text-berry" : "text-foreground"
              )}
            >
              {match.awayScore}
            </span>
          </div>
          {match.details && <p className="meta mt-1.5 text-center">{match.details}</p>}
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <span className="font-semibold text-sm text-right leading-tight text-foreground-soft">{match.awayTeam.name}</span>
          <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="md" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border-navy bg-blue/10 px-5 py-3">
        <span className="flex items-center gap-1.5 meta">
          <MapPin className="h-3 w-3" /> {match.venue ?? "TBD"}
        </span>
        <span className="meta">
          {isUpcoming ? (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {match.date}
            </span>
          ) : (
            match.competition ?? match.league
          )}
        </span>
      </div>
    </Link>
  );
}
