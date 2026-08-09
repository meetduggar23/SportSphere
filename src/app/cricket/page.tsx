"use client";

import Link from "next/link";
import { SportPage } from "@/components/sports/SportPage";
import { SportIcon } from "@/components/ui/SportIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { DataStatus } from "@/components/ui/DataStatus";
import { iplTeams } from "@/data/mock";
import { useSportData } from "@/lib/useSportData";

export default function CricketPage() {
  const { matches, fixtures, standings, players, status, dataSource, lastUpdated, error, retry } =
    useSportData("cricket");

  return (
    <SportPage
      sport="cricket"
      icon={<SportIcon sport="cricket" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["IPL", "T20 World Cup", "World Cup", "The Ashes", "Border-Gavaskar Trophy", "Champions Trophy"]}
      dataStatus={
        <DataStatus
          status={status}
          dataSource={dataSource}
          lastUpdated={lastUpdated}
          error={error}
          onRetry={retry}
        />
      }
      extra={
        <section className="mb-8">
          <SectionHeader title="IPL Teams" />
          <p className="mb-4 text-xs text-muted">
            Team identities shown for reference. Live cricket data is not connected yet.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      }
    />
  );
}
