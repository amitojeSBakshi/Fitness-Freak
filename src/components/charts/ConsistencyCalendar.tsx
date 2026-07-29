type Status = "completed" | "rest" | "missed";
type Day = { date: string; status: Status };

const STATUS_STYLE: Record<Status, string> = {
  completed: "bg-chart-good",
  rest: "bg-chart-neutral/30",
  missed: "bg-chart-warn",
};

const LEGEND: { status: Status; label: string }[] = [
  { status: "completed", label: "Trained" },
  { status: "rest", label: "Rest day" },
  { status: "missed", label: "Missed" },
];

export function ConsistencyCalendar({ days }: { days: Day[] }) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <div
            key={d.date}
            className={`aspect-square rounded-md ${STATUS_STYLE[d.status]}`}
            title={`${d.date}: ${d.status}`}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
        {LEGEND.map((l) => (
          <span key={l.status} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-sm ${STATUS_STYLE[l.status]}`} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
