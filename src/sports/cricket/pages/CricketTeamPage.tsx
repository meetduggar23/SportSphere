"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Flag, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CricketCountrySelector } from "@/sports/cricket/components/CricketCountrySelector";
import { CricketMatchList } from "@/sports/cricket/components/CricketMatchList";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { CricketPlayerAvatar } from "@/sports/cricket/components/CricketPlayerAvatar";
import {
  useCricketTeam,
  useCricketTeams,
} from "@/sports/cricket/hooks/useCricketTeams";
import { useCricketMatches } from "@/sports/cricket/hooks/useCricketMatches";
import { useCricketSeries } from "@/sports/cricket/hooks/useCricketSeries";
import { useCricketPlayersTeam } from "@/sports/cricket/hooks/useCricketPlayer";
import { cricketFormat } from "@/sports/cricket/config/cricketConfig";
import type { CricketFormatId, CricketTeam } from "@/sports/cricket/types/cricketTypes";

const typeLabel = {
  national: "National side",
  franchise: "Franchise",
  club: "Club",
} as const;

/** Formats a team can actually play in, based on its kind — never assumed. */
function formatsForTeam(type: "national" | "franchise" | "club"): CricketFormatId[] {
  return type === "national" ? ["test", "odi", "t20i"] : ["t20"];
}

/**
 * Data sections for a RESOLVED team. Mounts only once the team identity is
 * known, so every hook gets a stable, team-scoped path — no unfiltered
 * request is ever made and no other country's data can flash on this page.
 * Keyed by team.id so switching countries remounts cleanly.
 */
function TeamSections({ team }: { team: CricketTeam }) {
  const { matches, status: matchesStatus, source, sourceUrl, lastUpdated } = useCricketMatches({
    team: team.name,
    limit: 20,
  });
  const { data: series, status: seriesStatus } = useCricketSeries(team.name);
  const { data: playersData, status: playersStatus } = useCricketPlayersTeam(team.id);
  const players = playersData?.players ?? [];

  const liveOrUpcoming = matches.filter((m) => m.status !== "finished");
  const finished = matches.filter((m) => m.status === "finished");

  return (
    <div className="space-y-8">
      {/* Matches */}
      <section>
        <SectionHeader
          title={`${team.name} matches`}
          kicker="CricAPI live feed"
          href={`/sports/cricket/records?team=${encodeURIComponent(team.name)}`}
          linkLabel="Records"
        />
        <CricketMatchList
          matches={liveOrUpcoming}
          status={matchesStatus}
          emptyMessage={`No live or upcoming ${team.name} matches available right now.`}
        />
      </section>

      {finished.length > 0 && (
        <section>
          <SectionHeader title="Recent results" kicker="Completed matches" />
          <CricketMatchList matches={finished} status={matchesStatus} emptyMessage="" />
        </section>
      )}

      {/* Players */}
      <section>
        <SectionHeader title={`${team.name} players`} kicker="Country roster" />
        {playersStatus === "loading" ? (
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
            Loading players…
          </p>
        ) : players && players.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((p) => (
              <Link
                key={p.id || p.name}
                href={`/sports/cricket/players/${p.id}`}
                className="group arena-card arena-card-hover flex items-center gap-3 p-4"
              >
                <CricketPlayerAvatar
                  name={p.name ?? "?"}
                  src={p.photo}
                  className="h-10 w-10"
                  sizes="40px"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground-soft group-hover:text-foreground">
                    {p.name}
                  </span>
                  {p.country && <span className="block text-xs text-muted">{p.country}</span>}
                </span>
                <Users className="h-4 w-4 shrink-0 text-muted" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
            {playersStatus === "unavailable"
              ? "Player roster currently unavailable. Add CRICAPI_API_KEY to load players."
              : `Player rosters for ${team.name} are not available from the connected provider.`}
          </p>
        )}
      </section>

      {/* Series */}
      <section>
        <SectionHeader
          title={`${team.name} series`}
          kicker="Tours & tournaments"
          href="/sports/cricket/records"
          linkLabel="All records"
        />
        {seriesStatus === "loading" ? (
          <p className="  border border-border-navy bg-card/50 px-5 py-8 text-center text-sm text-muted rounded-md">
            Loading series…
          </p>
        ) : series && series.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {series.map((s) => (
              <div
                key={s.id || s.name}
                className="flex items-center gap-3  border border-border bg-card/50 px-4 py-3 rounded-md"
              >
                <CalendarDays className="h-4 w-4 shrink-0 text-secondary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground-soft">{s.name}</p>
                  <p className="text-xs text-muted">
                    {s.season}
                    {s.current ? " • Current" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="  border border-border-navy bg-card/50 px-5 py-8 text-center text-sm text-muted rounded-md">
            {seriesStatus === "unavailable"
              ? "Series data currently unavailable."
              : `No series data is currently available for ${team.name}.`}
          </p>
        )}
      </section>

      <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
    </div>
  );
}

/**
 * CRICKET — COUNTRY / TEAM
 * One reusable page for every supported country: /sports/cricket/team/india,
 * /sports/cricket/team/australia, /sports/cricket/team/pakistan, … The same
 * structure renders for all of them — only the selected team's data changes.
 * Nothing falls back to another country's data.
 */
export function CricketTeamPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = use(params);

  const { team, status: teamStatus, error } = useCricketTeam(teamId);
  const { data: allTeams } = useCricketTeams();

  if (teamStatus === "loading") {
    return (
      <AppShell>
        <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6">
          <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
            Loading team…
          </p>
        </div>
      </AppShell>
    );
  }

  if (!team) {
    return (
      <AppShell>
        <div className="mx-auto max-w-[1200px] px-4 py-16 text-center lg:px-6">
          <h1 className="text-xl font-bold">Team not found</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            {error ?? "We couldn&apos;t resolve this team id."} No other country&apos;s data is
            shown instead.
          </p>
          <Link
            href="/sports/cricket/teams"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Countries
          </Link>
        </div>
      </AppShell>
    );
  }

  const teamFormats = formatsForTeam(team.type);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <Link
          href="/sports/cricket/teams"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All Countries
        </Link>

        <PageHeader
          icon={<Flag className="h-5 w-5" />}
          title={`${team.name} Cricket`}
          kicker="SportSphere Cricket"
          subtitle={`${typeLabel[team.type]}. ${team.country && team.country !== team.name ? `${team.country} — ` : ""}matches, players, series and records for this team only.`}
        />

        <div className="mb-8 max-w-xs">
          <p className="label mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Switch country
          </p>
          <CricketCountrySelector teams={allTeams ?? []} currentId={team.id} />
        </div>

        {/* Format cards → country-filtered records */}
        <section className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {teamFormats.map((f) => {
              const def = cricketFormat(f);
              return (
                <Link
                  key={f}
                  href={`/sports/cricket/records?team=${encodeURIComponent(team.name)}&format=${f}&category=batting`}
                  className="group arena-card arena-card-hover p-5"
                >
                  <p className="font-display text-base font-bold text-foreground group-hover:text-foreground-soft">
                    {def.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">{def.description}</p>
                  <p className="mt-3 text-xs font-semibold text-secondary">
                    {team.name} {def.label} records →
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Team-scoped data — only mounted once the team identity is resolved */}
        <TeamSections key={team.id} team={team} />
      </div>
    </AppShell>
  );
}
