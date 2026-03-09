// @ts-check

import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://ilonakhomenko.com",
	image: {
		layout: "constrained",
	},
	integrations: [
		sitemap(),
		AstroPWA({
			strategies: "injectManifest",
			registerType: "prompt",
			srcDir: "src",
			filename: "sw.ts",
			injectManifest: {
				globPatterns: ["**/*.{html,js,css,woff2,svg,ico}", "_astro/my-photo*.webp"],
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
			},
			manifest: {
				name: "Психолог Илона Хоменко",
				short_name: "Илона Хоменко",
				description: "Психолог Илона Хоменко. Индивидуальные консультации онлайн.",
				lang: "ru",
				display: "standalone",
				start_url: "/",
				theme_color: "#3a2c44",
				background_color: "#ffffff",
				icons: [
					{
						src: "/favicon-192.png",
						type: "image/png",
						sizes: "192x192",
					},
					{
						src: "/favicon-mask.png",
						type: "image/png",
						sizes: "512x512",
						purpose: "maskable",
					},
					{
						src: "/favicon-512.png",
						type: "image/png",
						sizes: "512x512",
					},
				],
				screenshots: [
					{
						src: "/screenshots/desktop.webp",
						sizes: "1280x800",
						type: "image/webp",
						form_factor: "wide",
						label: "Главная страница — десктоп",
					},
					{
						src: "/screenshots/mobile.webp",
						sizes: "375x812",
						type: "image/webp",
						form_factor: "narrow",
						label: "Главная страница — мобильная",
					},
				],
			},
		}),
	],
});
