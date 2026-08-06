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
  goal: "text-emerald-600 dark:text-emerald-400",
  yellow: "text-yellow-500",
  red: "text-rose-600 dark:text-rose-400",
  sub: "text-sky-600 dark:text-sky-400",
  var: "text-violet-600 dark:text-violet-400",
  info: "text-muted",
};

export function MatchTimeline({ events, homeLogo, awayLogo }: MatchTimelineProps) {
  const timeline = [...events].sort((a, b) => {
    const num = (s: string) => parseInt(s.replace(/\D/g, "")) || 0;
    return num(a.minute) - num(b.minute);
  });

  return (
    <div className="relative">
      <div className="absolute left-[22px] top-3 bottom-3 w-px bg-border" />
      <div className="space-y-1">
        {timeline.map((event, i) => (
          <div key={i} className="relative flex items-center gap-3.5 py-2.5 pl-2">
            <div
              className={cn(
                "w-9 h-9 rounded-xl border bg-card flex items-center justify-center z-10 shrink-0 shadow-card",
                event.type === "goal" && "border-emerald-500/30 bg-emerald-500/10"
              )}
            >
              {event.type === "goal" && <span className="text-sm">⚽</span>}
              {event.type === "yellow" && <span className="w-3 h-4 rounded-[2px] bg-yellow-400" />}
              {event.type === "red" && <span className="w-3 h-4 rounded-[2px] bg-rose-500" />}
              {event.type === "sub" && <span className="text-xs">🔄</span>}
              {event.type === "var" && <span className="text-xs">📺</span>}
              {event.type === "info" && <span className="text-xs">ℹ️</span>}
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-semibold", eventStyles[event.type])}>
                {event.player}
                {event.detail && (
                  <span className="text-xs text-muted font-normal"> — {event.detail}</span>
                )}
              </p>
            </div>

            <TeamLogo logo={event.team === "home" ? homeLogo : awayLogo} size="sm" className="shrink-0" />
            <span className="text-xs font-bold text-muted w-10 text-right shrink-0 tabular-nums">
              {event.minute}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
