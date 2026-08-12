"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Search, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { useCricketPlayers } from "@/sports/cricket/hooks/useCricketPlayer";

/** Cricket player directory with CricAPI-backed search. */
export function CricketPlayersPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const { data, status, source, sourceUrl, lastUpdated } = useCricketPlayers(submitted);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Cricket Players"
          kicker="SportSphere Cricket"
          subtitle="Search player profiles and career statistics."
        />

        <form onSubmit={onSearch} className="mb-6 flex max-w-xl gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players — e.g. Virat Kohli"
              className="w-full  border border-border bg-card/60 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted outline-none rounded-md focus:border-secondary"
            />
          </div>
          <button
            type="submit"
            className="  bg-primary px-4 py-2.5 text-sm font-bold text-navy transition-opacity hover:opacity-90 rounded-md"
          >
            Search
          </button>
        </form>

        {status === "loading" && (
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
            Loading players…
          </p>
        )}

        {status === "unavailable" && (
          <div className="space-y-3">
            <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
              Player directory currently unavailable. Add CRICAPI_API_KEY to search players.
            </p>
            <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
          </div>
        )}

        {status === "ready" && data && (
          <>
            {data.length === 0 ? (
              <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
                {submitted
                  ? `No players found for "${submitted}".`
                  : "No players available. Try a search."}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((p) => (
                  <Link
                    key={p.id || p.name}
                    href={`/sports/cricket/players/${p.id}`}
                    className="group arena-card arena-card-hover flex items-center justify-between p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center  bg-blue/40 text-sm font-bold text-muted-strong rounded-md">
                        {(p.name ?? "?").slice(0, 2).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground-soft group-hover:text-foreground">
                          {p.name}
                        </p>
                        {p.country && <p className="text-xs text-muted">{p.country}</p>}
                      </div>
                    </div>
                    <span className="text-muted transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
            <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
          </>
        )}
      </div>
    </AppShell>
  );
}
