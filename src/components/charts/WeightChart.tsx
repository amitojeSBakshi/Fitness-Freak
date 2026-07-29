type Point = { label: string; value: number };

export function WeightChart({ data, unit = "kg" }: { data: Point[]; unit?: string }) {
  const width = 320;
  const height = 120;
  const padX = 8;
  const padY = 16;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (d.value - min) / range) * (height - padY * 2);
    return { ...d, x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;
  const last = points[points.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label={`Weight trend from ${data[0].value}${unit} to ${last.value}${unit}`}>
        <defs>
          <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-good)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--chart-good)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#weightFill)" />
        <path d={linePath} fill="none" stroke="var(--chart-good)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r={p === last ? 4 : 2.5} fill="var(--chart-good)">
            <title>{`${p.label}: ${p.value}${unit}`}</title>
          </circle>
        ))}
        <text x={last.x} y={last.y - 10} textAnchor="end" fontSize="11" fontWeight="600" fill="var(--foreground)">
          {last.value}{unit}
        </text>
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{data[0].label}</span>
        <span>{last.label}</span>
      </div>
    </div>
  );
}
