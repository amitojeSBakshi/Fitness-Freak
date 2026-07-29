type Bar = { label: string; value: number };

export function WeeklyBars({
  data,
  target,
  unit = "kcal",
}: {
  data: Bar[];
  target: number;
  unit?: string;
}) {
  const max = Math.max(target, ...data.map((d) => d.value)) * 1.1;

  return (
    <div>
      <div className="relative flex h-32 items-end justify-between gap-1.5">
        <div
          className="pointer-events-none absolute inset-x-0 border-t border-dashed border-border"
          style={{ bottom: `${(target / max) * 100}%` }}
        >
          <span className="absolute -top-4 right-0 text-[10px] text-muted-foreground">
            target {target.toLocaleString()}
          </span>
        </div>
        {data.map((d) => {
          const over = d.value > target;
          return (
            <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-1">
              <span className="text-center text-[9px] text-muted-foreground">
                {Math.round(d.value / 100) / 10}k
              </span>
              <div
                className={`w-full rounded-t-md ${over ? "bg-chart-warn" : "bg-chart-good"}`}
                style={{ height: `${(d.value / max) * 100}%` }}
                title={`${d.label}: ${d.value} ${unit}`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between gap-1.5">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-[10px] text-muted-foreground">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
