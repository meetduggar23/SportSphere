"use client";

import { Match, Sport, sportShortLabels } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Dedupe identical labels (providers sometimes return the same value twice,
 * e.g. "U19 League" in both competition and league). Case-insensitive.
 */
export function uniqueMeta(values: (string | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    if (!v) continue;
    const key = v.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v.trim());
  }
  return out;
}

/** Compact status chip — LIVE / UPCOMING / FINAL with the sport-specific time. */
export function MatchStatus({
  status,
  minute,
  period,
  className,
}: {
  status: Match["status"];
  minute?: string;
  period?: string;
  className?: string;
}) {
  if (status === "live") {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-score-accent",
          className
        )}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full bg-score-accent animate-ping-ring" />
          <span className="relative inline-flex h-1.5 w-1.5 bg-score-accent" />
        </span>
        Live{minute ? ` ${minute}` : period ? ` ${period}` : ""}
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span
        className={cn(
          "shrink-0 text-[10px] font-bold uppercase tracking-wider text-score-muted",
          className
        )}
      >
        Final
      </span>
    );
  }
  return (
    <span
      className={cn(
        "shrink-0 text-[10px] font-bold uppercase tracking-wider text-score-muted",
        className
      )}
    >
      Upcoming
    </span>
  );
}

interface MatchMetaProps {
  sport: Sport;
  league?: string;
  competition?: string;
  status: Match["status"];
  minute?: string;
  period?: string;
  /** Render the status chip (default true). */
  showStatus?: boolean;
  className?: string;
}

/**
 * Scorecard header: SPORT · COMPETITION   [● LIVE | UPCOMING | FINAL]
 *
 * Every scorecard across the app renders this so a user can identify the
 * sport and competition without opening the match. The sport name comes from
 * the event's actual data (never inferred or hardcoded), and competition is
 * deduped against the league field.
 */
export function MatchMeta({
  sport,
  league,
  competition,
  status,
  minute,
  period,
  showStatus = true,
  className,
}: MatchMetaProps) {
  const names = uniqueMeta([competition, league]);

  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <span className="label shrink-0 text-score-muted">{sportShortLabels[sport]}</span>
      {names.length > 0 && <span className="label truncate text-score-muted">{names[0]}</span>}
      {showStatus && (
        <MatchStatus status={status} minute={minute} period={period} className="ml-auto" />
      )}
    </div>
  );
}
