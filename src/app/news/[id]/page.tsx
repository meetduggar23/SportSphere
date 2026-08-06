"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Bookmark, MessageCircle, Eye, ThumbsUp } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { topNews } from "@/data/mock";
import { NewsCard } from "@/components/sports/NewsCard";
import { cn } from "@/lib/utils";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const news = topNews.find((n) => n.id === id) ?? topNews[0];
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const related = topNews.filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>

        <article className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary text-white">
                {news.category}
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-white mt-3 leading-snug">
                {news.title}
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between pb-5 border-b border-border mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {news.author?.[0] ?? "S"}
                </div>
                <div>
                  <p className="text-sm font-semibold">{news.author ?? "SportSphere Desk"}</p>
                  <p className="text-xs text-muted">
                    {news.timeAgo} • {news.views ?? "1.2M"} views
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={cn(
                    "p-2.5 rounded-lg border transition-colors",
                    liked ? "bg-primary text-white border-primary" : "border-border hover:bg-muted/10"
                  )}
                  aria-label="Like"
                >
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={cn(
                    "p-2.5 rounded-lg border transition-colors",
                    bookmarked ? "bg-primary text-white border-primary" : "border-border hover:bg-muted/10"
                  )}
                  aria-label="Bookmark"
                >
                  <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
                </button>
                <button className="p-2.5 rounded-lg border border-border hover:bg-muted/10 transition-colors" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
              <p>
                In a night that will be remembered for generations, {news.title.toLowerCase()} delivered
                drama, skill, and moments of pure sporting brilliance. The atmosphere was electric from
                the first whistle, with both sides trading early chances.
              </p>
              <p>
                The breakthrough came against the run of play, stunning the home crowd into silence.
                However, the response was immediate and emphatic, as the match swung back and forth
                in a second half filled with end-to-end action.
              </p>
              <p>
                Post-match analysis from SportSphere AI highlighted the tactical battle in midfield
                as the deciding factor. Expected goals data showed a remarkably open game, with
                combined xG exceeding 4.5.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted my-6">
                &quot;This is why we love this sport. Moments like these transcend the game itself.&quot;
              </blockquote>
              <p>
                The result has significant implications for the season ahead, reshaping the
                narrative around both teams as they head into a crucial stretch of fixtures.
                Fans can expect more drama in the weeks to come.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-border flex items-center justify-between text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" /> 2.4K Comments
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" /> {news.views ?? "1.2M"} Reads
              </span>
            </div>
          </div>
        </article>

        <div className="mt-10">
          <h2 className="font-bold text-lg mb-4">Related News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((n) => (
              <NewsCard key={n.id} news={n} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
