"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { PlayerStats } from "@/sports/cricket/components/PlayerStats";
import { RecordsUnavailable } from "@/sports/cricket/components/RecordsUnavailable";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import type { CricketPlayer } from "@/sports/cricket/types/cricketTypes";
import type { PlayerStatsResult } from "@/sports/cricket/services/cricketStats";

interface CricketPlayerProfileProps {
  player: CricketPlayer;
  stats: PlayerStatsResult[];
  /** Provenance for the recent-matches unavailable block. */
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string | null;
}

/** Player profile — bio (only provider-supplied fields) + career statistics. */
export function CricketPlayerProfile({
  player,
  stats,
  source,
  sourceUrl,
  lastUpdated,
}: CricketPlayerProfileProps) {
  const bioRows = (
    [
      player.country && { label: "Country", value: player.country },
      player.role && { label: "Role", value: player.role },
      player.age != null && { label: "Age", value: String(player.age) },
      player.dateOfBirth && { label: "Born", value: new Date(player.dateOfBirth).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) },
      player.placeOfBirth && { label: "Place of birth", value: player.placeOfBirth },
      player.battingStyle && { label: "Batting style", value: player.battingStyle },
      player.bowlingStyle && { label: "Bowling style", value: player.bowlingStyle },
    ] as ({ label: string; value: string } | false | null)[]
  ).filter((r): r is { label: string; value: string } => Boolean(r && r.value));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Bio card */}
        <div className="bg-score-surface border border-score-border overflow-hidden">
          <div className="relative flex h-56 items-center justify-center bg-score-elevated/40">
            {player.photo ? (
              <Image
                src={player.photo}
                alt={player.name}
                fill
                sizes="280px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center bg-score-elevated text-2xl font-bold text-score-muted rounded-md">
                {player.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="border-t border-score-border p-5">
            <p className="font-display text-lg font-bold text-score-text">{player.name}</p>
            {player.fullName && player.fullName !== player.name && (
              <p className="meta mt-0.5 text-score-muted">{player.fullName}</p>
            )}
            {bioRows.length > 0 && (
              <dl className="mt-4 space-y-2">
                {bioRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3">
                    <dt className="label text-xs text-score-muted">{row.label}</dt>
                    <dd className="text-right text-xs font-semibold text-score-text">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {player.alternateNames && player.alternateNames.length > 0 && (
              <p className="meta mt-4 text-xs text-score-muted">
                Also known as: {player.alternateNames.join(", ")}
              </p>
            )}
            {player.teams && player.teams.length > 0 && (
              <p className="meta mt-4 text-xs text-score-muted">
                Teams: {player.teams.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Real career stats */}
        <div>
          <PlayerStats results={stats} />
        </div>
      </div>

      <section>
        <h2 className="heading mb-3 text-lg text-score-text">
          <User className="mr-2 inline h-4 w-4 text-score-accent" />
          Recent Matches & Form
        </h2>
        <RecordsUnavailable
          title="Recent match history unavailable"
          message="Match-by-match history is not provided by the connected provider (CricketData.org). Career statistics above come directly from the provider's player database."
          source={source}
          sourceUrl={sourceUrl}
          lastUpdated={lastUpdated}
        />
      </section>

      <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
    </div>
  );
}
