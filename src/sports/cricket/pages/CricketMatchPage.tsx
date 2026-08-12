"use client";

import { ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { RecordsUnavailable } from "@/sports/cricket/components/RecordsUnavailable";
import { CricketScorecard } from "@/sports/cricket/components/CricketScorecard";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { useCricketScorecard } from "@/sports/cricket/hooks/useCricketSeries";

interface CricketMatchPageProps {
  id: string;
}

/** Match scorecard page: innings summaries with batting and bowling tables. */
export function CricketMatchPage({ id }: CricketMatchPageProps) {
  const { status, data, error, source, sourceUrl, lastUpdated } = useCricketScorecard(id);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-4 py-8 lg:px-6 lg:py-10">
        <Link
          href="/sports/cricket"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-strong transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Cricket
        </Link>

        <PageHeader
          icon={<Activity className="h-5 w-5" />}
          title={data?.matchName || "Match Scorecard"}
          kicker="SportSphere Cricket"
          subtitle="Scorecard with innings, batting and bowling details."
        />

        {status === "loading" && (
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
            Loading scorecard…
          </p>
        )}

        {status === "unavailable" && (
          <RecordsUnavailable
            message={error ?? "This scorecard could not be loaded."}
            source={source}
            sourceUrl={sourceUrl}
            lastUpdated={lastUpdated}
          />
        )}

        {status === "ready" && data && (
          <div className="space-y-5">
            <CricketScorecard scorecard={data} />
            <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
