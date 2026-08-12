"use client";

import Link from "next/link";
import { ArrowRight, MapPin, CalendarDays } from "lucide-react";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { matchHref } from "@/lib/utils";
import { Match, sportShortLabels } from "@/types";
import { uniqueMeta } from "@/components/sports/MatchMeta";

interface FeaturedEventProps {
  match: Match;
}

export function FeaturedEvent({ match }: FeaturedEventProps) {
  const isLive = match.status === "live";
  const meta = uniqueMeta([match.competition, match.league]);

  return (
    <section className="relative overflow-hidden border border-score-border bg-gradient-to-br from-score-bg via-score-bg to-score-surface rounded-lg">
      {/* Subtle tonal depth — dark surface with a faint accent wash, no glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--sport-accent) 12%, transparent), transparent 62%)",
        }}
      />

      <div className="relative px-5 py-6 md:px-10 md:py-8">
        {/* Eyebrow — SPORT · competition · live status */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
          <span className="kicker text-score-muted">{sportShortLabels[match.sport]}</span>
          {meta.length > 0 && (
            <>
              <span className="h-1 w-1 bg-score-border" />
              <span className="kicker text-score-muted">{meta.join(" · ")}</span>
            </>
          )}
          {isLive && (
            <>
              <span className="h-1 w-1 bg-score-border" />
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-score-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full bg-score-accent animate-ping-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5 bg-score-accent" />
                </span>
                Live {match.minute}
              </span>
            </>
          )}
        </div>

        {/* Broadcast scoreboard — teams + score, no nested cards */}
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
          <div className="flex flex-1 flex-col items-center gap-2">
            <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="xl" />
            <p className="heading text-lg text-score-text md:text-xl">{match.homeTeam.name}</p>
          </div>

          {/* Score — dominant, clean, cream on dark */}
          <div className="flex shrink-0 flex-col items-center gap-1.5">
            <div className="display flex items-center gap-2.5 text-5xl text-score-text tabular-nums md:text-6xl">
              <span className="animate-score-pop">{match.homeScore}</span>
              <span className="text-2xl text-score-muted md:text-3xl">:</span>
              <span className="animate-score-pop">{match.awayScore}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-score-muted">
              {match.venue && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {match.venue}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> {match.date ?? match.minute}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="xl" />
            <p className="heading text-lg text-score-text md:text-xl">{match.awayTeam.name}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href={matchHref(match)}
            className="group inline-flex items-center gap-2 bg-primary px-6 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-primary-hover rounded-md"
          >
            Match Centre
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/ai-insights"
            className="inline-flex items-center gap-2 border border-score-border bg-score-elevated/60 px-6 py-2.5 text-sm font-semibold text-score-muted transition-colors hover:bg-score-elevated hover:text-score-text rounded-md"
          >
            AI Live Insight
          </Link>
        </div>
      </div>
    </section>
  );
}
