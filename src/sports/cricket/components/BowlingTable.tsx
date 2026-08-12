import type { BowlingLine } from "@/sports/cricket/types/cricketTypes";

interface BowlingTableProps {
  lines: BowlingLine[];
}

/** Scorecard bowling table: Bowler | O | M | R | W | Econ. */
export function BowlingTable({ lines }: BowlingTableProps) {
  if (lines.length === 0) {
    return <p className="px-4 py-3 text-sm text-muted">Bowling card not available.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px]">
        <thead>
          <tr className="border-b border-border bg-blue/10 text-[11px] uppercase tracking-wider text-muted">
            <th className="px-4 py-2.5 text-left font-semibold">Bowler</th>
            <th className="px-2 py-2.5 text-right font-semibold">O</th>
            <th className="px-2 py-2.5 text-right font-semibold">M</th>
            <th className="px-2 py-2.5 text-right font-semibold">R</th>
            <th className="px-2 py-2.5 text-right font-semibold">W</th>
            <th className="px-4 py-2.5 text-right font-semibold">Econ</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((b, i) => (
            <tr key={i} className="border-b border-border-navy last:border-0 hover:bg-blue/30">
              <td className="px-4 py-2.5 text-sm font-semibold text-foreground-soft">{b.name}</td>
              <td className="px-2 py-2.5 text-right text-sm tabular-nums text-muted">{b.overs}</td>
              <td className="px-2 py-2.5 text-right text-sm tabular-nums text-muted">{b.maidens}</td>
              <td className="px-2 py-2.5 text-right text-sm tabular-nums text-muted">{b.runs}</td>
              <td className="px-2 py-2.5 text-right text-sm font-bold tabular-nums text-foreground">{b.wickets}</td>
              <td className="px-4 py-2.5 text-right text-sm tabular-nums text-muted">
                {b.economy ? b.economy.toFixed(1) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
