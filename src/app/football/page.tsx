"use client";

import { useEffect, useState } from "react";
import { SportPage } from "@/components/sports/SportPage";
import { SportHero } from "@/components/sports/SportHero";
import { SportIcon } from "@/components/ui/SportIcon";
import { getLiveMatches, getFixtures, getStandings, getTopScorers } from "@/lib/api";
import { Match, Fixture, Standing, Player } from "@/types";
import { teams } from "@/data/mock";

export default function FootballPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [m, f, s, p] = await Promise.all([
          getLiveMatches(),
          getFixtures("39", "2025", "10"),
          getStandings("39", "2025"),
          getTopScorers("39", "2025"),
        ]);
        setMatches(m);
        setFixtures(f);
        setStandings(s);
        setPlayers(p);
      } catch (e) {
        console.error("Failed to load football data:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading live football data...</p>
        </div>
      </div>
    );
  }

  return (
    <SportPage
      sport="football"
      icon={<SportIcon sport="football" className="w-5 h-5" />}
      matches={matches}
      fixtures={fixtures}
      standings={standings}
      news={[]}
      players={players}
      competitions={["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "UEFA Champions League", "Europa League", "FIFA World Cup"]}
      hero={
        <SportHero
          sport="football"
          kicker="UEFA Champions League • Semi-Final"
          live
          ctaHref="/match/m1"
          home={{ name: teams.rm.name, logo: teams.rm.logo, score: 2, sub: "1st • 81 pts" }}
          away={{ name: teams.bay.name, logo: teams.bay.logo, score: 1, sub: "Semi-Final 1st Leg" }}
          headline="Real Madrid take the advantage to Munich"
          venue="Santiago Bernabéu"
        />
      }
    />
  );
}
