import { getCricketPlayerProvider } from "@/sports/cricket/services/playerProvider";
import { cricketEnvelope } from "@/sports/cricket/services/serverResponse";

/**
 * GET /api/cricket/players/<id>
 * Returns { player, stats } — player bio normalized from the provider plus
 * REAL career statistics parsed from the provider's stats[] payload (per
 * format). Statistics that the provider doesn't supply stay absent; the UI
 * renders "Statistics unavailable" for those formats.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const provider = getCricketPlayerProvider();

  return cricketEnvelope(async () => {
    const { player, stats } = await provider.getPlayer(id);

    // Map the provider's career stats (keyed by format) into the PlayerStats
    // result shape the profile UI consumes — one result per supported format,
    // honestly "unavailable" when the provider has no data for that format.
    const formats: ("test" | "odi" | "t20i" | "t20" | "ipl")[] = ["test", "odi", "t20i", "ipl"];
    const byFormat = new Map(stats.map((s) => [s.format, s]));

    const results = formats.map((format) => {
      const s = byFormat.get(format);
      if (!s) {
        return {
          status: "unavailable" as const,
          stats: null,
          format,
          source: provider.sourceName,
          sourceUrl: provider.sourceUrl,
          provider: provider.name,
          lastUpdated: null,
          error: `Career ${format.toUpperCase()} statistics are not available for this player.`,
        };
      }
      return {
        status: "ready" as const,
        stats: s,
        format,
        source: s.source,
        sourceUrl: s.sourceUrl,
        provider: s.provider,
        lastUpdated: s.lastUpdated,
      };
    });

    return { player, stats: results };
  });
}
