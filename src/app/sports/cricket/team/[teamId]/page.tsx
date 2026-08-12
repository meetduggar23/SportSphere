import { CricketTeamPage } from "@/sports/cricket/pages/CricketTeamPage";

/**
 * /sports/cricket/team/:teamId
 * One reusable page for EVERY supported country — india, australia, england,
 * pakistan, … Only the selected team's data changes; nothing is hardcoded per
 * country and nothing falls back to another country's data.
 */
export default function CricketTeamRoute({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  return <CricketTeamPage params={params} />;
}
