// Lightweight service worker: cache-first for images so repeat visits and
// in-app navigation load them instantly from disk. Bump CACHE to invalidate.
const CACHE = 'be-img-v1'
const IMG_RE = /\.(?:jpg|jpeg|png|webp|avif|gif|svg)$/i

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.filter((k) => k.startsWith('be-img-') && k !== CACHE).map((k) => caches.delete(k)),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (!IMG_RE.test(url.pathname)) return

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(request)
      if (cached) return cached
      try {
        const response = await fetch(request)
        if (response?.ok) cache.put(request, response.clone())
        return response
      } catch {
        return cached || Response.error()
      }
    })(),
  )
})
