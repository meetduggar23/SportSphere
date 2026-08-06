"use client";

import { TrendingItem } from "@/types";
import Link from "next/link";
import { TrendingDown, TrendingUp, Minus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingSidebarProps {
  items: TrendingItem[];
  title?: string;
}

export function TrendingSidebar({ items, title = "Trending Now" }: TrendingSidebarProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
        <Link
          href="/sports"
          className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            className="group px-6 py-4 hover:bg-card-hover transition-colors cursor-pointer flex items-center gap-4"
          >
            <span className="font-display text-2xl font-bold text-muted/40 w-7 shrink-0 tabular-nums">
              {item.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-muted mt-0.5 truncate">{item.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex -space-x-1.5">
                {item.logos.map((logo, i) => (
                  <span
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/10 ring-2 ring-card text-xs"
                  >
                    {logo}
                  </span>
                ))}
              </div>
              {item.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
              {item.trend === "down" && <TrendingDown className="h-4 w-4 text-rose-500" />}
              {item.trend === "steady" && <Minus className="h-4 w-4 text-muted" />}
            </div>
            <ChevronRight className="h-4 w-4 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-border">
        <Link
          href="/sports"
          className={cn(
            "block w-full text-center text-sm font-semibold text-primary hover:bg-primary/10 py-2.5 rounded-xl transition-colors"
          )}
        >
          See What&apos;s Trending
        </Link>
      </div>
    </div>
  );
}
