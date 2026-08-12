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
  live: "from-sand to-gold/70 text-navy",
  calendar: "from-sand to-secondary/50 text-navy",
  news: "from-sand to-deep/25 text-navy",
  predictions: "from-sand to-gold/60 text-navy",
};

interface StatsCardProps {
  card: StatsCardType;
}

export function StatsCard({ card }: StatsCardProps) {
  const Icon = iconMap[card.icon];
  // card.color, when provided, must be a complete Tailwind gradient string
  // ("from-x to-y"); otherwise fall back to the icon's default palette.
  const color = card.color || iconColors[card.icon] || "from-sand to-gold/60";

  return (
    <div className="group relative overflow-hidden  arena-card arena-card-hover p-5">
      <div className="absolute -right-10 -top-10 h-28 w-28  bg-secondary/8 blur-2xl transition-colors duration-300 group-hover:bg-secondary/14" />
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "shrink-0  bg-gradient-to-br p-3 text-navy shadow-card",
            color
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
