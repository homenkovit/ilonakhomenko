/// <reference lib="webworker" />

import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

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

const PAGES_CACHE = "pages-v1";
const IMAGES_CACHE = "images-v1";
const NETWORK_TIMEOUT = 3000;

const KNOWN_CACHES = [PAGES_CACHE, IMAGES_CACHE];

// Runtime caching for images — CacheFirst with 30-day expiration
registerRoute(
	({ request }) => request.destination === "image",
	new CacheFirst({
		cacheName: IMAGES_CACHE,
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 30 * 24 * 60 * 60 })],
	}),
);

/** SW can't return redirected responses for navigate requests — strip the flag */
function cleanResponse(response: Response): Response {
	if (!response.redirected) return response;
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	});
}

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
					// Fetch with trailing slash to avoid Netlify 301 redirect
					// (redirected responses can't be used for navigate requests)
					const fetchUrl = url === "/" ? url : `${url}/`;
					const response = await fetch(fetchUrl);
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

				const clean = cleanResponse(response);
				if (clean.ok) {
					cache.put(key, clean.clone());
				}
				return clean;
			} catch {
				const cached = await cache.match(key);
				if (cached) return cached;
				const offline = await cache.match(normalizeUrl("/offline"));
				return (
					offline ??
					new Response("Offline", {
						status: 503,
						headers: { "Content-Type": "text/html; charset=utf-8" },
					})
				);
			}
		})(),
	);
});

// Delete caches from previous SW versions on activate
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((names) =>
				Promise.all(
					names
						.filter((name) => !KNOWN_CACHES.includes(name) && !name.startsWith("workbox-precache"))
						.map((name) => caches.delete(name)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("message", (event) => {
	if (event.data?.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
