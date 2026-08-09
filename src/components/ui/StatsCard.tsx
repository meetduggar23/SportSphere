"use client";

import { Radio, Calendar, Newspaper, Sparkles } from "lucide-react";
import { StatsCard as StatsCardType } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  live: Radio,
  calendar: Calendar,
  news: Newspaper,
  predictions: Sparkles,
};

const iconColors: Record<string, string> = {
  live: "from-brand to-brand-maroon",
  calendar: "from-brand-maroon to-brand-purple",
  news: "from-brand-purple to-brand-navy",
  predictions: "from-brand-navy to-brand",
};

interface StatsCardProps {
  card: StatsCardType;
}

export function StatsCard({ card }: StatsCardProps) {
  const Icon = iconMap[card.icon];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover:shadow-pop hover:-translate-y-0.5 transition-all duration-300">
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-3 rounded-xl bg-gradient-to-br text-white shadow-card shrink-0",
            iconColors[card.icon] ?? "from-primary to-brand-maroon"
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted">{card.label}</p>
          <p className="font-display text-3xl font-bold tracking-tight mt-1 tabular-nums">
            {card.value}
          </p>
          <p className="text-xs text-muted mt-1">{card.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
