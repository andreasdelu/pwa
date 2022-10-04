const cacheName = "cache-insects";

const cacheItems = [
	"./",
	"./manifest.json",
	"./serviceworker.js",
	"./index.html",
	"./butterflies.jpg",
	"./butterfly.jpg",
	"./dragonfly.jpg",
	"./menu.svg",
	"./long.png",
	"./icon-512.png",
	"./icon-192.png",
];

self.addEventListener("install", function (e) {
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			const toCache = await cache.addAll(cacheItems);
			return toCache;
		})()
	);
});

self.addEventListener("fetch", async function (e) {
	e.respondWith(
		(async () => {
			// Try to get the response from a cache.
			const cachedResponse = await caches.match(e.request, {
				ignoreVary: true,
			});
			// Return it if we found one.
			if (cachedResponse) return cachedResponse;
			// If we didn't find a match in the cache, use the network.
			const response = fetch(e.request);
			return response;
		})()
	);
});
