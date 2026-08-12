"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { DataStatus } from "@/components/ui/DataStatus";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTeams } from "@/lib/api";
import { Team } from "@/types";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const [result] = await Promise.all([
      getTeams("39", "2024")
        .then((data): { ok: true; data: Team[] } => ({ ok: true, data }))
        .catch((e: unknown): { ok: false; data: Team[]; error: string } => ({
          ok: false,
          data: [],
          error: e instanceof Error ? e.message : "Unknown error",
        })),
    ]);
    if (!mounted.current) return;
    setTeams(result.data);
    setError(result.ok ? undefined : result.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent  animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading teams...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Teams"
          subtitle={error ? "Premier League clubs" : `${teams.length} clubs from the Premier League`}
        />

        {error && (
          <DataStatus
            status="unavailable"
            dataSource="API-Football"
            lastUpdated={null}
            error={error}
            onRetry={() => {
              setLoading(true);
              setError(undefined);
              void load();
            }}
          />
        )}

        {!error && teams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/team/${team.id}`}
                className="arena-card arena-card-hover p-5 group"
              >
                <div className="flex items-center gap-4">
                  <TeamLogo logo={team.logo} name={team.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate group-hover:text-foreground transition-colors">{team.name}</p>
                    <p className="text-xs text-muted">Football</p>
                    {team.country && <p className="text-xs text-muted mt-0.5">{team.country}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
