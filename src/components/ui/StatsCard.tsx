"use client";

import { Radio, Calendar, Newspaper, Sparkles } from "lucide-react";
import { StatsCard as StatsCardType } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  live: Radio,
  calendar: Calendar,
  news: Newspaper,
  predictions: Sparkles,
};

interface StatsCardProps {
  card: StatsCardType;
}

export function StatsCard({ card }: StatsCardProps) {
  const Icon = iconMap[card.icon];

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-lg ${card.color}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div>
          <p className="text-sm text-muted">{card.label}</p>
          <p className="text-2xl font-bold mt-0.5">{card.value}</p>
          <p className="text-xs text-muted mt-0.5">{card.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
