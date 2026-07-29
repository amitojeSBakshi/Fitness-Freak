"use client";

import Link from "next/link";
import { Flame, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function TopBar({ streak = 4 }: { streak?: number }) {
  const { user, loading } = useAuth();

  return (
    <header className="safe-top sticky top-0 z-20 border-b border-border bg-surface/95 px-4 pb-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 text-lg font-bold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Flame size={16} strokeWidth={2.5} />
          </span>
          Fit Freak
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-semibold text-warning">
            🔥 {streak}
          </span>
          {!loading && (
            <Link
              href={user ? "/account" : "/login"}
              className="flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-foreground"
            >
              <UserCircle size={16} />
              {user ? "Account" : "Sign in"}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
