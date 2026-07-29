export function ProgressBar({
  value,
  max,
  colorClassName = "bg-accent",
}: {
  value: number;
  max: number;
  colorClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
      <div
        className={`h-full rounded-full ${colorClassName}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
