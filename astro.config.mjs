import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://hassan-portfolio.vercel.app",
  output: "static",
  adapter: vercel(),
  server: { port: 4321 },
});
