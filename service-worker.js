const CACHE_NAME = 'Game Bin V.0.01';
const urlsToCache = [
  '/',
  '/index.html',
  '/games.html',
  '/about.html',
  '/Terms & Conditions.html',
  '/Privacy Policy.html',
  '/GB Logo.png', // Assuming your images are in an 'images' folder
  '/favicon.png', // Your favicon from the previous step
  '/favicon-192x192.png', // PWA icons
  '/favicon-512x512.png'  // PWA icons
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
