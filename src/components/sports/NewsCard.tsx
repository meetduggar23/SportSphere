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

const categoryColors: Record<string, string> = {
  FOOTBALL: "bg-blue/50 text-muted-strong",
  CRICKET: "bg-blue/50 text-muted-strong",
  F1: "bg-blue/50 text-muted-strong",
  NBA: "bg-blue/50 text-muted-strong",
  TRANSFERS: "bg-blue/50 text-muted-strong",
};

function CategoryChip({ category }: { category: string }) {
  const c = categoryColors[category] ?? "bg-blue/50 text-muted-strong";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${c}`}
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
        "group block overflow-hidden rounded-3xl arena-card arena-card-hover",
        variant === "compact" && "flex gap-4 p-3.5",
        className
      )}
    >
      {variant === "featured" ? (
        <>
          <div className="relative h-72 md:h-80 overflow-hidden">
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            {news.isBreaking && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-berry shadow-glow">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-berry" />
                </span>
                BREAKING
              </span>
            )}
<div className="absolute inset-x-0 bottom-0 p-5">
              <div className="mb-2.5 flex items-center gap-2">
                <CategoryChip category={news.category} />
                <span className="text-muted">{sportIcons[news.sport]}</span>
              </div>
              <h3 className="heading text-xl text-foreground md:text-2xl line-clamp-2">
                {news.title}
              </h3>
              <div className="mt-3 flex items-center gap-4 meta">
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
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
            {news.isBreaking && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-berry">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-berry" />
                </span>
                BREAKING
              </span>
            )}
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <CategoryChip category={news.category} />
              <span className="text-sm text-muted">{sportIcons[news.sport]}</span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-[15px] font-bold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-foreground-soft">
              {news.title}
            </h3>
            <p className="meta mt-2 flex items-center justify-between">
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
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl">
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
<div className="min-w-0 flex-1">
            <CategoryChip category={news.category} />
            <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground-soft">
              {news.title}
            </h3>
            <p className="meta mt-1.5 inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {news.timeAgo}
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
