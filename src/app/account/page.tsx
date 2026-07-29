"use client";

import { useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, SectionHeading } from "@/components/ui/Card";

export default function AccountPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  if (!user) {
    router.replace("/login");
    return null;
  }

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
