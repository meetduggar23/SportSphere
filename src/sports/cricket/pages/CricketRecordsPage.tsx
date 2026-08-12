"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportIcon } from "@/components/ui/SportIcon";
import { CricketRecords } from "@/sports/cricket/components/CricketRecords";
import { cricketFormat, recordCategory } from "@/sports/cricket/config/cricketConfig";
import type { CricketFormatId, CricketRecordCategory } from "@/sports/cricket/types/cricketTypes";

interface CricketRecordsPageProps {
  format?: CricketFormatId;
  category?: CricketRecordCategory;
}

/**
 * CRICKET RECORDS
 *   [Test] [ODI] [T20I] [IPL] → [Batting] [Bowling] … → [Record] → table
 * Modeled on the Cricinfo records system; data-driven from RECORD_DEFINITIONS.
 */
export function CricketRecordsPage({ format = "test", category = "batting" }: CricketRecordsPageProps) {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <PageHeader
          icon={<SportIcon sport="cricket" className="h-5 w-5" />}
          title="Cricket Records"
          kicker="SportSphere Cricket"
          subtitle={`All-time records for ${cricketFormat(format).label} • ${recordCategory(category).label}. Select a format, category and record to explore.`}
        />

        <CricketRecords defaultFormat={format} defaultCategory={category} />
      </div>
    </AppShell>
  );
}
