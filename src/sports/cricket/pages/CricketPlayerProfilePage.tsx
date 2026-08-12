"use client";

import Image from "next/image";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { RecordsUnavailable } from "@/sports/cricket/components/RecordsUnavailable";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { PlayerStats } from "@/sports/cricket/components/PlayerStats";
import { useCricketPlayer } from "@/sports/cricket/hooks/useCricketPlayer";

interface CricketPlayerProfilePageProps {
  id: string;
}

/** Player profile — bio, format tabs, career statistics and provenance. */
export function CricketPlayerProfilePage({ id }: CricketPlayerProfilePageProps) {
  const { status, profile, error, source, sourceUrl, lastUpdated } = useCricketPlayer(id);

  const bioRows = (profile?.player ? [
    profile.player.country && { label: "Country", value: profile.player.country },
    profile.player.role && { label: "Role", value: profile.player.role },
    profile.player.battingStyle && { label: "Batting style", value: profile.player.battingStyle },
    profile.player.bowlingStyle && { label: "Bowling style", value: profile.player.bowlingStyle },
  ].filter(Boolean) : []) as { label: string; value: string }[];

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
          subtitle="Career statistics by format. Only verified provider data is shown."
        />

        {status === "loading" && (
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
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
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
              <div className="arena-card overflow-hidden">
                <div className="relative flex h-56 items-center justify-center bg-blue/20">
                  {profile.player.photo ? (
                    <Image
                      src={profile.player.photo}
                      alt={profile.player.name}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-20 w-20 items-center justify-center  bg-blue/40 text-2xl font-bold text-muted-strong rounded-md">
                      {profile.player.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="border-t border-border-navy p-5">
                  <p className="font-display text-lg font-bold text-foreground">
                    {profile.player.name}
                  </p>
                  <p className="meta mt-0.5 text-muted">{profile.player.fullName}</p>
                  {bioRows.length > 0 && (
                    <dl className="mt-4 space-y-2">
                      {bioRows.map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-3">
                          <dt className="label text-xs text-muted">{row.label}</dt>
                          <dd className="text-right text-xs font-semibold text-foreground-soft">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {profile.player.teams && profile.player.teams.length > 0 && (
                    <p className="meta mt-4 text-xs text-muted">
                      Teams: {profile.player.teams.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <PlayerStats results={profile.stats} />
              </div>
            </div>

            <section>
              <h2 className="heading mb-3 text-lg text-foreground">Recent Matches & Form</h2>
              <RecordsUnavailable
                title="Recent match history unavailable"
                message="Match-by-match history is not available from the connected provider (CricAPI). Connecting a stats-capable data source will populate recent matches and form here."
                source={source}
                sourceUrl={sourceUrl}
                lastUpdated={lastUpdated}
              />
            </section>

            <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
