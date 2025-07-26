    const CACHE_NAME = 'donut-tracker-v1';
    const ASSETS = [
      '/donut/', // Root path of your app
      '/donut/index.html',
      '/donut/manifest.json',
      '/donut/icons/icon-192x192.png',
      '/donut/icons/icon-512x512.png',
      'https://cdn.tailwindcss.com', // Tailwind CSS CDN
      'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap', // Nunito font
      'https://fonts.googleapis.com/css2?family=Bangers&display=swap', // Bangers font
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/076bb821-f656-41d6-beb1-23ce63ac5abd.png' // Donut image
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(ASSETS))
          .then(() => self.skipWaiting()) // Activate new service worker immediately
      );
    });

    self.addEventListener('activate', event => {
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName); // Delete old caches
              }
            })
          );
        }).then(() => self.clients.claim()) // Take control of clients immediately
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => response || fetch(event.request))
      );
    });
    