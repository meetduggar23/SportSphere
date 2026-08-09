"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Newspaper,
  Video,
  Database,
  Activity,
  FileWarning,
  Settings,
  Trophy,
  BarChart3,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

const adminNav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Analytics", icon: BarChart3 },
  { label: "Manage Sports", icon: Trophy },
  { label: "Manage Matches", icon: Activity },
  { label: "Manage News", icon: Newspaper },
  { label: "Manage Videos", icon: Video },
  { label: "Manage Users", icon: Users },
  { label: "Roles & Permissions", icon: ShieldCheck },
  { label: "API Monitoring", icon: Database },
  { label: "Error Logs", icon: FileWarning },
  { label: "Settings", icon: Settings },
];

const adminStats = [
  { label: "Total Users", value: "128,450", change: "+12%", icon: Users, color: "text-blue-500" },
  { label: "Active Matches", value: "24", change: "+3", icon: Activity, color: "text-green-500" },
  { label: "API Uptime", value: "99.98%", change: "Stable", icon: Database, color: "text-purple-500" },
  { label: "Error Rate", value: "0.02%", change: "-0.1%", icon: FileWarning, color: "text-red-500" },
];

const recentUsers = [
  { name: "Rahul Sharma", email: "rahul@example.com", role: "User", status: "Active", date: "2m ago" },
  { name: "Emma Wilson", email: "emma@example.com", role: "Moderator", status: "Active", date: "15m ago" },
  { name: "Carlos Mendez", email: "carlos@example.com", role: "User", status: "Suspended", date: "1h ago" },
  { name: "Ankit Verma", email: "ankit@example.com", role: "Admin", status: "Active", date: "3h ago" },
];

const recentErrors = [
  { level: "ERROR", message: "Failed to fetch live scores from provider API", time: "5m ago" },
  { level: "WARN", message: "Redis cache miss ratio above threshold", time: "12m ago" },
  { level: "ERROR", message: "Rate limit exceeded for news API", time: "28m ago" },
  { level: "INFO", message: "Deployment v2.4.1 completed successfully", time: "1h ago" },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<LayoutDashboard className="h-5 w-5" />}
          title="Admin Panel"
          subtitle="Platform management, analytics, and monitoring"
        />

        <div className="flex gap-6">
          <aside className="hidden lg:block w-60 shrink-0">
            <nav className="space-y-0.5 bg-card rounded-xl border border-border p-2">
              {adminNav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left",
                    activeSection === item.label
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((s) => (
                <div key={s.label} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className={cn("h-5 w-5", s.color)} />
                    <span className="text-xs font-bold text-green-600">{s.change}</span>
                  </div>
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-xs text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-sm">Recent Users</h3>
                  <button className="text-xs font-medium text-primary">View All</button>
                </div>
                <div className="divide-y divide-border">
                  {recentUsers.map((u) => (
                    <div key={u.email} className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted/10 flex items-center justify-center text-xs font-bold shrink-0">
                        {u.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{u.name}</p>
                        <p className="text-xs text-muted truncate">{u.email}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted/10 shrink-0">
                        {u.role}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                          u.status === "Active"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-500"
                        )}
                      >
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-sm">System Logs</h3>
                  <button className="text-xs font-medium text-primary">View All</button>
                </div>
                <div className="divide-y divide-border">
                  {recentErrors.map((e, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-[9px] font-bold px-1.5 py-0.5 rounded",
                            e.level === "ERROR" && "bg-red-500/10 text-red-500",
                            e.level === "WARN" && "bg-yellow-500/10 text-yellow-600",
                            e.level === "INFO" && "bg-blue-500/10 text-blue-600"
                          )}
                        >
                          {e.level}
                        </span>
                        <span className="text-xs text-muted ml-auto">{e.time}</span>
                      </div>
                      <p className="text-xs mt-1.5 font-mono text-muted">{e.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold mb-4">System Health</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "API Servers", value: "Healthy", color: "text-green-500", pct: 98 },
                  { label: "Database", value: "Operational", color: "text-green-500", pct: 99 },
                  { label: "Redis Cache", value: "Operational", color: "text-green-500", pct: 97 },
                  { label: "WebSockets", value: "Degraded", color: "text-yellow-500", pct: 82 },
                ].map((s) => (
                  <div key={s.label} className="bg-muted/10 rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className={cn("text-xs font-bold", s.color)}>{s.value}</span>
                    </div>
                    <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-brand-purple"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
