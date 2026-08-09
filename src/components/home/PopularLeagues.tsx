"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SportIcon } from "@/components/ui/SportIcon";

interface League {
  id: string;
  name: string;
  sport: string;
  country: string;
  teams?: number;
  href: string;
}

interface PopularLeaguesProps {
  leagues: League[];
}

export function PopularLeagues({ leagues }: PopularLeaguesProps) {
  return (
    <section>
      <SectionHeader title="Popular Leagues" kicker="Competitions" href="/competitions" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {leagues.map((lg) => (
          <Link
            key={lg.id}
            href={lg.href}
            className="group flex items-center gap-3  panel panel-hover p-4"
          >
<span className="flex h-11 w-11 shrink-0 items-center justify-center  bg-blue/50 text-muted-strong ring-1 ring-border-navy">
              <SportIcon sport={lg.sport} className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-foreground-soft">
                {lg.name}
              </p>
              <p className="meta mt-0.5 truncate">
                {lg.country}
                {lg.teams ? ` • ${lg.teams} teams` : ""}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        ))}
      </div>
    </section>
  );
}
