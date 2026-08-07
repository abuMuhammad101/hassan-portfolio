import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 4323;
const URL = `http://localhost:${PORT}/resume/`;

async function waitForServer(url, attempts = 30) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error("Dev server did not become ready in time");
}

const server = spawn("npx", ["astro", "dev", "--port", String(PORT)], {
  cwd: process.cwd(),
  shell: true,
  stdio: "ignore",
});

try {
  await waitForServer(URL);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: "public/resume.pdf",
    format: "A4",
    printBackground: false,
    margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
  });
  await browser.close();
  console.log("Wrote public/resume.pdf");
} finally {
  server.kill();
}
