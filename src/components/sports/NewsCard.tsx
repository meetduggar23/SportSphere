"use client";

import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { News, sportIcons } from "@/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: News;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const categoryColors: Record<string, { bg: string; color: string }> = {
  FOOTBALL: { bg: "rgba(34,197,94,0.16)", color: "#4ade80" },
  CRICKET: { bg: "rgba(59,130,246,0.16)", color: "#60a5fa" },
  F1: { bg: "rgba(239,68,68,0.16)", color: "#f87171" },
  NBA: { bg: "rgba(168,85,247,0.16)", color: "#c084fc" },
  TRANSFERS: { bg: "rgba(249,115,22,0.16)", color: "#fb923c" },
};

function CategoryChip({ category }: { category: string }) {
  const c = categoryColors[category] ?? { bg: "rgba(148,163,184,0.16)", color: "#94a3b8" };
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      {category}
    </span>
  );
}

export function NewsCard({ news, variant = "default", className }: NewsCardProps) {
  return (
    <Link
      href={`/news/${news.id}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop",
        variant === "compact" && "flex gap-4 p-3.5",
        className
      )}
    >
      {variant === "featured" ? (
        <>
          <div className="relative h-64 md:h-72 overflow-hidden">
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            {news.isBreaking && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold text-white">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-ping-dot" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                BREAKING
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <CategoryChip category={news.category} />
                <span className="text-white/80">{sportIcons[news.sport]}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-snug text-white line-clamp-2 group-hover:text-orange-300 transition-colors">
                {news.title}
              </h3>
              <div className="flex items-center gap-4 mt-3 text-xs text-white/70">
                {news.author && <span>{news.author}</span>}
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {news.timeAgo}
                </span>
                {news.views && (
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {news.views}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : variant === "default" ? (
        <>
          <div className="relative h-44 overflow-hidden">
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            {news.isBreaking && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-ping-dot" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-white" />
                </span>
                BREAKING
              </span>
            )}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <CategoryChip category={news.category} />
              <span className="text-sm text-white/90">{sportIcons[news.sport]}</span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <p className="text-sm text-muted mt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {news.timeAgo}
              </span>
              {news.views && (
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {news.views}
                </span>
              )}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="min-w-0 flex-1">
            <CategoryChip category={news.category} />
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mt-1.5">
              {news.title}
            </h3>
            <p className="text-xs text-muted mt-1.5 inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {news.timeAgo}
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
