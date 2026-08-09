"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";

interface HomeTeam {
  id: string;
  name: string;
  logo: string;
  sport: string;
}

interface TrendingTeamsProps {
  teams: HomeTeam[];
}

export function TrendingTeams({ teams }: TrendingTeamsProps) {
  return (
    <section>
      <SectionHeader title="Trending Teams" kicker="Most followed" href="/teams" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {teams.map((t) => (
          <Link
            key={t.id}
            href={`/team/${t.id}`}
            className="group flex flex-col items-center gap-3  arena-card arena-card-hover p-5"
          >            <TeamLogo logo={t.logo} name={t.name} size="lg" />
            <div className="text-center">
              <p className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-foreground-soft">
                {t.name}
              </p>
              <p className="label mt-0.5">{t.sport}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
