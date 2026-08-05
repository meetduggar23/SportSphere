"use client";

import { TrendingItem } from "@/types";
import Link from "next/link";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingSidebarProps {
  items: TrendingItem[];
  title?: string;
}

export function TrendingSidebar({ items, title = "Trending Now" }: TrendingSidebarProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <Link href="/trending" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
            View All
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 hover:bg-muted/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-bold text-muted w-5 shrink-0">{item.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-muted mt-0.5 truncate">{item.subtitle}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex -space-x-1">
                  {item.logos.map((logo, i) => (
                    <span key={i} className="text-base">{logo}</span>
                  ))}
                </div>
                {item.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-green-500" />}
                {item.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                {item.trend === "steady" && <Minus className="h-3.5 w-3.5 text-muted" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={cn("p-3 border-t border-border")}>
        <Link
          href="/trending"
          className="block w-full text-center text-sm font-medium text-primary hover:bg-primary/10 py-2 rounded-lg transition-colors"
        >
          See What&apos;s Trending
        </Link>
      </div>
    </div>
  );
}
