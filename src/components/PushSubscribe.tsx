"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { Card, SectionHeading } from "@/components/ui/Card";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

type Status = "unsupported" | "checking" | "off" | "on" | "denied";

export function PushSubscribe() {
  const [status, setStatus] = useState<Status>("checking");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setStatus("unsupported");
        return;
      }
      if (Notification.permission === "denied") {
        setStatus("denied");
        return;
      }
      const reg = await navigator.serviceWorker.register("/sw.js");
      const sub = await reg.pushManager.getSubscription();
      setStatus(sub ? "on" : "off");
    };
    check();
  }, []);

  const enable = async () => {
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "off");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!) as BufferSource,
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      setStatus("on");
    } finally {
      setBusy(false);
    }
  };

  const disable = async () => {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setStatus("off");
    } finally {
      setBusy(false);
    }
  };

  if (status === "checking") return null;

  return (
    <Card>
      <SectionHeading title="Evening reminder" action={<Bell className="text-accent" size={20} />} />
      {status === "unsupported" && (
        <p className="text-sm text-muted-foreground">
          Not supported in this browser. On iPhone, this works once the app is added to your Home
          Screen (Share → Add to Home Screen) and opened from there.
        </p>
      )}
      {status === "denied" && (
        <p className="text-sm text-muted-foreground">
          Notifications are blocked for this app. Enable them in your phone&apos;s notification
          settings for Fit Freak, then reopen the app.
        </p>
      )}
      {status === "off" && (
        <>
          <p className="mb-3 text-sm text-muted-foreground">
            Get a nightly nudge to log today&apos;s water, meals, sleep and steps.
          </p>
          <button
            onClick={enable}
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            Enable reminders
          </button>
        </>
      )}
      {status === "on" && (
        <>
          <p className="mb-3 text-sm text-muted-foreground">Reminders are on for this device.</p>
          <button
            onClick={disable}
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <BellOff size={16} />}
            Turn off
          </button>
        </>
      )}
    </Card>
  );
}
