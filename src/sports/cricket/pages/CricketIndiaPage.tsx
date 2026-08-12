"use client";

import Link from "next/link";
import { Flag } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CricketMatchList } from "@/sports/cricket/components/CricketMatchList";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { useCricketMatches } from "@/sports/cricket/hooks/useCricketMatches";

const formats = [
  {
    id: "test",
    label: "Test",
    description: "The longest format — Border-Gavaskar Trophy, away Ashes and more.",
  },
  {
    id: "odi",
    label: "ODI",
    description: "50-over one-day internationals, including World Cup campaigns.",
  },
  {
    id: "t20i",
    label: "T20I",
    description: "Twenty20 internationals — the format of the T20 World Cup.",
  },
] as const;

/**
 * INDIA CRICKET — national side only. Tests, ODIs and T20Is. IPL stays a
 * separate competition on its own hub (never mixed with national cricket).
 */
export function CricketIndiaPage() {
  const { matches, status, source, sourceUrl, lastUpdated } = useCricketMatches({
    team: "India",
    limit: 16,
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <PageHeader
          icon={<Flag className="h-5 w-5" />}
          title="India Cricket"
          kicker="SportSphere Cricket"
          subtitle="India national side — Tests, ODIs and T20Is. IPL is covered separately as a franchise competition."
        />

        <section className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {formats.map((f) => (
              <Link
                key={f.id}
                href={`/sports/cricket/records?format=${f.id}&category=batting`}
                className="group arena-card arena-card-hover p-5"
              >
                <p className="font-display text-base font-bold text-foreground group-hover:text-foreground-soft">
                  {f.label}
                </p>
                <p className="mt-1 text-xs text-muted">{f.description}</p>
                <p className="mt-3 text-xs font-semibold text-secondary">
                  View {f.label} records →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="India fixtures & results"
            kicker="CricAPI live feed"
            linkLabel="All cricket"
            href="/sports/cricket"
          />
          <CricketMatchList
            matches={matches}
            status={status}
            emptyMessage="No India matches available right now."
          />
          <div className="mt-3">
            <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
