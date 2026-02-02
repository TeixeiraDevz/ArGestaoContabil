import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const apiUrl = process.env.API_URL || process.env.AR_API_URL;

if (!apiUrl) {
  console.error('[env] Missing required environment variable: API_URL');
  process.exit(1);
}

const outPath = resolve(
  process.cwd(),
  process.env.ENV_JS_OUT_PATH ?? 'dist/ar-gestao-frontend/browser/env.js'
);
mkdirSync(dirname(outPath), { recursive: true });
const contents =
  [
    '/* eslint-disable */',
    '// Auto-generated at build time.',
    'window.__env = window.__env || {};',
    `window.__env.API_URL = ${JSON.stringify(apiUrl)};`,
    ''
  ].join('\n');

writeFileSync(outPath, contents, 'utf8');
console.log(`[env] wrote ${outPath}`);

