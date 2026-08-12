"use client";

import { formatDate, formatDecimal, formatNumber } from "@/sports/cricket/utils/cricketFormat";
import type { CricketRecord, RecordColumn, RecordDefinition } from "@/sports/cricket/types/cricketTypes";

interface CricketRecordTableProps {
  definition: RecordDefinition;
  records: CricketRecord[];
  /** Row offset for rank numbering (pagination). */
  offset?: number;
}

function scoreCell(value?: number, notOut?: boolean): string {
  if (value == null) return "-";
  return `${formatNumber(value)}${notOut ? "*" : ""}`;
}

/** Resolve a dynamic column cell from a record row. */
function cellValue(column: RecordColumn, record: CricketRecord, rank: number): string {
  const stats = record.stats;
  switch (column.key) {
    case "rank":
      return String(rank);
    case "player":
      return record.player?.name ?? "-";
    case "team":
      return record.team?.name ?? "-";
    case "partners":
      return record.detail || record.player?.name || "-";
    case "wicket":
      return record.detail ?? "-";
    case "match":
      return record.match ?? "-";
    case "competition":
      return record.competition ?? "-";
    case "date":
      return formatDate(record.date) || "-";
    case "value": {
      const v = String(record.value);
      return column.suffix ? `${v} ${column.suffix}` : v;
    }
    case "winPercentage": {
      const m = stats?.matchesAsCaptain;
      const w = stats?.captainWins;
      if (!m || !w) return "-";
      return ((w / m) * 100).toFixed(1);
    }
    case "highestScore":
      return scoreCell(stats?.highestScore, stats?.highestScoreNotOut);
    case "bestBowlingInnings":
      return stats?.bestBowlingInnings || String(record.value);
    case "bestBowlingMatch":
      return stats?.bestBowlingMatch || String(record.value);
    case "careerSpan":
      return stats?.careerSpan ?? "-";
    default: {
      const v = stats?.[column.key as keyof typeof stats] as number | undefined;
      if (v == null) return "-";
      if (column.format === "decimal") return formatDecimal(v);
      return formatNumber(v);
    }
  }
}

const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

/**
 * Dynamic record table — renders exactly the columns the selected record
 * definition declares. No irrelevant columns, ever.
 */
export function CricketRecordTable({ definition, records, offset = 0 }: CricketRecordTableProps) {
  if (records.length === 0) {
    return (
      <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
        No records to display.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto  border border-border-navy bg-card/40 rounded-md">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-border bg-blue/10 text-[11px] uppercase tracking-wider text-muted">
            {definition.columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold ${
                  col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, i) => (
            <tr
              key={record.id}
              className="border-b border-border-navy transition-colors last:border-0 hover:bg-blue/30"
            >
              {definition.columns.map((col) => {
                const isRank = col.key === "rank";
                const isName = col.key === "player" || col.key === "team" || col.key === "partners";
                const value = cellValue(col, record, offset + i + 1);
                return (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm ${
                      isRank || isName ? "font-semibold text-foreground-soft" : "tabular-nums text-foreground"
                    } ${alignClass[col.align ?? "left"]}`}
                  >
                    {isRank ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center  text-xs font-bold tabular-nums rounded-full bg-blue/40 text-muted-strong">
                        {value}
                      </span>
                    ) : (
                      <span className="truncate">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
