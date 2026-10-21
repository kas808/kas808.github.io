// Prints the two-page portfolio highlights (src/pages/print/portfolio.astro) to a PDF for job applications.
//
// Run it with:   npm run portfolio-pdf
//
// That builds the site first, then this script serves dist/ on a local port,
// opens /print/portfolio/ in headless Chrome and saves Kasin-Ito-Sato-Portfolio.pdf
// in the project folder. The build's resized photos keep the file small enough to upload.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const OUT = 'Kasin-Ito-Sato-Portfolio.pdf';
const CHROME = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error('Google Chrome not found. Set CHROME=/path/to/chrome and try again.');
if (!existsSync('dist/print/portfolio/index.html')) throw new Error('No build found. Run npm run build first.');

const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff',
};
const server = createServer(async (req, res) => {
  let file = path.join('dist', decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();

try {
  // Chrome runs alongside this script's server, so it has to be started without blocking
  await promisify(execFile)(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${path.resolve(OUT)}`,
    `http://127.0.0.1:${port}/print/portfolio/`,
  ]);
} finally {
  server.close();
}
const { size } = await stat(OUT);
console.log(`Saved ${OUT} (${(size / 1024 / 1024).toFixed(1)} MB)`);
