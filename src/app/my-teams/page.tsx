"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Plus, Check } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { teams } from "@/data/mock";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { sportLabels, Sport } from "@/types";
import { cn } from "@/lib/utils";

export default function MyTeamsPage() {
  const teamEntries = Object.values(teams);
  const [followed, setFollowed] = useState<Set<string>>(
    () => new Set(teamEntries.map((t) => t.id))
  );

  const toggle = (id: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visible = teamEntries.filter((t) => followed.has(t.id));
  const suggested = teamEntries.filter((t) => !followed.has(t.id)).slice(0, 3);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="My Teams"
          subtitle={`${visible.length} teams you follow`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((team) => (
            <div key={team.id} className="bg-card  border border-border p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <TeamLogo logo={team.logo} name={team.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{team.name}</p>
                  <p className="text-xs text-muted">{sportLabels[team.sport as Sport]}</p>
                </div>
                <button
                  onClick={() => toggle(team.id)}
                  aria-label={`Unfollow ${team.name}`}
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5  bg-primary text-navy hover:bg-primary-hover transition-colors rounded-md"
                >
                  <Check className="h-3.5 w-3.5" /> Following
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/teams"
            className="bg-card  border border-dashed border-border p-5 hover:border-secondary hover:bg-secondary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted hover:text-secondary min-h-[96px]"
          >
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Add More Teams</span>
          </Link>
        </div>

        {suggested.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Not following</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggested.map((team) => (
                <button
                  key={team.id}
                  onClick={() => toggle(team.id)}
                  className={cn(
                    "flex items-center gap-4 bg-card border border-border p-5 text-left hover:shadow-lg transition-all"
                  )}
                >
                  <TeamLogo logo={team.logo} name={team.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{team.name}</p>
                    <p className="text-xs text-muted">{sportLabels[team.sport as Sport]}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1.5  bg-secondary/10 text-secondary rounded-md">
                    Follow
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
