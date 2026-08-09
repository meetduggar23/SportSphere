"use client";

import { User, Mail, MapPin, Heart, Star, Bookmark, LogOut } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { followedTeams, upcomingFixtures, topNews } from "@/data/mock";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { MatchRow } from "@/components/sports/MatchRow";
import { allMatches } from "@/data/mock";

export default function ProfilePage() {
  const bookmarkedMatches = allMatches.filter((m) => m.status === "upcoming").slice(0, 3);
  const savedNews = topNews.slice(0, 3);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<User className="h-5 w-5" />}
          title="My Profile"
          subtitle="Your personalized sports hub"
        />

        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-brand-purple flex items-center justify-center text-3xl font-bold text-white">
                MD
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Meet Duggar</h2>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted">
                  <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> meet@example.com</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> India</span>
                </div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-xl font-extrabold text-primary">128</p>
                  <p className="text-xs text-muted">Predictions</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-yellow-500">12</p>
                  <p className="text-xs text-muted">Badges</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold">45</p>
                  <p className="text-xs text-muted">Following</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" /> Followed Teams
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {followedTeams.map((team) => (
                  <div key={team.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                    <TeamLogo logo={team.logo} name={team.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{team.name}</p>
                      <p className="text-xs text-muted">{team.sport}</p>
                    </div>
                    <button className="text-xs font-medium text-muted hover:text-primary transition-colors">
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" /> Bookmarked Matches
              </h3>
              <div className="space-y-3">
                {bookmarkedMatches.map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-primary" /> Saved News
              </h3>
              <div className="space-y-3">
                {savedNews.map((n) => (
                  <div key={n.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                    <img src={n.image} alt={n.title} className="w-20 h-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted mt-0.5">{n.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3">Quick Links</h3>
              <div className="space-y-1">
                {[
                  { label: "My Predictions", href: "/predictions", icon: "🎯" },
                  { label: "My Fantasy Teams", href: "/fantasy", icon: "✨" },
                  { label: "Notification Settings", href: "/settings", icon: "🔔" },
                  { label: "Watch Later", href: "/videos", icon: "🎬" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-muted/10 transition-colors text-muted hover:text-foreground">
                    <span>{l.icon}</span> {l.label}
                  </a>
                ))}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-colors">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
