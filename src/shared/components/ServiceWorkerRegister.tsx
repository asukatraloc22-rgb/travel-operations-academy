// shared/components/ServiceWorkerRegister.tsx
//
// "use client" + useEffect: registering a service worker is a browser-only
// side effect (the "navigator" object doesn't exist on the server), so
// this can't be a Server Component. Renders nothing visible — its only
// job is to run this one line of setup once, when the app first loads.

"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service worker registration failed:", error);
      });
    }
  }, []);

  return null;
}
