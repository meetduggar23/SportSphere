"use client";

import Link from "next/link";
import { CricketPlayerRef } from "@/sports/cricket/types/cricketTypes";

interface CricketPlayerTableProps {
  players: CricketPlayerRef[];
  /** Optional role map (id → role) from enriched profiles, if available. */
  roles?: Record<string, string>;
}

/** Tabular view of cricket players — name, country, role (when known). */
export function CricketPlayerTable({ players, roles }: CricketPlayerTableProps) {
  return (
    <div className="overflow-x-auto bg-score-surface border border-score-border rounded-md">
      <table className="w-full min-w-[420px]">
        <thead>
          <tr className="border-b border-score-border bg-score-elevated/60 text-[11px] uppercase tracking-wider text-score-muted">
            <th className="px-4 py-2.5 text-left font-semibold">Player</th>
            <th className="px-4 py-2.5 text-left font-semibold">Country</th>
            <th className="px-4 py-2.5 text-left font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id} className="border-b border-score-border last:border-0 hover:bg-score-elevated/70">
              <td className="px-4 py-2.5">
                <Link
                  href={`/sports/cricket/players/${p.id}`}
                  className="text-sm font-semibold text-score-text hover:text-score-accent transition-colors"
                >
                  {p.name}
                </Link>
              </td>
              <td className="px-4 py-2.5 text-sm text-score-muted">{p.country ?? "—"}</td>
              <td className="px-4 py-2.5 text-sm text-score-muted">
                {roles?.[p.id] ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
