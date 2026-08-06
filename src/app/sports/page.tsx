"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportIcon } from "@/components/ui/SportIcon";
import { sportsConfig, primarySports, secondarySports } from "@/config/sports";

export default function SportsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Globe className="h-5 w-5" />}
          title="All Sports"
          subtitle="Every sport on the planet, one platform"
        />

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 px-1">
            Primary Sports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {primarySports.map((sport) => (
              <Link
                key={sport.id}
                href={sport.href}
                className={`group relative bg-gradient-to-br ${sport.gradient} bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                aria-label={`${sport.name} - ${sport.description}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card/80 border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <SportIcon sport={sport.id} className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                      {sport.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{sport.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 px-1">
            More Sports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {secondarySports.map((sport) => (
              <Link
                key={sport.id}
                href={sport.href}
                className={`group relative bg-gradient-to-br ${sport.gradient} bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                aria-label={`${sport.name} - ${sport.description}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card/80 border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <SportIcon sport={sport.id} className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                      {sport.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{sport.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
