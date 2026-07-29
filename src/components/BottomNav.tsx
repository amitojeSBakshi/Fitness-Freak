"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Utensils, Flame, LineChart, Map } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/training", label: "Train", icon: Dumbbell },
  { href: "/nutrition", label: "Eat", icon: Utensils },
  { href: "/calorie-tool", label: "Log", icon: Flame },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/roadmap", label: "Plan", icon: Map },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom sticky bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <ul className="mx-auto flex max-w-3xl items-stretch justify-between px-1 pt-1.5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 rounded-lg py-1 text-[11px] font-medium transition-colors ${
                  active ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
