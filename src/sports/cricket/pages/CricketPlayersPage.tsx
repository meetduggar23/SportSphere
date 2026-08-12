"use client";

import { Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { CricketPlayerSearch } from "@/sports/cricket/components/CricketPlayerSearch";

/**
 * Cricket player directory — CricketData.org-backed, debounced search across
 * every country the provider returns, with a client-side country filter and
 * load-more pagination. No India default, no fabricated data.
 */
export function CricketPlayersPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Cricket Players"
          kicker="SportSphere Cricket"
          subtitle="Search player profiles and career statistics — every country CricketData.org provides."
        />

        <CricketPlayerSearch view="grid" />
      </div>
    </AppShell>
  );
}
