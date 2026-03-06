/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

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

// CacheFirst for hashed static assets
precacheAndRoute(assetEntries);

const PAGES_CACHE = "pages";
const NETWORK_TIMEOUT = 3000;

/** Strip trailing slash (except root "/") for consistent cache keys */
function normalizeUrl(raw: string): string {
	const u = new URL(raw, self.location.origin);
	if (u.pathname !== "/" && u.pathname.endsWith("/")) {
		u.pathname = u.pathname.slice(0, -1);
	}
	return u.href;
}

// Pre-cache all pages during install
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(PAGES_CACHE).then((cache) =>
			Promise.allSettled(
				pageUrls.map(async (url) => {
					const response = await fetch(url);
					if (response.ok) await cache.put(normalizeUrl(url), response);
				}),
			),
		),
	);
});

// NetworkFirst for page navigations — manual handler for full control
// Uses fetch(string) instead of fetch(Request) to prevent Safari redirect loop
self.addEventListener("fetch", (event) => {
	if (event.request.mode !== "navigate") return;

	event.respondWith(
		(async () => {
			const key = normalizeUrl(event.request.url);
			const cache = await caches.open(PAGES_CACHE);

			try {
				const ctrl = new AbortController();
				const tid = setTimeout(() => ctrl.abort(), NETWORK_TIMEOUT);
				const response = await fetch(event.request.url, { signal: ctrl.signal });
				clearTimeout(tid);

				if (response.ok) {
					cache.put(key, response.clone());
				}
				return response;
			} catch {
				const cached = await cache.match(key);
				if (cached) return cached;
				return new Response("Offline", {
					status: 503,
					headers: { "Content-Type": "text/html; charset=utf-8" },
				});
			}
		})(),
	);
});

self.addEventListener("activate", () => {
	self.clients.claim();
});

self.addEventListener("message", (event) => {
	if (event.data?.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
