#!/usr/bin/env node
// Finds an available Chromium binary across environments, then runs react-snap.
// Priority: PUPPETEER_EXECUTABLE_PATH env var → known paths by OS.
const { execSync } = require('child_process');
const fs = require('fs');

const candidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', // Claude Code remote env
  '/usr/bin/chromium-browser',                          // Ubuntu apt
  '/usr/bin/chromium',                                  // Arch / some Ubuntu
  '/usr/bin/google-chrome-stable',                      // GitHub Actions (if installed)
  '/usr/bin/google-chrome',
].filter(Boolean);

const chromium = candidates.find(p => { try { return fs.existsSync(p); } catch { return false; } });

const env = { ...process.env };
if (chromium) {
  env.PUPPETEER_EXECUTABLE_PATH = chromium;
  console.log(`react-snap: using Chromium at ${chromium}`);
} else {
  console.log('react-snap: no Chromium path found, letting puppeteer use its default');
}

execSync('react-snap', { stdio: 'inherit', env });
