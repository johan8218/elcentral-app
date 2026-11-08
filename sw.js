// Gör att appen startar även utan mobiltäckning. Nätet först (så att en ny version slår
// igenom direkt), sparad kopia om nätet inte svarar. Bluetooth påverkas inte av detta.
const CACHE = 'elcentral-v2';
const FILER = ['./', 'index.html', 'manifest.webmanifest', 'ikon.svg', 'ikon-192.png', 'ikon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILER)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(svar => {
        // egna filer och typsnitten sparas för nästa gång utan nät
        if (svar.ok || svar.type === 'opaque') {
          const kopia = svar.clone();
          caches.open(CACHE).then(c => c.put(e.request, kopia));
        }
        return svar;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then(s => s || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
