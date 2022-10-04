const cacheName = "cahce-insects";

self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			return cache.addAll([
				"/pwa/",
				"/pwa/index.html",
				"/pwa/butterflies.jpg",
				"/pwa/butterfly.jpg",
				"/pwa/dragonfly.jpg",
				"/pwa/menu.svg",
			]);
		})
	);
});

self.addEventListener("fetch", function (e) {
	e.respondWith(
		fetch(e.request).catch(() => {
			caches.open(cacheName).then((cache) => cache.match(e.request));
		})
	);
});
