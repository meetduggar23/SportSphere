"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { iplTeams } from "@/data/mock";

/**
 * CRICKET-SPECIFIC EXTRA
 * IPL team identities shown for reference. Only the cricket page renders this.
 */
export function CricketExtra() {
  return (
    <section className="mb-8">
      <SectionHeader title="IPL Teams" />
      <p className="mb-4 text-xs text-muted">
        Team identities shown for reference. Live cricket data is not connected yet.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {iplTeams.map((t) => (
          <Link
            key={t.id}
            href={`/team/${t.id}`}
            className="group overflow-hidden  border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop"
          >
            <div className="flex flex-col items-center gap-3 p-5">
              <TeamLogo logo={t.logo} name={t.name} size="lg" />
              <div className="text-center">
                <p className="font-display text-sm font-bold truncate group-hover:text-foreground transition-colors">
                  {t.name}
                </p>
                <p className="text-xs text-muted mt-0.5">{t.city}</p>
                {t.achievements?.[0] && (
                  <p className="mt-2 min-h-[26px] text-[10px] font-semibold text-secondary leading-snug line-clamp-2">
                    {t.achievements[0]}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
