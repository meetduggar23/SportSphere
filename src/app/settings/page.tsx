"use client";

import { useState } from "react";
import { Settings, Moon, Sun, Bell, Globe, Palette } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    liveScores: true,
    matchAlerts: true,
    news: true,
    transfers: true,
    fantasy: false,
  });
  const [language, setLanguage] = useState("English");

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <PageHeader
          icon={<Settings className="h-5 w-5" />}
          title="Settings"
          subtitle="Customize your SportSphere experience"
        />

        <div className="space-y-6">
          <div className="bg-card  border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Palette className="h-4 w-4 text-secondary" />
              <h3 className="font-bold">Appearance</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Theme Mode</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "p-4  border text-left transition-all",
                      theme === "light" ? "border-secondary ring-1 ring-secondary/30 bg-secondary/5" : "border-border hover:border-muted"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      <span className="font-semibold">Light</span>
                    </div>
                    <p className="text-xs text-muted">Bright and clean</p>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "p-4  border text-left transition-all",
                      theme === "dark" ? "border-secondary ring-1 ring-secondary/30 bg-secondary/5" : "border-border hover:border-muted"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="h-5 w-5 text-brand-navy" />
                      <span className="font-semibold">Dark</span>
                    </div>
                    <p className="text-xs text-muted">Easy on the eyes</p>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted" /> Language
                </p>
                <div className="flex flex-wrap gap-2">
                  {["English", "Español", "हिन्दी", "Français", "Deutsch", "العربية"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={cn(
                        "px-3 py-1.5  text-sm transition-colors rounded-full",
language === lang
                          ? "bg-primary text-navy"
                          : "bg-muted/10 hover:bg-muted/20"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card  border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Bell className="h-4 w-4 text-secondary" />
              <h3 className="font-bold">Notifications</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { key: "liveScores" as const, label: "Live Score Updates", desc: "Real-time alerts for matches you follow" },
                { key: "matchAlerts" as const, label: "Match Start Alerts", desc: "Get notified when matches begin" },
                { key: "news" as const, label: "Breaking News", desc: "Major sports stories as they happen" },
                { key: "transfers" as const, label: "Transfer Updates", desc: "Confirmed deals and hot rumors" },
                { key: "fantasy" as const, label: "Fantasy Reminders", desc: "Deadline alerts and team suggestions" },
              ].map((n) => (
                <div key={n.key} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted mt-0.5">{n.desc}</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={notifications[n.key]}
                    onClick={() => toggleNotification(n.key)}
                    className={cn(
                      "w-11 h-6  transition-colors relative shrink-0",                          notifications[n.key] ? "bg-secondary" : "bg-muted/30"
                    )}
                  >
<span
                      className={cn(
                        "absolute top-0.5 w-5 h-5  bg-navy shadow transition-all",
                        notifications[n.key] ? "left-[22px]" : "left-0.5"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
