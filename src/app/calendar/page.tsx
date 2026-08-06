"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { FixtureList } from "@/components/sports/FixtureList";
import { upcomingFixtures } from "@/data/mock";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = Array.from({ length: 28 }, (_, i) => i + 1);
const today = 5;

const eventsByDay: Record<number, { time: string; title: string; sport: string }[]> = {
  5: [
    { time: "9:00 PM", title: "Man City vs Arsenal", sport: "⚽" },
    { time: "10:30 PM", title: "Lakers vs Warriors", sport: "🏀" },
  ],
  6: [{ time: "7:30 PM", title: "MI vs CSK", sport: "🏏" }],
  7: [{ time: "3:00 PM", title: "F1 Emilia Romagna GP", sport: "🏎️" }],
  12: [{ time: "10:15 PM", title: "El Clásico", sport: "⚽" }],
  15: [{ time: "6:00 PM", title: "Indian Open Final", sport: "🎾" }],
};

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(today);
  const [month] = useState("May 2024");

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<CalendarDays className="h-5 w-5" />}
          title="Sports Calendar"
          subtitle={`${month} — click a day to see matches`}
        />

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <div className="bg-card rounded-xl border border-border p-5 mb-6">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {days.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-muted py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {dates.map((date) => {
                  const hasEvents = eventsByDay[date];
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDay(date)}
                      className={cn(
                        "relative aspect-square rounded-xl border text-sm font-medium transition-all",
                        selectedDay === date
                          ? "bg-primary text-white border-primary"
                          : hasEvents
                          ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                          : "border-border hover:bg-muted/10"
                      )}
                    >
                      {date}
                      {hasEvents && (
                        <span
                          className={cn(
                            "absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                            selectedDay === date ? "bg-white" : "bg-primary"
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold mb-4">
                Matches on May {selectedDay}
              </h3>
              {eventsByDay[selectedDay] ? (
                <div className="space-y-3">
                  {eventsByDay[selectedDay].map((e) => (
                    <div key={e.title} className="flex items-center gap-4 bg-muted/10 rounded-xl p-4">
                      <span className="text-xl">{e.sport}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{e.title}</p>
                      </div>
                      <span className="text-sm text-muted">{e.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No matches scheduled for this day.</p>
              )}
            </div>
          </div>

          <aside className="hidden lg:block w-80 shrink-0">
            <FixtureList fixtures={upcomingFixtures} title="Coming Up" />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
