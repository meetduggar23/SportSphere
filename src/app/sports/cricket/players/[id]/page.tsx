import { CricketPlayerProfilePage } from "@/sports/cricket/pages/CricketPlayerProfilePage";

export const metadata = {
  title: "Player Profile — SportSphere Cricket",
};

export default async function CricketPlayerRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CricketPlayerProfilePage id={id} />;
}
