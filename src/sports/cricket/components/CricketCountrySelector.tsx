"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import type { CricketTeam } from "@/sports/cricket/types/cricketTypes";
import { cn } from "@/lib/utils";

interface CricketCountrySelectorProps {
  teams: CricketTeam[];
  currentId?: string;
  className?: string;
}

/**
 * Searchable country/team selector — pick any supported cricket country. The
 * list is dynamic (from the provider), never a hardcoded country set, and
 * navigation is driven by stable team ids.
 */
export function CricketCountrySelector({
  teams,
  currentId,
  className,
}: CricketCountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const current = teams.find((t) => t.id === currentId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.country ?? "").toLowerCase().includes(q) ||
        (t.shortName ?? "").toLowerCase().includes(q)
    );
  }, [teams, query]);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setQuery("");
          window.setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="flex w-full items-center justify-between gap-2  border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-border-strong rounded-md"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{current?.name ?? "Select country / team"}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute z-20 mt-1 w-full min-w-[280px]  border border-border bg-card shadow-pop rounded-md">
            <div className="relative p-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country / team…"
                className="w-full  border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted outline-none rounded-md focus:border-secondary"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-1">
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-center text-xs text-muted">
                  No country or team matches.
                </p>
              )}
              {filtered.slice(0, 40).map((t) => (
                <Link
                  key={t.id}
                  href={`/sports/cricket/team/${t.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors rounded-sm",
                    t.id === currentId
                      ? "bg-secondary/10 font-semibold text-foreground"
                      : "text-muted hover:bg-blue/20 hover:text-foreground"
                  )}
                >
                  <span className="truncate">{t.name}</span>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-muted-strong">
                    {t.shortName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
