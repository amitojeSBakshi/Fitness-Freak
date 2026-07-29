import type { LucideIcon } from "lucide-react";

export function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  delta,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  delta?: { text: string; good: boolean };
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon size={15} className="text-accent" />
      </div>
      <p className="text-lg font-bold leading-tight">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
      {delta && (
        <p className={`mt-0.5 text-[11px] font-medium ${delta.good ? "text-accent" : "text-warning"}`}>
          {delta.text}
        </p>
      )}
    </div>
  );
}
