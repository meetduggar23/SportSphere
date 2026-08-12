"use client";

import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { RecordsUnavailable } from "@/sports/cricket/components/RecordsUnavailable";
import { CricketPlayerProfile } from "@/sports/cricket/components/CricketPlayerProfile";
import { useCricketPlayer } from "@/sports/cricket/hooks/useCricketPlayer";

interface CricketPlayerProfilePageProps {
  id: string;
}

/** Player profile — bio (only provider-supplied fields) + real career stats. */
export function CricketPlayerProfilePage({ id }: CricketPlayerProfilePageProps) {
  const { status, profile, error, source, sourceUrl, lastUpdated } = useCricketPlayer(id);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <Link
          href="/sports/cricket/players"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-strong transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All players
        </Link>

        <PageHeader
          icon={<User className="h-5 w-5" />}
          title={profile?.player.name ?? "Player Profile"}
          kicker="SportSphere Cricket"
          subtitle="Career statistics by format — only verified provider data is shown."
        />

        {status === "loading" && (
          <p className="border border-score-border bg-score-surface px-5 py-10 text-center text-sm text-score-muted rounded-md">
            Loading player profile…
          </p>
        )}

        {status === "unavailable" && (
          <RecordsUnavailable
            message={error ?? "This player profile could not be loaded."}
            source={source}
            sourceUrl={sourceUrl}
            lastUpdated={lastUpdated}
          />
        )}

        {status === "ready" && profile && (
          <CricketPlayerProfile
            player={profile.player}
            stats={profile.stats}
            source={source}
            sourceUrl={sourceUrl}
            lastUpdated={lastUpdated}
          />
        )}
      </div>
    </AppShell>
  );
}
