"use client";

import { TrendingItem } from "@/types";
import Link from "next/link";

interface TrendingSidebarProps {
  items: TrendingItem[];
}

export function TrendingSidebar({ items }: TrendingSidebarProps) {
  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Trending Now</h2>
          <Link href="/trending" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="p-3 hover:bg-muted/5 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-lg font-bold text-muted w-5">{item.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted mt-0.5">{item.subtitle}</p>
              </div>
              <div className="flex -space-x-1">
                {item.logos.map((logo, i) => (
                  <span key={i} className="text-lg">{logo}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
