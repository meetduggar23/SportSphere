"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Globe, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { useCricketTeams } from "@/sports/cricket/hooks/useCricketTeams";
import type { CricketTeam } from "@/sports/cricket/types/cricketTypes";
import { cn } from "@/lib/utils";

const typeLabel: Record<CricketTeam["type"], string> = {
  national: "National",
  franchise: "Franchise",
  club: "Club",
};

/**
 * CRICKET — COUNTRIES
 * Every supported cricket country/team, dynamically sourced from the provider
 * (identity seed + teams seen in match data). Same card for every nation —
 * India, Australia, England, Pakistan, … no country is hardcoded.
 */
export function CricketCountriesPage() {
  const { data: teams, status, source, sourceUrl, lastUpdated } = useCricketTeams();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams ?? [];
    return (teams ?? []).filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.country ?? "").toLowerCase().includes(q) ||
        (t.shortName ?? "").toLowerCase().includes(q)
    );
  }, [teams, query]);

  const nationalCount = (teams ?? []).filter((t) => t.type === "national").length;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <PageHeader
          icon={<Globe className="h-5 w-5" />}
          title="Cricket Countries"
          kicker="SportSphere Cricket"
          subtitle="Every supported cricket country and team — pick one to see its matches, players, series and records."
        />

        <div className="relative mb-6 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country / team…"
            className="w-full  border border-border bg-card/60 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted outline-none rounded-md focus:border-secondary"
          />
        </div>

        {status === "loading" && (
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
            Loading countries…
          </p>
        )}

        {status === "unavailable" && (
          <div className="space-y-3">
            <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
              Country list currently unavailable. Add CRICAPI_API_KEY to load supported countries.
            </p>
            <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
          </div>
        )}

        {status === "ready" && teams && (
          <>
            {filtered.length === 0 ? (
              <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
                {query ? `No country or team matches "${query}".` : "No countries available."}
              </p>
            ) : (
              <>
                <p className="mb-3 text-xs text-muted">
                  {teams.length} teams • {nationalCount} national sides
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((t) => (
                    <Link
                      key={t.id}
                      href={`/sports/cricket/team/${t.id}`}
                      className="group arena-card arena-card-hover flex items-center gap-3 p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center  bg-blue/40 text-sm font-bold text-muted-strong rounded-md">
                        {t.shortName?.slice(0, 3) ?? t.name.slice(0, 3)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-foreground-soft group-hover:text-foreground">
                          {t.name}
                        </span>
                        {t.country && t.country !== t.name && (
                          <span className="block truncate text-xs text-muted">{t.country}</span>
                        )}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full",
                          t.type === "national"
                            ? "bg-secondary/10 text-secondary"
                            : t.type === "franchise"
                              ? "bg-brand-maroon/10 text-brand-maroon"
                              : "bg-muted/10 text-muted"
                        )}
                      >
                        {typeLabel[t.type]}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
            <div className="mt-4">
              <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
