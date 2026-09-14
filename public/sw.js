// public/sw.js
//
// Service worker: a script the browser runs in the background, separate
// from any page, able to intercept network requests. This is what makes
// offline support possible in a PWA.
//
// Strategy used here: "stale-while-revalidate" for GET requests.
// - Immediately return whatever is in the cache, if anything (fast, and
//   works offline for pages you've visited before).
// - In parallel, fetch the real network version and update the cache for
//   next time.
// This means: first visit to any page needs network. Every visit after
// that works offline, and stays reasonably fresh whenever you do have a
// connection.

const CACHE_NAME = "tourismhub-cache-v1";

self.addEventListener("install", (event) => {
  // skipWaiting: activate this new service worker immediately instead of
  // waiting for all open tabs to close first.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up caches from older versions of this service worker (if we
  // ever bump CACHE_NAME), and take control of already-open pages.
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // On ne met en cache que les requêtes GET — les écritures (POST,
  // requêtes Supabase pour insert/update) ne doivent jamais être
  // interceptées ici, elles ont besoin du réseau réel.
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);

      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => cached); // hors ligne et rien en cache -> échec silencieux géré par le navigateur

      // Si on a une version en cache, on la renvoie tout de suite (rapide,
      // fonctionne hors ligne) ; sinon on attend le réseau.
      return cached ?? networkFetch;
    })
  );
});
