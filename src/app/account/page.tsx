"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCircle, LogOut, Settings, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";
import { PushSubscribe } from "@/components/PushSubscribe";

export default function AccountPage() {
  const { user, profile, signOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div>
        <p className="text-sm text-muted-foreground">Your account</p>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
      </div>

      <Card>
        <SectionHeading title="Signed in" action={<UserCircle className="text-accent" size={20} />} />
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </Card>

      <Link href="/onboarding">
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-accent" />
            <div>
              <p className="text-sm font-medium">
                {profile?.onboarding_completed ? "Edit profile & targets" : "Complete your profile"}
              </p>
              <p className="text-xs text-muted-foreground">
                {profile?.onboarding_completed
                  ? "Update stats, equipment, or recalculate targets"
                  : "Required for personalized targets and exercises"}
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </Card>
      </Link>

      <PushSubscribe />

      <button
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
        className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground"
      >
        <LogOut size={16} /> Sign out
      </button>
    </div>
  );
}
