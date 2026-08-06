"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "⚽ Football", value: "football" },
  { label: "🏏 Cricket", value: "cricket" },
  { label: "🏀 Basketball", value: "basketball" },
  { label: "🏎️ F1", value: "f1" },
];

const footballStats = [
  { label: "Goals Scored", value: 74, suffix: "goals", icon: "⚽" },
  { label: "Goals Conceded", value: 23, suffix: "goals", icon: "🛡️" },
  { label: "Possession Avg", value: 61, suffix: "%", icon: "🔁" },
  { label: "Pass Accuracy", value: 89, suffix: "%", icon: "📮" },
  { label: "Clean Sheets", value: 17, suffix: "", icon: "🧤" },
  { label: "xG Created", value: 67.4, suffix: "", icon: "🎯" },
];

const cricketStats = [
  { label: "Runs Scored", value: 5120, suffix: "runs", icon: "🏏" },
  { label: "Wickets Taken", value: 168, suffix: "", icon: "🎳" },
  { label: "Batting Average", value: 38.2, suffix: "", icon: "📊" },
  { label: "Best Bowling", value: "6/32", suffix: "", icon: "🌟" },
  { label: "Strike Rate", value: 142.5, suffix: "", icon: "⚡" },
  { label: "Centuries", value: 9, suffix: "", icon: "💯" },
];

const monthlyData = [
  { month: "Aug", value: 8 },
  { month: "Sep", value: 12 },
  { month: "Oct", value: 10 },
  { month: "Nov", value: 16 },
  { month: "Dec", value: 14 },
  { month: "Jan", value: 18 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 21 },
  { month: "Apr", value: 19 },
];

export default function StatisticsPage() {
  const [sport, setSport] = useState("football");
  const stats = sport === "cricket" ? cricketStats : footballStats;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<BarChart3 className="h-5 w-5" />}
          title="Statistics"
          subtitle="Interactive charts and stats across every sport"
        />

        <SportTabs tabs={tabs} active={sport} onChange={setSport} className="mb-6" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all">
              <p className="text-2xl">{s.icon}</p>
              <p className="text-2xl font-extrabold mt-2">
                {s.value}
                {s.suffix && <span className="text-sm text-muted font-medium"> {s.suffix}</span>}
              </p>
              <p className="text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-bold mb-4">Season Performance Trend</h3>
            <div className="flex items-end justify-between gap-2 h-52">
              {monthlyData.map((m) => (
                <div key={m.month} className="flex flex-col items-center flex-1 gap-2">
                  <span className="text-xs font-bold text-muted">{m.value}</span>
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-primary/50 to-primary hover:from-primary/70 transition-all"
                    style={{ height: `${m.value * 5}px` }}
                  />
                  <span className="text-xs text-muted">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-bold mb-4">Key Metrics Comparison</h3>
            <div className="space-y-4">
              {[
                { label: "Home Performance", value: 82, color: "from-blue-500 to-blue-400" },
                { label: "Away Performance", value: 65, color: "from-purple-500 to-purple-400" },
                { label: "First Half Goals", value: 58, color: "from-green-500 to-green-400" },
                { label: "Second Half Goals", value: 74, color: "from-orange-500 to-orange-400" },
                { label: "Set Piece Goals", value: 31, color: "from-red-500 to-red-400" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted">{m.label}</span>
                    <span className="font-bold">{m.value}%</span>
                  </div>
                  <div className="h-2.5 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full bg-gradient-to-r transition-all", m.color)}
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
