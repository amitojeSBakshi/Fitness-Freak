import Link from "next/link";

export function DemoBanner() {
  return (
    <Link
      href="/login"
      className="mb-4 block rounded-xl border border-dashed border-accent/40 bg-accent-soft px-3 py-2 text-xs font-medium text-accent"
    >
      Showing sample data — sign in to track your own progress →
    </Link>
  );
}
