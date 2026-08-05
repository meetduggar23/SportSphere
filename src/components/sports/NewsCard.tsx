"use client";

import { News } from "@/types";

interface NewsCardProps {
  news: News;
}

const categoryColors: Record<string, string> = {
  FOOTBALL: "bg-blue-100 text-blue-700",
  CRICKET: "bg-green-100 text-green-700",
  F1: "bg-red-100 text-red-700",
  NBA: "bg-orange-100 text-orange-700",
  TENNIS: "bg-yellow-100 text-yellow-700",
};

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-40 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
          <span className="text-4xl">
            {news.sport === "football" ? "⚽" : news.sport === "cricket" ? "🏏" : news.sport === "f1" ? "🏎️" : "🏀"}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[news.category] || "bg-gray-100 text-gray-700"}`}>
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        <p className="text-xs text-muted mt-1.5">{news.timeAgo}</p>
      </div>
    </div>
  );
}
