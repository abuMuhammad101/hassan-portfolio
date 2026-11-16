import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://hassank.space",
  output: "static",
  adapter: vercel(),
  server: { port: 4321 },
});
