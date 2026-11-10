// Kill switch for the old /reserve service worker (the app moved to /goa, 2026-11-10). A phone that still runs the old
// worker fetches this file on its next update check, installs it, and it removes itself + the old caches, then reloads
// the open page, which now comes from the network = the redirect to /goa.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('reserve-v-')) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url).catch(() => {});
})()));
