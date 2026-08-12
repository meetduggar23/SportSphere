import { CricketRecordsPage } from "@/sports/cricket/pages/CricketRecordsPage";
import { CRICKET_FORMATS, RECORD_CATEGORIES } from "@/sports/cricket/config/cricketConfig";
import type {
  CricketFormatId,
  CricketRecordCategory,
} from "@/sports/cricket/types/cricketTypes";

/**
 * /sports/cricket/records?format=test&category=batting&team=india
 * Validates format/category against the config (defaults apply on invalid
 * input); the team param is a free filter string passed through as-is.
 */
export default async function CricketRecordsRoute({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; category?: string; team?: string }>;
}) {
  const { format, category, team } = await searchParams;
  const validFormat = CRICKET_FORMATS.find((f) => f.id === format)?.id as
    | CricketFormatId
    | undefined;
  const validCategory = RECORD_CATEGORIES.find((c) => c.id === category)?.id as
    | CricketRecordCategory
    | undefined;

  return <CricketRecordsPage format={validFormat} category={validCategory} team={team} />;
}
