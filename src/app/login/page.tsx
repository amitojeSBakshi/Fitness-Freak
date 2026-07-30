"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Flame, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";

type Step = "email" | "otp";
type Status = "idle" | "loading" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const sendCode = async () => {
    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }
    setStatus("idle");
    setStep("otp");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendCode();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Flame className="text-accent" size={32} />
        <h1 className="text-xl font-semibold tracking-tight">Sign in to Fit Freak</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          {step === "email"
            ? "No password needed — we'll email you a one-time code."
            : `Enter the code sent to ${email}`}
        </p>
      </div>

      <Card className="w-full max-w-sm">
        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3 py-2">
              <Mail size={16} className="text-muted-foreground" />
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            {status === "error" && <p className="text-xs text-warning">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3 py-2">
              <KeyRound size={16} className="text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                required
                maxLength={12}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter the code"
                className="flex-1 bg-transparent text-center text-lg tracking-[0.3em] outline-none"
              />
            </div>
            {status === "error" && <p className="text-xs text-warning">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === "loading" || code.length === 0}
              className="rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
            >
              {status === "loading" ? "Verifying..." : "Verify & sign in"}
            </button>
            <div className="flex justify-between text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setStatus("idle");
                  setErrorMsg("");
                }}
                className="underline"
              >
                Use a different email
              </button>
              <button type="button" onClick={sendCode} className="underline" disabled={status === "loading"}>
                Resend code
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
