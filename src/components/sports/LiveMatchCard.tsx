"use client";

import { MapPin } from "lucide-react";
import { Match } from "@/types";

interface LiveMatchCardProps {
  match: Match;
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 hover:shadow-md transition-shadow min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted capitalize">{match.sport}</span>
          <span className="text-xs text-muted">•</span>
          <span className="text-xs text-muted">{match.league}</span>
        </div>
        <div className="flex items-center gap-2">
          {match.status === "live" && (
            <span className="flex items-center gap-1 text-xs font-medium text-red-500">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-live" />
              LIVE
            </span>
          )}
          <span className="text-xs text-muted">{match.time}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{match.homeTeam.logo}</span>
            <span className="font-medium text-sm">{match.homeTeam.name}</span>
          </div>
          <span className="font-bold text-lg">{match.homeScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{match.awayTeam.logo}</span>
            <span className="font-medium text-sm">{match.awayTeam.name}</span>
          </div>
          <span className="font-bold text-lg">{match.awayScore}</span>
        </div>
      </div>

      {match.details && (
        <p className="text-xs text-muted mt-2 text-center">{match.details}</p>
      )}

      {match.venue && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
          <MapPin className="h-3 w-3 text-muted" />
          <span className="text-xs text-muted truncate">{match.venue}</span>
        </div>
      )}
    </div>
  );
}
