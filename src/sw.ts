/// <reference lib="webworker" />

import type { WorkboxPlugin } from "workbox-core";
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
		// Normalize: "/" for root, "/about", "/tests/some-test" for the rest
		const normalized = url === "" || url === "/" ? "/" : `/${url.replace(/^\/|\/$/g, "")}`;
		pageUrls.push(normalized);
	} else {
		assetEntries.push(entry);
	}
}

precacheAndRoute(assetEntries);

const PAGES_CACHE = "pages";

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(PAGES_CACHE).then((cache) =>
			Promise.allSettled(
				pageUrls.map(async (url) => {
					const response = await fetch(url);
					if (response.ok) await cache.put(url, response);
				}),
			),
		),
	);
});

// Normalize request URLs: strip trailing slash so that
// both "/about" and "/about/" match the cached "/about"
const trailingSlashPlugin: WorkboxPlugin = {
	cacheKeyWillBeUsed: async ({ request }) => {
		const url = new URL(request.url);
		if (url.pathname !== "/" && url.pathname.endsWith("/")) {
			url.pathname = url.pathname.slice(0, -1);
			return new Request(url.toString());
		}
		return request;
	},
};

// Safari/WebKit may route SW-internal fetch(navigate request) back through SW → loop.
// Creating a new Request from URL string resets mode from "navigate" to "cors",
// preventing the loop.
const safariFixPlugin: WorkboxPlugin = {
	requestWillFetch: async ({ request }) => new Request(request.url),
};

registerRoute(
	new NavigationRoute(
		new NetworkFirst({
			cacheName: PAGES_CACHE,
			networkTimeoutSeconds: 3,
			plugins: [safariFixPlugin, trailingSlashPlugin],
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
