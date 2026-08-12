"use client";

import { CricketMatchRow } from "@/sports/cricket/components/CricketMatchRow";
import type { CricketMatch } from "@/sports/cricket/types/cricketTypes";
import type { CricketDataStatus } from "@/sports/cricket/hooks/useCricketData";

interface CricketMatchListProps {
  matches: CricketMatch[];
  status: CricketDataStatus;
  emptyMessage?: string;
}

/** Vertical list of cricket match rows with loading/empty/unavailable states. */
export function CricketMatchList({
  matches,
  status,
  emptyMessage = "No matches found.",
}: CricketMatchListProps) {
  if (status === "loading") {
    return (
      <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
        Loading matches…
      </p>
    );
  }

  if (status === "unavailable") {
    return (
      <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
        Statistics currently unavailable. Live cricket data requires the
        CRICAPI_API_KEY to be configured.
      </p>
    );
  }

  if (matches.length === 0) {
    return (
      <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {matches.map((m) => (
        <CricketMatchRow key={m.id} match={m} />
      ))}
    </div>
  );
}
