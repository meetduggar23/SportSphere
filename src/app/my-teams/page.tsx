"use client";

import { Users, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { teams } from "@/data/mock";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { sportLabels, Sport } from "@/types";

export default function MyTeamsPage() {
  const teamEntries = Object.values(teams);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="My Teams"
          subtitle="Manage the teams you follow"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamEntries.map((team) => (
            <div key={team.id} className="bg-card  border border-border p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <TeamLogo logo={team.logo} name={team.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{team.name}</p>
                  <p className="text-xs text-muted">{sportLabels[team.sport as Sport]}</p>
                </div>
<button className="text-xs font-semibold px-3 py-1.5  bg-primary text-navy hover:bg-primary-hover transition-colors rounded-md">
                  ✓
                </button>
              </div>
            </div>
          ))}

          <button className="bg-card  border border-dashed border-border p-5 hover:border-secondary hover:bg-secondary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted hover:text-secondary min-h-[96px]">
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Add More Teams</span>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
