const CACHE_NAME = 'checklist-app-cache-v1';
const urlsToCache = [
    './',
    './nuevo13.html',
    './manifest.json',
    './images/icon-192x192.png',
    './images/icon-512x512.png',
    './images/icon-512x512-maskable.png',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});