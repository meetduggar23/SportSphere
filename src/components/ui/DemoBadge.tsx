export function DemoBadge({ label = "Demo data" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5  border border-border-strong bg-card/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted rounded-full">
      <span className="h-1.5 w-1.5  bg-secondary rounded-full" />
      {label}
    </span>
  );
}
