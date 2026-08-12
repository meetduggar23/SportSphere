import { CricketRecordsPage } from "@/sports/cricket/pages/CricketRecordsPage";
import { CRICKET_FORMATS, RECORD_CATEGORIES } from "@/sports/cricket/config/cricketConfig";
import type {
  CricketFormatId,
  CricketRecordCategory,
} from "@/sports/cricket/types/cricketTypes";

/**
 * /sports/cricket/records?format=test&category=batting
 * Validates query params against the config; defaults apply on invalid input.
 */
export default async function CricketRecordsRoute({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; category?: string }>;
}) {
  const { format, category } = await searchParams;
  const validFormat = CRICKET_FORMATS.find((f) => f.id === format)?.id as
    | CricketFormatId
    | undefined;
  const validCategory = RECORD_CATEGORIES.find((c) => c.id === category)?.id as
    | CricketRecordCategory
    | undefined;

  return <CricketRecordsPage format={validFormat} category={validCategory} />;
}
