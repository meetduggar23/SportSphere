"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCricketPlayerSearch } from "@/sports/cricket/hooks/useCricketPlayerSearch";
import { CricketPlayerCard } from "@/sports/cricket/components/CricketPlayerCard";
import { CricketPlayerTable } from "@/sports/cricket/components/CricketPlayerTable";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";

interface CricketPlayerSearchProps {
  placeholder?: string;
  /** "grid" (cards) or "table". */
  view?: "grid" | "table";
}

/**
 * Reusable cricket player search — debounced 300ms, cached, all countries.
 * Handles loading / no-results / unavailable / load-more states and a
 * client-side country filter built from the real result set.
 */
export function CricketPlayerSearch({
  placeholder = "Search cricket players — Kohli, Babar Azam, Steve Smith…",
  view = "grid",
}: CricketPlayerSearchProps) {
  const {
    query,
    setQuery,
    players,
    hasMore,
    status,
    source,
    sourceUrl,
    lastUpdated,
    error,
    retry,
    loadMore,
  } = useCricketPlayerSearch();

  const [country, setCountry] = useState("all");

  // Country filter values come from the actual results (never hardcoded).
  const countries = useMemo(() => {
    const set = new Set<string>();
    for (const p of players) if (p.country) set.add(p.country);
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [players]);

  const filtered = useMemo(
    () => (country === "all" ? players : players.filter((p) => p.country === country)),
    [players, country]
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-score-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search cricket players"
          className="w-full border border-score-border bg-score-surface py-2.5 pl-10 pr-3 text-sm text-score-text placeholder:text-score-muted outline-none rounded-md focus:border-score-accent"
        />
      </div>

      {status === "loading" && (
        <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
          Searching players…
        </p>
      )}

      {status === "unavailable" && (
        <div className="space-y-3">
          <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
            {error ?? "Cricket player service is temporarily unavailable."}
          </p>
          <div className="flex justify-center">
            <button
              onClick={retry}
              className="border border-score-border bg-score-elevated px-4 py-2 text-sm font-semibold text-score-text hover:bg-score-elevated transition-colors rounded-md"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {status === "ready" && players.length === 0 && (
        <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
          {query.trim()
            ? `No players found for "${query.trim()}".`
            : "Search for a player — or browse the full directory below."}
        </p>
      )}

      {/* Country filter — real values from the current result set */}
      {status === "ready" && countries.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 label text-score-muted">
            <SlidersHorizontal className="h-3 w-3" /> Country
          </span>
          <button
            onClick={() => setCountry("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              country === "all"
                ? "bg-score-accent text-score-bg"
                : "bg-score-elevated text-score-muted hover:text-score-text"
            }`}
          >
            All
          </button>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                country === c
                  ? "bg-score-accent text-score-bg"
                  : "bg-score-elevated text-score-muted hover:text-score-text"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {status === "ready" && players.length > 0 && (
        <div className="space-y-4">
          {view === "table" ? (
            <CricketPlayerTable players={filtered} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <CricketPlayerCard key={p.id} player={p} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="border border-score-border bg-score-surface px-5 py-8 text-center text-sm text-score-muted rounded-md">
              No {country !== "all" ? `${country} ` : ""}players match your search.
            </p>
          )}

          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={loadMore}
                className="border border-score-border bg-score-surface px-6 py-2.5 text-sm font-semibold text-score-text hover:bg-score-elevated transition-colors rounded-md"
              >
                Load more players
              </button>
            </div>
          )}

          <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
        </div>
      )}
    </div>
  );
}
