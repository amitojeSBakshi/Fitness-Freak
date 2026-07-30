// Minimal push-only service worker. No offline caching — the goal here is
// just to receive Web Push events and show a notification, and to focus/open
// the app when the notification is tapped.

self.addEventListener("push", (event) => {
  let data = { title: "Fit Freak", body: "Time for your daily check-in.", url: "/" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    // fall back to defaults if the payload isn't JSON
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: data.url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    }),
  );
});
