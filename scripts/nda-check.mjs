// NDA check: fails the build if a denied name appears anywhere in the source
// or the built site (file names and text). The deny-list is NOT stored in this
// public repo. Set it as a comma-separated NDA_DENYLIST environment variable
// (Vercel project settings, or a local git-ignored .env file).
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

let raw = process.env.NDA_DENYLIST ?? "";
if (!raw && existsSync(".env")) {
  const m = readFileSync(".env", "utf8").match(/^NDA_DENYLIST=(.*)$/m);
  if (m) raw = m[1].trim().replace(/^["']|["']$/g, "");
}
const terms = raw.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);

if (!terms.length) {
  console.warn("\n[nda-check] WARNING: NDA_DENYLIST is not set, so nothing was checked.\n");
  process.exit(0);
}

const ROOTS = ["src", "public", "dist"];
const TEXT = new Set([".astro", ".md", ".mdx", ".ts", ".js", ".mjs", ".css", ".html", ".svg", ".json", ".txt", ".xml"]);
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const lowerName = name.toLowerCase();
    for (const t of terms) {
      if (lowerName.includes(t.replace(/\s+/g, "-")) || lowerName.includes(t)) hits.push(`${path} (file name)`);
    }
    if (statSync(path).isDirectory()) walk(path);
    else if (TEXT.has(extname(name))) {
      const lines = readFileSync(path, "utf8").toLowerCase().split("\n");
      lines.forEach((line, i) => {
        if (terms.some((t) => line.includes(t))) hits.push(`${path}:${i + 1}`);
      });
    }
  }
}
ROOTS.filter(existsSync).forEach(walk);

if (hits.length) {
  // Report locations only, never the matched names.
  console.error(`\n[nda-check] FAILED: ${hits.length} place(s) contain a denied name:\n` + [...new Set(hits)].map((h) => "  " + h).join("\n") + "\n");
  process.exit(1);
}
console.log(`[nda-check] OK: ${terms.length} denied name(s) checked, none found.`);
