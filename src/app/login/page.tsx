"use client";

import { useState } from "react";
import { Mail, Flame } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Flame className="text-accent" size={32} />
        <h1 className="text-xl font-semibold tracking-tight">Sign in to Fit Freak</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          No password needed — we&apos;ll email you a one-time sign-in link.
        </p>
      </div>

      <Card className="w-full max-w-sm">
        {status === "sent" ? (
          <p className="text-center text-sm text-foreground">
            Check <span className="font-medium">{email}</span> for your sign-in link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3 py-2">
              <Mail size={16} className="text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            {status === "error" && <p className="text-xs text-warning">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send sign-in link"}
            </button>
          </form>
        )}
      </Card>
    </div>
  );
}
