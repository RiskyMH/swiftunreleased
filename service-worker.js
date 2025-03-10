// came from https://itnext.io/how-to-make-your-website-work-offline-b5be47b92adc

// give your cache a name
const cacheName = 'SwiftUnreleased';

// put the static assets and routes you want to cache here

// IMPORTANT: put everything here that is for offline use
const filesToCache = [
   "./",
        "./index.html",
        "./index.css",
        "./template.css",
        "./template-colour-changes.css",
        "./logo-bolder.png",
        "./images/openingimage.jpg",
];

// the event handler for the activate event
self.addEventListener('activate', e => self.clients.claim());

// the event handler for the install event 
// typically used to cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
  );
});

// the fetch event handler, to intercept requests and serve all 
// static assets from the cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});
