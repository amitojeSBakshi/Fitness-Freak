"use client";

import { useCallback, useEffect, useState } from "react";
import { Info, Check, Loader2, Flame, Footprints } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, SectionHeading } from "@/components/ui/Card";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { addWorkoutSession, getRecentWorkoutSessions } from "@/lib/supabase/queries";
import { todayISO } from "@/lib/date";
import { SESSIONS, MINIMUM_VIABLE_SESSION, WARMUP, nextSessionName } from "@/lib/training/program";

// Rough MET-based estimate for a ~45min moderate resistance session at this bodyweight.
const ESTIMATED_SESSION_KCAL = 260;

export default function TrainingPage() {
  const { user } = useAuth();
  const [sessionName, setSessionName] = useState(SESSIONS[0].name);
  const [loggedToday, setLoggedToday] = useState(false);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setChecking(true);
    const supabase = createClient();
    const sessions = await getRecentWorkoutSessions(supabase, user.id, 60);
    const strengthSessions = sessions.filter((s) => s.session_type === "strength");
    const last = strengthSessions[strengthSessions.length - 1];
    setLoggedToday(sessions.some((s) => s.logged_on === todayISO() && s.session_type !== "rest"));
    setSessionName(nextSessionName(last?.session_name ?? null));
    setChecking(false);
  }, [user]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const session = SESSIONS.find((s) => s.name === sessionName) ?? SESSIONS[0];

  const handleLog = async () => {
    if (!user || loggedToday) return;
    setSaving(true);
    const supabase = createClient();
    await addWorkoutSession(supabase, user.id, {
      session_name: session.name,
      session_type: "strength",
      duration_min: 45,
      estimated_kcal: ESTIMATED_SESSION_KCAL,
    });
    setLoggedToday(true);
    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {!user && <DemoBanner />}

      <div>
        <p className="text-sm text-muted-foreground">Phase 1 · Foundation · Weeks 1-4</p>
        <h1 className="text-2xl font-semibold tracking-tight">Training</h1>
      </div>

      <Card className="flex items-start gap-2 bg-surface-muted text-sm text-muted-foreground">
        <Info size={16} className="mt-0.5 shrink-0 text-accent" />
        <p>
          Rotating queue, not a fixed calendar: <strong className="text-foreground">Upper A → Lower A → Upper B → Lower B</strong>.
          Whenever you train, you do the next one — a missed day shifts the queue instead of leaving
          a hole. Every muscle still gets 2x/week frequency, immune to a chaotic schedule. Loads will
          feel light in weeks 1-2 — that's correct, not a mistake. Never miss on purpose to chase a
          burn this early.
        </p>
      </Card>

      <Card>
        <SectionHeading title={`Up next · ${session.name}`} subtitle={session.focus} action={<Flame className="text-accent" size={20} />} />
        <div className="flex flex-col gap-3">
          {session.exercises.map((ex) => (
            <div key={ex.name} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{ex.name}</p>
                <p className="whitespace-nowrap text-xs text-muted-foreground">{ex.sets} · rest {ex.rest}</p>
              </div>
              <p className="text-xs text-muted-foreground">{ex.why}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                <span className="text-accent">Easier:</span> {ex.easier} · <span className="text-accent">Harder:</span> {ex.harder}
              </p>
            </div>
          ))}
        </div>
        {user ? (
          <button
            onClick={handleLog}
            disabled={loggedToday || saving || checking}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold ${
              loggedToday ? "bg-accent-soft text-accent" : "bg-accent text-accent-foreground"
            } disabled:cursor-default`}
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {loggedToday ? (
              <>
                <Check size={16} /> Logged for today
              </>
            ) : (
              `Log ${session.name}`
            )}
          </button>
        ) : (
          <button className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground">
            Sign in to log workouts
          </button>
        )}
      </Card>

      <Card>
        <SectionHeading title="Warm-up" subtitle="6-8 min, every session" />
        <p className="text-sm text-muted-foreground">{WARMUP}</p>
      </Card>

      <Card className="border-accent/30 bg-accent-soft">
        <p className="text-sm font-medium">{MINIMUM_VIABLE_SESSION.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{MINIMUM_VIABLE_SESSION.detail}</p>
      </Card>

      <Card>
        <SectionHeading title="Steps & outdoor conditioning" action={<Footprints className="text-accent" size={20} />} />
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <li>Build to 8,000 steps/day by week 4 — your single highest-leverage fat-loss lever, and free.</li>
          <li>2x/week, 30-40 min outdoor Zone 2 (conversation-pace walk/jog/cycle) on non-lifting days.</li>
          <li>A 15-20 min lunch walk + standing/moving 2-3 min every desk hour adds 1,500-2,500 steps by itself.</li>
          <li>No hard running/cycling intervals within 24h before a lower-body session.</li>
        </ul>
      </Card>
    </div>
  );
}
