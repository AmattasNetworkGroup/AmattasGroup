self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('Onefrika-cache-v4').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/AmattaStyles.css',
        '/realestate.css',
        '/telecom.css',
        '/solar.css',
        '/real-estate-welcome.html',
        '/telecommunications.html',
        '/solar.html',
        '/main.js',
        '/realestate.js',
        '/telecom.js',
        '/solar.js',
        '/timer.vs1.js',
        '/android-chrome-192x192.png',
        '/android-chrome-512x512.png',
        '/manifest.json',
        '/favicon.ico',               // Correct: in 'dist' after build
        '/apple-touch-icon.png',
        '/favicon-16x16.png',
        '/favicon-32x32.png',
      ]) .then(() => {
          console.log('All resources cached successfully!');
        }).catch(error => {
          console.error('Failed to cache resources:', error); // Log the error to see which file failed
      })
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
