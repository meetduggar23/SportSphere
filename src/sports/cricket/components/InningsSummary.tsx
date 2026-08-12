import { formatInningsScore } from "@/sports/cricket/utils/cricketFormat";
import type { CricketInnings } from "@/sports/cricket/types/cricketTypes";

interface InningsSummaryProps {
  innings: CricketInnings;
  className?: string;
}

/** One-line innings score, e.g. "India 287/6 (52.0 ov)". */
export function InningsSummary({ innings, className }: InningsSummaryProps) {
  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      <span className="font-semibold text-foreground-soft">{innings.team}</span>{" "}
      <span className="font-bold text-foreground">{formatInningsScore(innings)}</span>
      {innings.overs != null && (
        <span className="text-muted"> ({Number(innings.overs).toFixed(1)} ov)</span>
      )}
    </span>
  );
}
