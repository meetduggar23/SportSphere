import { BattingTable } from "@/sports/cricket/components/BattingTable";
import { BowlingTable } from "@/sports/cricket/components/BowlingTable";
import type { CricketScorecard as CricketScorecardType } from "@/sports/cricket/types/cricketTypes";

interface CricketScorecardProps {
  scorecard: CricketScorecardType;
}

/** Full match scorecard: one card per innings with batting + bowling tables. */
export function CricketScorecard({ scorecard }: CricketScorecardProps) {
  return (
    <div className="space-y-5">
      {scorecard.statusText && (
        <p className="text-sm font-semibold text-score-accent">{scorecard.statusText}</p>
      )}
      {scorecard.innings.length === 0 && (
        <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
          Scorecard not available for this match.
        </p>
      )}
      {scorecard.innings.map((inn) => (
        <div key={inn.id} className="overflow-hidden border border-score-border bg-score-surface rounded-md">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-score-border bg-score-elevated/60 px-4 py-3">
            <p className="heading text-base text-score-text">{inn.team}</p>
            <p className="display text-lg font-bold tabular-nums text-score-text">
              {inn.runs}/{inn.wickets}
              <span className="ml-2 text-sm font-normal text-score-muted">{Number(inn.overs).toFixed(1)} ov</span>
            </p>
          </div>
          <div className="divide-y divide-score-border">
            <div>
              <p className="label px-4 pt-3 text-[10px] font-semibold uppercase tracking-wider text-score-muted">
                Batting
              </p>
              <BattingTable lines={inn.batting} />
            </div>
            <div>
              <p className="label px-4 pt-3 text-[10px] font-semibold uppercase tracking-wider text-score-muted">
                Bowling
              </p>
              <BowlingTable lines={inn.bowling} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
