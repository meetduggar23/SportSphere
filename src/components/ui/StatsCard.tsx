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
  live: "from-sand to-gold/70 text-berry",
  calendar: "from-sand to-secondary/50 text-berry",
  news: "from-sand to-deep/25 text-berry",
  predictions: "from-sand to-gold/60 text-berry",
};

interface StatsCardProps {
  card: StatsCardType;
}

export function StatsCard({ card }: StatsCardProps) {
  const Icon = iconMap[card.icon];

  return (
    <div className="group relative overflow-hidden rounded-3xl arena-card arena-card-hover p-5">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-secondary/8 blur-2xl transition-colors duration-300 group-hover:bg-secondary/14" />
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "shrink-0 rounded-2xl bg-gradient-to-br p-3 text-berry shadow-card",
            iconColors[card.icon] ?? "from-sand to-gold/60"
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <p className="meta">{card.label}</p>
          <p className="display mt-1 text-3xl tabular-nums">{card.value}</p>
          <p className="meta mt-1">{card.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
