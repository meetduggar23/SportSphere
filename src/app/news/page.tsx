"use client";

import { useState } from "react";
import { Newspaper } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { NewsCard } from "@/components/sports/NewsCard";
import { topNews } from "@/data/mock";

const tabs = [
  { label: "All News", value: "all" },
  { label: "Football", value: "football" },
  { label: "Cricket", value: "cricket" },
  { label: "Basketball", value: "basketball" },
  { label: "Formula 1", value: "f1" },
  { label: "Transfers", value: "transfers" },
];

export default function NewsPage() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? topNews : topNews.filter((n) => n.sport === active || n.category.toLowerCase() === active);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Newspaper className="h-5 w-5" />}
          title="Sports News"
          subtitle="Breaking news, match reports, and analysis from around the world of sports"
        />

        <div className="mb-6">
          <DemoBadge label="Demo news — no news provider connected yet" />
        </div>

        <SportTabs tabs={tabs} active={active} onChange={setActive} className="mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
