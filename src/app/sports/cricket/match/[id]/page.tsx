import { CricketMatchPage } from "@/sports/cricket/pages/CricketMatchPage";

export const metadata = {
  title: "Match Scorecard — SportSphere Cricket",
};

export default async function CricketMatchRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CricketMatchPage id={id} />;
}
