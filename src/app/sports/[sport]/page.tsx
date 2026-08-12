import { notFound } from "next/navigation";
import { SPORTS, getSportBySlug } from "@/sports/registry";
import { SportModulePage } from "@/sports/SportModulePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return SPORTS.filter((s) => s.enabled).map((s) => ({ sport: s.slug }));
}

export default async function SportRoutePage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport } = await params;
  const def = getSportBySlug(sport);
  if (!def || !def.enabled) notFound();
  return <SportModulePage sport={def.id} />;
}
