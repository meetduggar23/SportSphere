"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { IPL_SEASONS } from "@/sports/cricket/config/cricketConfig";
import type { CricketFormatId } from "@/sports/cricket/types/cricketTypes";

interface CricketFilterBarProps {
  format: CricketFormatId;
  season?: string;
  team?: string;
  search?: string;
  teams?: string[];
  onSeason?: (season: string) => void;
  onTeam?: (team: string) => void;
  onSearch?: (search: string) => void;
  onReset?: () => void;
}

/**
 * Statsguru-style filter row. Only the controls the underlying provider can
 * actually support are rendered — and only when a records-capable provider is
 * connected (records data present). Filters are never guessed at.
 */
export function CricketFilterBar({
  format,
  season,
  team,
  search,
  teams = [],
  onSeason,
  onTeam,
  onSearch,
  onReset,
}: CricketFilterBarProps) {
  const hasFilters = Boolean(season || team || search);
  const showSeason = onSeason && format === "ipl";

  return (
    <div className="  border border-border-navy bg-card/50 p-3 rounded-md">
      <div className="flex flex-wrap items-end gap-3">
        <p className="mr-1 hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted sm:flex">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
        </p>

        {showSeason && (
          <label className="flex flex-col gap-1">
            <span className="label text-[10px] uppercase tracking-wider text-muted">Season</span>
            <select
              value={season ?? ""}
              onChange={(e) => onSeason(e.target.value)}
              className="  border border-border bg-blue/10 px-2.5 py-1.5 text-sm text-foreground outline-none rounded-md focus:border-secondary"
            >
              <option value="">All seasons</option>
              {IPL_SEASONS.map((s) => (
                <option key={s} value={s}>
                  IPL {s}
                </option>
              ))}
            </select>
          </label>
        )}

        {onTeam && teams.length > 0 && (
          <label className="flex flex-col gap-1">
            <span className="label text-[10px] uppercase tracking-wider text-muted">Team</span>
            <select
              value={team ?? ""}
              onChange={(e) => onTeam(e.target.value)}
              className="  border border-border bg-blue/10 px-2.5 py-1.5 text-sm text-foreground outline-none rounded-md focus:border-secondary"
            >
              <option value="">All teams</option>
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        )}

        {onSearch && (
          <label className="flex min-w-[200px] flex-1 flex-col gap-1">
            <span className="label text-[10px] uppercase tracking-wider text-muted">Player</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                value={search ?? ""}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search player…"
                className="w-full  border border-border bg-blue/10 py-1.5 pl-8 pr-3 text-sm text-foreground placeholder:text-muted outline-none rounded-md focus:border-secondary"
              />
            </div>
          </label>
        )}

        {hasFilters && onReset && (
          <button
            onClick={onReset}
            className="  border border-border px-3 py-1.5 text-sm font-semibold text-muted-strong transition-colors hover:border-border-strong hover:text-foreground rounded-md"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
