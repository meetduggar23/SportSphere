import type { BattingLine } from "@/sports/cricket/types/cricketTypes";

interface BattingTableProps {
  lines: BattingLine[];
}

/** Scorecard batting table: Batter | Dismissal | R | B | 4s | 6s | SR. */
export function BattingTable({ lines }: BattingTableProps) {
  if (lines.length === 0) {
    return <p className="px-4 py-3 text-sm text-score-muted">Batting card not available.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px]">
        <thead>
          <tr className="border-b border-score-border bg-score-elevated/60 text-[11px] uppercase tracking-wider text-score-muted">
            <th className="px-4 py-2.5 text-left font-semibold">Batter</th>
            <th className="px-2 py-2.5 text-left font-semibold">Dismissal</th>
            <th className="px-2 py-2.5 text-right font-semibold">R</th>
            <th className="px-2 py-2.5 text-right font-semibold">B</th>
            <th className="px-2 py-2.5 text-right font-semibold">4s</th>
            <th className="px-2 py-2.5 text-right font-semibold">6s</th>
            <th className="px-4 py-2.5 text-right font-semibold">SR</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((b, i) => (
            <tr key={i} className="border-b border-score-border last:border-0 hover:bg-score-elevated/70">
              <td className="px-4 py-2.5 text-sm font-semibold text-score-text">{b.name}</td>
              <td className="max-w-[260px] truncate px-2 py-2.5 text-xs text-score-muted">
                {b.outDesc || "not out"}
              </td>
              <td className="px-2 py-2.5 text-right text-sm font-bold tabular-nums text-score-text">{b.runs}</td>
              <td className="px-2 py-2.5 text-right text-sm tabular-nums text-score-muted">{b.balls}</td>
              <td className="px-2 py-2.5 text-right text-sm tabular-nums text-score-muted">{b.fours}</td>
              <td className="px-2 py-2.5 text-right text-sm tabular-nums text-score-muted">{b.sixes}</td>
              <td className="px-4 py-2.5 text-right text-sm tabular-nums text-score-muted">
                {b.strikeRate ? b.strikeRate.toFixed(1) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
