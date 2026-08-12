import { CricketCountriesPage } from "@/sports/cricket/pages/CricketCountriesPage";

export const metadata = {
  title: "Cricket Countries — SportSphere",
  description: "Every supported cricket country and team — matches, players, series and records.",
};

export default function CricketTeamsRoute() {
  return <CricketCountriesPage />;
}
