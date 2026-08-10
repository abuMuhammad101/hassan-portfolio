import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import { execSync } from "node:child_process";

const STATIC_DIR = ".vercel/output/static";
const PORT = 4323;
const URL = `http://localhost:${PORT}/resume/`;

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".png": "image/png", ".gif": "image/gif", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".json": "application/json",
};

console.log("Building static site...");
execSync("npx astro build", { stdio: "inherit" });

// Plain static file server — no dev server, no HMR, no file watcher,
// so there is no error overlay that can get printed by mistake.
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split("?")[0]);
  if (path.endsWith("/")) path += "index.html";
  const filePath = join(STATIC_DIR, path);
  try {
    const s = await stat(filePath);
    if (!s.isFile()) throw new Error("not a file");
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));

try {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  // Safety net: fail loudly instead of silently printing a broken page.
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (!bodyText.includes("Muhammad Hassan Khan")) {
    throw new Error(`Resume page did not render as expected. Body started with: ${bodyText.slice(0, 200)}`);
  }

  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: "public/resume.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
  });
  await browser.close();
  console.log("Wrote public/resume.pdf");
} finally {
  server.close();
}
