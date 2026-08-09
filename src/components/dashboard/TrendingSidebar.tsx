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
<div className="overflow-hidden  arena-card">
      <div className="flex items-center justify-between border-b border-border-navy px-6 py-5">
        <h2 className="heading text-lg text-foreground">{title}</h2>
        <Link
          href="/sports"
          className="text-sm font-semibold text-muted-strong transition-colors hover:text-foreground"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-border-navy">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-blue/30"
          >
            <span className="display w-7 shrink-0 text-2xl text-faint tabular-nums">
              {item.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground-soft transition-colors group-hover:text-foreground">
                {item.title}
              </p>
              <p className="meta mt-0.5 truncate">{item.subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex -space-x-1.5">
                {item.logos.map((logo, i) => (
                  <span
                    key={i}
                    className="flex h-6 w-6 items-center justify-center  bg-blue/30 text-xs ring-2 ring-surface-1 rounded-full"
                  >
                    {logo}
                  </span>
                ))}
              </div>
              {item.trend === "up" && <TrendingUp className="h-4 w-4 text-secondary" />}
              {item.trend === "down" && <TrendingDown className="h-4 w-4 text-brand-navy" />}
              {item.trend === "steady" && <Minus className="h-4 w-4 text-muted" />}
            </div>
<ChevronRight className="h-4 w-4 shrink-0 -translate-x-1 text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-foreground" />
          </div>
        ))}
      </div>

      <div className="border-t border-border-navy px-6 py-4">
        <Link
          href="/sports"
          className={cn(
            "block w-full  py-2.5 text-center text-sm font-semibold text-muted-strong transition-colors hover:bg-blue/40 hover:text-foreground"
          )}
        >
          See What&apos;s Trending
        </Link>
      </div>
    </div>
  );
}
