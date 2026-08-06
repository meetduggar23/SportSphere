"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { teams } from "@/data/mock";
import { sportLabels, Sport } from "@/types";

const teamEntries = Object.values(teams);

export default function TeamsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Teams"
          subtitle="Explore clubs and national teams from every sport"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamEntries.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.id}`}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <TeamLogo logo={team.logo} name={team.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate group-hover:text-primary transition-colors">{team.name}</p>
                  <p className="text-xs text-muted">{sportLabels[team.sport as Sport]}</p>
                  <p className="text-xs text-muted mt-0.5">🌍 {team.country}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-xs text-muted">
                <span>{team.stadium ?? "National Team"}</span>
                {team.founded && <span>Founded {team.founded}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
