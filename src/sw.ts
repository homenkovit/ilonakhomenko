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
		// Normalize: "/" for root, "/about/", "/tests/some-test/" for the rest
		const normalized = url === "" || url === "/" ? "/" : `/${url.replace(/^\/|\/$/g, "")}/`;
		pageUrls.push(normalized);
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

// Normalize request URLs: ensure trailing slash for page URLs
// so that both "/about" and "/about/" match the cached "/about/"
const trailingSlashPlugin: WorkboxPlugin = {
	cacheKeyWillBeUsed: async ({ request }) => {
		const url = new URL(request.url);
		if (url.pathname !== "/" && !url.pathname.endsWith("/") && !url.pathname.includes(".")) {
			url.pathname += "/";
			return new Request(url.toString());
		}
		return request;
	},
};

registerRoute(
	new NavigationRoute(
		new NetworkFirst({
			cacheName: PAGES_CACHE,
			networkTimeoutSeconds: 3,
			plugins: [trailingSlashPlugin],
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
