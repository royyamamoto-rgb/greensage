// GreenSage Service Worker
// Currently disabled — Cloudflare handles caching
// Registered to enable PWA "Add to Home Screen" prompt

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
