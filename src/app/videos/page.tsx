"use client";

import { useState } from "react";
import { Video, Play, Eye, Clock } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { videos } from "@/data/mock";
import { sportIcons } from "@/types";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "All Videos", value: "all" },
  { label: "Highlights", value: "Highlights" },
  { label: "Game Recaps", value: "Game Recaps" },
  { label: "Onboard", value: "Onboard" },
];

export default function VideosPage() {
  const [active, setActive] = useState("all");
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = active === "all" ? videos : videos.filter((v) => v.category === active);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Video className="h-5 w-5" />}
          title="Videos"
          subtitle="Official highlights, recaps, and onboard footage"
        />

        <SportTabs tabs={tabs} active={active} onChange={setActive} className="mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => setPlaying(playing === video.id ? null : video.id)}
            >
              <div className="relative aspect-video bg-gradient-to-br from-muted/30 to-muted/50 overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-all",
                      playing === video.id ? "scale-90 opacity-0" : "group-hover:scale-110"
                    )}
                  >
                    <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 text-xs font-bold bg-black/70 text-white px-2 py-0.5 rounded">
                  {video.duration}
                </span>
                <span className="absolute top-3 left-3 text-lg">{sportIcons[video.sport]}</span>
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-white">
                  {video.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {video.views}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
