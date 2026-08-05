"use client";

import Image from "next/image";
import Link from "next/link";
import { News, sportIcons } from "@/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: News;
  variant?: "default" | "compact";
  className?: string;
}

const categoryColors: Record<string, string> = {
  FOOTBALL: "bg-blue-500/90",
  CRICKET: "bg-green-500/90",
  F1: "bg-red-500/90",
  NBA: "bg-orange-500/90",
  TENNIS: "bg-yellow-500/90",
  TRANSFERS: "bg-purple-500/90",
};

export function NewsCard({ news, variant = "default", className }: NewsCardProps) {
  return (
    <Link
      href={`/news/${news.id}`}
      className={cn(
        "bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group block",
        variant === "compact" && "flex gap-3 p-3",
        className
      )}
    >
      {variant === "default" ? (
        <>
          <div className="relative h-40 overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {news.isBreaking && (
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white animate-pulse-live">
                BREAKING
              </span>
            )}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full text-white", categoryColors[news.category] ?? "bg-slate-500/90")}>
                {news.category}
              </span>
              <span className="text-xs text-white/90">{sportIcons[news.sport]}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <p className="text-xs text-muted mt-2 flex items-center justify-between">
              <span>{news.timeAgo}</span>
              {news.views && <span>{news.views} views</span>}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0">
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white", categoryColors[news.category] ?? "bg-slate-500/90")}>
              {news.category}
            </span>
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mt-1">
              {news.title}
            </h3>
            <p className="text-xs text-muted mt-1">{news.timeAgo}</p>
          </div>
        </>
      )}
    </Link>
  );
}
