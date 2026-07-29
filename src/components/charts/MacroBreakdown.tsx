const MACROS = [
  { key: "protein", label: "Protein", color: "var(--macro-protein)" },
  { key: "carbs", label: "Carbs", color: "var(--macro-carbs)" },
  { key: "fat", label: "Fat", color: "var(--macro-fat)" },
] as const;

type MacroValues = { protein: number; carbs: number; fat: number };

export function MacroBreakdown({ grams, targets }: { grams: MacroValues; targets: MacroValues }) {
  return (
    <div className="flex flex-col gap-2.5">
      {MACROS.map((m) => {
        const value = grams[m.key];
        const target = targets[m.key];
        const pct = Math.min(100, (value / target) * 100);
        return (
          <div key={m.key}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm" style={{ background: m.color }} />
                <span className="text-muted-foreground">{m.label}</span>
              </span>
              <span className="font-medium tabular-nums">
                {value}g / {target}g
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: m.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
