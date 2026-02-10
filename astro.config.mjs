// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ilonakhomenko.com",
  image: {
    layout: "constrained",
  },
  integrations: [sitemap()],
});
