"use client";

import { TimelineEvent } from "@/types";
import { cn } from "@/lib/utils";
import { TeamLogo } from "@/components/ui/TeamLogo";

interface MatchTimelineProps {
  events: TimelineEvent[];
  homeLogo: string;
  awayLogo: string;
}

const eventStyles: Record<string, string> = {
  goal: "text-green-600 dark:text-green-400",
  yellow: "text-yellow-500",
  red: "text-red-600 dark:text-red-400",
  sub: "text-blue-600 dark:text-blue-400",
  var: "text-purple-600 dark:text-purple-400",
  info: "text-muted",
};

export function MatchTimeline({ events, homeLogo, awayLogo }: MatchTimelineProps) {
  const timeline = [...events].sort((a, b) => {
    const num = (s: string) => parseInt(s.replace(/\D/g, "")) || 0;
    return num(a.minute) - num(b.minute);
  });

  return (
    <div className="relative">
      <div className="absolute left-[22px] top-2 bottom-2 w-px bg-border" />
      <div className="space-y-1">
        {timeline.map((event, i) => (
          <div key={i} className="relative flex items-center gap-3 py-2 pl-2">
            <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center z-10 shrink-0">
              {event.type === "goal" && <span className="text-sm">⚽</span>}
              {event.type === "yellow" && <span className="w-3 h-4 rounded-[2px] bg-yellow-400" />}
              {event.type === "red" && <span className="w-3 h-4 rounded-[2px] bg-red-500" />}
              {event.type === "sub" && <span className="text-xs">🔄</span>}
              {event.type === "var" && <span className="text-xs">📺</span>}
              {event.type === "info" && <span className="text-xs">ℹ️</span>}
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-semibold", eventStyles[event.type])}>
                {event.player}
                {event.detail && <span className="text-xs text-muted font-normal"> — {event.detail}</span>}
              </p>
            </div>

            <TeamLogo
              logo={event.team === "home" ? homeLogo : awayLogo}
              size="sm"
              className="shrink-0"
            />
            <span className="text-xs font-bold text-muted w-10 text-right shrink-0">
              {event.minute}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
