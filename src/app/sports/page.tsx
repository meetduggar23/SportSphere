"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportIcon } from "@/components/ui/SportIcon";
import { primarySports, secondarySports } from "@/config/sports";

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
                className="group arena-card overflow-hidden p-5 focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label={`${sport.name} - ${sport.description}`}
              >
                <div className="absolute -top-10 -right-10 h-28 w-28  bg-secondary/8 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12  bg-blue/25 ring-1 ring-border-navy flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 rounded-md">
                    <SportIcon sport={sport.id} className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-base group-hover:text-foreground transition-colors">
                      {sport.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{sport.description}</p>
                  </div>
                  <span className="text-muted/40 transition-transform duration-300 group-hover:translate-x-1">→</span>
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
                className="group arena-card overflow-hidden p-5 focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label={`${sport.name} - ${sport.description}`}
              >
                <div className="absolute -top-10 -right-10 h-28 w-28  bg-secondary/8 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12  bg-blue/25 ring-1 ring-border-navy flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 rounded-md">
                    <SportIcon sport={sport.id} className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-base group-hover:text-foreground transition-colors">
                      {sport.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{sport.description}</p>
                  </div>
                  <span className="text-muted/40 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
