"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Eye } from "lucide-react";
import { News } from "@/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: News;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const categoryColors: Record<string, string> = {
  FOOTBALL: "bg-primary text-navy",
  CRICKET: "bg-primary text-navy",
  F1: "bg-primary text-navy",
  NBA: "bg-primary text-navy",
  TRANSFERS: "bg-primary text-navy",
};

function CategoryChip({ category }: { category: string }) {
  const c = categoryColors[category] ?? "bg-primary text-navy";
  return (
    <span
      className={`inline-flex items-center  px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${c}`}
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
        "group block overflow-hidden  arena-card arena-card-hover",
        variant === "compact" && "flex gap-4 p-3.5",
        className
      )}
    >
      {variant === "featured" ? (
        <>
          <div className="relative h-72 md:h-80 overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            {news.isBreaking && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5  bg-primary px-3 py-1 text-[10px] font-bold text-navy shadow-glow rounded-full">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full  bg-navy animate-ping-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5  bg-navy" />
                </span>
                BREAKING
              </span>
            )}
<div className="absolute inset-x-0 bottom-0 p-5">
              <div className="mb-2.5 flex items-center gap-2">
                <CategoryChip category={news.category} />
              </div>
              <h3 className="heading text-xl text-white md:text-2xl line-clamp-2">
                {news.title}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-xs text-white/75">
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
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
            {news.isBreaking && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5  bg-primary px-2.5 py-1 text-[10px] font-bold text-navy rounded-full">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full  bg-navy animate-ping-ring" />
                  <span className="relative inline-flex h-1 w-1  bg-navy" />
                </span>
                BREAKING
              </span>
            )}
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <CategoryChip category={news.category} />
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
          <div className="relative h-20 w-28 shrink-0 overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              sizes="112px"
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
