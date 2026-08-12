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
    { time: "9:00 PM", title: "Man City vs Arsenal", sport: "Football" },
    { time: "10:30 PM", title: "Lakers vs Warriors", sport: "Basketball" },
  ],
  6: [{ time: "7:30 PM", title: "MI vs CSK", sport: "Cricket" }],
  7: [{ time: "3:00 PM", title: "F1 Emilia Romagna GP", sport: "Formula 1" }],
  12: [{ time: "10:15 PM", title: "El Clásico", sport: "Football" }],
  15: [{ time: "6:00 PM", title: "IHF World Championship Final", sport: "Handball" }],
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
<div className="arena-card p-5 mb-6">
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
                        "relative aspect-square  border text-sm font-medium transition-all rounded-sm",                        selectedDay === date
                          ? "bg-primary text-navy border-primary"
                          : hasEvents
                          ? "bg-secondary/5 border-secondary/20 hover:bg-secondary/10"
                          : "border-border hover:bg-muted/10"
                      )}
                    >
                      {date}
                      {hasEvents && (
                        <span
                          className={cn(
                            "absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ",                            selectedDay === date ? "bg-navy" : "bg-secondary"
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

<div className="arena-card p-5">
              <h3 className="heading text-lg text-foreground mb-4">
                Matches on May {selectedDay}
              </h3>
              {eventsByDay[selectedDay] ? (
                <div className="space-y-3">
                  {eventsByDay[selectedDay].map((e) => (
                    <div key={e.title} className="flex items-center gap-4 bg-muted/10 p-4 rounded-md">
                      <span className="label shrink-0 text-secondary">{e.sport}</span>
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
