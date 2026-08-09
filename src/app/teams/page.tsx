"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { useEffect, useState } from "react";
import { getTeams } from "@/lib/api";
import { Team } from "@/types";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTeams("39", "2025");
        setTeams(data);
      } catch (e) {
        console.error("Failed to load teams:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Teams"
          subtitle={`${teams.length} clubs from top leagues`}
        />

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
                  <p className="text-xs text-muted">⚽ Football</p>
                  {team.country && <p className="text-xs text-muted mt-0.5">🌍 {team.country}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
