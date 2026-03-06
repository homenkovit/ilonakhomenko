/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

const manifest = self.__WB_MANIFEST;

// Pages have no file extension (e.g. "about", "tests/beck-depression-scale", "/")
// Assets have extensions (e.g. "_astro/file.hash.js", "og-image.png")
const pageUrls: string[] = [];
const assetEntries: typeof manifest = [];

for (const entry of manifest) {
	const url = typeof entry === "string" ? entry : entry.url;
	const lastSegment = url.split("/").pop() || "";
	if (!lastSegment.includes(".")) {
		pageUrls.push(url);
	} else {
		assetEntries.push(entry);
	}
}

precacheAndRoute(assetEntries);

const PAGES_CACHE = "pages";

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(PAGES_CACHE)
			.then((cache) => Promise.allSettled(pageUrls.map((url) => cache.add(url)))),
	);
});

registerRoute(
	new NavigationRoute(
		new NetworkFirst({
			cacheName: PAGES_CACHE,
			networkTimeoutSeconds: 3,
		}),
	),
);

self.addEventListener("activate", () => {
	self.clients.claim();
});

self.addEventListener("message", (event) => {
	if (event.data?.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
