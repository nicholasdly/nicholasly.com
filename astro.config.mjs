import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://nicholasly.com/",
  integrations: [
    tailwind(),
    sitemap(),
    icon(),
    robotsTxt({
      sitemap: [
        "https://nicholasly.com/sitemap-index.xml",
        "https://nicholasly.com/sitemap-0.xml",
      ],
    }),
  ],
});
